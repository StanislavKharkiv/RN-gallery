import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Row({label, text}: {label: string; text: string | number}) {
  return (
    <View style={styles.wrapper}>
      <Text>{label}</Text>
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rowText: {
    color: 'black',
    maxWidth: '70%',
    textAlign: 'right',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
