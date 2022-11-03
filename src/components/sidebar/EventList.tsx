import React from "react";

interface Props {
  events: Events[]
}

const EventList = ({ events }: Props) => {
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