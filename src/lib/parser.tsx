export function DateToDateText(date: Date) {
  return `${date.getDay} ${date.getMonth} ${date.getFullYear}`;
}
export function DateToDateTimeText(date: Date) {
  return `${date.getDay} ${date.getMonth} ${date.getFullYear}:${date.getHours} ${date.getMinutes}`;
}
