import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const CalculateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calculate Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontFamily: "DMSansMedium",
    fontSize: 18,
    color: colors.black,
  },
});

export default CalculateScreen;
