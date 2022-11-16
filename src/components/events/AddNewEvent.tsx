import { useContext, useRef } from "react";
import { SelectDayContext } from "../../App";
import closeIcon from "../../assets/img/close.png";

interface Props {
  toggleModal: () => void;
  addNewEvent: (
    date: string,
    title: string,
    description: string,
  ) => void;
}

const AddNewEvent = ({ toggleModal, addNewEvent }: Props) => {
  const { selectedDateObj } = useContext(SelectDayContext) as SelectDayContextType;

  const { selectedMonth, selectedDay, selectedYear } = selectedDateObj;
  const date = `${selectedMonth} ${selectedDay}, ${selectedYear}`;

  // useRef hook to set initial value for event title and description
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Handle function for form submission or form closing
  const handleSubmit = () => {
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
      <div className="events-modal">
        <div className="events-modal__ctnr">
          <button 
            className="events-modal__exit-btn"
            onClick={() => {handleClose();}}
          >
            <img src={closeIcon} alt="close icon" />
          </button>
          <form
            id="events-form"
            className="events-modal__form"
            onSubmit={
              (event) => {
                event.preventDefault();
                handleSubmit();
              }
            }
          >
            <div>
              <label>Add Event?</label>
            </div>
            <div>
              <label>Date: {date}</label>
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                required
                name="title"
                placeholder="Add Event Title"
                ref={titleRef}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
              name="description"
              placeholder="Add Event Description"
              ref={descRef}
              />
            </div>
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