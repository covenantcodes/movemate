import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  Animated,
  Easing,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import { userData } from "../data/data";
import Icon from "./common/Icon";

const { width } = Dimensions.get("window");

interface DashboardHeaderProps {
  onSearchResults?: (results: any[], isActive: boolean) => void;
  searchData?: any[];
}

const DashboardHeader = ({
  onSearchResults,
  searchData = [],
}: DashboardHeaderProps) => {
  // State for search functionality
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Animation values
  const translateY = useRef(new Animated.Value(40)).current; // For header entrance
  const fadeAnim = useRef(new Animated.Value(0)).current; // For header fade-in
  const headerHeight = useRef(new Animated.Value(200)).current; // For header collapse
  const searchBarTop = useRef(new Animated.Value(120)).current; // For search bar movement
  const profileOpacity = useRef(new Animated.Value(1)).current; // For profile section fade
  const searchBarWidth = useRef(new Animated.Value(width - 32)).current; // For search bar width
  const backButtonOpacity = useRef(new Animated.Value(0)).current; // For back button fade
  const backButtonScale = useRef(new Animated.Value(0.5)).current; // For back button scale
  const backButtonTranslateX = useRef(new Animated.Value(-20)).current; // For back button translation

  const inputRef = useRef<TextInput>(null);

  // Handle initial entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 900,
        delay: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Handle search activation - SMOOTH VERSION (but stressful)
  const activateSearch = () => {
    setIsSearchActive(true);

    if (onSearchResults) {
      onSearchResults([], true);
    }

    Animated.parallel([
      // Collapse header height
      Animated.timing(headerHeight, {
        toValue: 130,
        duration: 600,
        useNativeDriver: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      // Move search bar up
      Animated.timing(searchBarTop, {
        toValue: 60,
        duration: 600,
        useNativeDriver: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      // Fade out profile section
      Animated.timing(profileOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
      // Make search bar narrower to fit back button - smooth transition
      Animated.timing(searchBarWidth, {
        toValue: width - 90,
        duration: 600, // Same as other animations
        useNativeDriver: false,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Same smooth easing
      }),
      // Back button animations
      Animated.timing(backButtonOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(backButtonScale, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(backButtonTranslateX, {
        toValue: 0,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
    ]).start(() => {
      // Focus the input after animation completes
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  };

  // Handle search deactivation - SMOOTH VERSION
  const deactivateSearch = () => {
    Keyboard.dismiss();

    // First, fade out and scale down the back button quickly
    Animated.parallel([
      Animated.timing(backButtonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
      Animated.timing(backButtonScale, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
      // Slide out to right
      Animated.timing(backButtonTranslateX, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.in(Easing.quad),
      }),
    ]).start(() => {
      // After back button is hidden, animate everything together smoothly
      Animated.parallel([
        // Restore header height
        Animated.timing(headerHeight, {
          toValue: 200,
          duration: 600,
          useNativeDriver: false,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth cubic-bezier
        }),
        // Move search bar back down - synchronized timing
        Animated.timing(searchBarTop, {
          toValue: 120,
          duration: 600,
          useNativeDriver: false,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        // Expand search bar width smoothly - key fix here
        Animated.timing(searchBarWidth, {
          toValue: width - 32,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        // Fade in profile section with proper timing
        Animated.timing(profileOpacity, {
          toValue: 1,
          duration: 300,
          delay: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start(() => {
        setIsSearchActive(false);
        setSearchQuery("");
        // Clear results
        if (onSearchResults) {
          onSearchResults([], false);
        }
      });
    });
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      if (onSearchResults) {
        onSearchResults([], true);
      }
      return;
    }

    console.log("Searching for:", searchQuery);
    console.log("Search data:", searchData);

    // Filter results based on searchQuery
    const results = searchData.filter((item) => {
      const query = searchQuery.toLowerCase();
      // Check shipment number
      const shipmentMatch = item.shipmentNumber?.toLowerCase().includes(query);

      // Check sender city
      const senderCityMatch = item.sender?.city?.toLowerCase().includes(query);

      // Check receiver city
      const receiverCityMatch = item.receiver?.city
        ?.toLowerCase()
        .includes(query);

      // Check product name if it exists
      const productMatch = item.productName?.toLowerCase().includes(query);

      // Check sender and receiver codes
      const senderCodeMatch = item.sender?.code?.toLowerCase().includes(query);
      const receiverCodeMatch = item.receiver?.code
        ?.toLowerCase()
        .includes(query);

      return (
        shipmentMatch ||
        senderCityMatch ||
        receiverCityMatch ||
        productMatch ||
        senderCodeMatch ||
        receiverCodeMatch
      );
    });

    console.log("Filtered results:", results);

    // Send results back to parent component
    if (onSearchResults) {
      onSearchResults(results, true);
    }

    // Keyboard.dismiss();
  };

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleTextChange = (text: string) => {
    setSearchQuery(text);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (text.trim()) {
      // Set a new timeout for search
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 300); // 300ms delay
    } else {
      if (onSearchResults) {
        onSearchResults([], true);
      }
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
          opacity: fadeAnim,
        },
      ]}
    >
      <SafeAreaView>
        <StatusBar style="light" />

        <Animated.View
          style={[styles.headerBackground, { height: headerHeight }]}
        >
          {/* Profile section - fades out during search */}
          <Animated.View
            style={[styles.topRow, { opacity: profileOpacity }]}
            pointerEvents={isSearchActive ? "none" : "auto"}
          >
            <View style={styles.profileSection}>
              <TouchableOpacity>
                <Image
                  source={userData.profilePicture}
                  style={styles.profilePhoto}
                />
              </TouchableOpacity>

              <View style={styles.locationMainContainer}>
                <View style={styles.locationTextContainer}>
                  <Icon name="location" size={13} color={colors.gray6} />
                  <Text style={styles.yourLocationText}>Your location</Text>
                </View>
                <TouchableOpacity style={styles.locationContainer}>
                  <Text style={styles.locationText}>{userData.location}</Text>
                  <Icon name="arrowDown" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              {userData.hasNewNotifications && (
                <View style={styles.notificationDot} />
              )}
              <Icon name="bell" size={29} color={colors.black} />
            </TouchableOpacity>
          </Animated.View>

          {/* Search bar - animates position */}
          <Animated.View
            style={[
              styles.searchSection,
              {
                position: "absolute",
                width: searchBarWidth,
                top: searchBarTop,
                left: 16,
                right: 16,
              },
            ]}
          >
            {isSearchActive && (
              <Animated.View
                style={[
                  styles.backButtonContainer,
                  {
                    opacity: backButtonOpacity,
                    transform: [
                      { scale: backButtonScale },
                      { translateX: backButtonTranslateX },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.backButtonContainer}
                  onPress={deactivateSearch}
                >
                  <Icon name="arrowLeft" size={40} color={colors.white} />
                </TouchableOpacity>
              </Animated.View>
            )}

            {isSearchActive ? (
              <View style={styles.searchBarContainerActive}>
                <View style={styles.searchBarActive}>
                  <TouchableOpacity
                    style={styles.searchIconContainer}
                    onPress={activateSearch}
                  >
                    <Icon name="search" size={24} color={colors.gray} />
                  </TouchableOpacity>
                  <TextInput
                    ref={inputRef}
                    style={styles.searchInput}
                    placeholder="Enter the receipt number..."
                    placeholderTextColor={colors.gray}
                    value={searchQuery}
                    onChangeText={handleTextChange}
                    onFocus={activateSearch}
                    onSubmitEditing={handleSearch}
                    editable={true}
                  />

                  <TouchableOpacity
                    style={styles.integratedScanButton}
                    onPress={() => {}}
                  >
                    <View style={styles.scanButtonInner}>
                      <Icon name="barcodeScan" size={18} color={colors.white} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.searchBarContainer}>
                <TouchableOpacity
                  style={styles.searchIconContainer}
                  onPress={activateSearch}
                >
                  <Icon name="search" size={24} color={colors.gray} />
                </TouchableOpacity>

                <TextInput
                  ref={inputRef}
                  style={styles.searchInput}
                  placeholder="Enter the receipt number..."
                  placeholderTextColor={colors.gray}
                  value={searchQuery}
                  onChangeText={handleTextChange}
                  onFocus={activateSearch}
                  editable={true}
                />

                <TouchableOpacity
                  style={styles.integratedScanButton}
                  onPress={() => {}}
                >
                  <View style={styles.scanButtonInner}>
                    <Icon name="barcodeScan" size={18} color={colors.white} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 20,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 20 : 60,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  locationMainContainer: {},
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  yourLocationText: {
    color: colors.gray6,
    marginLeft: 4,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: colors.white,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    marginHorizontal: 4,
  },
  notificationButton: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
    zIndex: 1,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarContainerActive: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchBarActive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIconContainer: {
    marginRight: 8,
    width: 30,
    alignItems: "center",
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
    paddingVertical: 0,
  },
  searchInputActive: {
    textAlign: "left",
  },
  integratedScanButton: {
    backgroundColor: colors.secondaryColor,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  scanButtonInner: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  backButtonText: {
    color: colors.white,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
  },
});

export default DashboardHeader;
