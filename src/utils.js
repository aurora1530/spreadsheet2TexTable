//@ts-check

/**
 * Use this as, for some reason, instanceof Date does not work correctly in the library ahead.
 * @param {any} value
 * @returns {boolean} Whether the value is a Date object
 */
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * Converts a date to a specified format.
 * If date is not a Date object, returns undefined.
 * If timezone or format has invalid values, defaults are used for formatting.
 * @param {Date} date - The date to format
 * @param {String} [timezone="GMT"] - The timezone
 * @param {String} [format="yyyy-MM-dd"] - The format
 * @returns {String | undefined} - The formatted date string
 */
function formatDate(date, timezone = 'GMT', format = 'yyyy-MM-dd') {
  if (!isDate(date)) return undefined;
  let formattedDate = '';
  try {
    formattedDate = Utilities.formatDate(date, timezone, format);
  } catch (e) {
    // If timezone or format is invalid, defaults are used for formatting.
    formattedDate = Utilities.formatDate(date, 'GMT', 'yyyy-MM-dd');
  }
  return formattedDate;
}
