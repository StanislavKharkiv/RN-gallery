import React, {useState, ReactElement, Children, cloneElement} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export function GalleryWrapper(props: {children: ReactElement[]}) {
  const [imageSize, setImageSize] = useState(2);
  const pinchGesture = Gesture.Pinch().onUpdate(e => {
    if (e.scale > 1.2) {
      setImageSize(3);
    } else if (e.scale < 0.8) {
      setImageSize(1);
    } else {
      setImageSize(2);
    }
  });

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <GestureDetector gesture={pinchGesture}>
          <View style={styles.gallery}>
            {Children.map(props.children, child => {
              return cloneElement(child, {size: imageSize});
            })}
          </View>
        </GestureDetector>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
