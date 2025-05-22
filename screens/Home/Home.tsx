import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";
import DashboardHeader from "../../components/DashboardHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <View>
      <DashboardHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: colors.background,
  // },
  // text: {
  //   fontFamily: "DMSansMedium",
  //   fontSize: 18,
  //   color: colors.black,
  // },
});

export default HomeScreen;
