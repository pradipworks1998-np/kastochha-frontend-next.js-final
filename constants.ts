import { SearchResponse } from './types';

export const API_URL = "https://YOUR_EDGE_FUNCTION_URL_HERE";

export const MOCK_DATA: SearchResponse = {
  answer: "ABC Bakery kasto chha? Small cozy bakery cha, fresh bread ramrai cha. Staff polite ra helpful cha. The ambiance is perfect for a quiet morning coffee or a quick snack. You should definately visit ABC cafe in your free time. It's one of the best place for hanging out and chilling. I recommend the palce for going for parties, dinner, breakfast and luch. You wont regret going there because it is one of the place in heaven. I actually love the place a lot. The place is so beautiful and nice. Absolutely amazing. You should definately try the place",
  ad: {
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    url: "https://abc-bakery.com/sponsored-promo"
  },
  scenario: "C",
  offer: { 
    title: "Buy 1 get 1 free on croissants", 
    url: "https://abc-bakery.com/offer" 
  },
  special_update: { 
    title: "Try coffee at PQR Bakery with 10% discount", 
    url: "https://pqrbakery.com/coffee" 
  },
  sources: [
    { 
      title: "Google Maps Reviews", 
      url: "https://maps.google.com/abc-bakery", 
      snippet: "Rated 4.5 stars by 200 users. Customers love the morning buns." 
    },
    { 
      title: "Official Website", 
      url: "https://www.abcbakery.com", 
      snippet: "Freshly baked bread every day since 1998." 
    }
  ]
};