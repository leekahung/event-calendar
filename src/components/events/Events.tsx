import React, { useContext } from "react";
import { SelectDayContext } from "../../App";

interface Props {
  toggleEventModal: () => void;
  selectEventId: (
    id: string
  ) => void;
}

const Events = ({ toggleEventModal, selectEventId }: Props) => {
  const { selectedDateObj, events } = useContext(SelectDayContext) as SelectDayContextType;

  const { selectedMonth, selectedDay, selectedYear } = selectedDateObj;

  // Handle function for displaying modal for specific event
  const handleSelect = (event: React.MouseEvent) => {
    const eventBtn = event.target as HTMLButtonElement;
    const eventId = eventBtn.id;
    toggleEventModal();
    selectEventId(eventId);
  };

  return (
    <>
      <div className="events">
        <div className="events__today">
          <div className="events__today-header">
            {selectedMonth} {selectedDay}, {selectedYear}
          </div>
          <div className="events__today-list">
            {[...events]
              .filter(event => event.date === `${selectedMonth} ${selectedDay}, ${selectedYear}`)
              .map(filteredEvent => {
              return (
                <button
                  key={filteredEvent.id}
                  id={filteredEvent.id}
                  onClick={(event) => {handleSelect(event);}}
                >
                  {filteredEvent.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Events;