import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { PulseIndicator } from "react-native-indicators";
import colors from "./utils/colors";

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
    <View>
      <Text>Heloo</Text>
    </View>
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
