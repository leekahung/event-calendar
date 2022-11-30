import React, { useContext } from "react";
import { SelectDayContext } from "../../App";
import { groupCurrMonthEvents } from "../../utils/helper/helpPopulate";

interface Props {
  month: string;
  dateValue: number;
  year: number;
  removeSelected: (day: HTMLDivElement) => void;
}

const SelectDayButton = ({ month, dateValue, year, removeSelected }: Props) => {
  const { selectedDate, events } = useContext(SelectDayContext) as SelectDayContextType;
  
  // Handle function for day selection
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

  // Helper function to filter events to month shown
  const currMonthEvents = groupCurrMonthEvents(events, month);

  // Helper function to display number of events on days with events
  const fillEventCounter = (dateClass: string) => {
    for (let i = 0; i < (currMonthEvents.length); i++) {
      if (currMonthEvents[i][0] === dateClass) {
        return (currMonthEvents[i][1] === 1) 
          ? (<div>{`${currMonthEvents[i][1]} Event`}</div>)
          : (<div>{`${currMonthEvents[i][1]} Events`}</div>);
      }
    }
  }

  return (
    <>
      <button className="calendar__day__select-btn" onClick={handleSelectDay}>
        <p>{dateValue}</p>
        <div className={`${month}-${dateValue}-${year}`}>
          {fillEventCounter(`${month}-${dateValue}-${year}`)}
        </div>
      </button>
    </>
  );
};

export default SelectDayButton;
