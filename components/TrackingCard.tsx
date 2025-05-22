import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import Icon from "./common/Icon";
import { Shipment, TrackingCardProps } from "../types/global";
import { Lift } from "../assets/svg/index";
import images from "../utils/images";

const { width } = Dimensions.get("window");

const TrackingCard: React.FC<TrackingCardProps> = ({
  shipment,
  onAddStop,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.shipmentNumberContainer}>
          <Text style={styles.shipmentLabel}>Shipment Number</Text>
          <Text style={styles.shipmentNumber}>{shipment.shipmentNumber}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={images.forkLift}
            style={{ width: 54, height: 54 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.dividerMain}>
        <View style={styles.divider} />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <View style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Image
                source={images.send}
                style={{ width: 38, height: 38 }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.detailIconContainer}>
              <Text style={styles.detailLabel}>Sender</Text>
              <Text style={styles.detailValue}>
                {shipment.sender.city}, {shipment.sender.code}
              </Text>
            </View>
          </View>

          <View style={styles.estimateMain}>
            <Text style={styles.estimatedTimeTitle}>Time</Text>
            <View style={styles.estimateContainer}>
              <View style={styles.greenDot} />
              <Text style={styles.estimatedTime}>{shipment.estimatedTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.detailRow}>
            <View style={[styles.iconContainer, styles.detailIconBox]}>
              <Image
                source={images.receive}
                style={{ width: 34, height: 34 }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.detailIconContainer}>
              <Text style={styles.detailLabel}>Receiver</Text>
              <Text style={styles.detailValue}>
                {shipment.receiver.city}, {shipment.receiver.code}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.estimatedTimeTitle}>Status</Text>
            <Text style={styles.status}>{shipment.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.dividerBottom}>
        <View style={styles.divider} />
      </View>
      <View style={{ paddingTop: 14, paddingBottom: 16 }}>
        <TouchableOpacity
          style={styles.addStopButton}
          onPress={onAddStop}
          activeOpacity={0.7}
        >
          <Icon name="plus" size={16} color={colors.secondaryColor} />
          <Text style={styles.addStopText}>Add Stop</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    // padding: 16,
    marginVertical: 10,
    shadowColor: colors.gray6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 7,
    width: width - 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  shipmentNumberContainer: {
    flex: 1,
  },
  shipmentLabel: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
    marginBottom: 4,
  },
  shipmentNumber: {
    fontFamily: FONTFAMILY.bold,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orangeBg,
    marginRight: 10,
  },

  detailIconBox: {
    backgroundColor: colors.greenBg,
  },

  dividerMain: {
    paddingTop: 16,
    paddingBottom: 10,
  },
  dividerBottom: {
    paddingTop: 9,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray5,
  },
  detailsContainer: {},

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
  },
  detailIconContainer: {},
  detailLabel: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
  },
  detailValue: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
  statusSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  estimateMain: {},
  estimateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green,
    marginRight: 5,
  },
  estimatedTimeTitle: {
    color: colors.gray,
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
  },
  estimatedTime: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.black,
  },
  status: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginTop: 4,
  },
  addStopButton: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addStopText: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    color: colors.secondaryColor,
    marginLeft: 8,
  },
});

export default TrackingCard;
