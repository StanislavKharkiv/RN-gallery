import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/app/store';
import {WebGallery} from './src/features/webGallery/WebGallery';
import {PictureSlider} from './src/components/PictureSlider';
import {routes} from './src/routes';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesture}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={routes.unsplash}
              component={WebGallery}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={routes.local}
              component={PictureSlider}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
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
