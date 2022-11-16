import { useContext, useRef } from "react";
import closeIcon from "../../assets/img/close.png";
import { SelectDayContext } from "../../App";

interface Props {
  toggleEventEditModal: () => void;
  selectedEventId: string;
  editEvent: (
    id: string,
    title: string,
    description: string,
  ) => void;
}

const EditSelectedEvent = ({ toggleEventEditModal, selectedEventId, editEvent }: Props) => {
  const { events } = useContext(SelectDayContext) as SelectDayContextType;

  // useContext hook to select specific event from events list
  const selectedEvent = events[Number(selectedEventId)];

  // useRef hook to set initial value for event title and description
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    let title = titleRef.current?.value as string;
    let description = descRef.current?.value as string;

    if (title === "") {
      title = selectedEvent.title;
    }

    editEvent(selectedEventId, title, description);
    handleClose();
  };

  const handleClose = () => {
    toggleEventEditModal();
  };

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
              className="events-modal__form"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div>Edit Event?</div>
              <div>
                <label>Date: {selectedEvent.date}</label> 
              </div>
              <div>
                <label>Title:</label>
                <input 
                  type="text"
                  required
                  defaultValue={selectedEvent.title}
                  ref={titleRef}
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  defaultValue={selectedEvent.description}
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
 
export default EditSelectedEvent;