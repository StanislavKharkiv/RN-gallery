import {SliceStatus} from '../../types';

export type WebImageUrls =
  | 'raw'
  | 'full'
  | 'regular'
  | 'small'
  | 'thumb'
  | 'small_s3';

export type WebImageLinks = 'self' | 'html' | 'download' | 'download_location';

export interface WebGalleryItem {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  description?: string;
  alt_description?: string;
  urls: Record<WebImageUrls, string>;
  links: Record<WebImageLinks, string>;
  likes: number;
  tags: Array<{type: string; title: string}>;
}

export interface WebGalleryResponse {
  total: number;
  total_pages: number;
  results: WebGalleryItem[];
}

export interface WebGalleryFetchParams {
  page: number;
  category?: string;
  per_page?: number;
  order_by?: 'latest' | 'oldest' | 'popular' | 'views' | 'downloads';
  stats?: boolean;
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

export interface WebGalleryState {
  items: WebGalleryItem[];
  status: SliceStatus;
  error: null | string;
  total: null | number;
  total_pages: null | number;
  currentImage: WebGalleryItem | null;
  // isShowCurrent: boolean;
  liked: Array<string>;
  fetchParams: WebGalleryFetchParams;
}

export type ImageList = Array<{url: string; id: string}>;
