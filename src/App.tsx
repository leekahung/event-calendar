import React, { createContext, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Sidebar from "./components/sidebar/Sidebar";

export type AddEventContextType = {
  addEvent: (
    title: string,
    date: string,
    description: string
  ) => void;
}

export const EventContext = createContext<Events[]>([]);
export const AddEventContext = createContext<AddEventContextType>({} as AddEventContextType);

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  })

  const [events, setEvents] = useState<Events[]>([
    {
      id: "0",
      title: "Test Event",
      date: "November 30, 2022",
      description: "This is a test"
    }
  ]);

  const addEvent = (
    title: string,
    date: string,
    description: string
  ) => {
    setEvents([...events, {
      id: String(events.length + 1),
      title: title,
      date: date,
      description: description
    }])
  };

  const today = new Date();

  return (
    <div className="App">
      <EventContext.Provider value={events}>
        <Sidebar />
      </EventContext.Provider>
      <AddEventContext.Provider value={{addEvent}}>
        <Calendar date={today} />
      </AddEventContext.Provider>
    </div>
  );
}

export default App;
