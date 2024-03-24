export const daysOfWeekMapping = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

export const FIRST_KEY_DAY = 0;
export const LAST_KEY_DAY = 6;

export const formatScheduleArrayToString = (scheduleDescription: number[]) => {
  if (scheduleDescription.length === 0) return "";
  if (scheduleDescription.length === 1)
    return daysOfWeekMapping[scheduleDescription[0]];

  const uniqueDays = Array.from(new Set(scheduleDescription));
  sortDaysOfWeek(uniqueDays);
  const scheduleSize = uniqueDays.length;

  let finalString = "";

  for (let i = 0; i < scheduleSize; i++) {
    const dayNum = uniqueDays[i];
    const isLastDay = i === scheduleSize - 1;
    let separator = "";

    if (i > 0 && !isLastDay) separator = ", ";
    else if (isLastDay) separator = " e ";

    finalString += `${separator}${daysOfWeekMapping[dayNum]}`;
  }

  return finalString;
};

const sortDaysOfWeek = (daysOfWeek: number[]) =>
  daysOfWeek.sort((a, b) => a - b);

export const getInitialIndexByWeekDay = (option: number) => {
  const setSameIndexOptions = [0, 1, 5, 6]

  if(setSameIndexOptions.includes(option)) return option;

  return 3
}
