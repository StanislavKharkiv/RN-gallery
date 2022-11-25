import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils';

interface ButtonProps {
  onTouch: () => void;
  text: string;
}

export function Button(props: ButtonProps) {
  const {onTouch, text} = props;

  return (
    <TouchableOpacity style={styles.btn} onPress={() => onTouch()}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    width: '50%',
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  btnText: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
