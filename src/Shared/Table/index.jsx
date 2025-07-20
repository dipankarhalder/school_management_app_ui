import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Share,
  Edit,
  Delete,
  CrossTick,
  Circle,
  Uarrow,
  Darrow,
  ActiveFilter,
} from "../Icons";
import {
  TableContainer,
  SortIcon,
  NoData,
  ActionTableButton,
  PaginationContainer,
  PageButton,
  PageInput,
} from "./style";

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
  const dataInformations = data.length > 0 ? Object.keys(data[0]) : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    dataInformations.some((key) =>
      String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortKey
    ? sortData(filteredData, sortKey, sortOrder)
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, sortedData.length);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected = paginatedData.every((item) =>
    selectedRows.includes(item.id)
  );

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedRows((prev) =>
        prev.filter((id) => !paginatedData.some((item) => item.id === id))
      );
    } else {
      const newIds = paginatedData.map((item) => item.id);
      setSelectedRows((prev) => Array.from(new Set([...prev, ...newIds])));
    }
  };

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
    }, 500);
    return () => clearTimeout(timer);
  }, [inputPage]);

  useEffect(() => {
    const pageNum = parseInt(debouncedInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }, [debouncedInput, totalPages]);

  if (!data || data.length === 0) {
    return <NoData>No data available at this time.</NoData>;
  }

  const getSortIcon = (key) => {
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
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

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
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                  />
                </td>
                {dataInformations.map((key) => {
                  return key === "status" ? (
                    <td key={key}>
                      <span
                        className={
                          item[key] ? "app_status_actv" : "app_status_inactv"
                        }
                      >
                        {item[key] ? "Active" : "In-active"}
                      </span>
                    </td>
                  ) : key === viewBtn ? (
                    <td key={key}>
                      <button
                        className="app_share"
                        onClick={() => onAction("view", item)}
                      >
                        {item[key].toString()} <Share />
                      </button>
                    </td>
                  ) : (
                    <td key={key}>{item[key]}</td>
                  );
                })}
                <ActionTableButton>
                  {enableStatus && (
                    <button
                      className="status"
                      onClick={() => onAction("status", item)}
                    >
                      {item.status ? <CrossTick /> : <Circle />}
                    </button>
                  )}
                  <button
                    className="edit"
                    onClick={() => onAction("edit", item)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="delete"
                    onClick={() => onAction("delete", item)}
                  >
                    <Delete />
                  </button>
                </ActionTableButton>
              </tr>
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
        <button
          disabled={selectedRows.length === 0}
          onClick={handleExport}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: selectedRows.length === 0 ? "#ccc" : "#007bff",
            color: "#fff",
            cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Export Selected
        </button>
      </div>
    </>
  );
};
