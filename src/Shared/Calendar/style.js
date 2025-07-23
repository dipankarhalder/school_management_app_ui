import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .calendarControls {
    gap: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .calenderButtons {
      display: flex;
      gap: 8px;

      button {
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 6px;
        background: ${({ theme }) => theme.colors.sidebar};
        border: 1px solid ${({ theme }) => theme.colors.exborder};
        box-shadow: ${({ theme }) => theme.colors.boxshadow};

        &:hover {
          background: #eef7fbff;
        }

        &:nth-child(2) {
          display: flex;
          width: auto;
          font-size: 12px;
          font-weight: 600;
          align-items: center;
          padding: 0px 11px 0px 3px;
        }

        & > span {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;

          & > svg {
            width: 15px;
            height: 15px;
            margin-top: -1px;
            margin-left: -1px;
          }
        }
      }
    }

    .calenderDropdowns {
      display: flex;
      gap: 8px;

      .calenderSelectBox {
        position: relative;
        display: flex;
        border-radius: 6px;
        background: ${({ theme }) => theme.colors.sidebar};
        border: 1px solid ${({ theme }) => theme.colors.exborder};
        box-shadow: ${({ theme }) => theme.colors.boxshadow};

        & > select {
          height: 30px;
          font-size: 13px;
          font-weight: 600;
          width: auto;
          padding: 0 30px 0 10px;
          background: transparent;
          border: 0px solid transparent;
          appearance: none;
          -webkit-appearance: none;
        }

        & > span {
          top: 0;
          right: 0;
          width: 30px;
          height: 30px;
          display: flex;
          position: absolute;
          align-items: center;
          justify-content: center;

          & > svg {
            width: 15px;
            height: 15px;
          }
        }
      }

      select {
        padding: 4px 8px;
      }
    }
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    border-radius: 6px;
    overflow: hidden;

    .grid-row {
      display: contents;

      &.header-row {
        > div {
          padding: 8px;
          border-bottom: 1px solid #efefef;
          border-right: 1px solid #eee;

          .day-name {
            color: #666666;
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 500;
            line-height: normal;
          }
          .day-date {
            line-height: 24px;
            font-size: 23px;
            font-weight: 600;
          }
        }
      }

      .time-label {
        padding: 6px 9px 6px 6px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        text-align: right;
        font-size: 12px;
        font-weight: 600;
        color: #555;
        display: flex;
        user-select: none;
        align-items: flex-start;
        justify-content: flex-end;
      }

      .day-cell {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        position: relative;
        overflow: visible;
        padding: 6px;

        &:last-child {
          border-right: 0px solid transparent;
        }

        .task-group {
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          display: flex;
        }

        .task {
          padding: 4px 10px;
          color: #333;
          font-size: 13px;
          font-weight: 600;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 4px;

          &:last-child {
            margin-bottom: 0px;
          }

          &.meeting {
            border-left: 3px solid ${({ theme }) => theme.colors.info};
            background-color: ${({ theme }) => theme.colors.infobg};
            color: ${({ theme }) => theme.colors.info};
          }

          &.review {
            border-left: 3px solid ${({ theme }) => theme.colors.success};
            background-color: ${({ theme }) => theme.colors.successbg};
            color: ${({ theme }) => theme.colors.success};
          }

          &.personal {
            border-left: 3px solid ${({ theme }) => theme.colors.warning};
            background-color: ${({ theme }) => theme.colors.warningbg};
            color: ${({ theme }) => theme.colors.warning};
          }

          &.appointment {
            border-left: 3px solid ${({ theme }) => theme.colors.error};
            background-color: ${({ theme }) => theme.colors.errorbg};
            color: ${({ theme }) => theme.colors.error};
          }

          &.default {
            border-left: 3px solid ${({ theme }) => theme.colors.secured};
            background-color: ${({ theme }) => theme.colors.securedbg};
            color: ${({ theme }) => theme.colors.secured};
          }
        }
      }

      &:last-child {
        .time-label,
        .day-cell {
          border-bottom: 0px solid transparent;
        }
      }
    }
  }
`;
