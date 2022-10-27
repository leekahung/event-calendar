interface Props {
  month: string,
  year: number,
  date: number
}

const EventDialog = ({ month, year, date } : Props) => {
  const handleButtonClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialogBox = document.getElementById("dialog-box") as HTMLDialogElement;
    dialogBox.open = false;
  }
  
  return (
    <>
      <form method="dialog" id="dialog-content">
        <label>Add Event for {month} {date}, {year}?</label>
        <div className="btn-grp">
          <button value="" type="submit">Yes</button> 
          <button onClick={handleButtonClose}>No</button>
        </div>
      </form>
    </>
  );
}
 
export default EventDialog;