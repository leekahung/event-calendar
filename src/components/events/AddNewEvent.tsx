import React, { useRef } from "react";
import closeIcon from "../../assets/img/close.png";

interface Props {
  month: string;
  day: number;
  year: number;
  toggleModal: () => void;
  addNewEvent: (
    date: string,
    title: string,
    description: string,
  ) => void;
}

const AddNewEvent = ({ month, day, year, toggleModal, addNewEvent }: Props) => {
  // useRef hook to set initial value for event title and description
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  // Handle function for form submission or form closing
  const handleSubmit = () => {
    const date = `${month} ${day}, ${year}`;
    let title = titleRef.current?.value as string;
    let description = descRef.current?.value as string;

    addNewEvent(date, title, description);
    handleClose();
  }

  const handleClose = () => {
    toggleModal();
  }
  
  return (
    <>
      <div className="add-events">
        <div className="add-events__ctnr">
          <button 
            className="add-events__exit-btn"
            onClick={() => {handleClose();}}
          >
            <img src={closeIcon} alt="close icon" />
          </button>
          <form
            method="dialog"
            id="events-form"
            className="add-events__form"
            onSubmit={
              (event) => {
                event.preventDefault();
                handleSubmit();
              }
            }
          >
            <label>Add Event to {month} {day}, {year}?</label>
            <label>Event Title:</label>
            <input
              type="text"
              required
              placeholder="Add Event Title"
              ref={titleRef}
            />
            <label>Event Description:</label>
            <input
              placeholder="Add Event Description"
              ref={descRef}
            />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default AddNewEvent;