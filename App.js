import React from 'react';
import Index from './src';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';

const App = () => {
    return (
      <NavigationContainer>
          <Index />
      </NavigationContainer>
  );
}

export default App;