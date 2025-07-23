import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .calendar-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;

    button {
      padding: 6px 12px;
      cursor: pointer;
    }

    .dropdowns {
      margin-left: auto;
      display: flex;
      gap: 8px;

      select {
        padding: 4px 8px;
      }
    }
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: 60px repeat(7, 1fr);
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;

    .grid-row {
      display: contents; // to allow row-wise grid inside columns

      &.header-row {
        > div {
          padding: 8px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          background-color: #f7f7f7;
          text-align: center;
        }
      }

      .time-label {
        padding: 6px 4px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        text-align: right;
        color: #555;
        user-select: none;
      }

      .day-cell {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        position: relative;
        height: 50px; // height per hour row
        overflow: visible; // allow tasks to overflow height for spanning

        .task-group {
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          display: flex;
        }

        .task {
          background-color: #eee;
          color: #333;
          border: 1px solid transparent;
          box-sizing: border-box;

          &.meeting {
            background-color: #4a90e2;
            color: white;
          }

          &.review {
            background-color: #50e3c2;
            color: white;
          }

          &.personal {
            background-color: #f5a623;
            color: white;
          }

          &.appointment {
            background-color: #d0021b;
            color: white;
          }

          &.default {
            background-color: #999;
            color: white;
          }
        }
      }
    }
  }
`;
