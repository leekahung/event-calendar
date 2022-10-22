import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="navbar">
      </div>
      <div className="calendar-ctnr">
        <h1>Month</h1>
        <div className="calendar-grid">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursaday", "Friday", "Saturday"].map((item) => {
            return (item === "Sunday" || item === "Saturday")
              ? (React.createElement("div", { className: "day-name weekend"}, item))
              : (React.createElement("div", { className: "day-name"}, item))
          })}
          {[...Array(35)].map((item, index) => {
            return ((index + 1) % 7 === 1 || (index + 1) % 7 === 0)
              ? (React.createElement("div", { className: "day first-col"}))
              : (React.createElement("div", { className: "day"}))
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
