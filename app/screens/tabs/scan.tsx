import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Animated, 
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,

} from 'react-native';
import { Camera, CameraView } from 'expo-camera';

import { ScanBarcode, CloseCircle, TickCircle,   Keyboard } from 'iconsax-react-native';
import { darkTheme } from 'app/theme/colors';
import Header from 'app/components/Header';
import { Button, Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import CustomInput from 'app/components/CustomInput';
import { useUserStore } from 'app/store/userStore';

const { width, height } = Dimensions.get('window');

const RedeemScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const user = useUserStore((state) => state.user);
  
  const scanAnimation = useRef(new Animated.Value(0)).current;
  const manualAnimation = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Here you would typically send this data to your backend for verification
  };

  const startScanning = () => {
    setIsScanning(true);
    Animated.spring(scanAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const stopScanning = () => {
    setIsScanning(false);
    Animated.spring(scanAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const showManualEntry = () => {
    Animated.spring(manualAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const hideManualEntry = () => {
    Animated.spring(manualAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleManualSubmit = () => {
    if (manualCode.length > 0) {
      alert(`Manual code ${manualCode} submitted!`);
      // Here you would typically send this code to your backend for verification
      setManualCode('');
      hideManualEntry();
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={darkTheme.background} />
      <View style={styles.content}>
      <Header userName={user.name}/>
       {/*  <Text style={styles.title}>Redeem Your Greenslip</Text> */}
        
        <View style={styles.button} >
          <View style={{ padding: 10, borderRadius: sizes.borderRadius.xlarge, backgroundColor: darkTheme.surface}}>
            <ScanBarcode size={24} color="#fff"  variant="Bulk"/>
          </View>
          
          <Button label='Scan QR Code' onPress={startScanning} length={400} />
        </View>
        

        <View style={styles.button} >
        <View style={{ padding: 10, borderRadius: sizes.borderRadius.xlarge, backgroundColor: darkTheme.surface}}>
          <Keyboard size={24} color="#FFF" variant="Bulk"/>
          </View>
          
          <Button label='Enter Code Manually' onPress={showManualEntry} length={400} />
        </View>
      </View>

      <Animated.View 
        style={[
          styles.scannerContainer,
          {
            transform: [
              {
                translateY: scanAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        {isScanning && (
          <CameraView
          
            style={StyleSheet.absoluteFillObject}
            
          >
            {/* <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
            /> */}
            <View style={styles.scanOverlay}>
              <View style={styles.scanFrame} />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={stopScanning}>
              <CloseCircle size={32} color="#fff" />
            </TouchableOpacity>
          </CameraView>
        )}
      </Animated.View>

      <Animated.View 
        style={[
          styles.manualEntryContainer,
          {
            transform: [
              {
                translateY: manualAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text family='bold' size={sizes.fontSize.large} color={darkTheme.textDark} >Enter Redemption Code</Text>
        <CustomInput 
          onChangeText={setManualCode}
          placeholder="Enter code here"
          value={manualCode}
        />
        <View style={styles.manualEntryButtons}>
          <TouchableOpacity style={[styles.manualEntryButton, { backgroundColor: darkTheme.error}]} onPress={hideManualEntry}>
            <CloseCircle size={24} color="#fff" />
            <Text color='' style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.manualEntryButton} onPress={handleManualSubmit}>
            <TickCircle size={24} color="#fff" />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    columnGap: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    paddingVertical: 5
  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  scanOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  manualEntryContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: darkTheme.background,
    padding: 20,
    justifyContent: 'center',
  },
  manualEntryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  manualEntryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: sizes.borderRadius.xlarge,
    width: '48%',
    justifyContent: 'center',
  },
});

export default RedeemScreen;