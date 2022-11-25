import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch} from '../app/hooks';
import {setFavoriteImage} from '../features/imageViewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Photo} from '../types';
import {DownloadImage} from './DownloadImage';
import {COLORS} from '../utils';
import {routes} from '../routes';

interface PictureInfoProps {
  image: Photo;
  dark?: boolean;
}
const ICON_SIZE = 20;

export function PictureInfo({image, dark = false}: PictureInfoProps) {
  const dispatch = useAppDispatch();
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
      <Link to={{screen: routes.user, params: {username: image.user.username}}}>
        <Text style={textColor}>
          Author: <Text style={styles.author}>{image.user.username}</Text>
        </Text>
      </Link>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => dispatch(setFavoriteImage(image.id))}>
          <View style={styles.like}>
            <Icon
              name="thumb-up-off-alt"
              size={ICON_SIZE}
              color={COLORS.secondary}
            />
            <Text style={textColor}> {image.likes}</Text>
          </View>
        </TouchableOpacity>
        <DownloadImage url={image.links.download}>
          <View style={styles.download}>
            <Icon
              name="file-download"
              size={ICON_SIZE}
              color={COLORS.secondary}
            />
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
    borderColor: COLORS.secondary,
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
  author: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: COLORS.secondary,
  },
});
