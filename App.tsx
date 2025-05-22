import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import PulseIndicator from "./components/common/PulseIndicator";

import colors from "./utils/colors";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSansThin: require("./assets/fonts/DMSans-Thin.ttf"),
    DMSansThinItalic: require("./assets/fonts/DMSans-ThinItalic.ttf"),
    DMSansLight: require("./assets/fonts/DMSans-Light.ttf"),
    DMSansExtraLight: require("./assets/fonts/DMSans-ExtraLight.ttf"),
    DMSansMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    NotoSansMedium: require("./assets/fonts/NotoSans-Medium.ttf"),
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
        <PulseIndicator color={colors.primaryBg} size={40} />
      </View>
    );
  }

  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
