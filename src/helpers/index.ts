import {PermissionsAndroid} from 'react-native';

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
