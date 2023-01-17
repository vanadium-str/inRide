import { EventData } from "../interfaces/eventData";

export const phoneCodes = ['050', '051', '052', '053', '054', '055', '056', '058', '059'];
const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט',
        'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const week = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת'];

export function matchPhoneCodes(phone: string) {
  for (let i = 0; i < phoneCodes.length; i++) {
    if (phone.startsWith(phoneCodes[i])) {
      return true;
    }
  }
  return false;
}

export function dateFormatting(date: string[], item: EventData){   
  let dateFormat = new Date(item.time_start);
  date.push(`${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`)
}

export function dateTorender(date: string){
  let array = date.split('/');
  let dateFormat = new Date(+array[2], +array[1].toString(), +array[0]);
  let day = week[dateFormat.getDay()];
  return `${array[0]}/${+array[1] + 1} ${day}'`;
}

export function timeToRender(date: string){
  let dateFormat = new Date(date);
  let minutes;
  if(dateFormat.getMinutes() < 10){
          minutes = '0' + dateFormat.getMinutes();
  }else{
          minutes = dateFormat.getMinutes();
  }
  return `${dateFormat.getHours()}:${minutes}`;
}

let url = 'https://www.waze.com/ru/live-map/directions?to=ll.';
export function createLink(coordinates: string){
    let array = coordinates.split(', ');
    return url + array[0] + '%2C' + array[1];
}