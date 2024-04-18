export const LAST_KEY_DAY = 6;

export const daysOfWeekMapping = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

export const formatScheduleArrayToString = (scheduleDescription: number[]) => {
  const uniqueDays = getUniqueList(scheduleDescription);
  const uniqueDaysSorted = getSortedList(uniqueDays);

  const days = uniqueDaysSorted.map((day) => daysOfWeekMapping[day]);

  return new Intl.ListFormat("pt-br", {
    style: "long",
    type: "conjunction",
  }).format(days);
};

const getUniqueList = (list: number[]) => {
  return Array.from(new Set(list));
};

const getSortedList = (daysOfWeek: number[]) => {
  const daysCopy = [...daysOfWeek];
  return daysCopy.sort((a, b) => a - b);
};
