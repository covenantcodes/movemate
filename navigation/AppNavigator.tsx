import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "../screens/Home/Home";
import CalculateScreen from "../screens/Calculate/Calculate";
import ShipmentsScreen from "../screens/Shipments/Shipments";
import ProfileScreen from "../screens/Profile/Profile";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 0,
            display: "none",
          },
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calculate" component={CalculateScreen} />
        <Tab.Screen name="Shipment" component={ShipmentsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
