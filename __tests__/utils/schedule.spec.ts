import { formatScheduleArrayToString } from "../../src/utils/schedule";

describe('formatScheduleArrayToString', () => {
  it('should return an empty string if the schedule description is empty', () => {
    const scheduleDescription: number[] = [];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('');
  });

  it('should return the day of the week if the schedule description has only one day', () => {
    const scheduleDescription: number[] = [1];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('Segunda');
  });

  it('should return a comma-separated string for multiple days of the week', () => {
    const scheduleDescription: number[] = [1, 3, 5];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('Segunda, Quarta e Sexta');
  });

  it('should return a string with "e" separator for the last two days of the week', () => {
    const scheduleDescription: number[] = [2, 4];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('Terça e Quinta');
  });

  it('should handle duplicate days in the schedule description', () => {
    const scheduleDescription: number[] = [1, 1, 2, 3, 3, 3];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('Segunda, Terça e Quarta');
  });

  it('should return sortered days', () => {
    const scheduleDescription: number[] = [3, 1, 5];
    const result = formatScheduleArrayToString(scheduleDescription);
    expect(result).toEqual('Segunda, Quarta e Sexta');
  });
});