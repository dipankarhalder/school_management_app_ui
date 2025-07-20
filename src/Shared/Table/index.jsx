import { useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  SortIcon,
  NoData,
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
    return 0;
  });
};

export const TableInfo = ({ data, sortableColumns = [] }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (!data || data.length === 0) {
    return <NoData>No student records found.</NoData>;
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
    if (key !== sortKey) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers.map((key) => (
              <Th key={key} onClick={() => handleSort(key)}>
                {key.replace(/_/g, " ").toUpperCase()}
                {sortableColumns.includes(key) && (
                  <SortIcon>{getSortIcon(key)}</SortIcon>
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <tbody>
          {sortedData.map((student) => (
            <Tr key={student.id}>
              {headers.map((key) => (
                <Td key={key}>{student[key]}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
