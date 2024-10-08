import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';
import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface OtpInputProps {
    length: number;
    onComplete: (otp: string) => void;
    onFourthDigitFocus: () => void;
  }
  
  const OtpInput: React.FC<OtpInputProps> = ({ length, onComplete, onFourthDigitFocus }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      if (otp.every(digit => digit !== '')) {
        onComplete(otp.join(''));
      }
    }, [otp, onComplete]);
  
    const handleChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
  
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
  
      if (index === 3) {
        onFourthDigitFocus();
      }
    };
  
    const handleKeyPress = (event: any, index: number) => {
      if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };
  
    const shake = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    };
  
    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnimation }] }]}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={[styles.input, otp[index] ? styles.filledInput : null]}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={event => handleKeyPress(event, index)}
            value={otp[index]}
            onFocus={() => {
              if (index === 3) onFourthDigitFocus();
            }}
            cursorColor={darkTheme.accent}
          />
        ))}
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: sizes.borderRadius.xlarge,
    textAlign: 'center',
    fontSize: sizes.fontSize.large,
    color: darkTheme.accent,
    fontWeight: '600'
  },
  filledInput: {
    borderColor: '#4A90E2',
  },
});

export default OtpInput;