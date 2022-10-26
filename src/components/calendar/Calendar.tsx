import React, { useState } from "react";

interface Props {
  date: Date;
}

const Calendar = ({date}: Props) => {
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
  
    const currYear = date.getFullYear() + numFromYear;
    const currMonthIndex = mod((date.getMonth() + numFromMonth), 12);
    const currMonth = month[currMonthIndex];
    const daysInCurrMonth = daysInMonth(currYear, currMonthIndex + 1);
    const firstDayCurrMonth = getFirstDayIndex();

    const createDay = (
      classNames: string,
      dateValue?: number
    ) => {
      return (typeof dateValue !== "undefined")
        ? (React.createElement("div", { className: classNames, key: dateValue }, <button>{dateValue}</button>))
        : (React.createElement("div", { className: classNames }));
    };

  return (
    <div className="calendar-ctnr">
      <div className="calendar-month-year">
        <button onClick={() => {
          handleCountMonth("down");
          }}>	&#9664;</button>
        <h1>{`${currMonth} ${currYear}`}</h1>
        <button onClick={() => {
          handleCountMonth("up");
        }}>&#9654;</button>
      </div>
      <div className="calendar-grid">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursaday", "Friday", "Saturday"].map((item) => {
          return React.createElement("div", { className: "day-name", key: item }, item);
        })}
        {[...Array(42)].map((_, index) => {
          if (index === firstDayCurrMonth) {
            if (date.getMonth() === currMonthIndex && date.getDate() === firstDayCurrMonth + 1) {
              return createDay("day first-day today", index - firstDayCurrMonth + 1);
            } else {
              return createDay("day first-day", index - firstDayCurrMonth + 1);
            }
          } else if (firstDayCurrMonth < index && index < firstDayCurrMonth + daysInCurrMonth) {
            if (date.getMonth() === currMonthIndex && date.getDate() === index - firstDayCurrMonth + 1) {
              return createDay("day today", index - firstDayCurrMonth + 1);
            } else {
              return createDay("day", index - firstDayCurrMonth + 1);
            }
          } else {
            return createDay("day empty");
          }
        })}
      </div>
    </div>
  );
}
 
export default Calendar;