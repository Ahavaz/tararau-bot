import { ConfigType, Dayjs } from 'dayjs';

import dayjs from '../config/dayjs';

type Time = {
  hour: number;
  minute: number;
};

export const parseTime = (time: string): Time => {
  const timeArray = time.split(':').map((num) => parseInt(num, 10));

  const [hour, minute] = timeArray;

  if (!(hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59)) {
    throw Error('Invalid time');
  }

  return { hour, minute };
};

export const setTime = (date: Dayjs, hour: number, minute: number): Dayjs => {
  const dateTime = date.hour(hour).minute(minute).second(0);

  return dateTime;
};

export const isFutureDateTime = (dateTime: Dayjs): boolean => {
  return dateTime.isValid() && dayjs().isSameOrBefore(dateTime);
};

export const isValidTime = (time: string, date: Dayjs): boolean => {
  try {
    const { hour, minute } = parseTime(time);

    const dateTime = setTime(date, hour, minute);

    const isValid = isFutureDateTime(dateTime);

    return isValid;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const isValidDate = (date: ConfigType): boolean =>
  dayjs(date, 'L', true).isValid();

export const isFutureDate = (date: ConfigType): boolean => {
  const isValid = isValidDate(date);

  if (!isValid) {
    return isValid;
  }

  const isFuture = dayjs().isSameOrBefore(dayjs(date, 'L', true), 'day');

  return isFuture;
};
