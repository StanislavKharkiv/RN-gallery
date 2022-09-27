import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {WebGalleryResponse, WebGalleryFetchParams} from './types';
const client_id = '3CdrqkfW--pDQzPxjfFWNZwRkOOTqRvIOUDmQytv0Lw'; // unsplash ID

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
    `https://api.unsplash.com/search/photos?client_id=${client_id}&page=${queryParams.page}&query=${queryParams.category}&per_page=${queryParams.per_page}&order_by=${queryParams.order_by}&stats=${queryParams.stats}&orientation=${queryParams.orientation}`,
  );

  const result = {response: await response.json(), params: queryParams};
  return result;
});
