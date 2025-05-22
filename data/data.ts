// User data file to store and manage user information
import { ImageSourcePropType } from "react-native";
import { UserData, Shipment } from "../types/global";
import images from "../utils/images";


const userData: UserData = {
  name: "John Doe",
  profilePicture: images.profilePic,
  location: "Wertheimer, Illinois",
  hasNewNotifications: false,
};

const shipments: Shipment[] = [
  {
    id: '1',
    shipmentNumber: 'NEJ20089934122231',
    sender: {
      city: 'Atlanta',
      code: '5243',
    },
    receiver: {
      city: 'Chicago',
      code: '6821',
    },
    estimatedTime: '2 days - 3 days',
    status: 'Waiting to collect',
  }
];


export { userData, shipments };