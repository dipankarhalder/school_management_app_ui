import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.tableborder};

  table {
    width: 100%;

    thead {
      tr {
        border-bottom: 1px solid ${({ theme }) => theme.colors.tableborder};
        background: #f1f5f9;
        th {
          color: ${({ theme }) => theme.colors.dgray};
          text-align: left;
          padding: 0.5rem 1rem;

          input[type="checkbox"] {
            margin-top: 4px;
          }

          &:last-child {
            display: flex;
            justify-content: flex-end;
          }

          p {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            display: flex;
            align-items: center;

            &:last-child {
              text-align: right;
            }

            & > span {
              width: 12px;
              height: 12px;
              margin-left: 6px;
              margin-top: -1px;

              & > svg {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
    }
    tbody {
      background: ${({ theme }) => theme.colors.white};
      tr {
        border-bottom: 1px solid ${({ theme }) => theme.colors.tableborder};
        td {
          font-size: 14px;
          padding: 0.5rem 1rem;
        }
        &:last-child {
          border-bottom: 0px solid ${({ theme }) => theme.colors.transparent};
        }
      }
    }
  }
`;

export const NoData = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`;

export const SortIcon = styled.span`
  font-size: 12px;
  margin-left: 8px;
`;

export const ActionTableButton = styled.td`
  width: auto;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.tableborder};

    &.edit {
      color: ${({ theme }) => theme.colors.hblue};
      background-color: ${({ theme }) => theme.colors.infobg};
      border-color: ${({ theme }) => theme.colors.infobg};
    }

    &.delete {
      color: ${({ theme }) => theme.colors.error};
      background-color: ${({ theme }) => theme.colors.errorbg};
      border-color: ${({ theme }) => theme.colors.errorbg};
    }

    &.status {
      color: ${({ theme }) => theme.colors.success};
      background-color: ${({ theme }) => theme.colors.successbg};
      border-color: ${({ theme }) => theme.colors.successbg};
    }

    & > span {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;
