import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ValueLabelPair = {
  value: string;
  label: string;
};

export function arrayToValuesString(arr: ValueLabelPair[]): string {
  return arr.map((pair) => pair.label).join(', ');
}

export function formatDateToMonthYear(dateString: string): string {
  // Create a Date object from the dateString
  const date = new Date(dateString);

  // Array of abbreviated month names
  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract the month and year from the Date object
  const month = monthAbbreviations[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Return the formatted string
  return `${month}, ${year}`;
}
