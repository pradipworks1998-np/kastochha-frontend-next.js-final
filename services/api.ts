import { createClient } from '@supabase/supabase-js';
import { SearchResponse } from "../types";

export interface PerformSearchParams {
  query: string;
  languageMode?: "DEFAULT" | "NEPALI";
  location?: string;
}

// ✅ Initialize Supabase Client for Tracking
const SUPABASE_URL = "https://auopgtcysaaexozjgcbh.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const performSearch = async ({
  query,
  languageMode = "DEFAULT",
  location,
}: PerformSearchParams): Promise<SearchResponse> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ query, languageMode, location }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(`Failed to fetch: ${res.status} ${JSON.stringify(errorBody)}`);
  }

  return await res.json();
};