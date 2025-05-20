import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
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

export default HomeScreen;
