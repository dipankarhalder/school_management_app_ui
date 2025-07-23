import { useState, useMemo } from "react";
import { Larrow, Rarrow, Darrow, Calender } from "../Icons";
import { CalendarContainer } from "./style";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, h) => {
  const hour = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

// const tasks = {
//   "2025-07-21": [
//     {
//       label: "Hardware and Networking Business.",
//       type: "meeting",
//       start: "03:00",
//       end: "04:00",
//     },
//     {
//       label: "Hardware and Networking Business.",
//       type: "review",
//       start: "09:00",
//       end: "10:00",
//     },
//   ],
// };

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
};

const getDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const convertTo24Hour = (label) => {
  const [time, ampm] = label.split(" ");
  let [hour] = time.split(":");
  hour = parseInt(hour, 10);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:00`;
};

const getTaskType = (task) => {
  if (!task?.label) return "default";
  if (task?.type) return task.type;

  const lower = task.label.toLowerCase();
  if (lower.includes("meeting")) return "meeting";
  if (lower.includes("appointment")) return "appointment";
  if (lower.includes("review") || lower.includes("design")) return "review";
  if (lower.includes("lunch") || lower.includes("personal")) return "personal";
  return "default";
};

export const Calendar = ({ dataInfo }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);
  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [startOfWeek]);

  const HOURS_24 = useMemo(() => HOURS.map(convertTo24Hour), []);
  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => setCurrentDate(new Date());
  const handleSelect = (e, type) => {
    const newDate = new Date(currentDate);
    const val = Number(e.target.value);
    if (type === "year") newDate.setFullYear(val);
    if (type === "month") newDate.setMonth(val);
    if (type === "day") newDate.setDate(val);

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

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  return (
    <CalendarContainer>
      <div className="calendarControls">
        <div className="calenderButtons">
          <button onClick={() => changeWeek(-1)}>
            <Larrow />
          </button>
          <button onClick={goToToday}>
            <Calender /> <p>Today</p>
          </button>
          <button onClick={() => changeWeek(1)}>
            <Rarrow />
          </button>
        </div>
        <div className="calenderDropdowns">
          <div className="calenderSelectBox">
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
            <Darrow />
          </div>
          <div className="calenderSelectBox">
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
            <Darrow />
          </div>
          <div className="calenderSelectBox">
            <select
              onChange={(e) => handleSelect(e, "year")}
              value={currentDate.getFullYear()}
            >
              {Array.from({ length: 10 }).map((_, i) => {
                const y = 2021 + i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
            <Darrow />
          </div>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="grid-row header-row">
          <div className="time-label" />
          {weekDates.map((date) => (
            <div className="day-header" key={getDateStr(date)}>
              <div className="day-name">{DAYS[date.getDay()]}</div>
              <div className="day-date">{date.getDate()}</div>
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
                const hourTasks = (dataInfo[dateStr] || []).filter((task) => {
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
