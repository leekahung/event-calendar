import React, { useContext } from "react";
import { SelectDayContext, SelectDayContextType } from "../../App";

interface Props {
  month: string;
  day: number;
  year: number;
  toggleEventModal: () => void;
  selectEventId: (
    id: string
  ) => void;
}

const Events = ({ month, day, year, toggleEventModal, selectEventId }: Props) => {
  const { events } = useContext(SelectDayContext) as SelectDayContextType;

  // Handle function for displaying modal for specific event
  const handleClick = (event: React.MouseEvent) => {
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
            {month} {day}, {year}
          </div>
          <div className="events__today-list">
            {[...events]
              .filter(event => event.date === `${month} ${day}, ${year}`)
              .map(filteredEvent => {
              return (
                <button
                  key={filteredEvent.id}
                  id={filteredEvent.id}
                  onClick={(event) => {handleClick(event);}}
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