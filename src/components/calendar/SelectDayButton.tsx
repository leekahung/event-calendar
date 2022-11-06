import React, { useContext } from "react";
import { SelectDayContext, SelectDayContextType } from "../../App";

interface Props {
  dateValue: number;
  removeSelected: (day: HTMLDivElement) => void;
}

const SelectDayButton = ({ dateValue, removeSelected }: Props) => {  
  const { selectedDate } = useContext(SelectDayContext) as SelectDayContextType;
  const extractMonthYear = () => {
    const monthYear = document.querySelector("#month-year > h1") as HTMLDivElement;
    const monthYearString = String(monthYear.innerText).split(" ");
    
    return {
      month: monthYearString[0],
      year: monthYearString[1]
    }
  };

  const handleSelectDay = (event: React.MouseEvent<HTMLButtonElement>) => {
    const calendarDays = document.querySelectorAll<HTMLDivElement>(".day");
    calendarDays.forEach(day => removeSelected(day));

    const target = event.target as HTMLElement;
    if (target.nodeName === "BUTTON") {
      const parent = target.parentElement as HTMLDivElement;
      parent.classList.add("day-selected");
    } else {
      const container = target.closest(".day") as HTMLDivElement;
      container.classList.add("day-selected");
    }

    const { month, year } = extractMonthYear();

    selectedDate(month, dateValue, year);
  }

  return (
    <>
      <button onClick={handleSelectDay} id={String(dateValue)}>
        <p>{dateValue}</p>
      </button>
    </>
  );
}

export default SelectDayButton;
