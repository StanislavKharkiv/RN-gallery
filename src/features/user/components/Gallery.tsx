import React from 'react';
import {GalleryItem} from '../../../components/GalleryItem';
import {GalleryWrapper} from '../../../components/GalleryWrapper';
import {Photo} from '../../../types';

interface GalleryProps {
  photos: Photo[];
  likedPhotos: string[];
}

export function Gallery(props: GalleryProps) {
  const {photos, likedPhotos} = props;
  return (
    <GalleryWrapper>
      {photos.map(item => (
        <GalleryItem
          item={item}
          key={item.id}
          liked={likedPhotos.some(id => id === item.id)}
        />
      ))}
    </GalleryWrapper>
  );
}
