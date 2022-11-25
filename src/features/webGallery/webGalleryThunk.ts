import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {WebGalleryResponse, WebGalleryFetchParams} from './types';
import {API} from '../../constants';
import {setImages} from '../imageViewer';

interface Response {
  response: WebGalleryResponse;
  params: WebGalleryFetchParams;
}

export const fetchImages = createAsyncThunk<
  Response,
  Partial<WebGalleryFetchParams>
>('get/images', async (params, {getState, dispatch}) => {
  const {
    webGallery: {fetchParams},
  } = getState() as RootState;
  const queryParams = {...fetchParams, ...params};

  const response = await fetch(
    `${API.photos}&page=${queryParams.page}&query=${queryParams.category}&per_page=${queryParams.per_page}&order_by=${queryParams.order_by}&stats=${queryParams.stats}&orientation=${queryParams.orientation}`,
  );
  const images = await response.json();
  dispatch(setImages(images.results));
  return {response: images, params: queryParams};
});
