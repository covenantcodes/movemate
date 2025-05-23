import { StyleProp, ViewStyle, ImageSourcePropType} from "react-native";
import {  IconMap } from "../utils/iconConfig";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


 interface Shipment {
  id: string;
  shipmentNumber: string;
  sender: {
    city: string;
    code: string;
  };
  receiver: {
    city: string;
    code: string;
  };
  estimatedTime: string;
  status: string;
}

interface IconProps {
  name: keyof typeof IconMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

interface PulseIndicatorProps {
  color?: string;
  size?: number;
  pulseMaxSize?: number;
  speed?: number;
}

interface UserData {
  name: string;
  profilePicture: ImageSourcePropType;
  location: string;
    hasNewNotifications: boolean;
}

interface TrackingCardProps {
  shipment: Shipment;
  onAddStop?: () => void;
  onPress?: () => void;
}

interface Vehicle {
  id: string;
  title: string;
  route: string;
  image: ImageSourcePropType;
  color: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
  isVisible?: boolean;
  delay?: number;
}

interface DashboardHeaderProps {
  onSearchFocus: () => void;
  searchData?: any[];
}

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

 type RootStackParamList = {
  Home: undefined;
  Calculate: undefined;
  CalculateResult: { amount: string };
  Shipment: undefined;
  Profile: undefined;
};

interface FilterTab {
  id: string;
  label: string;
  count: number;
  status?: string;
}

interface ShipmentItem {
  id: string;
  title: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  price: number;
  date: string;
  status: "in-progress" | "pending" | "loading" | "completed";
}




export type { Shipment, IconProps, PulseIndicatorProps, UserData, TrackingCardProps, Vehicle, VehicleCardProps, DashboardHeaderProps, SearchResultItemProps, RootStackParamList, ShipmentItem, FilterTab };