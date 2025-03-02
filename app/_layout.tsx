import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import Page1Screen from './screens/page1';
import Page2Screen from './screens/page2';
import Page3Screen from './screens/page3';
import Page4Screen from './screens/page4';
import QLSVScreen from './screens/QLSV';
import DetailScreen from './screens/Detail';

import AppScreen from './app';

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="QLSV">
      <Stack.Screen name="app" component={AppScreen} options={{ headerShown: false }} />
      <Stack.Screen name="page1" component={Page1Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page2" component={Page2Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page3" component={Page3Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page4" component={Page4Screen} options={{ headerShown: false }} />
      <Stack.Screen name="QLSV" component={QLSVScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
