import React, { createContext, useEffect, useState } from "react";
import "./App.scss";
import Calendar from "./components/calendar/Calendar";
import AddNewEvent from "./components/events/AddNewEvent";
import Events from "./components/events/Events";
import SelectedEvent from "./components/events/SelectedEvent";

// useContext hook for Selecting Specific Dates
export type SelectDayContextType = {
  selectedDate: (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => void;
  events: Events[];
};

export const SelectDayContext = createContext<SelectDayContextType>(
  {} as SelectDayContextType
);

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const month: string[] = [
    "January", "Feburary", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const today = new Date();

  // useState hook for selecting dates
  const [selectedMonth, setSelectedMonth] = useState(month[today.getMonth()]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const selectedDate = (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => {
    setSelectedMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setSelectedYear(selectedYear);
  };

  // useState hook for toggling add event modal
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const toggleEventModal = () => {
    setShowEventModal(!showEventModal);
  }

  // useState hook for creating/storing events from event modal
  const [events, setEvents] = useState<Events[]>([]);

  const addNewEvent = (
    date: string,
    title: string,
    description: string
  ) => {
    setEvents([...events, {
      id: String(events.length),
      date: date,
      title: title,
      description: description
    }])
  };

  // useState hook for selecting events from events
  const [selectedEventId, setSelectedEventId] = useState("0");

  const selectEventId = (
    id: string
  ) => {
    setSelectedEventId(id);
  }

  window.addEventListener("click", (event) => {
    if (showModal) {
      const addEventsModal = document.querySelector(".add-events") as HTMLDivElement;
      if (event.target === addEventsModal) {
        toggleModal();
      }
    }

    if (showEventModal) {
      const eventsModal = document.querySelector(".events-modal") as HTMLDivElement;
      if (event.target === eventsModal) {
        toggleEventModal();
      }
    }
  });

  return (
    <div className="App">
      <SelectDayContext.Provider value={{ selectedDate, events }}>
        <Calendar
          date={today}
          month={month}
          toggleModal={toggleModal}
        />
      </SelectDayContext.Provider>
      <Events
        month={selectedMonth}
        day={selectedDay}
        year={selectedYear}
        events={events}
        toggleEventModal={toggleEventModal}
        selectEventId={selectEventId}
      />
      {
        showEventModal &&
        (
          <SelectedEvent
            events={events}
            selectedEventId={selectedEventId}
          />
        )
      }
      { showModal &&
        (
          <SelectDayContext.Provider value={{ selectedDate, events }}>
            <AddNewEvent 
              month={selectedMonth}
              day={selectedDay}
              year={selectedYear}
              toggleModal={toggleModal}
              addNewEvent={addNewEvent}
            />
          </SelectDayContext.Provider>
        )
      }
    </div>
  );
}

export default App;
