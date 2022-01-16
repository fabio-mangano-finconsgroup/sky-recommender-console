import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Europe/Rome';
const pattern = 'd.M.yyyy HH:mm';

export function isExpired(date) {
  try {
    const now = new Date();
    const zoned = utcToZonedTime(date, timeZone);
    return now >= zoned;
  } catch (error) {}
}

export function formatToHumanReadable(date) {
  const zonedDate = utcToZonedTime(date, timeZone);
  const formatted = format(zonedDate, pattern, { timeZone });
  return formatted;
}

export function resetSecondsToZero(date) {
  let resetSeconds = new Date(date);
  return new Date(resetSeconds.setSeconds(0));
}

export function nowIsBetweenTwoDates(startDate, endDate) {
  try {
    const now = new Date();
    const startDateTime = utcToZonedTime(startDate, timeZone);
    const endDateTime = utcToZonedTime(endDate, timeZone);
    return now >= startDateTime && now < endDateTime;
  } catch (error) {}
}
