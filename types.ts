export interface SearchResponse {
  answer: string;
  sources?: { title: string; url: string }[];
  offer?: { title: string; url: string };
  special_update?: { title: string; url: string };
  ad?: { imageUrl: string; url: string };
  location?: string;
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
}
