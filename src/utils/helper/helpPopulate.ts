const daysInMonth = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex, 0).getDate();
};

const getFirstDayIndex = (year: number, monthIndex: number) => {
  let dayIndex = new Date(year, monthIndex, 0).getDay() + 1;
  return dayIndex === 7 ? 0 : dayIndex;
};

export { daysInMonth, getFirstDayIndex };