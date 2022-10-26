interface Props {
  dateValue: number,
}

const AddEventButton = ({ dateValue }: Props) => {
  const handleButtonOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventAdder = document.getElementById("event-adder") as HTMLDialogElement;
    eventAdder.style.visibility = "visible";
  }

  return (
    <button onClick={handleButtonOpen} id={String(dateValue)} >
      {dateValue}
    </button>
  );
}
 
export default AddEventButton;