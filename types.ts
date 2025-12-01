// types.ts
export interface SearchResponse {
  scenario?: string;
  answer: string;
  sources?: Source[];
  offer?: PromoItem;
  special_update?: PromoItem;
  ad?: AdBanner;
  banner?: AdBanner;
  location?: string;
}

export interface Source {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeId: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
    text?: string;
  };
}

export interface PromoItem {
  title: string;
  url: string;
}

export interface AdBanner {
  id: string;
  item_id: string;
  category?: string | null;
  image_url: string;
  link_url: string;
  is_active: boolean;
  priority?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  trigger_terms?: string[] | null;
  max_impressions?: number | null;
  displayed_count: number;
  rotation_weight: number;
  start_date?: string | null;
  end_date?: string | null;
  selection_rank?: number | null;
}

export enum FetchStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum LanguageMode {
  DEFAULT = "DEFAULT",
  NEPALI = "NEPALI",
  ENGLISH = "ENGLISH",
}
