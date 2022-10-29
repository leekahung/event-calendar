import React, { useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import menuIcon from "./assets/img/menu.png"

function App() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  })

  const today = new Date();

  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    const menuBtn = document.getElementById("menu-icon") as HTMLButtonElement;

    menuBtn.addEventListener("click", () => {
      if (toggled === false) {
        setToggled(true);
      } else {
        setToggled(false);
      }
    })
  }

  return (
    <div className="App">
      <button id="menu-icon" onClick={handleClick}>
        <img src={menuIcon} alt="burger menu icon" />
      </button>
      <Calendar date={today}/>
    </div>
  );
}

export default App;
