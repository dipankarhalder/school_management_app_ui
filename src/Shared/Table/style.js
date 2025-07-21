import styled from "styled-components";

export const NoData = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
`;

export const TableSearchBtn = styled.div`
  display: flex;
  width: 100%;
`;

export const TablePageHeading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > h1 {
    font-size: 18px;
    font-weight: 600;
  }
`;

export const TableSearch = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  & > button {
    display: flex;
    gap: 10px;
    height: 34px;
    padding: 8px 14px;
    border-radius: 6px;
    align-items: center;
    color: #ffffff;
    background: #f6f8fa;
    border: 1px solid #d0d7de;
    box-shadow: inset 0px 1px 0px rgba(208, 215, 222, 0.2);

    &.app_export {
      color: ${({ theme }) => theme.colors.black};
    }

    &.app_delete {
      color: ${({ theme }) => theme.colors.error};
    }

    & > p {
      height: 14px;
      font-weight: 600;
      font-size: 11px;
      text-align: center;
      line-height: 16px;
      text-transform: uppercase;
    }

    & > span {
      width: 14px;
      height: 14px;

      & > svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

export const TableSearchInside = styled.div`
  width: auto;
  padding: 0px 14px;
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  box-shadow: inset 0px 1px 0px rgba(208, 215, 222, 0.2);
  border-radius: 6px;
  position: relative;

  & > input {
    box-sizing: border-box;
    width: 300px;
    height: 32px;
    font-size: 13px;
    font-weight: 500;
    background: transparent;
    border: 0px solid transparent;

    &:focus-visible {
      outline: -webkit-focus-ring-color auto 0px;
    }
  }

  & > span {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 12px;
    top: 8px;

    & > svg {
      width: 16px;
      height: 16px;
      opacity: 0.4;
    }
  }
`;

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

          & > span.app_status_actv,
          & > span.app_status_inactv {
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
          }

          & > span.app_status_actv {
            color: ${({ theme }) => theme.colors.green};
            background-color: ${({ theme }) => theme.colors.successbg};
            border: 1px solid ${({ theme }) => theme.colors.green};
          }

          & > span.app_status_inactv {
            color: ${({ theme }) => theme.colors.warning};
            background-color: ${({ theme }) => theme.colors.warningbg};
            border: 1px solid ${({ theme }) => theme.colors.warning};
          }

          & > .app_share {
            gap: 10px;
            display: flex;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            color: ${({ theme }) => theme.colors.hblue};
            background: ${({ theme }) => theme.colors.transparent};
            border: 0px solid ${({ theme }) => theme.colors.transparent};

            & > p {
              font-size: 14px;
              font-weight: 600;
              text-decoration: underline;
            }

            & > span {
              width: 12px;
              height: 12px;

              & > svg {
                width: 12px;
                height: 12px;
              }
            }

            .app_fallback {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              font-size: 12px;
              font-weight: 700;
              text-align: center;
              line-height: 26px;
              background: #f6f8fa;
              text-decoration: none;
              border: 1px solid #d0d7de;
              color: ${({ theme }) => theme.colors.black};
              box-shadow: inset 0px 1px 0px rgba(208, 215, 222, 0.2);
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

export const SortIcon = styled.span`
  font-size: 12px;
  margin-left: 8px;
`;

export const ActionTableButton = styled.td`
  width: auto;
  display: flex;
  justify-content: flex-end;
  gap: 6px;

  & > button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 6px;
    box-sizing: border-box;
    background: #f6f8fa;
    border: 1px solid rgba(27, 31, 36, 0.15);
    box-shadow: 0px 1px 0px rgba(27, 31, 36, 0.04),
      inset 0px 1px 0px rgba(255, 255, 255, 0.25);

    &.edit {
      color: ${({ theme }) => theme.colors.hblue};
      border-color: ${({ theme }) => theme.colors.tableborder};
    }

    &.delete {
      color: ${({ theme }) => theme.colors.error};
      border-color: ${({ theme }) => theme.colors.tableborder};
    }

    &.status {
      color: ${({ theme }) => theme.colors.success};
      border-color: ${({ theme }) => theme.colors.tableborder};
    }

    &.update_status {
      color: ${({ theme }) => theme.colors.gray};
      border-color: ${({ theme }) => theme.colors.tableborder};
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
