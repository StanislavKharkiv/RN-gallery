import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Dimensions, Image, StyleSheet, Vibration, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {routes} from '../../../routes';
import {NavigationProps, ViewerPhoto} from '../../../types';
import {COLORS} from '../../../utils';
import {setCurrentImage} from '../../imageViewer';
import {
  addSelectedItem,
  deleteSelectedItem,
  togglePickMode,
} from '../localGallerySlice';

const win = Dimensions.get('window');
const imgMargin = 5;
const iconSize = 30;

interface GalleryImageProps {
  image: ViewerPhoto;
  size?: number;
  onTouch?: () => void;
}
export function GalleryImage(props: GalleryImageProps) {
  const dispatch = useAppDispatch();
  const {pickMode, selectedItems} = useAppSelector(state => state.localGallery);
  const navigation = useNavigation<NavigationProps>();
  const size = props.size ?? 2;
  const imgSize = win.width / size - imgMargin * 2;
  const imgStyle = {width: imgSize, height: imgSize, margin: imgMargin};

  const isSelected = useMemo(
    () => selectedItems.some(item => props.image.id === item.id),
    [selectedItems, props.image],
  );

  const pickImage = () => {
    isSelected
      ? dispatch(deleteSelectedItem(props.image))
      : dispatch(addSelectedItem(props.image));
  };

  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      if (pickMode) {
        pickImage();
        return;
      }
      props.onTouch?.();
      dispatch(setCurrentImage(props.image));
      navigation.push(routes.slider);
    }
  });

  const longTap = Gesture.LongPress()
    .minDuration(500)
    .onEnd((event, success) => {
      if (success) {
        if (pickMode) {
          pickImage();
          return;
        }
        dispatch(addSelectedItem(props.image));
        dispatch(togglePickMode());
      }
      Vibration.vibrate();
    });
  const taps = Gesture.Exclusive(singleTap, longTap);

  return (
    <GestureDetector gesture={taps}>
      <View>
        <Image
          source={{uri: props.image.url}}
          key={props.image.id}
          style={[styles.image, imgStyle, isSelected && styles.selectedImage]}
        />
        {isSelected && (
          <Icon
            name="check"
            size={iconSize}
            color={COLORS.secondary}
            style={styles.icon}
          />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: iconSize,
    height: iconSize,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  image: {margin: imgMargin},
  selectedImage: {
    opacity: 0.8,
  },
});
