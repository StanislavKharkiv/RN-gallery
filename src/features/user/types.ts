import {Photo, SliceStatus} from '../../types';

export interface UserType {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  location: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  downloads: number;
  followers_count: number;
  following_count: number;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface InitialState {
  user: null | UserType;
  photos: null | Photo[];
  page: number;
  status: SliceStatus;
  error: string;
}
