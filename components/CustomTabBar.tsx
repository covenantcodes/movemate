import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import { Platform } from "react-native";
import Icon from "./common/Icon";

const { width } = Dimensions.get("window");

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(100)).current; // This starts off-screen (below)
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const itemWidth = width / state.routes.length;

  // Set initial position and animate entry
  useEffect(() => {
    // Slide in from bottom animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: 300, // Short delay before starting
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)), // Slight bounce effect
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Set initial indicator position
    slideToIndex(state.index);
  }, []);

  // Animate when the index changes
  useEffect(() => {
    slideToIndex(state.index);
  }, [state.index]);

  const slideToIndex = (index: number) => {
    Animated.timing(translateX, {
      toValue: index * itemWidth,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start();
  };

  // Use named icons from the icon map
  const getIconName = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return "home";
      case "Calculate":
        return "calculate";
      case "Shipment":
        return "shipment";
      case "Profile":
        return "profile";
      default:
        return "home";
    }
  };

  const getIconSize = (routeName: string) => {
    switch (routeName) {
      case "Calculate":
        return 26;
      default:
        return 28;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {/* Animated indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX }],
              width: itemWidth,
            },
          ]}
        >
          <View style={styles.indicatorInner} />
        </Animated.View>

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconName = getIconName(route.name);
          const iconSize = getIconSize(route.name);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Icon
                name={iconName as any}
                size={iconSize}
                color={isFocused ? colors.primaryColor : colors.grayBg}
              />
              <View style={styles.labelContainer}>
                <Animated.Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? colors.primaryColor : colors.grayBg },
                  ]}
                >
                  {route.name}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Adding shadow for better visual separation
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabContainer: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 70 : 90,
    backgroundColor: colors.white,
    position: "relative",
  },
  indicator: {
    position: "absolute",
    top: 0,
    height: 3,
    zIndex: 10,
    alignItems: "center",
  },
  indicatorInner: {
    width: 100,
    height: 3,
    backgroundColor: colors.primaryColor,
    borderRadius: 2,
  },
  tabButton: {
    flex: 1,
    marginTop: 12,
    alignItems: "center",
  },
  tabLabel: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    marginTop: 4,
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomTabBar;
