import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coordinates, Photo} from '../../types';

interface InitialState {
  currentImage: Photo | null;
  liked: string[];
  modalCoords: null | Coordinates;
  images: Photo[];
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
    setCurrentImage(state, action: PayloadAction<Photo | null>) {
      state.currentImage = action.payload;
    },
    setModalCoords(state, action: PayloadAction<InitialState['modalCoords']>) {
      state.modalCoords = action.payload;
    },
    setImages(state, action: PayloadAction<Photo[]>) {
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
