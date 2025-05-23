import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import Icon from "../../components/common/Icon";
import images from "../../utils/images";

const ProfileScreen = ({ navigation }: any) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const avatarAnim = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const buttonTranslateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Run entrance animations
    Animated.sequence([
      // First animate the avatar
      Animated.timing(avatarAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),

      // Then animate the content with slight delay between each element
      Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]),
    ]).start();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrowLeft" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Avatar with animated appearance */}
        <Animated.View
          style={[
            styles.avatarContainer,
            {
              opacity: avatarAnim,
              transform: [
                {
                  scale: Animated.add(0.5, Animated.multiply(avatarAnim, 0.5)),
                },
              ],
            },
          ]}
        >
          <View style={styles.avatarInner}>
            <Icon name="bell" size={80} color={colors.primaryColor} />
          </View>
        </Animated.View>

        {/* Coming Soon Text */}
        <Animated.View
          style={[
            styles.comingSoonContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            We're working hard to bring you a personalized profile experience.
            Check back soon for updates!
          </Text>
        </Animated.View>

        {/* Return Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Return to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  header: {
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.lg,
    fontFamily: FONTFAMILY.medium,
    color: colors.white,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(75, 44, 163, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  avatarInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(75, 44, 163, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  comingSoonContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  comingSoonTitle: {
    fontFamily: FONTFAMILY.bold,
    fontSize: 28,
    color: colors.primaryColor,
    marginBottom: 16,
  },
  comingSoonText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 24,
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: colors.secondaryColor,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.secondaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.white,
  },
});

export default ProfileScreen;
