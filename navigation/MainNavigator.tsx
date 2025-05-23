import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/Home";
import CalculateScreen from "../screens/Calculate/Calculate";
import ShipmentScreen from "../screens/Shipments/Shipments";
import ProfileScreen from "../screens/Profile/Profile";

import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: route.name === "Shipment" ? "none" : "flex",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calculate" component={CalculateScreen} />
      <Tab.Screen name="Shipment" component={ShipmentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
