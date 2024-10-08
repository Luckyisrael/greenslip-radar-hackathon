// src/constants/sizes.ts

import { Dimensions } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scaleSize = (size: number) => moderateScale(size, 0.3);
const verticalScaleSize = (size: number) => moderateScale((size / guidelineBaseHeight) * height);
const horizontalScaleSize = (size: number) => moderateScale((size / guidelineBaseWidth) * width);

export const sizes = {
  // Font sizes
  fontSize: {
    tiny: scaleSize(8),
    small: scaleSize(12),
    medium: scaleSize(16),
    large: scaleSize(20),
    xlarge: scaleSize(24),
    xxlarge: scaleSize(32),
  },
  
  // Margins and Paddings
  spacing: {
    tiny: scaleSize(4),
    small: scaleSize(8),
    medium: scaleSize(16),
    large: scaleSize(24),
    xlarge: scaleSize(32),
    xxlarge: scaleSize(48),
  },
  
  // Border radiuses
  borderRadius: {
    small: scaleSize(8),
    medium: scaleSize(12),
    large: scaleSize(20),
    xlarge: scaleSize(28),
  },
  
  // Icon sizes
  iconSize: {
    small: scaleSize(16),
    medium: scaleSize(24),
    large: scaleSize(32),
    xlarge: scaleSize(48),
  },
  
  // Button sizes
  buttonHeight: {
    small: verticalScaleSize(22),
    medium: verticalScaleSize(34),
    large: verticalScaleSize(46),
  },
  
  // Input field heights
  inputHeight: {
    small: verticalScaleSize(32),
    medium: verticalScaleSize(44),
    large: verticalScaleSize(56),
  },
  
  // Screen specific sizes
  screen: {
    width,
    height,
    paddingHorizontal: horizontalScaleSize(16),
    paddingVertical: verticalScaleSize(16),
  },
};

// Helper function to get size with fallback
export const getSize = (category: keyof typeof sizes, size: string, fallback?: number): number => {
  return (sizes[category] as any)[size] || fallback || sizes.spacing.medium;
};