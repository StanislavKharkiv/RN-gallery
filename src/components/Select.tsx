import {Picker} from '@react-native-picker/picker';
import React, {Key} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

interface SelectProps<T> {
  items: Array<T>;
  value?: T;
  onChange: (item: T) => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
}
export function Select<T>(props: SelectProps<T>) {
  const {items, value, onChange, label, style} = props;

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.wrap}>
        <Picker
          style={styles.picker}
          selectedValue={value ?? items[0]}
          mode="dropdown"
          onValueChange={(itemValue: T) => onChange(itemValue)}>
          {items.map(item => (
            <Picker.Item label={String(item)} value={item} key={item as Key} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    overflow: 'hidden',
  },
  label: {
    marginBottom: 2,
    marginLeft: 2,
    color: 'black',
  },
  picker: {
    top: -8,
  },
});
