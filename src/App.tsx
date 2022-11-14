import React, { createContext, useState } from "react";
import "./App.scss";
import Calendar from "./components/calendar/Calendar";
import AddNewEvent from "./components/events/AddNewEvent";

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

  const toggleModal = () => {
    setShowModal(!showModal);
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

  window.addEventListener("click", (event) => {
    if (showModal) {
      const eventsModal = document.querySelector(".add-events") as HTMLDivElement;
      if (event.target === eventsModal) {
        toggleModal();
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
      <div className="events">
        <div className="events__today">
          <div className="events__today-header">
            {selectedMonth} {selectedDay}, {selectedYear}
          </div>
          <ul className="events__today-list">
            {[...events]
              .filter(event => event.date === `${selectedMonth} ${selectedDay}, ${selectedYear}`)
              .map(filteredEvent => {
              return (
                <li key={filteredEvent.id}>
                  {filteredEvent.title}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
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
