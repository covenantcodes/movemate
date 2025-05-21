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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import { Platform } from "react-native";

const { width } = Dimensions.get("window");

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const itemWidth = width / state.routes.length;

  // Set initial position
  useEffect(() => {
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

  const getIconName = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return "home-outline";
      case "Calculate":
        return "calculator-variant-outline";
      case "Shipment":
        return "history";
      case "Profile":
        return "account-outline";
      default:
        return "home-outline";
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
            <MaterialCommunityIcons
              name={getIconName(route.name)}
              size={getIconSize(route.name)}
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
  );
};

const styles = StyleSheet.create({
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
    width: 70,
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
