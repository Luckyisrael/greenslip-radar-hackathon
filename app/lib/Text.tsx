// src/components/Text.tsx
import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { sizes, getSize } from '../constants/sizes';
import { useAppSettings } from '../store/appSettingsStore';


export interface TextProps {
  children?: React.ReactNode;
  size?: keyof typeof sizes.fontSize | number;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  family?: 'bold' | 'medium' | 'light' | 'regular' | 'semi-bold' | 'extra-bold' | 'extra-light';
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'medium',
  color,
  style = {},
  numberOfLines,
  family = 'regular',
}) => {
  
  
  let fontSize: number;
  if (typeof size === 'string') {
    fontSize = getSize('fontSize', size, sizes.fontSize.medium);
  } else {
    fontSize = moderateScale(size);
  }

  const textStyle = StyleSheet.compose(
    {
      fontSize,
      color: color ,
      fontFamily: renderFamily(family),
    },
    style
  );

  return (
    <RNText style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

const renderFamily = (family: string): string => {
  switch (family) {
    case 'bold':
      return 'Manrope-Bold';
    case 'extra-bold':
      return 'Manrope-ExtraBold';
    case 'light':
      return 'Manrope-Light';
    case 'extra-light':
      return 'Manrope-ExtraLight';
    case 'medium':
      return 'Manrope-Medium';
    case 'semi-bold':
      return 'Manrope-SemiBold';
    default:
      return 'Manrope-Regular';
  }
};