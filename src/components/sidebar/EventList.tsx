import React, { useContext } from "react";
import { EventContext } from "../../App";

const EventList = () => {
  const events = useContext(EventContext);

  return (
    <>
      {events.map((event) => (
        <button className="event-ctnr" key={event.id}>
          <div className="event-title">
            {event.title}
          </div>
          <div className="event-date">
            {event.date}
          </div>
          <div className="event-desc">
            {event.description}
          </div>
        </button>
      ))}
    </>
  );
}
 
export default EventList;