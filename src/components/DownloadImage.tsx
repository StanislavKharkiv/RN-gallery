import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) return true;
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

interface DownloadImageProps {
  children: ReactNode;
  url: string;
}

export function DownloadImage(props: DownloadImageProps) {
  const {url, children} = props;

  const onTouch = (e: GestureResponderEvent) => {
    e.stopPropagation();
    console.log('losd');
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
    })
      .fetch('GET', url)
      .then(async image => {
        const hasPermission = await hasAndroidPermission();
        if (Platform.OS === 'android' && !hasPermission) return;
        CameraRoll.save(image.data, {type: 'photo'})
          .then(() => ToastAndroid.show('Image saved', 1))
          .catch(() => ToastAndroid.show('Image save error', 1));
      });
  };

  return <TouchableOpacity onPress={onTouch}>{children}</TouchableOpacity>;
}
