import { useState } from "react";

const useEvents = () => {
  // useState hook for creating/storing events from event modal
  const [events, setEvents] = useState<Events[]>([
    {
      id: "0",
      date: "November 2, 2022",
      title: "Test Event 1",
      description: "Some Description",
    },
    {
      id: "1",
      date: "November 2, 2022",
      title: "Test Event 2",
      description: "Some Description",
    },
    {
      id: "2",
      date: "November 3, 2022",
      title: "Test Event 3",
      description: "Some Description",
    },
    {
      id: "3",
      date: "November 14, 2022",
      title: "Test Event 4",
      description: "Some Description",
    },
    {
      id: "4",
      date: "December 10, 2022",
      title: "Test Event 5",
      description: "Some Description",
    },
  ]);

  const addNewEvent = (
    date: string,
    title: string,
    description: string
  ) => {
    let id: number;
    if (events.length === 0) {
      id = 0;
    } else {
      id = Number(events[events.length - 1].id) + 1; 
    }

    setEvents([
      ...events,
      {
        id: String(id),
        date: date,
        title: title,
        description: description,
      },
    ]);
  };

  const editEvent = (
    id: string,
    title: string,
    description: string
  ) => {
    events[Number(id)]["title"] = title;
    events[Number(id)]["description"] = description;
    setEvents(events);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return {
    events,
    updateEventFunction: {
      addNewEvent,
      editEvent,
      deleteEvent,
    },
  };
};

export default useEvents;
