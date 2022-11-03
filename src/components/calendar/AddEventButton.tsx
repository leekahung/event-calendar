import React from "react";

interface Props {
  dateValue: number,
  handleDaySelect: any
}

const AddEventButton = ({ dateValue, handleDaySelect }: Props) => {
  const handleButtonOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = true;
    handleDaySelect(event, Number(event.currentTarget.id));
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
