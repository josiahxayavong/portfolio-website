// import utility to conditionally join classNames
import { clsx, type ClassValue } from "clsx"

// import utility to intelligently merge tailwind classes
import { twMerge } from "tailwind-merge"

// combines multiple class values and merges conflicting tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
