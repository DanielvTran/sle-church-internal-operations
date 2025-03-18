import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  let hour = 8; // Start at 08:00
  let minute = 0;

  while (hour < 21 || (hour === 21 && minute === 0)) {
    // Stop at 21:00
    const formattedHour = hour.toString().padStart(2, "0"); // Ensure two-digit hour
    const formattedMinute = minute.toString().padStart(2, "0"); // Ensure two-digit minute
    times.push(`${formattedHour}:${formattedMinute}`);

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
};
