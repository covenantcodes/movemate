import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import Icon from "./common/Icon";
import images from "../utils/images";

interface ShipmentCardProps {
  shipment: {
    id: string;
    title: string;
    trackingNumber: string;
    origin: string;
    destination: string;
    price: number;
    date: string;
    status: "in-progress" | "pending" | "loading" | "completed";
  };
  delay?: number;
  onPress?: () => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({
  shipment,
  delay = 0,
  onPress,
}) => {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.2)),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.2)),
      }),
    ]).start();
  }, [delay]);

  type IconName = "sync" | "history" | "package" | "plus" | "search";

  const getStatusConfig = (
    status: string
  ): {
    color: string;
    backgroundColor: string;
    text: string;
    icon: IconName;
  } => {
    switch (status) {
      case "in-progress":
        return {
          color: colors.green,
          backgroundColor: colors.grayBg2,
          text: "In Progress",
          icon: "sync",
        };
      case "pending":
        return {
          color: colors.secondaryColor,
          backgroundColor: colors.grayBg2,
          text: "pending",
          icon: "history", // clock/time icon for pending
        };
      case "loading":
        return {
          color: colors.primaryColor,
          backgroundColor: colors.grayBg2,
          text: "Loading",
          icon: "package", // box icon for loading
        };
      case "completed":
        return {
          color: colors.blue,
          backgroundColor: colors.grayBg2,
          text: "Completed",
          icon: "plus", // checkmark or completed icon
        };
      default:
        return {
          color: colors.gray,
          backgroundColor: colors.grayBg2,
          text: "Unknown",
          icon: "search", // question mark or search icon for unknown
        };
    }
  };

  const statusConfig = getStatusConfig(shipment.status);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.backgroundColor },
          ]}
        >
          <Icon
            name={statusConfig.icon}
            size={16}
            color={statusConfig.color}
            style={styles.statusIcon}
          />
          <Text style={[styles.statusText, { color: statusConfig.color }]}>
            {statusConfig.text}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.leftContent}>
            {/* Title */}
            <Text style={styles.title}>{shipment.title}</Text>

            {/* Tracking Info */}
            <View style={styles.trackingContainer}>
              <Text style={styles.trackingNumber}>
                Your delivery, {shipment.trackingNumber}
              </Text>
              <View style={styles.routeContainer}>
                <Text style={styles.routeText}>from {shipment.origin}</Text>
                {/* <Icon
                  name="arrowRight"
                  size={12}
                  color={colors.gray}
                  style={styles.arrowIcon}
                /> */}
                <Text style={styles.routeText}>{shipment.destination}</Text>
              </View>
            </View>

            {/* Price and Date */}
            <View style={styles.bottomInfo}>
              <Text style={styles.price}>
                ${shipment.price.toLocaleString()} USD
              </Text>
              <Text style={styles.date}>{shipment.date}</Text>
            </View>
          </View>

          {/* Package Icon */}
          <View style={styles.iconContainer}>
            <Image
              source={images.truck}
              style={styles.packageIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: FONTSIZE.sm,
    fontFamily: FONTFAMILY.medium,
  },
  statusIcon: {
    marginHorizontal: 4,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: FONTSIZE.lg,
    fontFamily: FONTFAMILY.specialSemiBold,
    color: colors.black,
    marginBottom: 8,
  },
  trackingContainer: {
    marginBottom: 12,
  },
  trackingNumber: {
    fontSize: FONTSIZE.sm,
    fontFamily: FONTFAMILY.medium,
    color: colors.gray,
    marginBottom: 4,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeText: {
    fontSize: FONTSIZE.sm,
    fontFamily: FONTFAMILY.regular,
    color: colors.gray,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  bottomInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: FONTSIZE.md,
    fontFamily: FONTFAMILY.semibold,
    color: colors.primaryColor,
  },
  date: {
    fontSize: FONTSIZE.sm,
    fontFamily: FONTFAMILY.regular,
    color: colors.gray,
    marginLeft: 13,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  packageIcon: {
    width: 40,
    height: 40,
    opacity: 0.7,
  },
});

export default ShipmentCard;
