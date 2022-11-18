import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ImageList} from '../features/webGallery/types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {addCurrentImage} from '../features/webGallery/webGallerySlice';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {PictureInfo} from './PictureInfo';
import {Loader} from './Loader';
import ImageViewer from 'react-native-image-zoom-viewer';
import {routes} from '../routes';
import {useLinkTo} from '@react-navigation/native';

export function PictureSlider() {
  const {currentImage, items, liked} = useAppSelector(
    state => state.webGallery,
  );
  const dispatch = useAppDispatch();
  const linkTo = useLinkTo();
  const [isShowInfo, setIsShowInfo] = useState(true);

  const pictureList = useMemo(
    () => items.map(({urls, id}) => ({url: urls.full, id})) as ImageList,
    [items],
  );

  const imageIndex = useMemo(
    () => pictureList.findIndex(({id}) => id === currentImage?.id),
    [pictureList, currentImage],
  );

  const setCurrentImage = useCallback(
    (index?: number) => {
      const current = items.find(({id}) => id === pictureList[index!].id);
      if (current) dispatch(addCurrentImage(current));
    },
    [dispatch, items, pictureList],
  );

  const handleClosePicture = () => linkTo(`/${routes.unsplash}`);

  const isLiked = liked.some(item => item === currentImage?.id);

  return (
    <View style={styles.wrapper}>
      <TapGestureHandler onEnded={() => setIsShowInfo(!isShowInfo)}>
        <ImageViewer
          imageUrls={pictureList}
          loadingRender={() => <Loader />}
          onClick={() => setIsShowInfo(!isShowInfo)}
          index={imageIndex}
          onChange={setCurrentImage}
        />
      </TapGestureHandler>
      {isShowInfo && (
        <View style={styles.imageInfo}>
          <PictureInfo image={currentImage!} />
        </View>
      )}
      {isLiked && (
        <Icon
          style={styles.like}
          name="favorite"
          size={30}
          color="rgba(255, 0, 0, .6)"
        />
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
  like: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
});
