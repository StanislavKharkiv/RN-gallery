import {SliceStatus, Photo} from '../../types';

export interface WebGalleryResponse {
  total: number;
  total_pages: number;
  results: Photo[];
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
  items: Photo[];
  status: SliceStatus;
  error: string;
  total: null | number;
  total_pages: null | number;
  fetchParams: WebGalleryFetchParams;
}
