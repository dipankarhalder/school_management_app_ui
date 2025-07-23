import { useState, useMemo } from "react";
import { CalendarContainer } from "./style";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Hours in 12-hour format with AM/PM, precomputed once
const HOURS = Array.from({ length: 24 }, (_, h) => {
  const hour = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

// Sample tasks keyed by local date string (yyyy-MM-dd)
const tasks = {
  "2025-07-21": [
    { label: "Team Meeting", type: "meeting", start: "09:00", end: "11:00" },
    { label: "Design Review", type: "review", start: "10:00", end: "12:00" },
  ],
};

// Get the start (Sunday) of the week for a given date (local)
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
};

// Format date as yyyy-MM-dd local time string
const getDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// Convert 12-hour label to 24-hour string "HH:00"
const convertTo24Hour = (label) => {
  const [time, ampm] = label.split(" ");
  let [hour] = time.split(":");
  hour = parseInt(hour, 10);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:00`;
};

// Determine task type from label (fallback to 'default')
const getTaskType = (task) => {
  if (!task?.label) return "default";
  const lower = task.label.toLowerCase();

  if (lower.includes("meeting")) return "meeting";
  if (lower.includes("appointment")) return "appointment";
  if (lower.includes("review") || lower.includes("design")) return "review";
  if (lower.includes("lunch") || lower.includes("personal")) return "personal";

  return "default";
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Start of week (Sunday) for currentDate
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  // Array of 7 dates in the week
  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [startOfWeek]);

  // Precompute 24-hour format for each hour label for efficiency
  const HOURS_24 = useMemo(() => HOURS.map(convertTo24Hour), []);

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Handle dropdown changes for year, month, day
  const handleSelect = (e, type) => {
    const newDate = new Date(currentDate);
    const val = Number(e.target.value);
    if (type === "year") newDate.setFullYear(val);
    if (type === "month") newDate.setMonth(val);
    if (type === "day") newDate.setDate(val);

    // Fix day overflow if needed (e.g. Feb 30)
    const daysInMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    ).getDate();
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }

    setCurrentDate(newDate);
  };

  // Calculate valid number of days in current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <CalendarContainer>
      <div className="calendar-controls">
        <button onClick={() => changeWeek(-1)}>⬅️ Prev Week</button>
        <button onClick={goToToday}>📅 Today</button>
        <button onClick={() => changeWeek(1)}>Next Week ➡️</button>

        <div className="dropdowns">
          <select
            onChange={(e) => handleSelect(e, "year")}
            value={currentDate.getFullYear()}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const y = 2023 + i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => handleSelect(e, "month")}
            value={currentDate.getMonth()}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => handleSelect(e, "day")}
            value={currentDate.getDate()}
          >
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="grid-row header-row">
          <div className="time-label" />
          {weekDates.map((date) => (
            <div className="day-header" key={getDateStr(date)}>
              <div>{DAYS[date.getDay()]}</div>
              <div>{date.getDate()}</div>
            </div>
          ))}
        </div>

        {HOURS.map((hourLabel, hourIdx) => {
          const hour24 = HOURS_24[hourIdx];
          return (
            <div className="grid-row" key={hour24}>
              <div className="time-label">{hourLabel}</div>
              {weekDates.map((date) => {
                const dateStr = getDateStr(date);
                // Filter tasks active in this hour slot
                const hourTasks = (tasks[dateStr] || []).filter((task) => {
                  return hour24 >= task.start && hour24 < task.end;
                });

                return (
                  <div className="day-cell" key={dateStr}>
                    {hourTasks.map((t, i) => {
                      const type = getTaskType(t);
                      return (
                        <div key={i} className={`task ${type}`}>
                          {t.label}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </CalendarContainer>
  );
};
