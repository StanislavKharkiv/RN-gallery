import React from 'react';
import {StyleSheet, TextInput, Button, Animated, View} from 'react-native';
import {Select} from '../../../components/Select';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {fetchImages} from '../webGalleryThunk';
import {WebGalleryFetchParams} from '../types';
import {COLORS} from '../../../utils';

const IMG_PER_PAGE: Array<number> = [10, 20, 30];
const ORIENTATION: Array<WebGalleryFetchParams['orientation']> = [
  'landscape',
  'portrait',
  'squarish',
];
const ORDER_LIST: Array<WebGalleryFetchParams['order_by']> = [
  'latest',
  'oldest',
  'popular',
  'views',
  'downloads',
];

interface FiltersProps {
  height: Animated.Value;
  onSubmit?: () => void;
}

export function Filters({height, onSubmit}: FiltersProps) {
  const dispatch = useAppDispatch();
  const {
    fetchParams: {category, per_page, orientation, order_by},
  } = useAppSelector(state => state.webGallery);
  const [filter, setFilter] = React.useState({
    category,
    per_page,
    orientation,
    order_by,
  });

  const handleFilterSubmit = () => {
    dispatch(fetchImages(filter)).then(() => onSubmit?.());
  };

  return (
    <Animated.View style={{...styles.filter, height}}>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={filter.category}
          onChangeText={value => setFilter({...filter, category: value})}
        />
        <Select
          items={IMG_PER_PAGE}
          onChange={value => setFilter({...filter, per_page: value})}
          value={filter.per_page}
          label="Picture per page"
          style={styles.select}
        />
        <Select
          items={ORIENTATION}
          onChange={value => setFilter({...filter, orientation: value})}
          value={filter.orientation}
          label="Orientation"
          style={styles.select}
        />
        <Select
          items={ORDER_LIST}
          onChange={value => setFilter({...filter, order_by: value})}
          value={filter.order_by}
          label="Order by"
          style={styles.select}
        />
      </View>
      <Button
        title="get"
        onPress={handleFilterSubmit}
        color={COLORS.secondary}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  filter: {
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  inputWrap: {
    justifyContent: 'flex-end',
    padding: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 6,
    fontSize: 18,
    height: 40,
    padding: 10,
    color: 'black',
  },
  select: {
    marginVertical: 6,
  },
});
