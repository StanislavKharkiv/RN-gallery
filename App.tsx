import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {WebGallery} from './src/features/webGallery/WebGallery';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesture}>
        <WebGallery />
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
});

export default App;
