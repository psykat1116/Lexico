import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteURL(url: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${url}`
}