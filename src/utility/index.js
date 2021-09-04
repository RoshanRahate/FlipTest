/**
 * Format date string date "YYYY-MM-DD HH:MM:SS" to "d MMM YYYY" format
 * @param {*} dateString
 * @returns date string
 */
export const getFormattedDate = dateString => {
  //  date format "YYYY-MM-DD HH:MM:SS"
  let dateParams = dateString.split(/[\s-:]/);
  dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
  const dateObject = new Date(...dateParams);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  //`${dateObject.getDate()} ${dateObject.toLocaleString('default', { month: 'long' })} ${dateObject.getFullYear()}`
  return `${dateObject.getDate()} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`;
};

/**
 * Convert date string to Date object
 * @param {*} dateString
 * @returns return Date()
 */
export const getDate = dateString => {
  let dateParams = dateString.split(/[\s-:]/);
  dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
  return new Date(...dateParams);
};

/**
 * Format the number value to add . by thousand separator
 * @param {*} value
 * @returns returns formatted string
 */
export const currencyFormatter = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Convert string to title case
 * @param {*} string
 * @returns string
 */
export const toTitleCase = string => {
  return string.replace(/\b(\S)/g, text => {
    return text.toUpperCase();
  });
};
