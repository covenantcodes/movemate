import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainNavigator from "./MainNavigator";
import SearchPage from "../screens/Search/Search";
import CalculateResult from "../screens/Calculate/CalculateResult";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainNavigator} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="CalculateResult" component={CalculateResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
