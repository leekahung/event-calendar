import React, { useState } from "react";
import menuIcon from "../../assets/img/menu.png"

const Sidebar = () => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    let sidebarWidth: string = "20%";

    if (mediaQuery.matches) {
      sidebarWidth = "60%";
    }

    if (toggled === false) {
      sidebar.style.width = sidebarWidth;
      sidebar.style.opacity = "1";
      setToggled(true);
    } else {
      sidebar.style.width = "0%";
      sidebar.style.opacity = "0";
      setToggled(false);
    }
  }

  return (
    <>
      <button id="menu-icon" onClick={handleClick}>
        <img src={menuIcon} alt="burger menu icon" />
      </button>
      <div id="sidebar">
        <div id="logged-events-ctnr">
          <button className="event-ctnr">Event 1</button>
          <button className="event-ctnr">Event 2</button>
          <button className="event-ctnr">Event 3</button>
          <button className="event-ctnr">Event 4</button>
        </div>
      </div>
    </>
  );
}
 
export default Sidebar;