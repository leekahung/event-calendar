import React, { useContext } from "react";
import { SelectDayContext } from "../../App";
import EventsList from "./EventsList";

interface Props {
  toggleEventModal: () => void;
  selectEventId: (
    id: string
  ) => void;
}

const Events = ({ toggleEventModal, selectEventId }: Props) => {
  const { selectedDateObj } = useContext(SelectDayContext) as SelectDayContextType;

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
          <EventsList handleSelect={handleSelect}/>
        </div>
      </div>
    </>
  );
}
 
export default Events;