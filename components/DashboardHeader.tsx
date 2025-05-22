import React from "react";
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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import userData from "../data/userData";

const { width } = Dimensions.get("window");

const DashboardHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Purple background header */}
      <View style={styles.headerBackground}>
        {/* Top row with profile, location and notification */}
        <View style={styles.topRow}>
          {/* Profile and location */}
          <View style={styles.profileSection}>
            <Image
              source={userData.profilePicture}
              style={styles.profilePhoto}
            />

            <TouchableOpacity style={styles.locationContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color={colors.white}
              />
              <Text style={styles.locationText}>{userData.location}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* Notification bell */}
          <TouchableOpacity style={styles.notificationButton}>
            {userData.hasNewNotifications && (
              <View style={styles.notificationDot} />
            )}
            <Feather name="bell" size={20} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons
              name="search"
              size={24}
              color={colors.gray}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Enter the receipt number..."
              placeholderTextColor={colors.gray}
            />
          </View>

          <TouchableOpacity style={styles.scanButton}>
            <View style={styles.scanButtonInner}>
              <MaterialCommunityIcons
                name="barcode-scan"
                size={18}
                color={colors.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
  },
  headerBackground: {
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 10 : 40,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.white,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: colors.white,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    marginHorizontal: 4,
  },
  notificationButton: {
    backgroundColor: colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.black,
    paddingVertical: 0,
  },
  scanButton: {
    backgroundColor: colors.secondaryColor,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonInner: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardHeader;
