
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text, Button, Screen } from 'app/lib';
import CustomInput from 'app/components/CustomInput';
import OtpInput from 'app/components/OtpInput';
import { darkTheme } from 'app/theme/colors';
import { sizes } from 'app/constants/sizes';
import { useNavigation } from '@react-navigation/native';


const BusinessAuth: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [pictures, setPictures] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', businessName: '', category: '', address: '', email: '' });

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

  const validateField = (field: string, value: string) => {
    if (value.trim().length === 0) {
      setErrors({ ...errors, [field]: `${field} is required` });
      return false;
    }
    setErrors({ ...errors, [field]: '' });
    fadeIn();
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      fadeIn();
      setErrors({ ...errors, email: '' });
      return true;
    } else {
      setErrors({ ...errors, email: 'Invalid email address' });
      return false;
    }
  };

  const handleNextStep = () => {
    switch (step) {
      case 1:
        if (validateField('name', name)) setStep(2);
        break;
      case 2:
        if (validateField('businessName', businessName)) setStep(3);
        break;
      case 3:
        if (validateField('category', category)) setStep(4);
        break;
      case 4:
        if (validateField('address', address)) setStep(5);
        break;
      case 5:
        setStep(6);
        break;
      case 6:
        if (validateEmail()) {
          console.log('Sending OTP to:', email);
          setStep(7);
        }
        break;
    }
    fadeAnim.setValue(0);
  };

const imageFadeAnim = useRef(new Animated.Value(0)).current;

const handleImagePick = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets) {
    const newPictures = [...pictures, result.assets[0].uri];
    setPictures(newPictures);
    if (newPictures.length === 1) {
      Animated.timing(imageFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }
};
  const handleOtpComplete = (otp: string) => {
    // For demonstration, let's use a dummy OTP "1234"
    if (otp === "1234") {
      navigation.navigate('TabScreens', { screen: 'Dashboard'})
      console.log("OTP verified successfully");
      // Proceed with business registration or next steps
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
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      <Text family='bold' size={sizes.fontSize.large} color={darkTheme.textDark} style={{ alignSelf: 'center', marginBottom: 10}}>Business Registration</Text>
      
      {step === 1 && (
        <>
          <CustomInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              validateField('name', text);
            }}
            error={errors.name}
            success={name.trim().length > 0 && !errors.name}
          />
        </>
      )}

      {step === 2 && (
        <>
          <CustomInput
            placeholder="Enter business name"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              validateField('businessName', text);
            }}
            error={errors.businessName}
            success={businessName.trim().length > 0 && !errors.businessName}
          />
        </>
      )}

      {step === 3 && (
        <>
          <CustomInput
            placeholder="Enter business category"
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              validateField('category', text);
            }}
            error={errors.category}
            success={category.trim().length > 0 && !errors.category}
          />
        </>
      )}

      {step === 4 && (
        <>
          <CustomInput
            placeholder="Enter business address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              validateField('address', text);
            }}
            error={errors.address}
            success={address.trim().length > 0 && !errors.address}
          />
        </>
      )}

      {step === 5 && (
        <>
          <Text family='bold' size={sizes.fontSize.medium} color={darkTheme.textDark} style={{marginBottom: 10}}>Upload a Business Pictures</Text>
          <View style={styles.imageContainer}>
          {pictures.map((pic, index) => (
              <Image key={index} source={{ uri: pic }} style={styles.image} />
            ))}
          </View>
          <Button onPress={handleImagePick} label='Select Images' variant='secondary' style={{borderWidth: 2, borderStyle: 'dashed'}}/>
          {pictures.length > 0 && (
            <Animated.View style={{ opacity: imageFadeAnim }}>
              <Button label='Next' onPress={() => setStep(6)} style={{marginTop: 15}} />
            </Animated.View>
          )}
        </>
      )}

      {step === 6 && (
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
        </>
      )}

      {step === 7 && (
        <>
          <Text family='light' color={darkTheme.textDark} style={{ alignSelf: 'center'}} size={sizes.fontSize.small}>Enter the 4-digit OTP sent to your email</Text>
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

      {step < 7 && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Button onPress={handleNextStep} label={step === 6 ? 'Send OTP' : 'Next'} />
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: darkTheme.background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
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
  imagePicker: {
    backgroundColor: '#e1e1e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: sizes.borderRadius.xlarge,
    borderWidth: 1,
    borderColor: darkTheme.surface,
    padding: 10
  },
  otpInstructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default BusinessAuth;
/* const BusinessAuth = () => {
  return (
    <Screen>
    <View style={styles.header}>
      <Text>Business Auth</Text>
    </View>
    <View style={styles.footer}>
        <Button label='Connect Wallet' />
    </View>
    </Screen>
  )
}

export default BusinessAuth

const styles = StyleSheet.create({
  header: {
      flex: 1
  },
  footer: {
      marginBottom: 15
  }
}) */