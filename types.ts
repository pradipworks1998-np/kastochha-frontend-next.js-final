export interface SearchRequest {
  query: string;
  languageMode: LanguageMode;
  location?: string;
}

export interface Offer {
  title: string;
  url: string;
}

export interface SpecialUpdate {
  title: string;
  url: string;
}

export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface Ad {
  imageUrl: string;
  url?: string;
}

export interface SearchResponse {
  answer: string;
  ad?: Ad;
  scenario: string;
  offer?: Offer;
  special_update?: SpecialUpdate;
  sources: Source[];
  location?: string;
}

export enum LanguageMode {
  DEFAULT = "default",
  NEPALI = "nepali",
  ENGLISH = "english"
}

export enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}