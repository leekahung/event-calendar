import React from "react";

interface Props {
  date: Date;
  firstDayCurrMonth: number;
  currMonthIndex: number;
  currYear: number;
  daysInCurrMonth: number;
  createDay: (
    classNames: string,
    keyIndex: number,
    dateValue?: number
  ) => React.DetailedReactHTMLElement<{
    className: string;
    key: number;
  }, HTMLElement>;
}

const CalendarGrid = ({ date, firstDayCurrMonth, currMonthIndex, currYear, daysInCurrMonth, createDay }: Props) => {
  return (
    <div className="calendar__grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => {
        return React.createElement(
          "div",
          { className: "calendar__day-name", key: item },
          item
        );
      })}
      {[...Array(42)].map((_, index) => {
        const normalizedIndex = index - firstDayCurrMonth + 1;
        if (index === firstDayCurrMonth) {
          if (
            date.getFullYear() === currYear &&
            date.getMonth() === currMonthIndex &&
            date.getDate() === normalizedIndex
          ) {
            return createDay(
              "calendar__day calendar__first-day calendar__today calendar__day-selected",
              index,
              normalizedIndex
            );
          } else {
            return createDay(
              "calendar__day calendar__first-day",
              index,
              normalizedIndex
            );
          }
        } else if (
          firstDayCurrMonth < index &&
          index < firstDayCurrMonth + daysInCurrMonth
        ) {
          if (
            date.getFullYear() === currYear &&
            date.getMonth() === currMonthIndex &&
            date.getDate() === normalizedIndex
          ) {
            return createDay(
              "calendar__day calendar__today calendar__day-selected",
              index,
              normalizedIndex
            );
          } else {
            return createDay("calendar__day", index, normalizedIndex);
          }
        } else {
          return createDay("calendar__day calendar__empty", index);
        }
      })}
    </div>
  );
};

export default CalendarGrid;
