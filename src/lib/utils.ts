import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tcWrapper = <T>(
  fn: () => T | Promise<T>, // Supports both sync and async functions
  onError: (error: any) => void
): Promise<T | undefined> | T | undefined => {
  try {
    const result = fn(); // Call the function
    if (result instanceof Promise) {
      // Handle async functions
      return result.catch((error) => {
        onError(error);
        return undefined;
      });
    }
    // Handle sync functions
    return result;
  } catch (error) {
    // Catch synchronous errors
    onError(error);
    return undefined;
  }
};
