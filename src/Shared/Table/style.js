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

          &:last-child p {
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

          & > span.app_status_actv {
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${({ theme }) => theme.colors.green};
            background-color: ${({ theme }) => theme.colors.successbg};
          }

          & > span.app_status_inactv {
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            color: ${({ theme }) => theme.colors.warning};
            background-color: ${({ theme }) => theme.colors.warningbg};
          }

          & > .app_share {
            gap: 8px;
            display: flex;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            text-decoration: underline;
            color: ${({ theme }) => theme.colors.hblue};
            background: ${({ theme }) => theme.colors.transparent};
            border: 0px solid ${({ theme }) => theme.colors.transparent};

            & > span {
              width: 12px;
              height: 12px;

              & > svg {
                width: 12px;
                height: 12px;
              }
            }
          }
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

  & > button {
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
        width: 15px;
        height: 15px;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const PageInput = styled.input`
  padding: 6px;
  width: 100px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})`
  padding: 6px 12px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
