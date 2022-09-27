import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWebGallery} from './webGalleryThunk';
import {WebGalleryState} from './types';
import {RESP_ERROR} from '../../constants';
// DATA EXAMPLE
// const images = {
//   total: 10000,
//   total_pages: 1000,
//   results: [
//     {
//       id: 'VWcPlbHglYc',
//       created_at: '2017-06-11T21:17:03Z',
//       updated_at: '2022-08-29T16:01:49Z',
//       promoted_at: '2017-06-12T10:24:27Z',
//       width: 5472,
//       height: 3648,
//       color: '#d9d9d9',
//       blur_hash: 'LTKeG.00Rj%3%ND%oLxuWAaxaeof',
//       description: 'Office',
//       alt_description:
//         'turned off laptop computer on top of brown wooden table',
//       urls: {
//         raw: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1',
//         full: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80',
//         regular:
//           'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=1080',
//         small:
//           'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=400',
//         thumb:
//           'https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=200',
//         small_s3:
//           'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1497215728101-856f4ea42174',
//       },
//       links: {
//         self: 'https://api.unsplash.com/photos/VWcPlbHglYc',
//         html: 'https://unsplash.com/photos/VWcPlbHglYc',
//         download:
//           'https://unsplash.com/photos/VWcPlbHglYc/download?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4',
//         download_location:
//           'https://api.unsplash.com/photos/VWcPlbHglYc/download?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwxfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4',
//       },
//       categories: [],
//       likes: 2846,
//       liked_by_user: false,
//       current_user_collections: [],
//       sponsorship: null,
//       topic_submissions: {
//         'business-work': {
//           status: 'approved',
//           approved_on: '2020-04-06T14:20:15Z',
//         },
//       },
//       user: {
//         id: 'zJgeEcvxc0o',
//         updated_at: '2022-08-30T08:15:40Z',
//         username: 'alesiaskaz',
//         name: 'Alesia Kazantceva',
//         first_name: 'Alesia',
//         last_name: 'Kazantceva',
//         twitter_username: null,
//         portfolio_url: 'http://saltnstreets.com',
//         bio: 'Ottawa-based photographer who loves adventures.\r\n Gear: Canon 6D 85mm, 35 mm;            Leica Q2',
//         location: 'Ottawa',
//         links: {
//           self: 'https://api.unsplash.com/users/alesiaskaz',
//           html: 'https://unsplash.com/@alesiaskaz',
//           photos: 'https://api.unsplash.com/users/alesiaskaz/photos',
//           likes: 'https://api.unsplash.com/users/alesiaskaz/likes',
//           portfolio: 'https://api.unsplash.com/users/alesiaskaz/portfolio',
//           following: 'https://api.unsplash.com/users/alesiaskaz/following',
//           followers: 'https://api.unsplash.com/users/alesiaskaz/followers',
//         },
//         profile_image: {
//           small:
//             'https://images.unsplash.com/profile-1596578750003-cc29df35976eimage?ixlib=rb-1.2.1&crop=faces&fit=crop&w=32&h=32',
//           medium:
//             'https://images.unsplash.com/profile-1596578750003-cc29df35976eimage?ixlib=rb-1.2.1&crop=faces&fit=crop&w=64&h=64',
//           large:
//             'https://images.unsplash.com/profile-1596578750003-cc29df35976eimage?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128',
//         },
//         instagram_username: 'saltnstreets',
//         total_collections: 10,
//         total_likes: 36,
//         total_photos: 26,
//         accepted_tos: true,
//         for_hire: true,
//         social: {
//           instagram_username: 'saltnstreets',
//           portfolio_url: 'http://saltnstreets.com',
//           twitter_username: null,
//           paypal_email: null,
//         },
//       },
//       tags: [
//         {
//           type: 'search',
//           title: 'office',
//         },
//       ],
//     },
//     {
//       id: '5U_28ojjgms',
//       created_at: '2019-09-20T15:40:25Z',
//       updated_at: '2022-08-29T17:09:28Z',
//       promoted_at: '2019-09-22T08:01:59Z',
//       width: 4821,
//       height: 2712,
//       color: '#262626',
//       blur_hash: 'LSF=m#~qE1Z~_3-;xFV@E1RjofR*',
//       description: 'Collaborative Meeting',
//       alt_description: 'people sitting on chair',
//       urls: {
//         raw: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1',
//         full: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80',
//         regular:
//           'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=1080',
//         small:
//           'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=400',
//         thumb:
//           'https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4&ixlib=rb-1.2.1&q=80&w=200',
//         small_s3:
//           'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1568992687947-868a62a9f521',
//       },
//       links: {
//         self: 'https://api.unsplash.com/photos/5U_28ojjgms',
//         html: 'https://unsplash.com/photos/5U_28ojjgms',
//         download:
//           'https://unsplash.com/photos/5U_28ojjgms/download?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4',
//         download_location:
//           'https://api.unsplash.com/photos/5U_28ojjgms/download?ixid=MnwzNTk4NDB8MHwxfHNlYXJjaHwyfHxvZmZpY2V8ZW58MHx8fHwxNjYxODYxMzY4',
//       },
//       categories: [],
//       likes: 792,
//       liked_by_user: false,
//       current_user_collections: [],
//       sponsorship: null,
//       topic_submissions: {
//         'business-work': {
//           status: 'approved',
//           approved_on: '2021-08-23T15:13:05Z',
//         },
//       },
//       user: {
//         id: 'Q9Ig7Srx2OI',
//         updated_at: '2022-08-30T12:05:48Z',
//         username: 'reddalec',
//         name: 'Redd',
//         first_name: 'Redd',
//         last_name: null,
//         twitter_username: null,
//         portfolio_url: 'https://linktr.ee/raddcollective',
//         bio: 'Photographer & Filmmaker\r\n',
//         location: 'Edmonton, Alberta',
//         links: {
//           self: 'https://api.unsplash.com/users/reddalec',
//           html: 'https://unsplash.com/@reddalec',
//           photos: 'https://api.unsplash.com/users/reddalec/photos',
//           likes: 'https://api.unsplash.com/users/reddalec/likes',
//           portfolio: 'https://api.unsplash.com/users/reddalec/portfolio',
//           following: 'https://api.unsplash.com/users/reddalec/following',
//           followers: 'https://api.unsplash.com/users/reddalec/followers',
//         },
//         profile_image: {
//           small:
//             'https://images.unsplash.com/profile-1651635111298-b88086877026image?ixlib=rb-1.2.1&crop=faces&fit=crop&w=32&h=32',
//           medium:
//             'https://images.unsplash.com/profile-1651635111298-b88086877026image?ixlib=rb-1.2.1&crop=faces&fit=crop&w=64&h=64',
//           large:
//             'https://images.unsplash.com/profile-1651635111298-b88086877026image?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128',
//         },
//         instagram_username: 'bantersnaps',
//         total_collections: 0,
//         total_likes: 244,
//         total_photos: 564,
//         accepted_tos: true,
//         for_hire: true,
//         social: {
//           instagram_username: 'bantersnaps',
//           portfolio_url: 'https://linktr.ee/raddcollective',
//           twitter_username: null,
//           paypal_email: null,
//         },
//       },
//       tags: [
//         {
//           type: 'search',
//           title: 'office',
//         },
//         {
//           type: 'search',
//           title: 'business',
//         },
//       ],
//     },
//   ],
// };

const initialState: WebGalleryState = {
  items: [],
  status: 'idle',
  error: null,
  total: null,
  total_pages: null,
  currentImage: null,
  isShowCurrent: false,
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
    toggleIsShowCurrent(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload === undefined) {
        state.isShowCurrent = !state.isShowCurrent;
      } else {
        state.isShowCurrent = action.payload;
      }
    },
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
export const {addCurrentImage, toggleIsShowCurrent, addFavoriteImage} =
  webGallerySlice.actions;
