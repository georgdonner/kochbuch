export const addDays = (date, days) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

export const getWeekdays = (week) => {
  const weekday = new Date().getDay();
  const start = addDays(new Date(), -(weekday - 1) + (week * 7));
  return new Array(7).fill(0).map((_, i) => addDays(start, i));
};

export const getTimeStr = (date) => date.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });

const getDateStr = (date) => date.toJSON().split('T')[0];

export const getDayStr = (date) => {
  const compare = new Date();
  if (getDateStr(date) === getDateStr(compare)) {
    return 'Heute';
  }
  compare.setDate(compare.getDate() + 1);
  if (getDateStr(date) === getDateStr(compare)) {
    return 'Morgen';
  }
  return new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(date);
};
