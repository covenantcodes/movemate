import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import DashboardHeader from "../../components/DashboardHeader";
import TrackingCard from "../../components/TrackingCard";
import { shipments } from "../../data/data";

const HomeScreen = () => {
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.trackingSection}>
          <Text style={styles.sectionTitle}>Tracking</Text>
        </View>

        {shipments.map((shipment) => (
          <TrackingCard
            key={shipment.id}
            shipment={shipment}
            onAddStop={() => handleAddStop(shipment.id)}
            onPress={() => handleCardPress(shipment.id)}
          />
        ))}
      </ScrollView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.specialMedium,
    fontSize: FONTSIZE.xl,
    color: colors.black,
  },
  viewAll: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.sm,
    color: colors.secondaryColor,
  },
});

export default HomeScreen;
