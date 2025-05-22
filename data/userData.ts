// User data file to store and manage user information
import { ImageSourcePropType } from "react-native";
import { UserData } from "../types/global";



const userData: UserData = {
  name: "John Doe",
  profilePicture: require("../assets/images/profile-photo.png"),
  location: "Wertheimer, Illinois",
  hasNewNotifications: false,
};

export default userData;