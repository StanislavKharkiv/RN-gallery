import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {API} from '../../constants';
import {setImages} from '../imageViewer';

export const fetchUser = createAsyncThunk(
  'user/getUser',
  async (userName?: string) => {
    const userUrl = userName ? API.user(userName) : API.currentUser;
    const response = await fetch(userUrl);
    const user = await response.json();
    return user;
  },
);

export const fetchUserImages = createAsyncThunk(
  'get/userImages',
  async (userName: string, {dispatch, getState}) => {
    const {users} = getState() as RootState;
    const response = await fetch(API.userPhotos(userName, users.page));
    const images = await response.json();
    dispatch(setImages(images));
    return images;
  },
);
