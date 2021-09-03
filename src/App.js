/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { RootNavigator } from './navigator/rootNavigator';
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
