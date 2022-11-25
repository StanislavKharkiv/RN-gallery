import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {routes} from '../routes';

export type SliceStatus = 'idle' | 'pending' | 'succeeded' | 'failed';
export type Coordinates = {x: number; y: number};

export type PhotoUrls =
  | 'raw'
  | 'full'
  | 'regular'
  | 'small'
  | 'thumb'
  | 'small_s3';

export type PhotoLinks = 'self' | 'html' | 'download' | 'download_location';

export interface Photo {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  description?: string;
  alt_description?: string;
  urls: Record<PhotoUrls, string>;
  links: Record<PhotoLinks, string>;
  likes: number;
  tags: Array<{type: string; title: string}>;
  user: Record<string, any>;
}

export type RootStackParamList = {
  [routes.unsplash]: {username: string};
  [routes.slider]: undefined;
  [routes.user]: {username: string};
};

export type ScreenNavigationProp<T extends routes> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type ImageList = Array<{url: string; id: string}>;
