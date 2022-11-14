import React, { useContext } from "react";
import { SelectDayContext, SelectDayContextType } from "../../App";

interface Props {
  month: string;
  dateValue: number;
  year: number;
  removeSelected: (day: HTMLDivElement) => void;
}

const SelectDayButton = ({ month, dateValue, year, removeSelected }: Props) => {
  const { selectedDate, events } = useContext(SelectDayContext) as SelectDayContextType;
  const handleSelectDay = (event: React.MouseEvent<HTMLButtonElement>) => {
    const calendarDays = document.querySelectorAll<HTMLDivElement>(".calendar__day");
    calendarDays.forEach((day) => removeSelected(day));

    const target = event.target as HTMLElement;
    if (target.nodeName === "BUTTON") {
      const parent = target.parentElement as HTMLDivElement;
      parent.classList.add("calendar__day-selected");
    } else {
      const container = target.closest(".calendar__day") as HTMLDivElement;
      container.classList.add("calendar__day-selected");
    }

    selectedDate(month, dateValue, year);
  };

  const groupCurrMonthEvents: [string, number][] = Object.entries(events
    .filter(event => event.date.split(", ")[0].split(" ")[0] === month)
    .reduce((results: any, events) => {
      const dateClass = events.date.replaceAll(", ", "-").replace(" ", "-");
      results[dateClass] = results[dateClass] || [];
      results[dateClass]++;
      return results;
    }, Object.create(null)));

  const fillEventCounter = (dateClass: string) => {
    const mediaQuery = window.matchMedia("(max-width: 400px)");

    if (mediaQuery.matches) {
      for (let i = 0; i < (groupCurrMonthEvents.length); i++) {
        if (groupCurrMonthEvents[i][0] === dateClass) {
          return (groupCurrMonthEvents[i][1] === 1) 
            ? (<div>{groupCurrMonthEvents[i][1]} Event</div>)
            : (<div>{groupCurrMonthEvents[i][1]} Events</div>);
        }
      }
    } else {
      for (let i = 0; i < (groupCurrMonthEvents.length); i++) {
        if (groupCurrMonthEvents[i][0] === dateClass) {
          return (groupCurrMonthEvents[i][1] === 1) 
            ? (<div>{groupCurrMonthEvents[i][1]} Event</div>)
            : (<div>{groupCurrMonthEvents[i][1]} Events</div>);
        }
      }
    }
  }

  return (
    <>
      <button className="calendar__day-select-btn" onClick={handleSelectDay}>
        <p>{dateValue}</p>
        <div className={`${month}-${dateValue}-${year}`}>
          {fillEventCounter(`${month}-${dateValue}-${year}`)}
        </div>
      </button>
    </>
  );
};

export default SelectDayButton;
