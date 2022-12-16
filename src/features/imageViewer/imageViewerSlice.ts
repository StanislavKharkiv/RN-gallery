import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coordinates, ViewerPhoto} from '../../types';

interface InitialState {
  currentImage: ViewerPhoto | null;
  liked: string[];
  modalCoords: null | Coordinates;
  images: ViewerPhoto[];
}
const initialState: InitialState = {
  currentImage: null,
  liked: [],
  modalCoords: null,
  images: [],
};

const imageViewerSlice = createSlice({
  name: 'imageViewerSlice',
  initialState: initialState,
  reducers: {
    setCurrentImage(state, action: PayloadAction<ViewerPhoto | null>) {
      state.currentImage = action.payload;
    },
    setModalCoords(state, action: PayloadAction<InitialState['modalCoords']>) {
      state.modalCoords = action.payload;
    },
    setImages(state, action: PayloadAction<ViewerPhoto[]>) {
      state.images = action.payload;
    },
    setFavoriteImage(state, {payload}: PayloadAction<string>) {
      const index = state.liked.indexOf(payload);
      if (index === -1) {
        state.liked.push(payload);
      } else {
        state.liked.splice(index, 1);
      }
    },
  },
});

export default imageViewerSlice.reducer;
export const {setCurrentImage, setFavoriteImage, setImages, setModalCoords} =
  imageViewerSlice.actions;
