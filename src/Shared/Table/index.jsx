import { useState, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";
import {
  Uarrow,
  Darrow,
  ActiveFilter,
  Rarrow,
  Search,
  Download,
  Delete,
} from "../Icons";
import {
  TableSearchBtn,
  TablePageHeading,
  TableSearch,
  TableSearchInside,
  TableContainer,
  SortIcon,
  NoData,
  PaginationContainer,
  PageButton,
  PageInput,
} from "./style";
import { Breadcrumb } from "../Breadcrumb";
import TableRowItem from "./TableRowItem";

const sortData = (data, key, order) => {
  return [...data].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (typeof valA === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }

    if (typeof valA === "boolean") {
      return order === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return 0;
  });
};

const generatePagination = (totalPages, currentPage) => {
  const range = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    } else if (
      range[range.length - 1] !== "..." &&
      (i === currentPage - delta - 1 || i === currentPage + delta + 1)
    ) {
      range.push("...");
    }
  }

  return range;
};

export const TableInfo = ({
  pageTitle,
  pagePath,
  data,
  viewBtn,
  enableStatus = false,
  sortableColumns = [],
  onAction = () => {},
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dataInformations = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      dataInformations.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, dataInformations, searchTerm]);

  const sortedData = useMemo(() => {
    return sortKey ? sortData(filteredData, sortKey, sortOrder) : filteredData;
  }, [filteredData, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, sortedData.length);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const isAllSelected = useMemo(
    () => paginatedData.every((item) => selectedRows.includes(item.id)),
    [paginatedData, selectedRows]
  );

  const toggleRow = useCallback((id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  }, []);

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedRows((prev) =>
        prev.filter((id) => !paginatedData.some((item) => item.id === id))
      );
    } else {
      const newIds = paginatedData.map((item) => item.id);
      setSelectedRows((prev) => Array.from(new Set([...prev, ...newIds])));
    }
  }, [paginatedData, isAllSelected]);

  const handleSort = (key) => {
    if (!sortableColumns.includes(key)) return;
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (pageNum) => {
    if (typeof pageNum === "number" && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleExport = () => {
    const selectedData = data.filter((d) => selectedRows.includes(d.id));
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data_Informations");
    XLSX.writeFile(workbook, "data_informations_export.xlsx");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(inputPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputPage, searchTerm]);

  useEffect(() => {
    const pageNum = parseInt(debouncedInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }, [debouncedInput, totalPages]);

  const getSortIcon = useCallback(
    (key) => {
      if (!sortableColumns.includes(key)) return null;
      return key === sortKey ? (
        sortOrder === "asc" ? (
          <Uarrow />
        ) : (
          <Darrow />
        )
      ) : (
        <ActiveFilter />
      );
    },
    [sortKey, sortOrder, sortableColumns]
  );

  if (!data || data.length === 0) {
    return <NoData>No data available at this time.</NoData>;
  }

  return (
    <>
      <TableSearchBtn>
        <TablePageHeading>
          <h1>{pageTitle}</h1>
          <Breadcrumb items={pagePath} separator={<Rarrow />} />
        </TablePageHeading>
        <TableSearch>
          <TableSearchInside>
            <input
              id="search_item"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search />
          </TableSearchInside>
          {selectedRows.length ? (
            <>
              <button className="app_export" onClick={handleExport}>
                <Download /> <p>Export</p>
              </button>
              <button
                className="app_delete"
                onClick={() => onAction("delete", selectedRows)}
              >
                <Delete /> <p>Delete</p>
              </button>
            </>
          ) : (
            ""
          )}
        </TableSearch>
      </TableSearchBtn>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={isAllSelected}
                />
              </th>
              {dataInformations.map((key) => (
                <th key={key} onClick={() => handleSort(key)}>
                  <p>
                    {key.replace(/_/g, " ").toUpperCase()}
                    {sortableColumns.includes(key) && (
                      <SortIcon>{getSortIcon(key)}</SortIcon>
                    )}
                  </p>
                </th>
              ))}
              <th>
                <p>ACTIONS</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <TableRowItem
                key={item.id}
                item={item}
                headers={dataInformations}
                viewBtn={viewBtn}
                enableStatus={enableStatus}
                selected={selectedRows.includes(item.id)}
                onToggleRow={toggleRow}
                onAction={onAction}
              />
            ))}
          </tbody>
        </table>
      </TableContainer>

      <PaginationContainer>
        <PageButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </PageButton>
        {generatePagination(totalPages, currentPage).map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`}>...</span>
          ) : (
            <PageButton
              key={`page-${page}`}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          )
        )}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </PageButton>
        <PageButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </PageButton>
        <form onSubmit={(e) => e.preventDefault()}>
          <PageInput
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handleInputChange}
            placeholder="Go to page"
          />
        </form>
        <label>
          Show&nbsp;
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {Array.from(
              { length: Math.ceil(Math.min(data.length, 100) / 10) },
              (_, i) => (i + 1) * 10
            ).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          &nbsp;items
        </label>
      </PaginationContainer>

      <span style={{ marginLeft: "auto" }}>
        Showing {startItem}–{endItem} of {sortedData.length}
      </span>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          Selected {selectedRows.length} item
          {selectedRows.length !== 1 ? "s" : ""}
        </div>
      </div>
    </>
  );
};
