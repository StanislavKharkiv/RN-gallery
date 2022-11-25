import {createSlice} from '@reduxjs/toolkit';
import {RESP_ERROR} from '../../constants/text';
import {fetchUser, fetchUserImages} from './userThunk';
import {InitialState} from './types';

const initialState: InitialState = {
  user: null,
  photos: null,
  page: 1,
  status: 'idle',
  error: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, {payload}) => {
        if (payload.errors) {
          state.error = payload.errors.toString();
          return;
        }
        state.user = payload;
        state.photos = null;
        state.page = 1;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? RESP_ERROR;
      })
      .addCase(fetchUserImages.fulfilled, (state, {payload}) => {
        if (payload.errors) {
          state.error = payload.errors.toString();
          return;
        }
        state.photos
          ? (state.photos = [...state.photos, ...payload])
          : (state.photos = payload);
        state.page++;
        state.status = 'succeeded';
      })
      .addCase(fetchUserImages.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUserImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? RESP_ERROR;
      });
  },
});

export default userSlice.reducer;
