import React, { createContext, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";

/* useContext hook for Selecting Specific Dates */
export type SelectDayContextType = {
  selectedDate: (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => void;
};

export const SelectDayContext = createContext<SelectDayContextType>(
  {} as SelectDayContextType
);

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const month: string[] = [
    "January", "Feburary", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(month[today.getMonth()]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const selectedDate = (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => {
    setSelectedMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setSelectedYear(selectedYear);
  };

  return (
    <div className="App">
      <SelectDayContext.Provider value={{ selectedDate }}>
        <Calendar date={today} month={month} />
      </SelectDayContext.Provider>
      <div className="events">
        <div className="events__today">
          <div className="events__today-header">
            {selectedMonth} {selectedDay}, {selectedYear}
          </div>
          <div className="events__today-list">Placeholder</div>
        </div>
        <div className="events__all">
          <div className="events__all-header">All Events</div>
          <div className="events__all-list">Placeholder</div>
        </div>
      </div>
    </div>
  );
}

export default App;
