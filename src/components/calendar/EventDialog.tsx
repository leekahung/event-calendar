import React, { useEffect, useState } from "react";

interface Props {
  month: string,
  year: number,
  date: number,
  addEvent: any;
}

const EventDialog = ({ month, year, date, addEvent } : Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    addEvent(title, description);
  }

  const handleButtonClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = false;
  }

  return (
    <>
      <form method="dialog" id="dialog-content" onSubmit={handleSubmit}>
        <label>Add Event for {month} {date}, {year}?</label>
        <label>Event Title:</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Event Description:</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        >
        </textarea>
        <div className="btn-grp">
          <button type="submit">Yes</button> 
          <button onClick={handleButtonClose}>No</button>
        </div>
      </form>
    </>
  );
}
 
export default EventDialog;