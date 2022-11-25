import React from 'react';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {GalleryItem} from '../../../components/GalleryItem';
import {Photo} from '../../../types';

interface GalleryProps {
  photos: Photo[];
  likedPhotos: string[];
}

export function Gallery(props: GalleryProps) {
  const {photos, likedPhotos} = props;
  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView>
        <View style={styles.gallery}>
          {photos.map(item => (
            <GalleryItem
              item={item}
              key={item.id}
              liked={likedPhotos.some(id => id === item.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wrap: {
    flex: 1,
  },
});
