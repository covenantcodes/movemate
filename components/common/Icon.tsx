import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { getIcon, IconMap } from "../../utils/iconConfig";

interface IconProps {
  name: keyof typeof IconMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "#000",
  style,
}) => {
  return getIcon(name, { size, color, style });
};

export default Icon;
