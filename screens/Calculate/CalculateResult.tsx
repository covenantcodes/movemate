import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import images from "../../utils/images";
import Icon from "../../components/common/Icon";

const CalculateResult = ({ route }: { route: any }) => {
  const navigation = useNavigation<any>();
  const { amount = "1460" } = route.params || {};
  const [displayAmount, setDisplayAmount] = useState("0");
  const amountValue = parseInt(amount, 10);
  const animationProgress = useRef(new Animated.Value(0)).current;

  // Effect to trigger the count-up animation when component mounts
  useEffect(() => {
    // Animate from 0 to 1 over 2 seconds
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 2000, // 2 seconds
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();

    // Update the displayed amount as the animation progresses
    const listener = animationProgress.addListener(({ value }) => {
      const currentAmount = Math.floor(value * amountValue);
      setDisplayAmount(currentAmount.toString());
    });

    // Clean up listener when component unmounts
    return () => {
      animationProgress.removeListener(listener);
    };
  }, [amountValue]);

  const handleBackToHome = () => {
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MoveMate</Text>
          <Icon name="truck" size={32} color={colors.secondaryColor} />
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
          <Text style={styles.estimatedAmount}>${displayAmount} USD</Text>
          <Text style={styles.disclaimer}>
            This amount is estimated, this will vary if you change your location
            or weight.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleBackToHome}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
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
    fontFamily: FONTFAMILY.boldItalic,
    fontSize: FONTSIZE.xxxl,
    color: colors.primaryColor,
    marginLeft: 8,
  },
  imageContainer: {
    marginBottom: 40,
  },
  boxImage: {
    width: 200,
    height: 200,
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  estimatedTitle: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.xl,
    color: colors.black,
    marginBottom: 12,
  },
  estimatedAmount: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.xxl,
    color: colors.green,
    marginBottom: 16,
  },
  disclaimer: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 24,
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
