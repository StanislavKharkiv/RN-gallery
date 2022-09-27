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
import {WebGalleryItem} from '../features/webGallery/types';
import {useAppDispatch} from '../app/hooks';
import {cutText} from '../helpers';
import {
  addCurrentImage,
  addFavoriteImage,
  toggleIsShowCurrent,
} from '../features/webGallery/webGallerySlice';
import {
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Coordinates} from '../types';

const win = Dimensions.get('window');
interface GalleryItemProps {
  item: WebGalleryItem;
  liked?: boolean;
  setCoords: (coords: Coordinates) => void;
}
export function GalleryItem(props: GalleryItemProps) {
  const {description, alt_description, urls, id} = props.item;
  const dispatch = useAppDispatch();
  const imageDescription = description ?? alt_description;
  const toastText = props.liked ? 'Removed from favorite' : 'Added to favorite';
  const handleLikeImage = ({
    nativeEvent,
  }: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      dispatch(addFavoriteImage(id));
      ToastAndroid.show(toastText, ToastAndroid.SHORT);
    }
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={handleLikeImage}
      minDurationMs={800}>
      <TapGestureHandler
        numberOfTaps={2}
        onBegan={() => dispatch(addCurrentImage(props.item))}
        onEnded={({nativeEvent}) => {
          props.setCoords({
            x: nativeEvent.absoluteX as number,
            y: nativeEvent.absoluteY as number,
          });
        }}
        onFailed={() => dispatch(toggleIsShowCurrent(true))}>
        <View style={[styles.galleryItem, styles.shadowProp]} key={id}>
          <Image source={{uri: urls.small}} style={styles.img} />
          {imageDescription && (
            <Text style={styles.imgDescription}>
              {cutText(imageDescription)}
            </Text>
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
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
}

const imgSize = win.width / 2 - 16;
const styles = StyleSheet.create({
  galleryItem: {
    margin: 8,
    width: imgSize,
    backgroundColor: '#fff',
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
  shadowProp: STYLE.shadow,
});
