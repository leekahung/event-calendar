import React, { useState } from "react";
import menuIcon from "../../assets/img/menu.png";
import data from "../../database.json";

const Sidebar = () => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const sidebar = document.getElementById("sidebar") as HTMLDivElement;
    const loggedEventsCtnr = document.getElementById("logged-events-ctnr") as HTMLDivElement;
    let sidebarWidth: string = "20%";

    if (mediaQuery.matches) {
      sidebarWidth = "60%";
    }

    if (toggled === false) {
      sidebar.style.width = sidebarWidth;
      sidebar.style.opacity = "1";
      loggedEventsCtnr.style.opacity = "1";
      setToggled(true);
    } else {
      sidebar.style.width = "0%";
      sidebar.style.opacity = "0";
      loggedEventsCtnr.style.opacity = "0";
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
          {data.events.map((event) => (
            <button className="event-ctnr" key={event.id}>
              <div className="event-date">
                {event.date}
              </div>
              <div className="event-title">
                {event.title}
              </div>
              <div className="event-desc">
                {event.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
 
export default Sidebar;