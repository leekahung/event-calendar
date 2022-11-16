const resetSelected = (day: HTMLDivElement) => {
  if (day.classList.contains("calendar__today")) {
    day.classList.add("calendar__day-selected");
  }
};

const removeSelected = (day: HTMLDivElement) => {
  if (day.classList.contains("calendar__day-selected")) {
    day.classList.remove("calendar__day-selected");
  }
};

export { resetSelected, removeSelected };