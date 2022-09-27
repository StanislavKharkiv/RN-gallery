import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {fetchWebGallery} from '../webGalleryThunk';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {STYLE} from '../../../constants';

export function Pagination({icon}: {icon: string}) {
  const dispatch = useAppDispatch();
  const {fetchParams, total_pages, total} = useAppSelector(
    state => state.webGallery,
  );
  const {page} = fetchParams;

  const handlePrevPage = () => {
    if (page <= 1) return;
    dispatch(fetchWebGallery({page: page - 1}));
  };
  const handleNextPage = () => {
    if (total_pages && page >= total_pages) return;
    dispatch(fetchWebGallery({page: page + 1}));
  };

  return (
    <View style={styles.pagination}>
      <Icon style={styles.arrow} name={icon} />
      <TouchableOpacity onPress={handlePrevPage}>
        <Icon name="navigate-before" size={40} />
      </TouchableOpacity>
      <Text style={styles.data}>
        Found images: <Text style={styles.pageNumber}>{total}</Text>
      </Text>
      <Text style={styles.data}>
        Page: <Text style={styles.pageNumber}>{fetchParams.page}</Text>
      </Text>
      <TouchableOpacity onPress={handleNextPage}>
        <Icon name="navigate-next" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const arrowWidth = 20;
const arrowPadding = 0;
const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    ...STYLE.shadow,
  },
  arrow: {
    position: 'absolute',
    left: '50%',
    top: 0 - arrowWidth / 2 - arrowPadding,
    padding: arrowPadding,
    fontSize: arrowWidth,
    borderRadius: 50,
    zIndex: 2,
    backgroundColor: 'white',
    transform: [
      {rotate: '-90deg'},
      {translateY: -arrowWidth / 2 - arrowPadding},
    ],
  },
  data: {
    fontSize: 18,
    color: 'gray',
  },
  pageNumber: {
    color: 'black',
    fontWeight: '500',
  },
});
