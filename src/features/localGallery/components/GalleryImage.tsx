import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '../../../app/hooks';
import {routes} from '../../../routes';
import {NavigationProps, ViewerPhoto} from '../../../types';
import {setCurrentImage} from '../../imageViewer';

const win = Dimensions.get('window');
const imgMargin = 5;

interface GalleryImageProps {
  image: ViewerPhoto;
  size?: number;
}
export function GalleryImage(props: GalleryImageProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const size = props.size ?? 2;
  const imgSize = win.width / size - imgMargin * 2;
  const imgStyle = {width: imgSize, height: imgSize, margin: imgMargin};
  const onTouch = () => {
    dispatch(setCurrentImage(props.image));
    navigation.push(routes.slider);
  };

  return (
    <TouchableOpacity onPress={onTouch}>
      <Image
        source={{uri: props.image.url}}
        key={props.image.id}
        style={[styles.image, imgStyle]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {margin: imgMargin},
});
