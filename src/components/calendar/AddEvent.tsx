const AddEvent = () => {
  const handleButtonClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventAdder = document.getElementById("event-adder") as HTMLDialogElement;
    eventAdder.style.visibility = "hidden";
  }

  return (
    <dialog id="event-adder">
      <button onClick={handleButtonClose}>Close</button>
    </dialog>
  );
}
 
export default AddEvent;