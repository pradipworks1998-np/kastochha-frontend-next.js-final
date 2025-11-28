// api.ts
import { SearchResponse } from "../types";

export interface PerformSearchParams {
  query: string;
  languageMode?: "DEFAULT" | "NEPALI";
  location?: string;
}

// Use environment variable directly
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const performSearch = async ({
  query,
  languageMode = "DEFAULT",
  location,
}: PerformSearchParams): Promise<SearchResponse> => {
  console.log("Using API_URL:", API_URL); // should now show your real Supabase URL

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ query, languageMode, location }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      `Failed to fetch: ${res.status} ${JSON.stringify(errorBody)}`
    );
  }

  const data: SearchResponse = await res.json();
  return data;
};
