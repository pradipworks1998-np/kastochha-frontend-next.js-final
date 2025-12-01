export interface Source {
  maps?: {
    uri: string;
    title: string;
    placeId?: string;
  };
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
    text: string;
  };
}

export interface Banner {
  id: string;
  item_id: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
}

export interface Offer {
  id: string;
  item_id: string;
  title: string;
  link_url: string;
  is_active: boolean;
}

export interface Special_Updates {
  id: string;
  item_id: string;
  title: string;
  link_url: string;
  is_active: boolean;
}

export interface SearchResponse {
  scenario: string;
  answer: string;
  location?: string;
  banner?: Banner;
  offer?: Offer | null; // matches Home.tsx usage
  special_update?: Special_Updates | null;
  sources?: Source[];
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum LanguageMode {
  DEFAULT = 'DEFAULT',
  NEPALI = 'NEPALI',
}
