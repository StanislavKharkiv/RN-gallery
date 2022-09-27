import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {PictureInfo} from './PictureInfo';
import {WebGalleryItem} from '../features/webGallery/types';
import {Coordinates} from '../types';
import {TapGestureHandler} from 'react-native-gesture-handler';

interface ImageModalProps {
  image: WebGalleryItem;
  coords: Coordinates;
  closeModal: () => void;
}
const {height} = Dimensions.get('window');

export function ImageModal({image, coords, closeModal}: ImageModalProps) {
  const modalCoords =
    height / 2 < coords.y ? {bottom: height - coords.y} : {top: coords.y};

  return (
    <TapGestureHandler onHandlerStateChange={() => closeModal()}>
      <View style={styles.wrapper}>
        <View style={[styles.modal, modalCoords]}>
          <PictureInfo image={image} />
        </View>
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  modal: {
    position: 'absolute',
    left: 10,
    right: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255, .9)',
  },
});
