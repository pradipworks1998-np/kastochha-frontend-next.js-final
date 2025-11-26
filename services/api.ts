import { SearchRequest, SearchResponse } from '../types';
import { API_URL, MOCK_DATA } from '../constants';

export const performSearch = async (request: SearchRequest): Promise<SearchResponse> => {
  // Check if the URL is the placeholder. If so, trigger mock mode immediately.
  const isPlaceholderUrl = API_URL.includes("YOUR_EDGE_FUNCTION_URL_HERE");

  if (isPlaceholderUrl) {
    console.warn("KastoChha: Using MOCK DATA because API_URL is not configured.");
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a copy of mock data to modify based on language
        const response = { ...MOCK_DATA };
        
        // Simple mock logic to demonstrate language switching
        if (request.languageMode === 'nepali') {
          response.answer = "ABC Bakery एकदम राम्रो छ। यो सानो र आरामदायी बेकरी हो, र यहाँको पाउरोटी सधैं ताजा हुन्छ। कर्मचारीहरु विनम्र र सहयोगी छन्। बिहानको कफी वा खाजाको लागि यो ठाउँ एकदम उपयुक्त छ।";
        } else if (request.languageMode === 'english') {
          response.answer = "ABC Bakery is excellent. It is a small, cozy bakery with fresh bread available daily. The staff is polite and helpful. The ambiance is perfect for a quiet morning coffee or a quick snack using a single banner per answer with.";
        }
        // Default leaves the mixed content from constants.ts

        resolve(response);
      }, 1500); // Simulate network delay
    });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as SearchResponse;

  } catch (error) {
    console.error("Search failed, falling back to mock data for demo purposes:", error);
    // Fallback to mock data on error for the purpose of this demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DATA);
      }, 1000);
    });
  }
};