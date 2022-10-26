import React, { useState } from "react";
import AddEventButton from "./AddEventButton";

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
      keyIndex: number,
      dateValue?: number
    ) => {
      return (typeof dateValue !== "undefined")
        ? (React.createElement("div", { className: classNames, key: keyIndex }, <AddEventButton dateValue={dateValue} />))
        : (React.createElement("div", { className: classNames, key: keyIndex }));
    };

    const handleButtonClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      const eventAdder = document.getElementById("event-adder") as HTMLDialogElement;
      eventAdder.style.visibility = "hidden";
    }

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
            if (date.getFullYear() === currYear && date.getMonth() === currMonthIndex && date.getDate() === firstDayCurrMonth + 1) {
              return createDay("day first-day today", index, index - firstDayCurrMonth + 1);
            } else {
              return createDay("day first-day", index, index - firstDayCurrMonth + 1);
            }
          } else if (firstDayCurrMonth < index && index < firstDayCurrMonth + daysInCurrMonth) {
            if (date.getFullYear() === currYear && date.getMonth() === currMonthIndex && date.getDate() === index - firstDayCurrMonth + 1) {
              return createDay("day today", index, index - firstDayCurrMonth + 1);
            } else {
              return createDay("day", index, index - firstDayCurrMonth + 1);
            }
          } else {
            return createDay("day empty", index);
          }
        })}
      </div>
      <dialog id="event-adder">
        <button onClick={handleButtonClose}>Close</button>
      </dialog>
    </div>
  );
}
 
export default Calendar;