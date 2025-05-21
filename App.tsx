import { StyleSheet, View, Platform } from "react-native";
import { useFonts } from "expo-font";
import { PulseIndicator } from "react-native-indicators";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import colors from "./utils/colors";
import HomeScreen from "./screens/Home/Home";
import CalculateScreen from "./screens/Calculate/Calculate";
import ShipmentsScreen from "./screens/Shipments/Shipments";
import ProfileScreen from "./screens/Profile/Profile";
import { FONTFAMILY } from "./utils/fonts";
import CustomTabBar from "./components/CustomTabBar";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSansThin: require("./assets/fonts/DMSans-Thin.ttf"),
    DMSansThinItalic: require("./assets/fonts/DMSans-ThinItalic.ttf"),
    DMSansLight: require("./assets/fonts/DMSans-Light.ttf"),
    DMSansExtraLight: require("./assets/fonts/DMSans-ExtraLight.ttf"),
    DMSansMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMSansMediumItalic: require("./assets/fonts/DMSans-MediumItalic.ttf"),
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansSemiBold: require("./assets/fonts/DMSans-SemiBold.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMSansExtraBold: require("./assets/fonts/DMSans-ExtraBold.ttf"),
    DMSansExtraBoldItalic: require("./assets/fonts/DMSans-ExtraBoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <PulseIndicator color={colors.primaryBg} />
      </View>
    );
  }

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
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
