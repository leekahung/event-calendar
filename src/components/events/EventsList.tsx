import React, { useContext } from "react";
import { SelectDayContext } from "../../App";

interface Props {
  handleSelect: (
    event: React.MouseEvent
  ) => void;
}

const EventsList = ({ handleSelect }: Props) => {
  const { selectedDateObj, events } = useContext(SelectDayContext) as SelectDayContextType;

  const { selectedMonth, selectedDay, selectedYear } = selectedDateObj;

  return (
    <div className="events__today-list">
      {[...events]
        .filter(
          (event) =>
            event.date === `${selectedMonth} ${selectedDay}, ${selectedYear}`
        )
        .map((filteredEvent) => {
          return (
            <button
              key={filteredEvent.id}
              id={filteredEvent.id}
              onClick={(event) => {
                handleSelect(event);
              }}
            >
              {filteredEvent.title}
            </button>
          );
        })}
    </div>
  );
};

export default EventsList;
