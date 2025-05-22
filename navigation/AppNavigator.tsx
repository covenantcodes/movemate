import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/Home";
import CalculateScreen from "../screens/Calculate/Calculate";
import ShipmentScreen from "../screens/Shipments/Shipments";
import ProfileScreen from "../screens/Profile/Profile";
import SearchPage from "../screens/Search/Search";

import CustomTabBar from "../components/CustomTabBar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calculate" component={CalculateScreen} />
      <Tab.Screen name="Shipment" component={ShipmentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
