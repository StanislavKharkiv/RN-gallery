import {createSlice} from '@reduxjs/toolkit';
import {fetchImages} from './webGalleryThunk';
import {WebGalleryState} from './types';
import {RESP_ERROR} from '../../constants';

const initialState: WebGalleryState = {
  items: [],
  status: 'idle',
  error: '',
  total: null,
  total_pages: null,
  fetchParams: {
    page: 1,
    per_page: 20,
    category: 'cars',
    order_by: 'popular',
    stats: false,
    orientation: 'portrait',
  },
};

export const webGallerySlice = createSlice({
  name: 'webGallery',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImages.fulfilled, (state, action) => {
        const {response, params} = action.payload;
        state.status = 'succeeded';
        state.items = response.results;
        state.total = response.total;
        state.total_pages = response.total_pages;
        state.fetchParams = params;
      })
      .addCase(fetchImages.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? RESP_ERROR;
      });
  },
});

// function setPending(state: WebGalleryState) {
//   state.status = 'pending';
// }
// function setError(state: WebGalleryState, action: {error: SerializedError}) {
//   state.status = 'failed';
//   state.error = action.error.message ?? RESP_ERROR;
// }

export default webGallerySlice.reducer;
