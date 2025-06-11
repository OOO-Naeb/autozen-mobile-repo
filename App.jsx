import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './src/screens/AppStack';
import {LogBox} from 'react-native';
import {CartProvider} from './src/screens/CartContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <CartProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </CartProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
LogBox.ignoreLogs(['Text strings must be rendered within a <Text>']);
export default App;
