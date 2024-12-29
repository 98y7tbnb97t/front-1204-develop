import { format } from 'date-fns';

export function getDatesArray(startDate: string, endDate: string) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(format(new Date(currentDate), 'MM/dd'));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}
