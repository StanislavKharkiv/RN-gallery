import React, {useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Animated,
} from 'react-native';
import {STYLE} from '../constants';
import {NavigationProps, Photo} from '../types';
import {useAppDispatch} from '../app/hooks';
import {cutText} from '../helpers';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../routes';
import {
  setCurrentImage,
  setModalCoords,
  setFavoriteImage,
} from '../features/imageViewer';

const win = Dimensions.get('window');
const itemBorder = 1;
const itemMargin = 8;

interface GalleryItemProps {
  item: Photo;
  liked?: boolean;
  isActive?: boolean;
  size?: number;
}

export function GalleryItem(props: GalleryItemProps) {
  const {description, alt_description, urls, id} = props.item;
  const {liked, isActive = false, size = 2} = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const imageDescription = description ?? alt_description;
  const toastText = liked ? 'Removed from favorite' : 'Added to favorite';
  // image and image wrapper size
  const imgWrapSize = win.width / size - itemMargin * 2;
  const imgSize = imgWrapSize - itemBorder * size;
  const imageWrapSizeAnim = useRef(new Animated.Value(imgWrapSize)).current;
  const imgSizeAnim = useRef(new Animated.Value(imgSize)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imgSizeAnim, {
        toValue: imgSize,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(imageWrapSizeAnim, {
        toValue: imgWrapSize,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  }, [imageWrapSizeAnim, imgWrapSize, imgSize, imgSizeAnim]);

  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      dispatch(setCurrentImage(props.item));
      navigation.push(routes.slider);
    }
  });
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        dispatch(setFavoriteImage(id));
        ToastAndroid.show(toastText, ToastAndroid.SHORT);
      }
    });
  const longTap = Gesture.LongPress()
    .minDuration(600)
    .onEnd((event, success) => {
      if (success) {
        dispatch(setCurrentImage(props.item));
        dispatch(
          setModalCoords({
            x: event.absoluteX as number,
            y: event.absoluteY as number,
          }),
        );
      }
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap, longTap);

  const imgStyle = {
    width: imgSizeAnim,
    height: imgSizeAnim,
    marginBottom: 5,
  };

  return (
    <GestureDetector gesture={taps}>
      <Animated.View
        style={[
          styles.galleryItem,
          styles.shadowProp,
          isActive && styles.active,
          {width: imageWrapSizeAnim},
        ]}
        key={id}>
        <Animated.Image source={{uri: urls.small}} style={imgStyle} />
        {imageDescription && (
          <Text style={styles.imgDescription}>{cutText(imageDescription)}</Text>
        )}
        {props.liked && (
          <Icon
            name="favorite"
            size={20}
            style={styles.favorite}
            color="rgba(255, 0, 0, .5)"
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  galleryItem: {
    margin: itemMargin,
    backgroundColor: '#fff',
    borderWidth: itemBorder,
    borderColor: 'transparent',
  },
  imgDescription: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  favorite: {
    position: 'absolute',
    left: 4,
    top: 4,
  },
  active: {
    borderColor: COLORS.secondary,
    transform: [{scale: 1.04}],
  },
  shadowProp: STYLE.shadow,
});
