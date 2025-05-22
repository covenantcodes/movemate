import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import DashboardHeader from "../../components/DashboardHeader";
import TrackingCard from "../../components/TrackingCard";
import VehicleCard from "../../components/VehicleCard";
import SearchResultItem from "../../components/SearchResultItem";
import { shipments, vehicles } from "../../data/data";

// Extended data for search results with product names
const searchData = shipments.map((shipment) => ({
  ...shipment,
  productName: [
    "iPhone 13 Pro Max",
    "MacBook Pro M1",
    "PlayStation 5",
    "Samsung TV",
  ][Math.floor(Math.random() * 4)], // Just for demo, assign random product names
}));

const HomeScreen = () => {
  // State for search results
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  // Animation for search results
  const searchResultsOpacity = useRef(new Animated.Value(0)).current;

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

  // Function to handle search results
  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0);

    if (results.length > 0) {
      // Fade in search results, fade out other content
      Animated.timing(searchResultsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out search results
      Animated.timing(searchResultsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Function to start the animations
  const animateContent = () => {
    // Animation sequences as before...
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
        // Additional scroll logic if needed
      },
    }
  );

  // Start animations when component mounts
  useEffect(() => {
    animateContent();
  }, []);

  const handleResultPress = (id: string) => {
    console.log(`Search result pressed: ${id}`);
    // Navigate to shipment details or handle the press
  };

  const handleAddStop = (shipmentId: string) => {
    console.log(`Add stop pressed for shipment ${shipmentId}`);
  };

  const handleCardPress = (shipmentId: string) => {
    console.log(`Card pressed for shipment ${shipmentId}`);
  };

  const handleVehiclePress = (vehicleId: string) => {
    console.log(`Vehicle pressed: ${vehicleId}`);
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        onSearchResults={handleSearchResults}
        searchData={searchData}
      />

      {/* Search Results - Show when search is active */}
      {isSearchActive ? (
        <Animated.View
          style={[styles.searchResults, { opacity: searchResultsOpacity }]}
        >
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchResultItem item={item} onPress={handleResultPress} />
            )}
            contentContainerStyle={styles.searchResultsContent}
          />
        </Animated.View>
      ) : (
        // Normal Content - Show when search is not active
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
                marginTop: 16,
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
      )}
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
    padding: 20,
  },
  sectionHeader: {
    // marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
  vehiclesContainer: {
    paddingVertical: 8,
  },
  cardContainer: {
    marginBottom: 16,
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchResultsContent: {
    paddingTop: 90, // Space for header
    paddingBottom: 24,
  },
});

export default HomeScreen;
