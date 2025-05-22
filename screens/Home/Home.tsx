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
import VehicleCard from "../../components/VehicleCard";
import { shipments, vehicles } from "../../data/data";

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

  const vehiclesSectionY = useRef(new Animated.Value(40)).current;
  const vehiclesSectionOpacity = useRef(new Animated.Value(0)).current;

  // Animation values for each vehicle card
  const vehicleAnimations = useRef(
    vehicles.map(() => ({
      scale: new Animated.Value(0.8),
      opacity: new Animated.Value(0),
    }))
  ).current;

  // Function to start the animations
  const animateContent = () => {
    // First animate the "Available vehicles" section header
    Animated.parallel([
      Animated.timing(vehiclesSectionY, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(vehiclesSectionOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Then animate each vehicle card
    vehicleAnimations.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.scale, {
          toValue: 1,
          duration: 500,
          delay: 300 + index * 70, // Staggered delay
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.7)),
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 500,
          delay: 300 + index * 70,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Then animate the "Tracking" section header
    Animated.parallel([
      Animated.timing(trackingTextY, {
        toValue: 0,
        duration: 500,
        delay: 600, // Start after vehicles animation
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(trackingTextOpacity, {
        toValue: 1,
        duration: 400,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Then animate each tracking card
    cardAnimations.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 800,
          delay: 700 + index * 100, // Stagger effect
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 800,
          delay: 700 + index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // Listen for scroll events
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
    animateContent();
  }, []);

  const handleVehiclePress = (vehicleId: string) => {
    console.log(`Vehicle pressed: ${vehicleId}`);
    // Handle vehicle selection
  };

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
        {/* Tracking Section */}
        <Animated.View
          style={[
            styles.sectionHeader,
            {
              opacity: trackingTextOpacity,
              transform: [{ translateY: trackingTextY }],
              marginTop: 24,
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

        {/* Available Vehicles Section */}
        <Animated.View
          style={[
            styles.sectionHeader,
            {
              opacity: vehiclesSectionOpacity,
              transform: [{ translateY: vehiclesSectionY }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Available vehicles</Text>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.vehiclesContainer}
        >
          {vehicles.map((vehicle, index) => (
            <Animated.View
              key={vehicle.id}
              style={{
                opacity: vehicleAnimations[index].opacity,
                transform: [{ scale: vehicleAnimations[index].scale }],
              }}
            >
              <VehicleCard
                vehicle={vehicle}
                onPress={() => handleVehiclePress(vehicle.id)}
              />
            </Animated.View>
          ))}
        </ScrollView>
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
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.specialMedium,
    fontSize: FONTSIZE.lg,
    color: colors.blue,
  },
  vehiclesContainer: {
    paddingVertical: 8,
  },
  cardContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
