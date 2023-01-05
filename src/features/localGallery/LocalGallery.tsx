import React, {useEffect} from 'react';
import {
  NativeScrollEvent,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Button} from '../../components/Button';
import {GalleryWrapper} from '../../components/GalleryWrapper';
import {GalleryImage} from './components/GalleryImage';
import {hasAndroidPermission, savePhoto} from '../../helpers';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getLocalImages} from './localGalleryThunk';
import {
  clearSelectedItems,
  deleteItems,
  resetState,
  togglePickMode,
} from './localGallerySlice';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {setImages} from '../imageViewer';
import {IMG_PER_PAGE} from '../../constants';

export function LocalGallery() {
  const dispatch = useAppDispatch();
  const {items, loading, hasNextPage, pickMode, selectedItems} = useAppSelector(
    state => state.localGallery,
  );

  useEffect(() => {
    hasAndroidPermission('read').then(hasPermission => {
      if (Platform.OS === 'android' && !hasPermission) return;
      dispatch(getLocalImages());
    });
    return () => {
      dispatch(resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchPhoto = async () => {
    if (loading) return;
    const result = await launchCamera({mediaType: 'photo'});
    const photoUri = result.assets?.[0].uri;
    if (!photoUri) return ToastAndroid.show('Image save error', 1);
    savePhoto(photoUri, () => dispatch(getLocalImages(true)));
  };

  const onScroll = async (e: NativeScrollEvent) => {
    if (loading || !hasNextPage) return;
    const scrollEnd = e.contentSize.height - e.layoutMeasurement.height - 10;
    if (scrollEnd <= e.contentOffset.y) dispatch(getLocalImages());
  };

  const onDelete = async () => {
    const result = (await CameraRoll.deletePhotos(
      selectedItems.map(({url}) => url),
    )) as unknown as boolean;
    if (result) {
      const imagesQuantity = items.length - selectedItems.length;
      dispatch(deleteItems(selectedItems));
      dispatch(clearSelectedItems());
      dispatch(togglePickMode());
      if (imagesQuantity < IMG_PER_PAGE) {
        dispatch(resetState());
        dispatch(getLocalImages());
      }
    } else ToastAndroid.show('Delete images error!', 1);
  };

  const onCancel = () => {
    dispatch(clearSelectedItems());
    dispatch(togglePickMode());
  };

  return (
    <View style={styles.wrapper}>
      <GalleryWrapper onScroll={onScroll}>
        {items.map((item, i) => (
          <GalleryImage
            image={item}
            key={item.id + i}
            onTouch={() => dispatch(setImages(items))}
          />
        ))}
      </GalleryWrapper>
      <View style={styles.btnWrap}>
        {pickMode ? (
          <View style={styles.selectBtnWrap}>
            {selectedItems.length > 0 && (
              <Button
                text="delete selected"
                onTouch={onDelete}
                variant="error"
                style={styles.selectButtons}
              />
            )}
            <Button
              text="cancel"
              onTouch={onCancel}
              variant="warning"
              style={styles.selectButtons}
            />
          </View>
        ) : (
          <Button
            text={loading ? 'loading...' : 'make photo'}
            onTouch={onTouchPhoto}
            disabled={loading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  btnWrap: {alignItems: 'center'},
  selectBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectButtons: {
    maxWidth: 165,
  },
});
