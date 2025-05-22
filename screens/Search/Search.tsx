import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/common/Icon";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";

const { width, height } = Dimensions.get("window");

const SearchPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Animation values
  const headerHeight = useRef(new Animated.Value(200)).current;
  const searchInputPosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const inputRef = useRef<TextInput>(null);

  // Sample recent searches - would be stored in app state or async storage
  const recentSearches = [
    "NEJ20089934122231",
    "NEJ20089934122232",
    "MNO17438923770",
    "KLM45678901234",
  ];

  // Start search mode
  const expandSearchBar = () => {
    setIsSearchFocused(true);
    Animated.parallel([
      // Collapse header
      Animated.timing(headerHeight, {
        toValue: 70,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      // Move search input to top
      Animated.timing(searchInputPosition, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      // Fade in content
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      // Add backdrop
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Collapse search mode
  const collapseSearchBar = () => {
    Animated.parallel([
      // Restore header height
      Animated.timing(headerHeight, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      // Return search input to original position
      Animated.timing(searchInputPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }),
      // Fade out content
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      // Remove backdrop
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsSearchFocused(false);
      Keyboard.dismiss();
    });
  };

  // Top position of search input changes with animation
  const searchBarPositionTop = searchInputPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [120, 20], // Start position to end position
  });

  // Width of search input changes with animation
  const searchBarWidth = searchInputPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [width - 32, width - 90], // Original width to narrower width
  });

  // Handle search submission
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement your search logic here
  };

  // Handle selecting a recent search
  const handleSelectRecentSearch = (item: string) => {
    setSearchQuery(item);
    handleSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Purple Header Background */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            height: headerHeight,
          },
        ]}
      />

      {/* Semi-transparent backdrop */}
      {isSearchFocused && (
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        />
      )}

      {/* Search Bar */}
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            top: searchBarPositionTop,
            width: searchBarWidth,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => !isSearchFocused && expandSearchBar()}
        >
          <Icon name="search" size={24} color={colors.gray} />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Enter the receipt number..."
          placeholderTextColor={colors.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={expandSearchBar}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        {isSearchFocused && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={collapseSearchBar}
          >
            <Text style={styles.backButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Search Content */}
      {isSearchFocused && (
        <Animated.View
          style={[styles.searchContent, { opacity: contentOpacity }]}
        >
          {/* Recent Searches Section */}
          <View style={styles.recentSearchesContainer}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            <FlatList
              data={recentSearches}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentSearchItem}
                  onPress={() => handleSelectRecentSearch(item)}
                >
                  <Icon name="history" size={20} color={colors.gray} />
                  <Text style={styles.recentSearchText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primaryColor,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 2,
  },
  searchBarContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: 8,
    paddingLeft: 15,
    paddingRight: 20,
    marginHorizontal: 16,
    zIndex: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
    paddingVertical: 8,
  },
  backButton: {
    marginLeft: 10,
  },
  backButtonText: {
    color: colors.primaryColor,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
  },
  searchContent: {
    flex: 1,
    marginTop: 80, // Position below the search bar
    paddingTop: 20,
    zIndex: 2,
  },
  recentSearchesContainer: {
    paddingHorizontal: 16,
  },
  recentSearchesTitle: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },
  recentSearchText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginLeft: 16,
  },
});

export default SearchPage;
