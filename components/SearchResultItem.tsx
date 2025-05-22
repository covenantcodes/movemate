import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import Icon from "./common/Icon";

interface SearchResultItemProps {
  item: {
    id: string;
    shipmentNumber: string;
    productName: string;
    sender: {
      city: string;
      code: string;
    };
    receiver: {
      city: string;
      code: string;
    };
  };
  onPress: (id: string) => void;
}

const { width } = Dimensions.get("window");

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <Icon name="package" size={24} color={colors.primaryColor} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{item.productName}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.trackingNumber}>#{item.shipmentNumber}</Text>
          <Text style={styles.dot}>•</Text>
          <View style={styles.routeContainer}>
            <Text style={styles.cityText}>{item.sender.city}</Text>
            <Icon
              name="arrowRight"
              size={14}
              color={colors.gray}
              style={styles.routeArrow}
            />
            <Text style={styles.cityText}>{item.receiver.city}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    width: width - 32,
    marginHorizontal: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  productName: {
    fontFamily: FONTFAMILY.semibold,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  trackingNumber: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.primaryColor,
  },
  dot: {
    marginHorizontal: 6,
    color: colors.gray,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityText: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.sm,
    color: colors.gray,
  },
  routeArrow: {
    marginHorizontal: 4,
  },
});

export default SearchResultItem;
