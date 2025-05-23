import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import Icon from "../../components/common/Icon";
import { useNavigation } from "@react-navigation/native";

const CalculateScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Icon name="arrowLeft" size={28} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Calculate</Text>

          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>Calculate Screen Content</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor, // Apply primary color to the SafeAreaView for header area
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.xl,
    fontFamily: FONTFAMILY.semibold,
    color: colors.white,
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40, // Same width as backButton for alignment
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
});

export default CalculateScreen;
