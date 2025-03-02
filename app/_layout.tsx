import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'expo-router/entry';
import Page1Screen from './screens/page1';
import Page2Screen from './screens/page2';
import Page3Screen from './screens/page3';
import Page4Screen from './screens/page4';
import QLSPScreen from './screens/QLSP';
import DetailScreen from './screens/Detail';

import AppScreen from './app';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './navigation/customDrawerContent';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootLayout() {
  // Bottom tab
  return (
    <Stack.Navigator initialRouteName="QLSP">
      <Stack.Screen name="app" component={AppScreen} options={{ headerShown: false }} />
      <Stack.Screen name="page1" component={Page1Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page2" component={Page2Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page3" component={Page3Screen} options={{ headerShown: false }} />
      <Stack.Screen name="page4" component={Page4Screen} options={{ headerShown: false }} />
      <Stack.Screen name="QLSP" component={QLSPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  // navigation ngang
  // return (
  //   <NavigationIndependentTree>
  //     <NavigationContainer>
  //       <Drawer.Navigator
  //         initialRouteName="page1"
  //         drawerContent={(props) => <CustomDrawerContent {...props} />}
  //       >
  //         <Drawer.Screen name="page1" component={Page1Screen} />
  //         <Drawer.Screen name="page2" component={Page2Screen} />
  //         <Drawer.Screen name="page3" component={Page3Screen} />
  //         <Drawer.Screen name="page4" component={Page4Screen} />
  //       </Drawer.Navigator>
  //     </NavigationContainer>
  //   </NavigationIndependentTree>
  // );
  

  // Tob Tab
  // return (
  //   <Drawer.Navigator
  //     initialRouteName="app">
  //     <Drawer.Screen name="app" component={AppScreen} />
  //   </Drawer.Navigator>
  // );
}
