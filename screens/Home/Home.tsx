import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import DashboardHeader from "../../components/DashboardHeader";
import TrackingCard from "../../components/TrackingCard";
import { shipments } from "../../data/data";

const HomeScreen = () => {
  // Animation values for each card
  const cardAnimations = useRef(
    shipments.map(() => ({
      translateY: new Animated.Value(100),
      opacity: new Animated.Value(0),
    }))
  ).current;

  // Animation for the "Tracking" section header
  const trackingTextY = useRef(new Animated.Value(40)).current;
  const trackingTextOpacity = useRef(new Animated.Value(0)).current;

  // Reference for ScrollView to track scroll position
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Function to start the animations
  const animateCards = () => {
    // First animate the "Tracking" section header
    Animated.parallel([
      Animated.timing(trackingTextY, {
        toValue: 0,
        duration: 500,
        delay: 200, // Start slightly before cards
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(trackingTextOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Then animate each card with a staggered delay
    cardAnimations.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 1200,
          delay: 300 + index * 100, // Stagger effect
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 1000,
          delay: 300 + index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // Listen for scroll events to trigger animations for cards coming into view
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // You can add additional logic here if needed
      },
    }
  );

  // Start animations when component mounts
  useEffect(() => {
    animateCards();
  }, []);

  const handleAddStop = (shipmentId: string) => {
    console.log(`Add stop pressed for shipment ${shipmentId}`);
    // Handle adding a stop
  };

  const handleCardPress = (shipmentId: string) => {
    console.log(`Card pressed for shipment ${shipmentId}`);
    // Navigate to shipment details
  };

  return (
    <View style={styles.container}>
      <DashboardHeader />

      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.trackingSection,
            {
              opacity: trackingTextOpacity,
              transform: [{ translateY: trackingTextY }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Tracking</Text>
        </Animated.View>

        {shipments.map((shipment, index) => (
          <Animated.View
            key={shipment.id}
            style={[
              styles.cardContainer,
              {
                opacity: cardAnimations[index].opacity,
                transform: [{ translateY: cardAnimations[index].translateY }],
              },
            ]}
          >
            <TrackingCard
              shipment={shipment}
              onAddStop={() => handleAddStop(shipment.id)}
              onPress={() => handleCardPress(shipment.id)}
            />
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  trackingSection: {
    justifyContent: "center",
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.specialMedium,
    fontSize: FONTSIZE.xl,
    color: colors.black,
  },
  cardContainer: {},
});

export default HomeScreen;
