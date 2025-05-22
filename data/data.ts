// User data file to store and manage user information
import { ImageSourcePropType } from "react-native";
import { UserData, Shipment, Vehicle } from "../types/global";
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

const vehicles: Vehicle[] = [
  {
    id: '1',
    title: 'Ocean Freight',
    route: 'International',
    image: images.ship,
    color: '#F19A1A'
  }, {
    id: '2',
    title: 'Cargo Freight',
    route: 'Reliable',
    image: images.truck,
    color: '#7838D1'
  },
  {
    id: '3',
    title: 'Air Freight',
    route: 'International',
    image: images.airplane,
    color: '#1A79F1'
  },
 
];




export { userData, shipments, vehicles};