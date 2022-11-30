const daysInMonth = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex, 0).getDate();
};

const getFirstDayIndex = (year: number, monthIndex: number) => {
  let dayIndex = new Date(year, monthIndex, 0).getDay() + 1;
  return dayIndex === 7 ? 0 : dayIndex;
};

const groupCurrMonthEvents = (
  events: Events[],
  month: string
): [string, number][] => {
  return Object.entries(
    events
      .filter((event) => event.date.split(", ")[0].split(" ")[0] === month)
      .reduce((results: any, events) => {
        const dateClass = events.date.replaceAll(", ", "-").replace(" ", "-");
        results[dateClass] = results[dateClass] || [];
        results[dateClass]++;
        return results;
      }, Object.create(null))
  );
};

export { daysInMonth, getFirstDayIndex, groupCurrMonthEvents };
