import { createContext, useState } from "react";
import "./App.scss";
import Calendar from "./components/calendar/Calendar";
import AddNewEvent from "./components/events/AddNewEvent";
import Events from "./components/events/Events";
import SelectedEvent from "./components/events/SelectedEvent";
import EditSelectedEvent from "./components/events/EditSelectedEvent";
import useSelectDate from "./utils/hooks/useSelectDate";
import useModalToggle from "./utils/hooks/useModalToggle";
import useEvents from "./utils/hooks/useEvents";

// Adjust App to fit client height
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// useContext hook for Selecting Specific Dates
export const SelectDayContext = createContext<SelectDayContextType>(
  {} as SelectDayContextType
);

function App() {
  const month: string[] = [
    "January", "Feburary", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const today = new Date();

  // Initialize date values for custom useSelectedDate hook
  const initMonth = month[today.getMonth()];
  const initDay = today.getDate();
  const initYear = today.getFullYear();

  const initDate = { initMonth, initDay, initYear };

  const { selectedDateObj, selectedDate } = useSelectDate(initDate);

  // Get states and set functions from custom useModalToggle hook
  const { modalState, modalDispatch } = useModalToggle();

  // Custom hook for creating/storing events from event modals
  const { events, updateEventFunction } = useEvents();
  console.log(events);

  // useState hook for selecting events from events
  const [selectedEventId, setSelectedEventId] = useState("0");

  const selectEventId = (
    id: string
  ) => {
    setSelectedEventId(id);
  }
  console.log(selectedEventId);

  window.addEventListener("click", (event) => {
    if (modalState.showModal) {
      const addEventsModal = document.querySelector(".add-events") as HTMLDivElement;
      if (event.target === addEventsModal) {
        modalDispatch.toggleModal();
      }
    }

    if (modalState.showEventModal) {
      const eventsModal = document.querySelector(".events-modal") as HTMLDivElement;
      if (event.target === eventsModal) {
        modalDispatch.toggleEventModal();
      }
    }
  });

  return (
    <div className="App">
      <SelectDayContext.Provider value={{ selectedDate, selectedDateObj, events }}>
        <Calendar
          month={month}
          date={today}
          toggleModal={modalDispatch.toggleModal}
        />
        <Events
          toggleEventModal={modalDispatch.toggleEventModal}
          selectEventId={selectEventId}
        />
        {
          modalState.showEventModal &&
          (
            <SelectedEvent
              selectedEventId={selectedEventId}
              toggleEventModal={modalDispatch.toggleEventModal}
              toggleEventEditModal={modalDispatch.toggleEventEditModal}
              deleteEvent={updateEventFunction.deleteEvent}
            />
          )
        }
        {
          modalState.showEventEditModal &&
          (
            <EditSelectedEvent
              toggleEventEditModal={modalDispatch.toggleEventEditModal}
              selectedEventId={selectedEventId}
              editEvent={updateEventFunction.editEvent}
            />
          )
        }
        { modalState.showModal &&
          (
            <AddNewEvent
              toggleModal={modalDispatch.toggleModal}
              addNewEvent={updateEventFunction.addNewEvent}
            />
          )
        }
      </SelectDayContext.Provider>
    </div>
  );
}

export default App;
