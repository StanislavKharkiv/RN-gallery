import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {WebGalleryResponse, WebGalleryFetchParams} from './types';
import {UNSPLASH_CLIENT_ID} from '@env';

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
    `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_ID}&page=${queryParams.page}&query=${queryParams.category}&per_page=${queryParams.per_page}&order_by=${queryParams.order_by}&stats=${queryParams.stats}&orientation=${queryParams.orientation}`,
  );

  const result = {response: await response.json(), params: queryParams};
  return result;
});
