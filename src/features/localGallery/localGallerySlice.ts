import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ViewerPhoto} from '../../types';
import {getLocalImages} from './localGalleryThunk';

interface InitialState {
  items: ViewerPhoto[];
  selectedItems: ViewerPhoto[];
  lastImage: number;
  hasNextPage: boolean;
  error?: string;
  loading: boolean;
  pickMode: boolean;
}
const initialState: InitialState = {
  items: [],
  selectedItems: [],
  lastImage: 0,
  hasNextPage: false,
  loading: false,
  pickMode: false,
};

export const localGallerySlice = createSlice({
  name: 'webGallery',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetState() {
      return initialState;
    },
    togglePickMode(state) {
      state.pickMode = !state.pickMode;
    },
    addSelectedItem(state, action: PayloadAction<ViewerPhoto>) {
      state.selectedItems.push(action.payload);
    },
    deleteSelectedItem(state, {payload}: PayloadAction<ViewerPhoto>) {
      state.selectedItems = state.selectedItems.filter(
        item => item.id !== payload.id,
      );
    },
    clearSelectedItems(state) {
      state.selectedItems = [];
    },
    deleteItems(state, action: PayloadAction<ViewerPhoto[]>) {
      state.items = state.items.filter(item => {
        return !action.payload.some(({id}) => id === item.id);
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLocalImages.fulfilled, (state, {payload}) => {
        state.items = payload.images;
        state.lastImage = payload.lastImage;
        state.hasNextPage = payload.hasNextPage;
        state.loading = false;
      })
      .addCase(getLocalImages.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const {
  setLoading,
  resetState,
  togglePickMode,
  addSelectedItem,
  clearSelectedItems,
  deleteSelectedItem,
  deleteItems,
} = localGallerySlice.actions;
export default localGallerySlice.reducer;
