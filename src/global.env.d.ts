interface Events {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface SelectedDateObj {
  selectedMonth: string;
  selectedDay: number;
  selectedYear: number;
}

type SelectDayContextType = {
  selectedDate: (
    selectedMonth: string,
    selectedDay: number,
    selectedYear: number
  ) => void;
  selectedDateObj: SelectedDateObj;
  events: Events[];
};