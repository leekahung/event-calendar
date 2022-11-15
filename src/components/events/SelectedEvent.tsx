import React, { useContext } from "react";
import { SelectDayContext, SelectDayContextType } from "../../App";

interface Props {
  selectedEventId: string;
}

const SelectedEvent = ({ selectedEventId }: Props) => {
  const { events } = useContext(SelectDayContext) as SelectDayContextType;

  // useContext hook to select specific event from events list
  const selectedEvent = events[Number(selectedEventId)];

  return (
    <>
      <div className="events-modal">
        <div className="events-modal__contents">
          <div>Date: {selectedEvent.date}</div>
          <div>Title: {selectedEvent.title}</div>
          <div>Description: {selectedEvent.description}</div> 
        </div>
      </div>
    </>
  );
}
 
export default SelectedEvent;