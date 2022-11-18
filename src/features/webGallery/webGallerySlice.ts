import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWebGallery} from './webGalleryThunk';
import {WebGalleryState} from './types';
import {RESP_ERROR} from '../../constants';

const initialState: WebGalleryState = {
  items: [],
  status: 'idle',
  error: '',
  total: null,
  total_pages: null,
  currentImage: null,
  // isShowCurrent: false,
  liked: [],
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
  reducers: {
    addCurrentImage(
      state,
      action: PayloadAction<WebGalleryState['currentImage']>,
    ) {
      state.currentImage = action.payload;
    },
    // toggleIsShowCurrent(state, action: PayloadAction<boolean | undefined>) {
    //   if (action.payload === undefined) {
    //     state.isShowCurrent = !state.isShowCurrent;
    //   } else {
    //     state.isShowCurrent = action.payload;
    //   }
    // },
    addFavoriteImage(state, {payload}: PayloadAction<string>) {
      const index = state.liked.indexOf(payload);
      if (index === -1) {
        state.liked.push(payload);
      } else {
        state.liked.splice(index, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWebGallery.fulfilled, (state, action) => {
        const {response, params} = action.payload;
        state.status = 'succeeded';
        state.items = response.results;
        state.total = response.total;
        state.total_pages = response.total_pages;
        state.fetchParams = params;
      })
      .addCase(fetchWebGallery.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchWebGallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? RESP_ERROR;
      });
  },
});

export default webGallerySlice.reducer;
export const {addCurrentImage, addFavoriteImage} = webGallerySlice.actions;
