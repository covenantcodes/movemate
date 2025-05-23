import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { getIcon, IconMap } from "../../utils/iconConfig";
import { IconProps } from "../../types/global";

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.black,
  style,
}) => {
  return getIcon(name, { size, color, style });
};

export default Icon;
