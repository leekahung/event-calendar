interface Props {
  events: Events[];
  selectedEventId: string;
}

const SelectedEvent = ({ events, selectedEventId }: Props) => {
  const selectedEvent = events[Number(selectedEventId)];

  return (
    <>
      <div className="events-modal">
        <div className="events-modal__contents">
          <div>Date: {selectedEvent.date}</div>
          <div>Title: {selectedEvent.title}</div>
          <div>Description: {selectedEvent.description}</div> 
        </div>
      </div>
    </>
  );
}
 
export default SelectedEvent;