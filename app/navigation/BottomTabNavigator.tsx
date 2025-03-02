import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Page1Screen from "../screens/page1";
import Page2Screen from "../screens/page2";
import Page3Screen from "../screens/page3";
import Page4Screen from "../screens/page4";

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case "page1":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "page2":
                            iconName = focused ? "cart" : "cart-outline";
                            break;
                        case "page3":
                            iconName = focused ? "heart" : "heart-outline";
                            break;
                        case "page4":
                            iconName = focused ? "notifications" : "notifications-outline";
                            break;
                        default:
                            iconName = "help-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#c67d4d",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#0C0F14",
                    paddingBottom: 10,
                    height: 60,
                },
            })}
        >
            <Tab.Screen name="page1" component={Page1Screen} options={{ headerShown: false }} />
            <Tab.Screen name="page2" component={Page2Screen} options={{ headerShown: false }} />
            <Tab.Screen name="page3" component={Page3Screen} options={{ headerShown: false }} />
            <Tab.Screen name="page4" component={Page4Screen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
