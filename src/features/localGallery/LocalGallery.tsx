import React, {useEffect, useState} from 'react';
import {NativeScrollEvent, Platform, StyleSheet, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Button} from '../../components/Button';
import {GalleryWrapper} from '../../components/GalleryWrapper';
import {GalleryImage} from './components/GalleryImage';
import {hasAndroidPermission} from '../../helpers';
import {useAppDispatch} from '../../app/hooks';
import {setImages} from '../imageViewer';
import {ViewerPhoto} from '../../types';

const imgPerPage = 30;

export function LocalGallery() {
  const dispatch = useAppDispatch();
  const [photos, setPhotos] = useState<ViewerPhoto[]>([]);
  const [lastImage, setLastImage] = useState('0');
  const [isAllImgLoaded, setIsAllImgLoaded] = useState(false);
  const [isLoadImg, setIsLoadImg] = useState(false);
  const pickImages = (last?: boolean) => {
    setIsLoadImg(true);
    CameraRoll.getPhotos({
      first: last ? 1 : imgPerPage,
      assetType: 'Photos',
      groupTypes: 'All',
      after: last ? '0' : lastImage,
      include: ['filename', 'imageSize'],
    })
      .then(r => {
        const nextPhotos = r.edges.map(({node}) => ({
          id: String(node.timestamp),
          url: node.image.uri,
          description: node.image.filename ?? undefined,
          width: node.image.width,
          height: node.image.height,
        }));
        const newPhotosArr = [...photos, ...nextPhotos];
        console.log(newPhotosArr);
        setPhotos(newPhotosArr);
        dispatch(setImages(newPhotosArr));
        if (last) {
          setLastImage(String(+lastImage + 1));
          return;
        }
        if (r.page_info.end_cursor) setLastImage(r.page_info.end_cursor);
        if (!r.page_info.has_next_page) setIsAllImgLoaded(true);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoadImg(false));
  };

  useEffect(() => {
    hasAndroidPermission('read').then(hasPermission => {
      if (Platform.OS === 'android' && !hasPermission) return;
      pickImages();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchPhoto = async () => {
    if (isLoadImg) return;
    const result = await launchCamera({mediaType: 'photo', saveToPhotos: true});
    if (result.assets) pickImages(true);
  };

  const onScroll = async (e: NativeScrollEvent) => {
    if (isLoadImg || isAllImgLoaded) return;
    const scrollEnd = e.contentSize.height - e.layoutMeasurement.height - 10;
    if (scrollEnd <= e.contentOffset.y) pickImages();
  };

  return (
    <View style={styles.wrapper}>
      {photos && (
        <GalleryWrapper onScroll={onScroll}>
          {photos.map(item => (
            <GalleryImage image={item} key={item.id} />
          ))}
        </GalleryWrapper>
      )}
      <View style={styles.btnWrap}>
        <Button
          text={isLoadImg ? 'loading...' : 'make photo'}
          onTouch={onTouchPhoto}
          disabled={isLoadImg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  btnWrap: {alignItems: 'center'},
});
