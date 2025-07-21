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
  ColumnOption,
  Cross,
  CheckPlus,
} from "../Icons";
import {
  TableSearchBtn,
  TablePageHeading,
  TableSearch,
  TableSearchInside,
  TableContainer,
  TableColumnEnableOption,
  SortIcon,
  NoData,
  AppPaginationCover,
  AppPaginationLeftSide,
  AppPaginationRightSide,
  PageButton,
  AppFilterCoverSection,
  AppFilterLeft,
  AppFilterRight,
  AppSearchInside,
} from "./style";
import { Breadcrumb } from "../Breadcrumb";
import { TableRowItem } from "./TableRowItem";

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
  addTextItem,
  visibleColumns,
  handleAddItems,
  onToggleColumn,
  enableStatus = false,
  sortableColumns = [],
  filterableColumns,
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
  const [columnFilters, setColumnFilters] = useState({});
  const dataInformations = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchMatch = dataInformations.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filtersMatch = Object.entries(columnFilters).every(
        ([key, value]) => {
          if (value === undefined) return true;
          return String(item[key]) === String(value);
        }
      );

      return searchMatch && filtersMatch;
    });
  }, [data, dataInformations, searchTerm, columnFilters]);

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
            <button onClick={() => handleAddItems("add")}>
              <CheckPlus /> {addTextItem}
            </button>
          </TableSearchInside>
          <TableColumnEnableOption>
            <button>
              <ColumnOption />
            </button>
            <div className="dropdown_content">
              <div className="dropdown_inside">
                {dataInformations.map((col) => (
                  <label key={col}>
                    <input
                      type="checkbox"
                      checked={visibleColumns[col]}
                      onChange={() => onToggleColumn(col)}
                    />
                    {col.replace(/_/g, " ")}
                  </label>
                ))}
              </div>
            </div>
          </TableColumnEnableOption>
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

      <AppFilterCoverSection>
        <AppFilterLeft>
          <AppSearchInside>
            <input
              id="search_item"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search />
          </AppSearchInside>
        </AppFilterLeft>
        <AppFilterRight>
          {filterableColumns.map((key) => {
            const uniqueValues = Array.from(
              new Set(data.map((item) => item[key]))
            );
            return (
              <div key={key} className="filter_group">
                <label htmlFor={key}>{key}:</label>
                <div className="app_select_cover">
                  <select
                    id={key}
                    value={columnFilters[key] || ""}
                    onChange={(e) =>
                      setColumnFilters((prev) => ({
                        ...prev,
                        [key]: e.target.value || undefined,
                      }))
                    }
                  >
                    <option value="">All</option>
                    {uniqueValues.map((value) => (
                      <option key={value} value={value}>
                        {typeof value === "boolean"
                          ? value
                            ? "Active"
                            : "Inactive"
                          : value}
                      </option>
                    ))}
                  </select>
                  <Darrow />
                </div>
              </div>
            );
          })}
          {Object.keys(columnFilters).length ? (
            <button
              className="app_filter_clear"
              onClick={() => setColumnFilters({})}
            >
              <Cross />
            </button>
          ) : null}
        </AppFilterRight>
      </AppFilterCoverSection>

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
              {dataInformations.map((key) =>
                visibleColumns[key] ? (
                  <th key={key} onClick={() => handleSort(key)}>
                    <p>
                      {key.replace(/_/g, " ").toUpperCase()}
                      {sortableColumns.includes(key) && (
                        <SortIcon>{getSortIcon(key)}</SortIcon>
                      )}
                    </p>
                  </th>
                ) : null
              )}
              <th>
                <p>ACTIONS</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <TableRowItem
                key={item.id}
                visibleColumns={visibleColumns}
                item={item}
                dataTableInfo={dataInformations}
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
      <AppPaginationCover>
        <AppPaginationLeftSide>
          <span>
            {selectedRows.length} of {sortedData.length} row(s) selected
          </span>
        </AppPaginationLeftSide>
        <AppPaginationRightSide>
          <div className="app_pager_dropdown">
            <p>Rows per page</p>
            <div className="app_select_cover">
              <select
                id="page_selection"
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
              <Darrow />
            </div>
          </div>
          <div className="app_pagination_container">
            <div className="app_pager_showing_items">
              <p>
                Page {startItem}–{endItem} of {sortedData.length}
              </p>
            </div>
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
          </div>
          <div className="app_quick_paginate">
            <p>Quick Paginate</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </AppPaginationRightSide>
      </AppPaginationCover>
    </>
  );
};
