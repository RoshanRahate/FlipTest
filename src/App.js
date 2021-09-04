/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {memo} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {RootNavigator} from './navigator/rootNavigator';

const App = () => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <RootNavigator />
  </SafeAreaProvider>
);

export default memo(App);
