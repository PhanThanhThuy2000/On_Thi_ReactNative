import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Page1Screen from '../screens/page1';
import Page2Screen from '../screens/page2';
import Page3Screen from '../screens/page3';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#666',
                tabBarIndicatorStyle: { backgroundColor: '#FFD700' },
                tabBarStyle: { backgroundColor: '#f5f5f5' },
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Page1Screen}
                options={{
                    tabBarLabel: 'Page1Screen',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="home" size={20} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Category"
                component={Page2Screen}
                options={{
                    tabBarLabel: 'Page2Screen',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="category" size={20} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Page3Screen}
                options={{
                    tabBarLabel: 'Page3Screen',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="settings" size={20} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TopTabNavigator;
