import React, { useState, useCallback, useEffect } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import AppNavigator from "./navigation/AppNavigator";
import CustomSplashScreen from "./components/SplashScreen";
import PulseIndicator from "./components/common/PulseIndicator";

import colors from "./utils/colors";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    DMSansThin: require("./assets/fonts/DMSans-Thin.ttf"),
    DMSansThinItalic: require("./assets/fonts/DMSans-ThinItalic.ttf"),
    DMSansLight: require("./assets/fonts/DMSans-Light.ttf"),
    DMSansExtraLight: require("./assets/fonts/DMSans-ExtraLight.ttf"),
    DMSansMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    NotoSansMedium: require("./assets/fonts/NotoSans-Medium.ttf"),
    NotoSansSemiBold: require("./assets/fonts/NotoSans-SemiBold.ttf"),
    DMSansMediumItalic: require("./assets/fonts/DMSans-MediumItalic.ttf"),
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansSemiBold: require("./assets/fonts/DMSans-SemiBold.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMSansBoldItalic: require("./assets/fonts/DMSans-BoldItalic.ttf"),
    DMSansExtraBold: require("./assets/fonts/DMSans-ExtraBold.ttf"),
    DMSansExtraBoldItalic: require("./assets/fonts/DMSans-ExtraBoldItalic.ttf"),
  });

  // Use this function to hide the splash screen when ready
  const onFinishSplash = useCallback(async () => {
    try {
      // Hide the splash screen
      await SplashScreen.hideAsync();
      // Now show your app
      setShowSplash(false);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Load any resources or data needed for your app
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Artificially delay for a smoother startup experience
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  if (showSplash) {
    return <CustomSplashScreen onFinish={onFinishSplash} />;
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <PulseIndicator color={colors.primaryBg} size={40} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppNavigator />
    </SafeAreaProvider>
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
