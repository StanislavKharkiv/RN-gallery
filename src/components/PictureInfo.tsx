import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WebGalleryItem} from '../features/webGallery/types';
import {DownloadImage} from './DownloadImage';

interface PictureInfoProps {
  image: WebGalleryItem;
  dark?: boolean;
}
const ICON_SIZE = 20;
const ICON_COLOR = 'goldenrod';

export function PictureInfo({image, dark = false}: PictureInfoProps) {
  const textColor = dark ? styles.darkText : styles.lightText;
  return (
    <View style={styles.imageInfo}>
      {image.description && <Text style={textColor}>{image.description}</Text>}
      {image.alt_description && (
        <Text style={textColor}>{image.alt_description}</Text>
      )}
      <View style={styles.size}>
        <Text style={textColor}>width: {image.width}</Text>
        <Text style={textColor}>height: {image.height}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.like}>
          <Icon name="thumb-up-off-alt" size={ICON_SIZE} color={ICON_COLOR} />
          <Text style={textColor}> {image.likes}</Text>
        </View>
        <DownloadImage url={image.links.download}>
          <View style={styles.download}>
            <Icon name="file-download" size={ICON_SIZE} color={ICON_COLOR} />
          </View>
        </DownloadImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  size: {
    marginVertical: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  download: {
    borderColor: ICON_COLOR,
    borderWidth: 2,
    padding: 5,
    borderRadius: 50,
  },
  lightText: {
    color: 'white',
  },
  darkText: {
    color: 'black',
  },
});
