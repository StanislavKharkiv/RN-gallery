import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebGalleryItem} from '../features/webGallery/types';

interface PictureInfoProps {
  image: WebGalleryItem;
}

export function PictureInfo({image}: PictureInfoProps) {
  return (
    <View style={styles.imageInfo}>
      {image.description && <Text>{image.description}</Text>}
      {image.alt_description && <Text>{image.alt_description}</Text>}
      <View style={styles.size}>
        <Text>width: {image.width}</Text>
        <Text>height: {image.height}</Text>
      </View>
      <View style={styles.likes}>
        <Icon name="thumb-up-off-alt" size={20} color="black" />
        <Text> {image.likes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'black',
  },
  size: {
    marginVertical: 10,
  },
  likes: {
    flexDirection: 'row',
  },
});
