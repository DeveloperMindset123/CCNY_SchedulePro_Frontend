/**
 * @see https://github.com/dcastil/tailwind-merge
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // ** overrides css that may otherwise mess up styling, refer to the github repository link to better understand
  return twMerge(clsx(inputs));
}
