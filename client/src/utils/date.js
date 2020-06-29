export const addDays = (date, days) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

export const getWeek = (date) => {
  const dateCopy = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  dateCopy.setDate(dateCopy.getDate() - dayNr + 3);
  const firstThursday = dateCopy.valueOf();
  dateCopy.setMonth(0, 1);
  if (dateCopy.getDay() !== 4) {
    // eslint-disable-next-line
    dateCopy.setMonth(0, 1 + ((4 - dateCopy.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - dateCopy) / 604800000);
};

export const getWeekdays = (week) => {
  // getDay starts with 0 on Sundays, however, we want 0 to be Monday
  const weekday = (new Date().getDay() || 7) - 1;
  const start = addDays(new Date(), -weekday + (week * 7));
  return new Array(7).fill(0).map((_, i) => addDays(start, i));
};

export const getTimeStr = (date) => date.toLocaleTimeString('de-DE', { hour: 'numeric', minute: 'numeric' });

export const getDateStr = (date) => date.toJSON().split('T')[0];

export const getDayStr = (date) => {
  const compare = new Date();
  if (getDateStr(date) === getDateStr(compare)) {
    return 'Heute';
  }
  compare.setDate(compare.getDate() + 1);
  if (getDateStr(date) === getDateStr(compare)) {
    return 'Morgen';
  }
  if (getWeek(date) === getWeek(new Date())) {
    return new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(date);
  }
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' }).format(date);
};
