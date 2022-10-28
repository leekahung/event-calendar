import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import menuIcon from "./assets/img/menu.png"

function App() {
  const today = new Date();

  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    const menuBtn = document.getElementById("menu-icon") as HTMLButtonElement;
    const navBar = document.querySelector(".navbar") as HTMLElement;
    const calendarCtnr = document.querySelector(".calendar-ctnr") as HTMLDivElement;

    menuBtn.addEventListener("click", () => {
      if (toggled === false) {
        navBar.style.width = "0";
        calendarCtnr.style.width = "100%";
        setToggled(true);
      } else {
        navBar.style.width = "20%";
        calendarCtnr.style.width = "80%";
        setToggled(false);
      }
    })
  }

  return (
    <div className="App">
      <nav className="navbar">
        <button id="menu-icon" onClick={handleClick}>
          <img src={menuIcon} alt="burger menu icon" />
        </button>
      </nav>
      <Calendar date={today}/>
    </div>
  );
}

export default App;
