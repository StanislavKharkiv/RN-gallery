import {createSlice} from '@reduxjs/toolkit';
import {RESP_ERROR} from '../../constants/text';
import {SliceStatus} from '../../types';
import {fetchUser} from './userThunk';

interface InitialState {
  user: null | Record<string, any>;
  status: SliceStatus;
  error: string;
}
const initialState: InitialState = {
  user: null,
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
        state.status = 'succeeded';
      })
      .addCase(fetchUser.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? RESP_ERROR;
      });
  },
});

export default userSlice.reducer;
