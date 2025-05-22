import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
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
    fontFamily: "NotoSansMedium",
    fontSize: 18,
    color: colors.black,
  },
});

export default ProfileScreen;
