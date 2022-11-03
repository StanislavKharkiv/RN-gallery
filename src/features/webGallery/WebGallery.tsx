import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {CONNECT_ERROR} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchWebGallery} from './webGalleryThunk';
import {GalleryItem} from '../../components/GalleryItem';
import {Pagination} from './components/Pagination';
import {Filters} from './components/Filters';
import {Picture} from '../../components/Picture';
import {ImageModal} from '../../components/ImageModal';
import {Loader} from '../../components/Loader';
import {Coordinates} from '../../types';
import {ImageList} from './types';
import {addCurrentImage} from './webGallerySlice';

const CLOSED_FILTERS = 0;
const FILTER_HEIGHT = 340;

export function WebGallery() {
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  const {items, status, fetchParams, currentImage, isShowCurrent, liked} =
    useAppSelector(state => state.webGallery);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [modalCoords, setModalCoords] = useState<Coordinates | null>(null);
  const filterAnim = useRef(new Animated.Value(CLOSED_FILTERS)).current;

  const handleOpenFilters = () => {
    setIsOpenFilters(true);
    startAnimation(filterAnim, FILTER_HEIGHT);
  };
  const handleCloseFilters = () => {
    setIsOpenFilters(false);
    startAnimation(filterAnim, CLOSED_FILTERS);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWebGallery(fetchParams));
    }
  }, [dispatch, status, fetchParams]);

  useEffect(() => {
    if (netInfo.isInternetReachable === false) {
      ToastAndroid.show(CONNECT_ERROR, ToastAndroid.SHORT);
    }
    if (netInfo.isInternetReachable && items.length === 0) {
      dispatch(fetchWebGallery(fetchParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo.isInternetReachable]);

  const closeModal = useCallback(() => setModalCoords(null), []);

  const pictureImages = useMemo(
    () => items.map(({urls, id}) => ({url: urls.full, id})) as ImageList,
    [items],
  );

  const setCurrentImage = useCallback(
    (index?: number) => {
      if (index === undefined) return;
      const current = items.find(({id}) => id === pictureImages[index].id);
      if (current) dispatch(addCurrentImage(current));
    },
    [dispatch, items, pictureImages],
  );

  if (items.length > 0) {
    return (
      <>
        <SafeAreaView style={styles.wrapper}>
          <ScrollView>
            <View style={styles.gallery}>
              {items.map(item => (
                <GalleryItem
                  item={item}
                  key={item.id}
                  liked={liked.some(id => id === item.id)}
                  setCoords={setModalCoords}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        <TouchableHighlight
          onPress={isOpenFilters ? handleCloseFilters : handleOpenFilters}>
          <Pagination icon={isOpenFilters ? 'close' : 'play-arrow'} />
        </TouchableHighlight>
        <Filters height={filterAnim} onSubmit={handleCloseFilters} />
        {currentImage && modalCoords && (
          <ImageModal
            image={currentImage}
            coords={modalCoords}
            closeModal={closeModal}
          />
        )}
        {currentImage && isShowCurrent && (
          <Picture
            image={currentImage}
            imageList={pictureImages}
            addCurrentPicture={setCurrentImage}
          />
        )}
      </>
    );
  }

  return <Loader />;
}

function startAnimation(animation: Animated.Value, value: number) {
  Animated.timing(animation, {
    toValue: value,
    duration: 200,
    useNativeDriver: false,
  }).start();
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
