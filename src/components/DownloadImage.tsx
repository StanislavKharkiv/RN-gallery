import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {savePhoto} from '../helpers';

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
        savePhoto(image.data);
      });
  };

  return <TouchableOpacity onPress={onTouch}>{children}</TouchableOpacity>;
}
