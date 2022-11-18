import {UNSPLASH_CLIENT_ID} from '@env';

const basePath = 'https://api.unsplash.com';
const me = 'iosq'; // TODO: my username, get my profile after authorization

export const API = {
  photos: `${basePath}/search/photos?client_id=${UNSPLASH_CLIENT_ID}`,
  user: (userName: string) => {
    return `${basePath}/users/${userName}?client_id=${UNSPLASH_CLIENT_ID}`;
  },
  currentUser: `${basePath}/users/${me}?client_id=${UNSPLASH_CLIENT_ID}`,
};
