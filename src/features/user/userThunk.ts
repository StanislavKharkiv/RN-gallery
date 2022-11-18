import {createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../constants';

export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (userName?: string) => {
    const userUrl = userName ? API.user(userName) : API.currentUser;
    const response = await fetch(userUrl);
    const user = await response.json();
    return user;
  },
);
