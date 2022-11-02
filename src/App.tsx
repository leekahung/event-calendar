import React from "react";
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

  const today = new Date();

  return (
    <div className="App">
      <Sidebar />
      <Calendar date={today}/>
    </div>
  );
}

export default App;
