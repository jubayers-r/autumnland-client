/**
 * Lightweight type-safe native fetch client for Next.js 16
 * Compatible with Server Components, Client Components, and TanStack Query.
 */

import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function fetcher<T>(url: string, options: FetcherOptions = {}): Promise<T> {
  const { params, headers, ...init } = options;
  const baseUrl = env.NEXT_PUBLIC_API_URL;

  let finalUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      finalUrl += (finalUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(finalUrl, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.message || `Request to ${url} failed with status ${response.status}`;
    throw new ApiError(response.status, message, errorBody);
  }

  // Handle empty responses (e.g. 204 No Content)
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}
