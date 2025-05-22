import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { PulseIndicatorProps } from "../../types/global";

const PulseIndicator: React.FC<PulseIndicatorProps> = ({
  color = "#7838D1",
  size = 30,
  pulseMaxSize = 80,
  speed = 1200,
}) => {
  // Animation values for each circle
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;

  // Animate in a loop
  useEffect(() => {
    const createAnimation = (value: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: speed,
            easing: Easing.out(Easing.ease),
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      );
    };

    // Start animations with staggered delays for a nice effect
    Animated.parallel([
      createAnimation(pulse1, 0),
      createAnimation(pulse2, speed * 0.33),
      createAnimation(pulse3, speed * 0.66),
    ]).start();

    return () => {
      // Cleanup animations when component unmounts
      pulse1.stopAnimation();
      pulse2.stopAnimation();
      pulse3.stopAnimation();
    };
  }, [speed, pulse1, pulse2, pulse3]);

  // Interpolate animation values to scales
  const getAnimationStyle = (pulseValue: Animated.Value) => {
    const pulseScale = pulseValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, pulseMaxSize / size],
    });

    const pulseOpacity = pulseValue.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0.8, 0.6, 0.2, 0],
    });

    return {
      transform: [{ scale: pulseScale }],
      opacity: pulseOpacity,
    };
  };

  // Create base style
  const baseCircleStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
  };

  return (
    <View style={styles.container}>
      <View style={styles.pulseContainer}>
        {/* Pulse circles */}
        <Animated.View
          style={[
            styles.pulseCircle,
            baseCircleStyle,
            getAnimationStyle(pulse1),
          ]}
        />
        <Animated.View
          style={[
            styles.pulseCircle,
            baseCircleStyle,
            getAnimationStyle(pulse2),
          ]}
        />
        <Animated.View
          style={[
            styles.pulseCircle,
            baseCircleStyle,
            getAnimationStyle(pulse3),
          ]}
        />
      </View>

      {/* Center circle (static) */}
      <View style={[styles.centerCircle, baseCircleStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  pulseContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  pulseCircle: {
    position: "absolute",
    zIndex: 0,
  },
  centerCircle: {
    zIndex: 1,
  },
});

export default PulseIndicator;
