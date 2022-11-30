import React, { useContext, useState } from "react";
import SelectDayButton from "./SelectDayButton";
import { SelectDayContext } from "../../App";
import { resetSelected, removeSelected } from "../../utils/helper/helpSelect";
import { daysInMonth, getFirstDayIndex } from "../../utils/helper/helpPopulate";
import CalendarTopGrp from "./CalendarTopGrp";
import CalendarGrid from "./CalendarGrid";

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
      <CalendarTopGrp
        month={currMonth}
        year={currYear} 
        reloadInitialDate={reloadInitialDate}
        handleModal={handleModal}
        handleCountMonth={handleCountMonth}
      />
      <CalendarGrid
        date={date}
        firstDayCurrMonth={firstDayCurrMonth}
        currMonthIndex={currMonthIndex}
        currYear={currYear}
        daysInCurrMonth={daysInCurrMonth}
        createDay={createDay}
      />
    </div>
  );
};

export default Calendar;
