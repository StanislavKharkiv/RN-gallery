import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IMG_DIR, IMG_PER_PAGE} from '../../constants';
import {ViewerPhoto} from '../../types';
import {setLoading} from './localGallerySlice';

export const getLocalImages = createAsyncThunk<
  {
    images: ViewerPhoto[];
    lastImage: number;
    hasNextPage: boolean;
  },
  boolean | undefined
>('get/localImages', async (onlyLast = false, {getState, dispatch}) => {
  dispatch(setLoading(true));
  const {localGallery} = getState() as RootState;

  const resp = await CameraRoll.getPhotos({
    first: onlyLast ? 1 : IMG_PER_PAGE,
    assetType: 'Photos',
    groupTypes: 'All',
    groupName: IMG_DIR,
    after: onlyLast ? '0' : String(localGallery.lastImage),
    include: ['filename', 'imageSize', 'location', 'playableDuration'],
  });
  const photos = resp.edges.map(({node}) => ({
    id: String(node.timestamp),
    url: node.image.uri,
    description: node.image.filename ?? undefined,
    width: node.image.width,
    height: node.image.height,
  }));

  return {
    images: onlyLast
      ? [...photos, ...localGallery.items]
      : [...localGallery.items, ...photos],
    lastImage: onlyLast
      ? localGallery.lastImage + 1
      : Number(resp.page_info.end_cursor ?? 0),
    hasNextPage: onlyLast
      ? localGallery.hasNextPage
      : resp.page_info.has_next_page,
  };
});
