import React, { useContext, useState } from "react";
import SelectDayButton from "./SelectDayButton";
import leftCheveron from "../../assets/img/left-chevron.png";
import rightCheveron from "../../assets/img/right-chevron.png";
import { SelectDayContext, SelectDayContextType } from "../../App";

interface Props {
  date: Date;
  month: string[];
}

const Calendar = ({ date, month }: Props) => {
  /* JavaScript Modulo Function Implementation */
  const mod = (a: number, b: number) => {
    return ((a % b) + b) % b;
  };

  /* Helper functions to help set initial values for calendar */
  const daysInMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex, 0).getDate();
  };

  const getFirstDayIndex = () => {
    let dayIndex = new Date(currYear, currMonthIndex, 0).getDay() + 1;
    return dayIndex === 7 ? 0 : dayIndex;
  };

  // Set State Hooks and Handler for changing Month and Year
  const [countMonth, setCountMonth] = useState(0);
  const [countYear, setCountYear] = useState(0);

  const handleCountMonth = (direction: string) => {
    const calendarDays = document.querySelectorAll<HTMLDivElement>(".day");
    calendarDays.forEach((day) => removeSelected(day));

    if (direction === "up") {
      setCountMonth((countMonth) => {
        return countMonth + 1;
      });
      if (currMonth === "December") {
        setCountYear((countYear) => {
          return countYear + 1;
        });
      }
    } else {
      setCountMonth((countMonth) => {
        return countMonth - 1;
      });
      if (currMonth === "January") {
        setCountYear((countYear) => {
          return countYear - 1;
        });
      }
    }
  };

  // Initial Settings for Calender values
  let currYear = date.getFullYear() + countYear;
  let currMonthIndex = mod(date.getMonth() + countMonth, 12);
  let currMonth = month[currMonthIndex];
  let daysInCurrMonth = daysInMonth(currYear, currMonthIndex + 1);
  let firstDayCurrMonth = getFirstDayIndex();

  const resetSelected = (day: HTMLDivElement) => {
    if (day.classList.contains("today")) {
      day.classList.add("day-selected");
    }
  };

  const removeSelected = (day: HTMLDivElement) => {
    if (day.classList.contains("day-selected")) {
      day.classList.remove("day-selected");
    }
  };

  const { selectedDate } = useContext(SelectDayContext) as SelectDayContextType;
  const calendarDays = document.querySelectorAll<HTMLDivElement>(".day");

  const reloadInitialDate = () => {
    setCountMonth(0);
    setCountYear(0);
    calendarDays.forEach((day) => {
      removeSelected(day);
      resetSelected(day);
    });
    selectedDate(
      month[date.getMonth()],
      date.getDate(),
      date.getFullYear()
    );
  };

  // Helper function to populate calendar dynamically
  const createDay = (
    classNames: string,
    keyIndex: number,
    dateValue?: number
  ) => {
    return typeof dateValue !== "undefined"
      ? React.createElement(
          "div",
          { className: classNames, key: keyIndex },
          <SelectDayButton
            dateValue={dateValue}
            removeSelected={removeSelected}
          />
        )
      : React.createElement("div", { className: classNames, key: keyIndex });
  };

  return (
    <div className="calendar-ctnr">
      <div className="calendar-month-year">
        <button id="reload-today" onClick={() => {reloadInitialDate();}}>
          Today
        </button>
        <div id="month-year">
          <button onClick={() => {handleCountMonth("down");}}>
            <img src={leftCheveron} alt="left-pointing cheveron icon" />
          </button>
          <h1>{`${currMonth} ${currYear}`}</h1>
          <button onClick={() => {handleCountMonth("up");}}>
            <img src={rightCheveron} alt="right-pointing cheveron icon" />
          </button>
        </div>
        <button id="add-event-btn" onClick={() => {console.log("add event");}}>
          +
        </button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => {
          return React.createElement(
            "div",
            { className: "day-name", key: item },
            item
          );
        })}
        {[...Array(42)].map((_, index) => {
          const normalizedIndex = index - firstDayCurrMonth + 1;
          if (index === firstDayCurrMonth) {
            if (
              date.getFullYear() === currYear &&
              date.getMonth() === currMonthIndex &&
              date.getDate() === normalizedIndex
            ) {
              return createDay("day first-day today day-selected", index, normalizedIndex);
            } else {
              return createDay("day first-day", index, normalizedIndex);
            }
          } else if (
            firstDayCurrMonth < index &&
            index < firstDayCurrMonth + daysInCurrMonth
          ) {
            if (
              date.getFullYear() === currYear &&
              date.getMonth() === currMonthIndex &&
              date.getDate() === normalizedIndex
            ) {
              return createDay("day today day-selected", index, normalizedIndex);
            } else {
              return createDay("day", index, normalizedIndex);
            }
          } else {
            return createDay("day empty", index);
          }
        })}
      </div>
    </div>
  );
};

export default Calendar;
