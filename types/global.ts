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

export type { Shipment, IconProps, PulseIndicatorProps, UserData, TrackingCardProps };