import { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import { Vehicle, VehicleCardProps } from "../types/global";

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPress,
  isVisible = true,
  delay = 0,
}) => {
  const titleTranslateX = useRef(new Animated.Value(-50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  const routeTranslateX = useRef(new Animated.Value(40)).current;
  const routeOpacity = useRef(new Animated.Value(0)).current;

  const imageTranslateX = useRef(new Animated.Value(100)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Sequence the animations
      const animationSequence = Animated.sequence([
        Animated.parallel([
          Animated.timing(titleTranslateX, {
            toValue: 0,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(routeTranslateX, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(routeOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(imageTranslateX, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
          }),
          Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]);

      animationSequence.start();
    }
  }, [isVisible, delay]);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.textContent}>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateX }],
            },
          ]}
        >
          {vehicle.title}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.route,
            {
              opacity: routeOpacity,
              transform: [{ translateY: routeTranslateX }],
            },
          ]}
        >
          {vehicle.route}
        </Animated.Text>
      </View>

      <Animated.Image
        source={vehicle.image}
        style={[
          styles.image,
          {
            opacity: imageOpacity,
            transform: [{ translateX: imageTranslateX }],
          },
        ]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 235,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: colors.white,
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginBottom: 4,
  },
  route: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray3,
    opacity: 0.8,
  },
  image: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 140,
    height: 140,
  },
});

export default VehicleCard;
