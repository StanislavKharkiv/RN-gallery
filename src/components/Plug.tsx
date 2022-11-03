import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export function Plug({text}: {text: string}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.plugText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  plugText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 22,
  },
});
