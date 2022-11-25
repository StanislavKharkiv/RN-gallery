import {configureStore} from '@reduxjs/toolkit';
import webGalleryReducer from '../features/webGallery/webGallerySlice';
import userSliceReducer from '../features/user/userSlice';
import imageViewerSlice from '../features/imageViewer/imageViewerSlice';

export const store = configureStore({
  reducer: {
    webGallery: webGalleryReducer,
    users: userSliceReducer,
    imageViewer: imageViewerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
