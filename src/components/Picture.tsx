import React, {useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebGalleryItem, ImageList} from '../features/webGallery/types';
import {useAppDispatch} from '../app/hooks';
import {toggleIsShowCurrent} from '../features/webGallery/webGallerySlice';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {PictureInfo} from './PictureInfo';
import {Loader} from './Loader';
import ImageViewer from 'react-native-image-zoom-viewer';

interface PictureProps {
  image: WebGalleryItem;
  imageList: ImageList;
  addCurrentPicture: (index?: number) => void;
}

export function Picture({image, imageList, addCurrentPicture}: PictureProps) {
  const dispatch = useAppDispatch();
  const [isShowInfo, setIsShowInfo] = useState(true);

  const handleClosePicture = () => dispatch(toggleIsShowCurrent(false));

  const imageIndex = useMemo(
    () => imageList.findIndex(({id}) => id === image.id),
    [image, imageList],
  );

  return (
    <View style={styles.wrapper}>
      <TapGestureHandler onEnded={() => setIsShowInfo(!isShowInfo)}>
        <ImageViewer
          imageUrls={imageList}
          loadingRender={() => <Loader />}
          onClick={() => setIsShowInfo(!isShowInfo)}
          index={imageIndex}
          onChange={addCurrentPicture}
        />
      </TapGestureHandler>
      {isShowInfo && (
        <View style={styles.imageInfo}>
          <PictureInfo image={image} />
        </View>
      )}
      <TouchableOpacity onPress={handleClosePicture} style={styles.close}>
        <Icon name="close" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'white',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0, .7)',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
