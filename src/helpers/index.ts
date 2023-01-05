import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {IMG_DIR} from '../constants';

export function cutText(
  text: string,
  maxLength: number | undefined = 22,
): string {
  if (text?.length < maxLength) return text;
  var trimmedText = text.substring(0, maxLength);
  return `${text.substring(0, trimmedText.lastIndexOf(' '))}...`;
}

export async function hasAndroidPermission(permType: 'write' | 'read') {
  const {WRITE_EXTERNAL_STORAGE, READ_EXTERNAL_STORAGE} =
    PermissionsAndroid.PERMISSIONS;
  const permission =
    permType === 'write' ? WRITE_EXTERNAL_STORAGE : READ_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) return true;
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function savePhoto(image: string, cb?: () => void) {
  const hasPermission = await hasAndroidPermission('write');
  if (Platform.OS === 'android' && !hasPermission) return;
  CameraRoll.save(image, {type: 'photo', album: IMG_DIR})
    .then(() => {
      cb?.();
      ToastAndroid.show('Image saved', 1);
    })
    .catch(() => ToastAndroid.show('Image save error', 1));
}
