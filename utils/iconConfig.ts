import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

// Export all icon packs
const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  Entypo,
  AntDesign,
  Octicons,
};

// Icon mapping for common icons used in the app
export const IconMap = {
  // Navigation icons
  home: { pack: "MaterialCommunityIcons", name: "home-outline" },
  calculate: { pack: "MaterialCommunityIcons", name: "calculator-variant-outline" },
  shipment: { pack: "MaterialCommunityIcons", name: "history" },
  profile: { pack: "MaterialCommunityIcons", name: "account-outline" },
  
  // Header icons
  location: { pack: "MaterialIcons", name: "location-on" },
  arrowDown: { pack: "MaterialIcons", name: "keyboard-arrow-down" },
  bell: { pack: "Feather", name: "bell" },
  search: { pack: "MaterialIcons", name: "search" },
  barcodeScan: { pack: "MaterialCommunityIcons", name: "barcode-scan" },
};

// Icon component helper
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const getIcon = (iconKey: keyof typeof IconMap, props: Omit<IconProps, "name">) => {
  const iconConfig = IconMap[iconKey];
  if (!iconConfig) return null;
  
  const IconComponent = Icons[iconConfig.pack as keyof typeof Icons];
  return <IconComponent name={iconConfig.name} {...props} />;
};

export default Icons;