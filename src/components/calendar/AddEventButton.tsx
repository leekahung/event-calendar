import React from "react";

interface Props {
  dateValue: number;
  handleDaySelect: (day: number) => void;
}

const AddEventButton = ({ dateValue, handleDaySelect }: Props) => {
  const handleButtonOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const daySelected = Number(event.currentTarget.id);
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = true;
    handleDaySelect(daySelected);
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
