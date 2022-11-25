import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {CONNECT_ERROR} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchImages} from './webGalleryThunk';
import {GalleryItem} from '../../components/GalleryItem';
import {Pagination} from './components/Pagination';
import {Filters} from './components/Filters';
import {ImageModal} from '../../components/ImageModal';
import {Loader} from '../../components/Loader';
import {Plug} from '../../components/Plug';
import {setImages, setModalCoords} from '../imageViewer';
import {useFocusEffect} from '@react-navigation/native';

const CLOSED_FILTERS = 0;
const FILTER_HEIGHT = 340;

export function WebGallery() {
  const {isInternetReachable} = useNetInfo();
  const dispatch = useAppDispatch();
  const {items, status, fetchParams, error} = useAppSelector(
    state => state.webGallery,
  );
  const {modalCoords, currentImage, liked} = useAppSelector(
    state => state.imageViewer,
  );
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const filterAnim = useRef(new Animated.Value(CLOSED_FILTERS)).current;
  const isShowModal = currentImage && modalCoords;

  useFocusEffect(
    useCallback(() => {
      dispatch(setImages(items));
    }, [items, dispatch]),
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchImages(fetchParams));
    }
  }, [dispatch, status, fetchParams, items]);

  useEffect(() => {
    if (isInternetReachable === false) ToastAndroid.show(CONNECT_ERROR, 1);
    if (isInternetReachable && items.length === 0) {
      dispatch(fetchImages(fetchParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternetReachable]);

  const handleOpenFilters = () => {
    setIsOpenFilters(true);
    startAnimation(filterAnim, FILTER_HEIGHT);
  };
  const handleCloseFilters = () => {
    setIsOpenFilters(false);
    startAnimation(filterAnim, CLOSED_FILTERS);
  };
  const closeModal = useCallback(
    () => dispatch(setModalCoords(null)),
    [dispatch],
  );

  if (status === 'failed') return <Plug text={error} />;

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
                  isActive={!!isShowModal && currentImage?.id === item.id}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        <TouchableHighlight
          onPress={isOpenFilters ? handleCloseFilters : handleOpenFilters}>
          <Pagination icon={isOpenFilters ? 'close' : 'play-arrow'} />
        </TouchableHighlight>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) handleCloseFilters();
          }}>
          <View>
            <Filters height={filterAnim} onSubmit={handleCloseFilters} />
          </View>
        </FlingGestureHandler>
        {isShowModal && (
          <ImageModal
            image={currentImage}
            coords={modalCoords}
            closeModal={closeModal}
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
