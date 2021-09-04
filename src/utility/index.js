export function getFormatedDate(dateString) {
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

  return `${dateObject.getDate()} ${
    months[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`; //`${dateObject.getDate()} ${dateObject.toLocaleString('default', { month: 'long' })} ${dateObject.getFullYear()}`
}

export const getDate = dateString => {
  let dateParams = dateString.split(/[\s-:]/);
  dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString();
  return new Date(...dateParams);
};

export function currencyFormatter(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function toTitleCase(string) {
  return string.replace(/\b(\S)/g, function (t) {
    return t.toUpperCase();
  });
}
