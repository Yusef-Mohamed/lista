import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { getCookie } from "cookies-next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createClientAxiosInstance = async () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
      "Accept-Language": await getCookie("NEXT_LOCALE"),
    },
  });

  return instance;
};
