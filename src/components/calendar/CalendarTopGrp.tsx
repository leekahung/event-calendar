import leftChevron from "../../assets/img/left-chevron.png"
import rightChevron from "../../assets/img/right-chevron.png"

interface Props {
  month: string,
  year: number,
  reloadInitialDate: () => void;
  handleModal: () => void;
  handleCountMonth: (
    direction: string
  ) => void;
}

const CalendarTopGrp = ({ month, year, reloadInitialDate, handleModal, handleCountMonth }: Props) => {
  return (
    <>
      <div className="calendar__date-ctnr">
        <button
          className="calendar__date-ctnr__reload-today"
          id="calendar__date-ctnr__reload-today"
          onClick={() => {
            reloadInitialDate();
          }}
        >
          Today
        </button>
        <div className="calendar__month-year" id="calendar__month-year">
          <button
            onClick={() => {
              handleCountMonth("down");
            }}
          >
            <img src={leftChevron} alt="left-pointing cheveron icon" />
          </button>
          <h1>{`${month} ${year}`}</h1>
          <button
            onClick={() => {
              handleCountMonth("up");
            }}
          >
            <img src={rightChevron} alt="right-pointing cheveron icon" />
          </button>
        </div>
        <button
          className="calendar__date-ctnr__add-event-btn"
          id="calendar__date-ctnr__add-event-btn"
          onClick={() => {
            handleModal();
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CalendarTopGrp;
