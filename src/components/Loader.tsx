import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils';

export function Loader() {
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotationAnim]);

  return (
    <View style={styles.loader}>
      <Animated.View style={{transform: [{rotate: rotation}]}}>
        <Icon name="loop" size={70} color={COLORS.secondary} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 30,
  },
});
