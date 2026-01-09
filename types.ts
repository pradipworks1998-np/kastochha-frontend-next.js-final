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
  id: string;        // UUID from Supabase
  item_id: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
}

export interface Offer {
  id: string;        // UUID from Supabase
  item_id: string;
  title: string;
  link_url: string;
  is_active: boolean;
}

export interface Special_Updates {
  id: string;        // UUID from Supabase
  item_id: string;
  title: string;
  link_url: string;
  is_active: boolean;
}

export interface SearchResponse {
  scenario: string;
  answer: string;
  location?: string;
  banner?: Banner | null;
  offer?: Offer | null;
  special_update?: Special_Updates | null;
  sources?: Source[];
  query_log_id?: string | null; // ✅ Updated to string to support UUIDs
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum LanguageMode {
  DEFAULT = 'DEFAULT',
  NEPALI = 'NEPALI'
}

// Contentful Types (Keeping these exactly as they were)
import { EntrySkeletonType } from "contentful";

export interface BlogPostFields {
  title: string;
  slug: string;
  author: string;
  categories: string[];
  excerpt?: any;
  featuredImage?: {
    sys?: { id: string };
    fields: {
      file: { url: string };
      title: string;
    };
  };
  body?: any;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  faq?: Record<string, any>;
  relatedPost?: { sys: { id: string } }[];
}

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: BlogPostFields;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: BlogPostFields;
}