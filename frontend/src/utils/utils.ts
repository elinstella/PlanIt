import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Funktion för att slå ihop Tailwind-klasser utan konflikter
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
