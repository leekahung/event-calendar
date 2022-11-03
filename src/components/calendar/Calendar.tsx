import React, { useState } from "react";
import AddEventButton from "./AddEventButton";
import EventDialog from "./EventDialog";

interface Props {
  date: Date;
  addEvent: any;
}

const Calendar = ({ date, addEvent }: Props) => {
    /* JavaScript Modulo Function Implementation */
    const mod = (a: number, b: number) => {
      return ((a % b) + b) % b;
    }

    const month: string[] = [
      "January", "Feburary", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    /* Helper functions to help set initial values for calendar */
    const daysInMonth = (year: number, monthIndex: number) => {
      return new Date(year, monthIndex, 0).getDate();
    }
  
    const getFirstDayIndex = () => {
      let dayIndex = new Date(currYear, currMonthIndex, 0).getDay() + 1;
      return (dayIndex === 7) ? 0 : dayIndex;
    }
  
    // Set State Hooks and Handler for changing Month and Year
    const [countMonth, setCountMonth] = useState(0);
    const [countYear, setCountYear] = useState(0);

    const handleCountMonth = (direction: string) => {
      if (direction === "up") {
        setCountMonth(countMonth => {return countMonth + 1});
        if (currMonth === "December") {
          setCountYear(countYear => {return countYear + 1});
        }; 
      } else {
        setCountMonth(countMonth => {return countMonth - 1});
        if (currMonth === "January") {
          setCountYear(countYear => {return countYear - 1});
        };
      }
    }
  
    // Initial Settings for Calender values
    let currYear = date.getFullYear() + countYear;
    let currMonthIndex = mod((date.getMonth() + countMonth), 12);
    let currMonth = month[currMonthIndex];
    let daysInCurrMonth = daysInMonth(currYear, currMonthIndex + 1);
    let firstDayCurrMonth = getFirstDayIndex();

    const reloadInitialDate = () => {
      setCountMonth(0);
      setCountYear(0);
    }

    // Setting State Hook and Handler for Date Selection
    const [day, setDay] = useState(1);

    const handleButtonClick = (event: React.MouseEvent, day: number) => {
      setDay(day);
    };

    // Helper function to populate calendar dynamically
    const createDay = (
      classNames: string,
      keyIndex: number,
      dateValue?: number
    ) => {
      return (typeof dateValue !== "undefined")
        ? (React.createElement("div", { className: classNames, key: keyIndex },
          <AddEventButton
            dateValue={dateValue}
            handleDaySelect={(event: React.MouseEvent, day: number) => handleButtonClick(event, day)} 
          />
          ))
        : (React.createElement("div", { className: classNames, key: keyIndex }));
    };

  return (
    <div className="calendar-ctnr">
      <div className="calendar-month-year">
        <button id="reload-today" onClick={() => {reloadInitialDate();}}>Today</button>
        <button onClick={() => {handleCountMonth("down");}}>	
          &#9664;
        </button>
        <h1>{`${currMonth} ${currYear}`}</h1>
        <button onClick={() => {handleCountMonth("up");}}>
          &#9654;
        </button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => {
          return React.createElement("div", { className: "day-name", key: item }, item);
        })}
        {[...Array(42)].map((_, index) => {
          const normalizedIndex = index - firstDayCurrMonth + 1;
          if (index === firstDayCurrMonth) {
            if (date.getFullYear() === currYear && date.getMonth() === currMonthIndex && date.getDate() === normalizedIndex) {
              return createDay("day first-day today", index, normalizedIndex);
            } else {
              return createDay("day first-day", index, normalizedIndex);
            }
          } else if (firstDayCurrMonth < index && index < firstDayCurrMonth + daysInCurrMonth) {
            if (date.getFullYear() === currYear && date.getMonth() === currMonthIndex && date.getDate() === normalizedIndex) {
              return createDay("day today", index, normalizedIndex);
            } else {
              return createDay("day", index, normalizedIndex);
            }
          } else {
            return createDay("day empty", index);
          }
        })}
      </div>
      <dialog id="dialog-box">
        <EventDialog 
          month={currMonth}
          year={currYear}
          date={day}
          addEvent={addEvent}
        />
      </dialog>
    </div>
  );
}
 
export default Calendar;