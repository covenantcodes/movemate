// User data file to store and manage user information
import { ImageSourcePropType } from "react-native";

interface UserData {
  name: string;
  profilePicture: ImageSourcePropType;
  location: string;
  hasNewNotifications: boolean;
}

const userData: UserData = {
  name: "John Doe",
  profilePicture: require("../assets/images/profile-photo.png"),
  location: "Wertheimer, Illinois",
  hasNewNotifications: true,
};

export default userData;