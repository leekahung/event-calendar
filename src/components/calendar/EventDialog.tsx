import React, { useContext, useState } from "react";
import { AddEventContext, AddEventContextType } from "../../App";

interface Props {
  month: string;
  year: number;
  date: number;
}

const EventDialog = ({ month, year, date } : Props) => {
  const { addEvent } = useContext(AddEventContext) as AddEventContextType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const resetForm = () => {
    setTitle("");
    setDescription("");
  }
  const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;

  const handleSubmit = () => {
    addEvent(title, `${month} ${date}, ${year}`, description);
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = false;
    resetForm();
  }

  const handleClose = () => {
    dialogBox.open = false;
    dialogBox.close();
    resetForm(); 
  }

  const handleButtonClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClose();
  }

  return (
    <>
      <form
        method="dialog"
        id="dialog-content"
        onSubmit={handleSubmit}
      >
        <label>Add Event for {month} {date}, {year}?</label>
        <label>Event Title:</label>
        <input
          type="text"
          required
          placeholder="Add Event Name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Event Description:</label>
        <textarea
          placeholder = "Add Event Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        >
        </textarea>
        <div className="btn-grp">
          <button type="submit">Yes</button> 
          <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleButtonClose(event)}>No</button>
        </div>
      </form>
    </>
  );
}
 
export default EventDialog;