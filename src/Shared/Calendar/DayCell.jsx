import React, { useState } from "react";

export const DayCell = ({ day, month, year, records }) => {
  const [show, setShow] = useState(false);

  if (day === null) {
    return <div className="calendar-day empty" />;
  }

  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  const events = records[dateStr] || [];

  return (
    <div className="calendar-day" onClick={() => setShow(!show)}>
      <div className="date">{day}</div>
      {events.length > 0 && <div className="dot" />}
      {show && (
        <div className="event-popup">
          <strong>Events:</strong>
          <ul>
            {events.map((evt, idx) => (
              <li key={idx}>{evt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
