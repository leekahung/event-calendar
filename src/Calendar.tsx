import React, { useState } from "react";

const Calendar = () => {
    /* JavaScript Modulo Function Implementation */
    const mod = (a: number, b: number) => {
      return ((a % b) + b) % b;
    }
  
    /* Helper functions to populate calendar */
    const daysInMonth = (year: number, monthIndex: number) => {
      return new Date(year, monthIndex, 0).getDate();
    }
  
    const getFirstDayIndex = () => {
      let dayIndex = new Date(currYear, currMonthIndex, 0).getDay() + 1;
      return (dayIndex === 7) ? 0 : dayIndex;
    }
  
    const month: string[] = [
      "January", "Feburary", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const [numFromMonth, setCountMonth] = useState(0);
    const [numFromYear, setCountYear] = useState(0);
  
    const handleCountMonth = (direction: string) => {
      if (direction === "up") {
        setCountMonth(numFromMonth + 1);
        if (currMonth === "December") {
          setCountYear(numFromYear + 1);
        }; 
      } else {
        setCountMonth(numFromMonth - 1);
        if (currMonth === "January") {
          setCountYear(numFromYear - 1);
        };
      }
    }
  
    const date = new Date();
    let currYear = date.getFullYear() + numFromYear;
    let currMonthIndex = mod((date.getMonth() + numFromMonth), 12);
    let currMonth = month[currMonthIndex];
    let daysInCurrMonth = daysInMonth(currYear, currMonthIndex + 1);
    let firstDayCurrMonth = getFirstDayIndex();

  return (
    <div className="calendar-ctnr">
      <div className="calendar-month-year">
        <button onClick={() => {
          handleCountMonth("down");
          }}>&lt;</button>
        <h1>{`${currMonth} ${currYear}`}</h1>
        <button onClick={() => {
          handleCountMonth("up");
        }}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursaday", "Friday", "Saturday"].map((item) => {
          return React.createElement("div", { className: "day-name", key: item }, item);
        })}
        {[...Array(42)].map((_, index) => {
          return index === firstDayCurrMonth
          ? (React.createElement("div", { className: "day first-day", key: index }, 1))
          : ((firstDayCurrMonth < index && index < firstDayCurrMonth + daysInCurrMonth)
            ? (React.createElement("div", { className: "day", key: index}, index - firstDayCurrMonth + 1))
            : (React.createElement("div", { className: "day", key: index})) 
            )
        })}
      </div>
    </div>
  );
}
 
export default Calendar;