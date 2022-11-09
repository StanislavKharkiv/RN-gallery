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
import {fetchWebGallery} from './webGalleryThunk';
import {GalleryItem} from '../../components/GalleryItem';
import {Pagination} from './components/Pagination';
import {Filters} from './components/Filters';
import {ImageModal} from '../../components/ImageModal';
import {Loader} from '../../components/Loader';
import {Coordinates} from '../../types';

const CLOSED_FILTERS = 0;
const FILTER_HEIGHT = 340;

export function WebGallery() {
  const {isInternetReachable} = useNetInfo();
  const dispatch = useAppDispatch();
  const {items, status, fetchParams, currentImage, liked} = useAppSelector(
    state => state.webGallery,
  );
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [modalCoords, setModalCoords] = useState<Coordinates | null>(null);
  const filterAnim = useRef(new Animated.Value(CLOSED_FILTERS)).current;
  const isShowModal = currentImage && modalCoords;

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
    if (isInternetReachable === false) ToastAndroid.show(CONNECT_ERROR, 1);
    if (isInternetReachable && items.length === 0) {
      dispatch(fetchWebGallery(fetchParams));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternetReachable]);

  const closeModal = useCallback(() => setModalCoords(null), []);

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
