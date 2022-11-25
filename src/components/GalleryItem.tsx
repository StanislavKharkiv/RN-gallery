import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {STYLE} from '../constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationProps, Photo, RootStackParamList} from '../types';
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
interface GalleryItemProps {
  item: Photo;
  liked?: boolean;
  isActive?: boolean;
}

export function GalleryItem(props: GalleryItemProps) {
  const {description, alt_description, urls, id} = props.item;
  const {liked, isActive = false} = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const imageDescription = description ?? alt_description;
  const toastText = liked ? 'Removed from favorite' : 'Added to favorite';

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

  return (
    <GestureDetector gesture={taps}>
      <View
        style={[
          styles.galleryItem,
          styles.shadowProp,
          isActive && styles.active,
        ]}
        key={id}>
        <Image source={{uri: urls.small}} style={styles.img} />
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
      </View>
    </GestureDetector>
  );
}
const itemBorder = 1;
const itemMargin = 8;
const imgSize = win.width / 2 - itemMargin * 2 - itemBorder * 2;

const styles = StyleSheet.create({
  galleryItem: {
    margin: itemMargin,
    width: imgSize + itemBorder * 2,
    backgroundColor: '#fff',
    borderWidth: itemBorder,
    borderColor: 'transparent',
  },
  img: {
    width: imgSize,
    height: imgSize,
    marginBottom: 5,
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
