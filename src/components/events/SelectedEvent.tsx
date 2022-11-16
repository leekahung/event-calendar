import { useContext } from "react";
import closeIcon from "../../assets/img/close.png";
import { SelectDayContext } from "../../App";

interface Props {
  selectedEventId: string;
  toggleEventModal: () => void;
  toggleEventEditModal: () => void;
  deleteEvent: (
    id: string
  ) => void;
}

const SelectedEvent = ({ selectedEventId, toggleEventModal, toggleEventEditModal, deleteEvent }: Props) => {
  const { events } = useContext(SelectDayContext) as SelectDayContextType;

  // useContext hook to select specific event from events list
  const selectedEvent = events.filter((event) => event.id === selectedEventId)[0];

  const handleEdit = () => {
    toggleEventModal();
    toggleEventEditModal();
  };

  const handleDelete = () => {
    deleteEvent(selectedEventId);
    toggleEventModal();
  }

  const handleClose = () => {
    toggleEventModal();
  }

  return (selectedEvent) ? (
    <>
      <div className="events-modal">
        <div className="events-modal__ctnr">
          <button 
            className="events-modal__exit-btn"
            onClick={() => {handleClose();}}
          >
            <img src={closeIcon} alt="close icon" />
          </button>
          <div className="events-modal__content">
            <div>Event Info</div>
            <div>Date: {selectedEvent.date}</div>
            <div>Title: {selectedEvent.title}</div>
            <div>Description: {selectedEvent.description}</div>
            <div className="events-modal__btn-grp">
              <button
                className="events-modal__edit-btn"
                onClick={() => {handleEdit();}}
              >
                Edit
              </button>
              <button
                className="events-modal__del-btn"
                onClick={() => {handleDelete();}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <></>
}
 
export default SelectedEvent;