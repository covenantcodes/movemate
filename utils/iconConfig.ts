import React from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";
import { IconProps } from '../types/global';


// Export all icon packs with proper typing
const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Entypo,
  AntDesign,
  Octicons,
};

// Add type for the Icons object
type IconsType = typeof Icons;

// Icon mapping for common icons used in the app
export const IconMap = {
  // Navigation icons
  home: { pack: "MaterialCommunityIcons", name: "home-outline" },
  calculate: { pack: "MaterialCommunityIcons", name: "calculator-variant-outline" },
  shipment: { pack: "MaterialCommunityIcons", name: "history" },
  profile: { pack: "MaterialCommunityIcons", name: "account-outline" },
  
  // Header icons
  location: { pack: "FontAwesome5", name: "location-arrow" },
  arrowDown: { pack: "MaterialIcons", name: "keyboard-arrow-down" },
  bell: { pack: "MaterialCommunityIcons", name: "bell-outline" },
  search: { pack: "MaterialIcons", name: "search" },
  barcodeScan: { pack: "MaterialCommunityIcons", name: "barcode-scan" },
} as const;



export const getIcon = (
  iconKey: keyof typeof IconMap,
  props: Omit<IconProps, "name">
) => {
  const iconConfig = IconMap[iconKey];
  if (!iconConfig) return null;

  const IconPack = Icons[iconConfig.pack as keyof typeof Icons];
  return React.createElement(IconPack, { name: iconConfig.name, ...props });
};

export default Icons;