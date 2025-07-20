import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto;
  margin: 20px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #f4f4f4;
`;

export const Th = styled.th.attrs(() => ({}))`
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
  user-select: none;
  position: relative;
  cursor: ${(props) => (props.$sortable ? "pointer" : "default")};

  &:hover {
    background-color: ${(props) => (props.$sortable ? "#eaeaea" : "inherit")};
  }
`;

export const Td = styled.td`
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #ccc;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const NoData = styled.div`
  padding: 20px;
  color: gray;
  text-align: center;
`;

export const SortIcon = styled.span`
  font-size: 12px;
  margin-left: 8px;
`;
