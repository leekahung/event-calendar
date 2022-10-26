import React from "react";

interface Props {
  dateValue: number
}

const AddEventButton = ({ dateValue }: Props) => {
  const handleButtonOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = true;
  }

  return (
    <>
      <button onClick={handleButtonOpen} id={String(dateValue)}>
        {dateValue}
      </button>
    </>
  );
}
 
export default AddEventButton;