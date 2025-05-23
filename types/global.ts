import { StyleProp, ViewStyle, ImageSourcePropType} from "react-native";
import {  IconMap } from "../utils/iconConfig";

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


export type { Shipment, IconProps, PulseIndicatorProps, UserData, TrackingCardProps, Vehicle, VehicleCardProps, DashboardHeaderProps, SearchResultItemProps};