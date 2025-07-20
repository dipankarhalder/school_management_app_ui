import { useState } from "react";
import { Edit, Delete, CrossTick, Circle } from "../Icons";
import { TableContainer, SortIcon, NoData, ActionTableButton } from "./style";

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
    return 0;
  });
};

export const TableInfo = ({
  data,
  enableStatus = false,
  sortableColumns = [],
  onAction = () => {},
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (!data || data.length === 0) {
    return <NoData>No data available at this time.</NoData>;
  }

  const headers = Object.keys(data[0]);
  const handleSort = (key) => {
    if (!sortableColumns.includes(key)) return;
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = sortKey ? sortData(data, sortKey, sortOrder) : data;
  const getSortIcon = (key) => {
    if (!sortableColumns.includes(key)) return null;
    return key === sortKey ? (sortOrder === "asc" ? "▲" : "▼") : "⇵";
  };

  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            {headers.map((key) => (
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
          {sortedData.map((item) => (
            <tr key={item.id}>
              {headers.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
              <ActionTableButton>
                {enableStatus && item.status && (
                  <button
                    className="status"
                    onClick={() => onAction("status", item)}
                  >
                    {item.status ? <CrossTick /> : <Circle />}
                  </button>
                )}
                <button className="edit" onClick={() => onAction("edit", item)}>
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
  );
};
