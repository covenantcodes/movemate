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

import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import userData from "../data/userData";
import Icon from "./common/Icon";

const { width } = Dimensions.get("window");

const DashboardHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.headerBackground}>
        <View style={styles.topRow}>
          <View style={styles.profileSection}>
            <Image
              source={userData.profilePicture}
              style={styles.profilePhoto}
            />

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
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon
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
            {/* Integrated scan button */}
            <TouchableOpacity style={styles.integratedScanButton}>
              <View style={styles.scanButtonInner}>
                <Icon name="barcodeScan" size={18} color={colors.white} />
              </View>
            </TouchableOpacity>
          </View>
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
    fontFamily: FONTFAMILY.medium,
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
    marginTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    paddingLeft: 15,
    paddingRight: 8,
    flex: 1,
    position: "relative",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
    paddingVertical: 0,
    marginRight: 8, // Give some breathing room before the scan button
  },
  integratedScanButton: {
    backgroundColor: colors.secondaryColor,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonInner: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardHeader;
