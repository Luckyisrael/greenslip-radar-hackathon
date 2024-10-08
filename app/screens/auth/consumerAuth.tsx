import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, StatusBar } from 'react-native';
import CustomInput from 'app/components/CustomInput';
import { Text, Button } from 'app/lib';
import OtpInput from 'app/components/OtpInput';
import { darkTheme } from 'app/theme/colors';
import { sizes } from 'app/constants/sizes';
import { useNavigation } from '@react-navigation/native';

const ConsumerAuth: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', tag: '', email: '' });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const otpInputRef = useRef<any>(null);
  const [showOtpButton, setShowOtpButton] = useState(false);
  const otpButtonFadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const validateName = () => {
    if (name.trim().length > 0) {
      fadeIn();
      setErrors({ ...errors, name: '' });
    } else {
      setErrors({ ...errors, name: 'Name is required' });
    }
  };

  const validateTag = () => {
    if (tag.length >= 8) {
      fadeIn();
      setErrors({ ...errors, tag: '' });
    } else {
      setErrors({ ...errors, tag: 'Tag must be exactly 8 characters long' });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      fadeIn();
      setErrors({ ...errors, email: '' });
    } else {
      setErrors({ ...errors, email: 'Invalid email address' });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !errors.name) {
      console.log('Name:', name);
      setStep(2);
    } else if (step === 2 && !errors.tag) {
      setStep(3);
    } else if (step === 3 && !errors.email) {
      console.log('Sending OTP to:', email);
      setStep(4);
    }
    fadeAnim.setValue(0);
  };

  const handleOtpComplete = (otp: string) => {
    // dummy OTP "1234"
    if (otp === "1234") {
      
      console.log("OTP verified successfully");
      navigation.navigate('TabScreens', { screen: 'Dashboard'})
    } else {
      console.log("Invalid OTP");
      otpInputRef.current?.shake();
    }
  };

  const handleFourthDigitFocus = () => {
    setShowOtpButton(true);
    Animated.timing(otpButtonFadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      {step === 1 && (
        <>
          <CustomInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateName();
            }}
            error={errors.name}
            success={name.trim().length > 0 && !errors.name}
          />
          <Animated.View style={{ opacity: fadeAnim }}>
            <Button label='Next' onPress={handleNextStep} />
          </Animated.View>
        </>
      )}

  {step === 2 && (
  <>
    <CustomInput
      placeholder="Choose a tag"
      value={tag}
      onChangeText={(text) => {
        setTag(text);
        validateTag();
      }}
      error={errors.tag}
      success={tag.length === 8 && !errors.tag}
    />
    <Text style={[styles.description, tag.length === 8 && !errors.tag ? styles.successText : null]}>
      Tag must be exactly 8 characters long
    </Text>
    <Animated.View style={{ opacity: fadeAnim }}>
      <Button label='Next' onPress={handleNextStep} />
    </Animated.View>
  </>
)}

      {step === 3 && (
        <>
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail();
            }}
            error={errors.email}
            success={email.length > 0 && !errors.email}
          />
          <Animated.View style={{ opacity: fadeAnim }}>
          <Button label='Send OTP' onPress={handleNextStep} />
          </Animated.View>
        </>
      )}

      {step === 4 && (
        <>
          <Text size={sizes.fontSize.medium} color={darkTheme.text}>Enter the 4-digit OTP sent to your email</Text>
          <OtpInput 
            ref={otpInputRef} 
            length={4} 
            onComplete={handleOtpComplete} 
            onFourthDigitFocus={handleFourthDigitFocus}
          />
          {showOtpButton && (
            <Animated.View style={{ opacity: otpButtonFadeAnim }}>
              
              <Button label='Verify OTP' onPress={() => handleOtpComplete(otpInputRef.current?.getValue())} />
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: darkTheme.background
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginBottom: 10
  },
  successText: {
    color: 'green',
  },
  otpInstructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});




export default ConsumerAuth;
/* import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { Button, Screen, Text } from 'app/lib'
import { useNavigation } from '@react-navigation/native'

const ConsumerAuth = () => {
const navigation = useNavigation();
  return (
    <Screen>
    <View style={styles.header}>
      <Text>ConsumerAuth</Text>
    </View>
    <View style={styles.footer}>
        <Button label='Connect Wallet' onPress={()=>{navigation.navigate('TabScreens', { screen: 'Dashboard'})}} />
    </View>
    </Screen>
  )
}

export default ConsumerAuth

const styles = StyleSheet.create({
    header: {
        flex: 1
    },
    footer: {
        marginBottom: 15
    }
}) */