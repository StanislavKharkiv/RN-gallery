import {configureStore} from '@reduxjs/toolkit';
import webGalleryReducer from '../features/webGallery/webGallerySlice';

export const store = configureStore({
  reducer: {
    webGallery: webGalleryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
