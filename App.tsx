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
import {ImageSlider} from './src/features/imageViewer';
import {HeaderRight} from './src/components/HeaderRight';
import {HeaderLeft} from './src/components/HeaderLeft';
import {User} from './src/features/user/User';
import {routes} from './src/routes';
import {COLORS} from './src/utils';
import {RootStackParamList} from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const screenOptions: NativeStackNavigationOptions = {
  headerTintColor: COLORS.secondary,
  headerBackButtonMenuEnabled: true,
  headerTitleAlign: 'center',
  headerRight: () => <HeaderRight />,
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gesture}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={routes.unsplash}>
            <Stack.Screen
              name={routes.unsplash}
              component={WebGallery}
              options={{
                ...screenOptions,
                title: 'Unsplash images',
              }}
            />
            <Stack.Screen
              name={routes.slider}
              component={ImageSlider}
              options={{
                ...screenOptions,
                title: 'Picture details',
                headerLeft: () => <HeaderLeft />,
              }}
            />
            <Stack.Screen
              name={routes.user}
              component={User}
              options={{
                ...screenOptions,
                title: 'User profile',
                headerLeft: () => <HeaderLeft to={routes.unsplash} />,
              }}
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
