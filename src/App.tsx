import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  })

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "New Event 1",
      date: "November 1, 2022",
      description: "Event 1 description"
    },
    {
      id: "2",
      title: "New Event 2",
      date: "November 2, 2022",
      description: "Event 2 description"
    }
  ]);

  const addEvent = (title: string, date: string, description: string) => {
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
      <Sidebar events={events} />
      <Calendar date={today} addEvent={addEvent}/>
    </div>
  );
}

export default App;
