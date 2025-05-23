import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import colors from "../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../utils/fonts";
import Icon from "./common/Icon";
import { SearchResultItemProps } from "../types/global";

const { width } = Dimensions.get("window");

interface AnimatedSearchResultItemProps extends SearchResultItemProps {
  animatedStyle?: any;
}

const SearchResultItem: React.FC<AnimatedSearchResultItemProps> = ({
  item,
  onPress,
  animatedStyle,
}) => {
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => onPress(item.id)}
      >
        <View style={styles.iconContainer}>
          <Icon name="package" size={24} color={colors.white} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{item.productName}</Text>

          <View style={styles.detailRow}>
            <Text style={styles.trackingNumber}>{item.shipmentNumber}</Text>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryColor,
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
    color: colors.gray,
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
