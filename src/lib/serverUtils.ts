"use server";
import axios from "axios";
import { cookies } from "next/headers";
export const getServerCookie = async (key: string, isObject?: boolean) => {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get(key)?.value;
  if (isObject) {
    return JSON.parse(cookie || "{}");
  }
  return cookie;
};
export const createServerAxiosInstance = async () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
      "Accept-Language": await getServerCookie("NEXT_LOCALE"),
    },
  });

  return instance;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cachedServerFetch<T = any>(
  url: string,
  options?: RequestInit & { revalidate?: number },
  method: "GET" | "POST" = "GET",
  body: object = {}
): Promise<T> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  const headers = new Headers(options?.headers);
  headers.set("Accept-Language", locale);
  headers.set("X-API-KEY", process.env.NEXT_PUBLIC_API_KEY || "");
  if (method === "POST") {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        ...options,
        headers,
        method: method,
        body: method === "POST" ? JSON.stringify(body) : undefined,
        next: {
          tags: [`api:${url}:${locale}:${JSON.stringify(body)}`],
          revalidate: 1,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error instanceof Error ? error : new Error("Request failed");
  }
}
