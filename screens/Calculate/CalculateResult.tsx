import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import images from "../../utils/images";
import Icon from "../../components/common/Icon";

const CalculateResult = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  // You can pass the calculated amount as a param when navigating to this screen
  const { amount = "1460" } = route.params || {};

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Icon name="truck" size={32} color={colors.secondaryColor} />
          <Text style={styles.logoText}>MoveMate</Text>
        </View>

        {/* Box Image */}
        <View style={styles.imageContainer}>
          <Image
            source={images.box}
            style={styles.boxImage}
            resizeMode="contain"
          />
        </View>

        {/* Result Section */}
        <View style={styles.resultContainer}>
          <Text style={styles.estimatedTitle}>Total Estimated Amount</Text>
          <Text style={styles.estimatedAmount}>${amount} USD</Text>
          <Text style={styles.disclaimer}>
            This amount is estimated, this will vary if you change your location
            or weight.
          </Text>
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBackToHome}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.xl,
    color: colors.primaryColor,
    marginLeft: 8,
  },
  imageContainer: {
    marginBottom: 40,
  },
  boxImage: {
    width: 150,
    height: 150,
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  estimatedTitle: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginBottom: 12,
  },
  estimatedAmount: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.xxl,
    color: colors.green,
    marginBottom: 16,
  },
  disclaimer: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    backgroundColor: colors.secondaryColor,
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: colors.secondaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.lg,
    color: colors.white,
  },
});

export default CalculateResult;
