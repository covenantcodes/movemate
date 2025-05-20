import { StyleSheet, Text, View, Platform } from "react-native";
import { useFonts } from "expo-font";
import { PulseIndicator } from "react-native-indicators";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Calculator, Package, User } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "./utils/colors";
import HomeScreen from "./screens/Home/Home";
import CalculateScreen from "./screens/Calculate/Calculate";
import ShipmentsScreen from "./screens/Shipments/Shipments";
import ProfileScreen from "./screens/Profile/Profile";

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
          tabBarActiveTintColor: colors.primaryColor,
          tabBarInactiveTintColor: colors.grayBg,
          tabBarLabelStyle: {
            fontFamily: "DMSansMedium",
            fontSize: 12,
            marginBottom: 10,
            marginTop: 8,
          },
          tabBarStyle: {
            height: Platform.OS === "ios" ? 110 : 100,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTab]}>
                {focused && <View style={styles.tabBorder} />}
                <MaterialCommunityIcons
                  name="home-outline"
                  size={28}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Calculate"
          component={CalculateScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTab]}>
                {focused && <View style={styles.tabBorder} />}
                <MaterialCommunityIcons
                  name="calculator-variant-outline"
                  size={26}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Shipment"
          component={ShipmentsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTab]}>
                {focused && <View style={styles.tabBorder} />}
                <MaterialCommunityIcons
                  name="history"
                  size={size}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTab]}>
                {focused && <View style={styles.tabBorder} />}
                <MaterialCommunityIcons
                  name="account-outline"
                  size={size}
                  color={color}
                />
              </View>
            ),
          }}
        />
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
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  activeTab: {},
  tabBorder: {
    position: "absolute",
    top: 0,
    width: 100,
    height: 3,
    backgroundColor: colors.primaryColor,
    borderRadius: 2,
    marginTop: -3,
  },
});
