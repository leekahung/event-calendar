import React, { useContext, useState } from "react";
import SelectDayButton from "./SelectDayButton";
import leftCheveron from "../../assets/img/left-chevron.png";
import rightCheveron from "../../assets/img/right-chevron.png";
import { SelectDayContext } from "../../App";
import { resetSelected, removeSelected } from "../../utils/helper/helpSelect";
import { daysInMonth, getFirstDayIndex } from "../../utils/helper/helpPopulate";

interface Props {
  month: string[];
  date: Date;
  toggleModal: () => void;
}

// JavaScript Modulo function implementation
const mod = (a: number, b: number) => {
  return ((a % b) + b) % b;
};

const Calendar = ({ month, date, toggleModal }: Props) => {
  // setState hooks and handler for changing month and year
  const [countMonth, setCountMonth] = useState(0);
  const [countYear, setCountYear] = useState(0);

  const handleCountMonth = (direction: string) => {
    const calendarDays = document.querySelectorAll<HTMLDivElement>(".calendar__day");
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

  // initial settings for calender values
  let currYear = date.getFullYear() + countYear;
  let currMonthIndex = mod(date.getMonth() + countMonth, 12);
  let currMonth = month[currMonthIndex];
  let daysInCurrMonth = daysInMonth(currYear, currMonthIndex + 1);
  let firstDayCurrMonth = getFirstDayIndex(currYear, currMonthIndex);

  const { selectedDate } = useContext(SelectDayContext) as SelectDayContextType;
  const calendarDays = document.querySelectorAll<HTMLDivElement>(".calendar__day");

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
            month={currMonth}
            dateValue={dateValue}
            year={currYear}
            removeSelected={removeSelected}
          />
        )
      : React.createElement("div", { className: classNames, key: keyIndex });
  };

  const handleModal = () => {
    toggleModal();
  }

  return (
    <div className="calendar">
      <div className="calendar__date-ctnr">
        <button
          className="calendar__reload-today"
          id="calendar__reload-today"
          onClick={() => {reloadInitialDate();}}
        >
          Today
        </button>
        <div className="calendar__month-year" id="calendar__month-year">
          <button onClick={() => {handleCountMonth("down");}}>
            <img src={leftCheveron} alt="left-pointing cheveron icon" />
          </button>
          <h1>{`${currMonth} ${currYear}`}</h1>
          <button onClick={() => {handleCountMonth("up");}}>
            <img src={rightCheveron} alt="right-pointing cheveron icon" />
          </button>
        </div>
        <button
        className="calendar__add-event-btn"
          id="calendar__add-event-btn"
          onClick={() => {handleModal();}}
        >
          +
        </button>
      </div>
      <div className="calendar__grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => {
          return React.createElement(
            "div",
            { className: "calendar__day-name", key: item },
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
              return createDay("calendar__day calendar__first-day calendar__today calendar__day-selected", index, normalizedIndex);
            } else {
              return createDay("calendar__day calendar__first-day", index, normalizedIndex);
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
              return createDay("calendar__day calendar__today calendar__day-selected", index, normalizedIndex);
            } else {
              return createDay("calendar__day", index, normalizedIndex);
            }
          } else {
            return createDay("calendar__day calendar__empty", index);
          }
        })}
      </div>
    </div>
  );
};

export default Calendar;
