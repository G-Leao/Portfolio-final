import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function truncate(str, length = 100) {
  if (!str) return "";
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}
