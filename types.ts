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
  banner?: Banner | null;
  offer?: Offer | null;
  special_update?: Special_Updates | null; // single object
  sources?: Source[]; // strictly Source[]
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

import { EntrySkeletonType } from "contentful";

// 1. Your Existing Fields (kept exactly as you have them)
export interface BlogPostFields {
  title: string;
  slug: string;
  author: string;
  categories: string[];
  excerpt?: any; 
  featuredImage?: {
    sys?: { id: string }; 
    fields: {
      file: { url: string; details: any; fileName: string; contentType: string };
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

// 2. Your Existing BlogPost Object (kept for your current components)
export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType?: { sys: { id: string } };
  };
  fields: BlogPostFields;
}

// 3. NEW: The Skeleton (Added ONLY to fix the SDK errors in page.tsx)
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: BlogPostFields;
}
