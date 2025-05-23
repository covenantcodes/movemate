import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList as RawFlatList,
  Animated,
  Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import Icon from "../../components/common/Icon";
import ShipmentCard from "../../components/ShipmentCard";
import { SafeAreaView } from "react-native-safe-area-context";

interface FilterTab {
  id: string;
  label: string;
  count: number;
  status?: string;
}

interface ShipmentItem {
  id: string;
  title: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  price: number;
  date: string;
  status: "in-progress" | "pending" | "loading" | "completed";
}

const FlatList = Animated.createAnimatedComponent(RawFlatList);

const filterTabsConfig: Omit<FilterTab, "count">[] = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed", status: "completed" },
  { id: "in-progress", label: "In progress", status: "in-progress" },
  { id: "pending", label: "Pending", status: "pending" },
];

const mockShipments: ShipmentItem[] = [
  {
    id: "1",
    title: "Arriving today!",
    trackingNumber: "NEJ20089934122231",
    origin: " Atlanta",
    destination: " is arriving today!",
    price: 1400,
    date: "Sep 20, 2023",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Arriving today!",
    trackingNumber: "NEJ20089934122232",
    origin: "Los Angeles",
    destination: " is arriving today!",
    price: 650,
    date: "Sep 20, 2023",
    status: "pending",
  },

  {
    id: "3",
    title: "Delivered",
    trackingNumber: "NEJ20089934122234",
    origin: "Boston",
    destination: " is arriving today!",
    price: 650,
    date: "Sep 18, 2023",
    status: "pending",
  },
  {
    id: "4",
    title: "Arriving tomorrow",
    trackingNumber: "NEJ20089934122233",
    origin: "Miami",
    destination: " is arriving today!",
    price: 1850,
    date: "Sep 19, 2023",
    status: "loading",
  },
  {
    id: "5",
    title: "Pending delivery",
    trackingNumber: "NEJ20089934122234",
    origin: "Boston",
    destination: " is arriving today!",
    price: 1200,
    date: "Sep 18, 2023",
    status: "pending",
  },
  {
    id: "6",
    title: "Pending delivery",
    trackingNumber: "NEJ20089934122234",
    origin: "Boston",
    destination: " is arriving today!",
    price: 1200,
    date: "Sep 18, 2023",
    status: "pending",
  },
  {
    id: "7",
    title: "Pending delivery",
    trackingNumber: "NEJ20089934122234",
    origin: "Boston",
    destination: " is arriving today!",
    price: 1200,
    date: "Sep 18, 2023",
    status: "completed",
  },
  {
    id: "8",
    title: "Completed delivery",
    trackingNumber: "NEJ20089934122234",
    origin: "Boston",
    destination: " is arriving today!",
    price: 1200,
    date: "Sep 18, 2023",
    status: "completed",
  },
];

const ShipmentsScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredShipments, setFilteredShipments] = useState(mockShipments);
  const [filterTabs, setFilterTabs] = useState<FilterTab[]>([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Calculate counts for each status
    const counts = {
      all: mockShipments.length,
      completed: mockShipments.filter((item) => item.status === "completed")
        .length,
      "in-progress": mockShipments.filter(
        (item) => item.status === "in-progress"
      ).length,
      pending: mockShipments.filter((item) => item.status === "pending").length,
      loading: mockShipments.filter((item) => item.status === "loading").length,
    };

    // Create tabs with counts
    const tabs = filterTabsConfig.map((tab) => ({
      ...tab,
      count:
        tab.id === "all"
          ? counts.all
          : counts[tab.status as keyof typeof counts] || 0,
    }));

    setFilterTabs(tabs);
  }, []);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // Filter shipments based on active filter
    if (activeFilter === "all") {
      setFilteredShipments(mockShipments);
    } else {
      const filtered = mockShipments.filter(
        (shipment) => shipment.status === activeFilter
      );
      setFilteredShipments(filtered);
    }
  }, [activeFilter]);

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderFilterTab = ({
    item,
    index,
  }: {
    item: FilterTab;
    index: number;
  }) => {
    const isActive = activeFilter === item.id;
    return (
      <TouchableOpacity
        style={[styles.filterTab, isActive && styles.filterTabActive]}
        onPress={() => handleFilterPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.filterTabContent}>
          <Text
            style={[
              styles.filterTabText,
              isActive && styles.filterTabTextActive,
            ]}
          >
            {item.label}
          </Text>
          <View
            style={[
              styles.countContainer,
              isActive && styles.countContainerActive,
            ]}
          >
            <Text
              style={[styles.countText, isActive && styles.countTextActive]}
            >
              {item.count}
            </Text>
          </View>
        </View>
        {/* Underline for active tab */}
        {isActive && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
    );
  };

  const renderShipmentCard = ({
    item,
    index,
  }: {
    item: ShipmentItem;
    index: number;
  }) => (
    <ShipmentCard
      shipment={item}
      delay={index * 100}
      scrollY={scrollY.current}
      index={index}
      onPress={() => console.log("Shipment pressed:", item.id)}
    />
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ paddingTop: 50, paddingBottom: 10 }}>
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Icon name="arrowLeft" size={28} color={colors.white} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Shipment History</Text>

            <View style={styles.headerSpacer} />
          </Animated.View>
        </View>

        {/* Filter Tabs - Now part of purple header */}
        <Animated.View
          style={[
            styles.filterContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={filterTabs}
            renderItem={renderFilterTab}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        </Animated.View>
      </View>

      {/* Shipments List */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <FlatList
          data={filteredShipments}
          renderItem={renderShipmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.shipmentsList}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primaryColor,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.lg,
    fontFamily: FONTFAMILY.medium,
    color: colors.white,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  filterContainer: {
    paddingBottom: 10,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterTab: {
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterTabActive: {
    // Additional styles for active state if needed
  },
  filterTabContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterTabText: {
    fontSize: FONTSIZE.lg,
    fontFamily: FONTFAMILY.regular,
    color: colors.gray6,
    marginRight: 8,
  },
  filterTabTextActive: {
    color: colors.white,
  },
  countContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  countContainerActive: {
    backgroundColor: colors.secondaryColor,
  },
  countText: {
    fontSize: FONTSIZE.sm,
    fontFamily: FONTFAMILY.bold,
    color: colors.white,
  },
  countTextActive: {
    color: colors.white,
  },
  activeUnderline: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: colors.secondaryColor,
    borderRadius: 1,
  },
  contentContainer: {
    flex: 1,
  },
  shipmentsList: {
    padding: 16,
  },
});

export default ShipmentsScreen;
