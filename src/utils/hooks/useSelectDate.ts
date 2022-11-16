import { useState } from "react";

interface DateInput {
  initMonth: string;
  initDay: number;
  initYear: number;
}

function useSelectDate({ initMonth, initDay, initYear }: DateInput) {
  const [selectedMonth, setSelectedMonth] = useState(initMonth);
  const [selectedDay, setSelectedDay] = useState(initDay);
  const [selectedYear, setSelectedYear] = useState(initYear);

  const selectedDate = (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => {
    setSelectedMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setSelectedYear(selectedYear);
  };

  return {
    selectedDateObj: {
      selectedMonth,
      selectedDay,
      selectedYear,
    },
    selectedDate,
  };
}

export default useSelectDate;
