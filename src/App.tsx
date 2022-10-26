import React from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";

function App() {
  const today = new Date();

  return (
    <div className="App">
      <div className="navbar">
      </div>
      <Calendar date={today}/>
    </div>
  );
}

export default App;
