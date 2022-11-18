import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {WebGalleryResponse, WebGalleryFetchParams} from './types';
import {API} from '../../constants';

interface Response {
  response: WebGalleryResponse;
  params: WebGalleryFetchParams;
}

export const fetchWebGallery = createAsyncThunk<
  Response,
  Partial<WebGalleryFetchParams>
>('get/webGallery', async (params, {getState}) => {
  const {
    webGallery: {fetchParams},
  } = getState() as RootState;
  const queryParams = {...fetchParams, ...params};

  const response = await fetch(
    `${API.photos}&page=${queryParams.page}&query=${queryParams.category}&per_page=${queryParams.per_page}&order_by=${queryParams.order_by}&stats=${queryParams.stats}&orientation=${queryParams.orientation}`,
  );
  const images = await response.json();
  return {response: images, params: queryParams};
});
