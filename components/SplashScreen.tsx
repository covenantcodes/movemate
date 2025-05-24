import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import colors from "../utils/colors";
import images from "../utils/images";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide splash screen after animations (3 seconds)
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={images.icon} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>MoveMate</Text>
      </Animated.View>
      <Text style={styles.tagline}>Your Shipping Partner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.iconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    fontFamily: "System",
  },
  tagline: {
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
  },
});

export default CustomSplashScreen;
