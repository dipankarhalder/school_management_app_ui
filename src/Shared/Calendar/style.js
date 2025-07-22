import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;

  .calendar-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .calendar-day-header {
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    background-color: #eee;
  }

  .calendar-day {
    height: 100px;
    border: 1px solid #ccc;
    padding: 5px;
    position: relative;
    cursor: pointer;
    background-color: #fefefe;

    .date {
      font-size: 14px;
      font-weight: bold;
    }

    .dot {
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      bottom: 5px;
      left: 5px;
    }

    .event-popup {
      position: absolute;
      top: 20px;
      left: 5px;
      background: #fff;
      border: 1px solid #999;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      padding: 10px;
      z-index: 10;
      font-size: 12px;
    }
  }

  .calendar-day.empty {
    background-color: transparent;
    border: none;
  }
`;
