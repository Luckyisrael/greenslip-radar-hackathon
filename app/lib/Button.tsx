import React, { useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  Keyboard,
  StyleProp,
  ViewStyle,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Text } from './Text';
import { sizes, getSize } from '../constants/sizes';
import { darkTheme } from 'app/theme/colors';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  length?: 'half' | 'full' | number;
  label?: string;
  textColor?: string;
  onPress?: () => void;
  textSize?: keyof typeof sizes.fontSize | number;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  textColor = '',
  label = '',
  length = 'full',
  textSize = 'medium',
  onPress = () => {},
  disabled = false,
  loading = false,
  style,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = useCallback(() => {
    Keyboard.dismiss();
    if (onPress && !loading) onPress();
  }, [onPress, loading]);

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.buttonContainer({
            variant,
            length,
            disabled: disabled || loading,
          }),
          style,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'secondary' ? '#050505' : '#FFFFFF'} />
        ) : (
          <Text
            family="bold"
            size={textSize}
            color={textColor || (variant === 'secondary' ? darkTheme.text : '#FFFFFF')}
          >
            {label}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  buttonContainer: ({
    variant,
    length,
    disabled,
  }: {
    variant: 'primary' | 'secondary' | 'danger';
    length?: 'half' | 'full' | number;
    disabled?: boolean;
  }) => {
    let backgroundColor, borderColor, borderWidth;

    switch (variant) {
      case 'primary':
        backgroundColor = '#3498db';
        borderColor = 'transparent';
        borderWidth = 0;
        break;
      case 'secondary':
        backgroundColor = 'transparent';
        borderColor = '#3498db';
        borderWidth = 1;
        break;
      case 'danger':
        backgroundColor = '#e74c3c';
        borderColor = 'transparent';
        borderWidth = 0;
        break;
      default:
        backgroundColor = '#3498db';
        borderColor = 'transparent';
        borderWidth = 0;
    }

    return {
      flexDirection: 'row',
      height: getSize('buttonHeight', 'medium', sizes.buttonHeight.small),
      backgroundColor,
      borderColor,
      borderWidth,
      width: typeof length === 'string' ? getWidth(length) : length,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getSize('borderRadius', 'xlarge', sizes.borderRadius.xlarge),
      opacity: disabled ? 0.6 : 1,
      paddingHorizontal: getSize('spacing', 'medium', sizes.spacing.medium),
    };
  },
});

const getWidth = (length: 'full' | 'half') => {
  return length === 'full' ? '100%' : '50%';
};