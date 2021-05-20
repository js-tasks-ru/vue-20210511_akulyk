export function mapMeetupToDates(meetups,items){
  items.forEach((item) => {
    item.items = [];
    meetups.forEach((meetup) => {
      const meetupDate = new Date(meetup.date);
      if (hasSameDate(meetupDate, item.date)) {
        item.items.push(meetup);
      }
    });
  });
  return [...items];
}

export function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day === 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

export function getNextMonth(date){
  return new Date(date.setMonth(date.getMonth() + 1));
}

export function getPrevMonth(date){
  return new Date(date.setMonth(date.getMonth() - 1));
}

export function hasSameDate(date1, date2) {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return false;
  }
  if (date1.getMonth() !== date2.getMonth()) {
    return false;
  }
  return date1.getDate() === date2.getDate();
}

export function buildMonthItems(currentDate){
  let items = [];
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  for (let i = 0; i < getDay(date); i++) {
    const yesterday = new Date(date.getTime());
    yesterday.setDate(yesterday.getDate() - i - 1);
    items.push({
      date: new Date(yesterday.getTime()),
      day: yesterday.getDate(),
      active: false,
      current: false,
    });
  }
  items = items.reverse();
  while (date.getMonth() === currentDate.getMonth()) {
    items.push({
      date: new Date(date.getTime()),
      day: date.getDate(),
      active: true,
      current: false,
    });
    date.setDate(date.getDate() + 1);
  }
  if(getDay(date) !== 0) {
    for (let i = getDay(date); i < 7; i++) {
      items.push({
        date: new Date(date.getTime()),
        day: date.getDate(),
        active: false,
        current: false,
      });
      date.setDate(date.getDate() + 1);
    }
  }
  return items.map((item)=>({
    ...item,
    current: hasSameDate(item.date,new Date()),
  }));
}

export function buildMonthMatrix(items){
  const matrix = [];
  for (let i = 0; i < items.length;) {
    let tmp = [];
    for (let j = 0; j < 7; j++) {
      tmp.push(items[i]);
      i++;
    }
    matrix.push(tmp);
    tmp = [];
  }
  return matrix;
}
