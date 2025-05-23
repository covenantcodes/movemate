import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
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
        {/* Destination Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination</Text>

          <View style={styles.inputsContainer}>
            {/* First Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="inboxArrowUp"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Sender location"
                placeholderTextColor={colors.gray}
              />
            </View>

            {/* Second Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="inboxArrowDown"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Receiver location"
                placeholderTextColor={colors.gray}
              />
            </View>

            {/* Third Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="scale"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Approx weight"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>
        </View>
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
    width: 40,
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  section: {
    marginVertical: 20,
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    color: colors.blue,
    marginBottom: 10,
  },
  inputsContainer: {
    width: "100%",
    backgroundColor: colors.white,
    shadowColor: colors.gray6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  inputBox: {
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 16,
    backgroundColor: colors.grayBg2,
    marginVertical: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: colors.gray6,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginLeft: 4,
  },
  text: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
});

export default CalculateScreen;
