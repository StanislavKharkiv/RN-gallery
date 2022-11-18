import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {store} from './src/app/store';
import {WebGallery} from './src/features/webGallery/WebGallery';
import {PictureSlider} from './src/components/PictureSlider';
import {HeaderRight} from './src/components/HeaderRight';
import {User} from './src/features/user/User';
import {routes} from './src/routes';
import {COLORS} from './src/utils';

const Stack = createNativeStackNavigator();
const screenOptions: NativeStackNavigationOptions = {
  headerTintColor: COLORS.primary,
  headerBackButtonMenuEnabled: true,
  headerTitleAlign: 'center',
  headerRight: () => <HeaderRight />,
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesture}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={routes.unsplash}
              component={WebGallery}
              options={{title: 'Unsplash images', ...screenOptions}}
            />
            <Stack.Screen
              name={routes.slider}
              component={PictureSlider}
              options={{title: 'Picture details', ...screenOptions}}
            />
            <Stack.Screen
              name={routes.user}
              component={User}
              options={{title: 'User profile', ...screenOptions}}
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
