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
  TouchableOpacity,
} from "react-native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import DashboardHeader from "../../components/DashboardHeader";
import TrackingCard from "../../components/TrackingCard";
import VehicleCard from "../../components/VehicleCard";
import SearchResultItem from "../../components/SearchResultItem";
import { shipments, vehicles } from "../../data/data";

const suggestedSearches = [
  {
    id: "sug1",
    productName: "Summer Linen Jacket",
    shipmentNumber: "NE312367327",
    sender: { city: "Madrid", code: "MAD" },
    receiver: { city: "Paris", code: "PAR" },
  },
  {
    id: "sug2",
    productName: "MacBook Pro M1",
    shipmentNumber: "NE328940543",
    sender: { city: "London", code: "LDN" },
    receiver: { city: "Berlin", code: "BER" },
  },
  {
    id: "sug3",
    productName: "Leather Office Chair",
    shipmentNumber: "NE398275611",
    sender: { city: "Barcelona", code: "BCN" },
    receiver: { city: "Rome", code: "ROM" },
  },
  {
    id: "sug4",
    productName: "Wireless Headphones",
    shipmentNumber: "NE367219954",
    sender: { city: "Amsterdam", code: "AMS" },
    receiver: { city: "Vienna", code: "VIE" },
  },
];

const searchData = suggestedSearches;

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
  const searchResultsTranslateY = useRef(new Animated.Value(0)).current;

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
  const handleSearchResults = (results: any[], isActive: boolean) => {
    setSearchResults(results);
    setIsSearchActive(isActive);

    if (isActive) {
      if (searchResults.length === 0) {
        searchItemAnimations.forEach((anim) => {
          anim.translateY.setValue(30);
          anim.opacity.setValue(0);
        });
      }

      // Use Animated.timing with delay instead of setTimeout for better performance
      Animated.parallel([
        // Fade in with 1 second delay
        Animated.timing(searchResultsOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        // Slide up below with 1 second delay
        Animated.timing(searchResultsTranslateY, {
          toValue: 0,
          duration: 450,
          delay: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start(() => {
        // After container animation, animate individual items
        const itemAnimations = searchItemAnimations.map((anim, index) =>
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 200,
              delay: index * 50, // Stagger animation
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 250,
              delay: index * 50,
              useNativeDriver: true,
              easing: Easing.out(Easing.quad),
            }),
          ])
        );

        Animated.parallel(itemAnimations).start();
      });
    } else {
      // Run animations in parallel when deactivating (no delay needed)
      Animated.parallel([
        // Fade out
        Animated.timing(searchResultsOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        // Slide down slightly
        Animated.timing(searchResultsTranslateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start();
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
        delay: 600,
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
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {},
    }
  );

  // Start animations when component mounts
  useEffect(() => {
    animateContent();
  }, []);

  const searchItemAnimations = useRef(
    suggestedSearches.map(() => ({
      translateY: new Animated.Value(30),
      opacity: new Animated.Value(0),
    }))
  ).current;

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
          style={[
            styles.searchResults,
            {
              opacity: searchResultsOpacity,
              transform: [{ translateY: searchResultsTranslateY }],
            },
          ]}
        >
          <View style={styles.searchResultsBox}>
            {searchResults.length > 0 ? (
              // Show actual search results when available
              <>
                <FlatList
                  data={searchResults}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <SearchResultItem item={item} onPress={handleResultPress} />
                  )}
                />
              </>
            ) : (
              <View style={styles.suggestedSearchContainer}>
                <FlatList
                  data={suggestedSearches}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <SearchResultItem
                      item={item}
                      onPress={handleResultPress}
                      animatedStyle={{
                        opacity: searchItemAnimations[index].opacity,
                        transform: [
                          {
                            translateY: searchItemAnimations[index].translateY,
                          },
                        ],
                      }}
                    />
                  )}
                  // contentContainerStyle={styles.suggestedSearchContent}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>
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
    paddingLeft: 13,
    paddingTop: 20,
    paddingRight: 20,
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
  searchResultsBox: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 9,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 6,
    shadowRadius: 12,
  },
  suggestedSearchContainer: {
    // flex: 1,
  },
  suggestedSearchTitle: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  suggestedSearchContent: {
    paddingBottom: 24,
  },
});

export default HomeScreen;
