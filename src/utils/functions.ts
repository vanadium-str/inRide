import { EventData } from '../interfaces/eventData';

export const phoneCodes = ['050', '051', '052', '053', '054', '055', '056', '058', '059'];
const months = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
];
const week = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת'];

export function matchPhoneCodes(phone: string) {
  for (let i = 0; i < phoneCodes.length; i++) {
    if (phone.startsWith(phoneCodes[i])) {
      return true;
    }
  }
  return false;
}

export function dateFormatting(date: string[], item: EventData) {
  const dateFormat = new Date(item.time_start);
  date.push(`${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`);
}

export function dateTorender(date: string) {
  const array = date.split('/');
  const dateFormat = new Date(+array[2], +array[1].toString(), +array[0]);
  const day = week[dateFormat.getDay()];
  return `${array[0]}/${+array[1] + 1} ${day}'`;
}

export function timeToRender(date: string) {
  const dateFormat = new Date(date);
  let minutes;
  if (dateFormat.getMinutes() < 10) {
    minutes = '0' + dateFormat.getMinutes();
  } else {
    minutes = dateFormat.getMinutes();
  }
  return `${dateFormat.getHours()}:${minutes}`;
}

const url = 'https://www.waze.com/ru/live-map/directions?to=ll.';
export function createLink(coordinates: string) {
  const array = coordinates.split(', ');
  return url + array[0] + '%2C' + array[1];
}

export function joinSuccessDate(date: string) {
  const dateFormat = new Date(date);
  const time = timeToRender(date);
  const day = `${week[dateFormat.getDay()]}'`;
  const month = months[dateFormat.getMonth()];
  return `${day} ${dateFormat.getDate()} ל${month} ${time}`;
}

export function createDate(date: string, time: string) {
  const timeArray = time.split(':');
  const newDate = new Date(date);
  newDate.setHours(+timeArray[0]);
  newDate.setMinutes(+timeArray[1]);
  return newDate;
}
