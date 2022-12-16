import React, {ReactNode} from 'react';
import {Platform, ToastAndroid, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {hasAndroidPermission} from '../helpers';

interface DownloadImageProps {
  children: ReactNode;
  url: string;
}

export function DownloadImage(props: DownloadImageProps) {
  const {url, children} = props;

  const onTouch = () => {
    RNFetchBlob.config({fileCache: true, appendExt: 'jpg'})
      .fetch('GET', url)
      .then(async image => {
        const hasPermission = await hasAndroidPermission('write');
        if (Platform.OS === 'android' && !hasPermission) return;
        CameraRoll.save(image.data, {type: 'photo'})
          .then(() => ToastAndroid.show('Image saved', 1))
          .catch(() => ToastAndroid.show('Image save error', 1));
      });
  };

  return <TouchableOpacity onPress={onTouch}>{children}</TouchableOpacity>;
}
