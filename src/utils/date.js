import { format, utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Europe/Rome';
const pattern = 'd.M.yyyy HH:mm';

/**
 * Check if date has Expired.
 * @param {String} date - The date as ISO String.
 * @returns {Boolean}
 */

export function isExpired(date) {
  try {
    const now = new Date();
    const zoned = utcToZonedTime(date, timeZone);
    return now >= zoned;
  } catch (error) {
    console.log(error);
  }
}

export function formatToHumanReadable(date) {
  try {
    const zonedDate = utcToZonedTime(date, timeZone);
    const formatted = format(zonedDate, pattern, { timeZone });
    return formatted;
  } catch (error) {
    console.log(error);
  }
}

export function resetSecondsToZero(date) {
  try {
    let resetSeconds = new Date(date);
    return new Date(resetSeconds.setSeconds(0));
  } catch (error) {
    console.log(error);
  }
}

export function nowIsBetweenTwoDates(startDate, endDate) {
  try {
    const now = new Date();
    const startDateTime = utcToZonedTime(startDate, timeZone);
    const endDateTime = utcToZonedTime(endDate, timeZone);
    return now >= startDateTime && now < endDateTime;
  } catch (error) {
    console.log(error);
  }
}
