import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import { Vehicle } from "../types/global";

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: vehicle.color }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.textContent}>
        <Text style={styles.title}>{vehicle.title}</Text>
        <Text style={styles.route}>{vehicle.route}</Text>
      </View>

      <Image source={vehicle.image} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 120,
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    overflow: "hidden",
    position: "relative",
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.md,
    color: colors.white,
    marginBottom: 4,
  },
  route: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.white,
    opacity: 0.8,
  },
  image: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
  },
});

export default VehicleCard;
