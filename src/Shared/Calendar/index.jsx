import React, { useState } from "react";
import { DayCell } from "./DayCell";
import { CalendarContainer } from "./style";

const records = {
  "2025-07-22": ["Meeting with Bob", "Doctor appointment"],
  "2025-07-23": ["Grocery shopping"],
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export const Calendar = () => {
  const [currentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);

  const daysArray = Array.from({ length: firstDay + totalDays }, (_, i) => {
    if (i < firstDay) return null;
    return i - firstDay + 1;
  });

  return (
    <CalendarContainer>
      <div className="calendar-header">
        <span>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </span>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {daysArray.map((day, idx) => (
          <DayCell
            key={idx}
            day={day}
            year={year}
            month={month}
            records={records}
          />
        ))}
      </div>
    </CalendarContainer>
  );
};
