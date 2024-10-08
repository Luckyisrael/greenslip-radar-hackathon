import React, { useCallback, useRef, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Calendar, Clock, Ticket, ShoppingBag, Copy, Wallet, CloseCircle } from 'iconsax-react-native';
import { Greenslip } from 'app/constants/greenslipData';
import { Button, Screen, Text } from 'app/lib';
import { darkTheme } from 'app/theme/colors';
import { sizes } from 'app/constants/sizes';
import * as Clipboard from 'expo-clipboard';
import QRCodeStyled from 'react-native-qrcode-styled';
import BottomSheet from '@gorhom/bottom-sheet';

type RootStackParamList = {
  GreenslipDetail: { greenslip: Greenslip };
};

type GreenslipDetailScreenRouteProp = RouteProp<RootStackParamList, 'GreenslipDetail'>;

type GreenslipDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GreenslipDetail'>;

type Props = {
  route: GreenslipDetailScreenRouteProp;
  navigation: GreenslipDetailScreenNavigationProp;
};

const GreenslipDetailScreen: React.FC<Props> = ({ route }) => {
  const { greenslip } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [copiedText, setCopiedText] = useState('')

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleClaimPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCopyCode = useCallback(() => {
    Clipboard.setStringAsync(greenslip.uniqueCode);

    // You might want to show a toast or some feedback here
  }, [greenslip.uniqueCode]);

  const handleConnectWallet = useCallback(() => {
    // Implement wallet connection logic here
    console.log('Connecting to wallet...');
  }, []);

  return (
    <Screen style={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      <Image source={greenslip.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.brand} color='#4A90E2'  family='bold' size={sizes.fontSize.large}>{greenslip.brand}</Text>
        <Text style={styles.title} color={darkTheme.text}  family='semi-bold' size={sizes.fontSize.large}>{greenslip.title}</Text>
        
        <View style={styles.infoRow}>
          <Calendar size={20} color="#4A90E2" />
          <Text color={darkTheme.textDark} family='light' size={sizes.fontSize.small}>Created: {formatDate(greenslip.dateCreated)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Clock size={20} color="#4A90E2" />
          <Text color={darkTheme.textDark} family='light' size={sizes.fontSize.small}>Expires: {formatDate(greenslip.expiryDate)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ticket size={20} color="#4A90E2" />
          <Text color={darkTheme.textDark} family='light' size={sizes.fontSize.small}>Claimed: {greenslip.claimCount} times</Text>
        </View>
        
        <View style={styles.infoRow}>
          <ShoppingBag size={20} color="#4A90E2" />
          <Text color={darkTheme.textDark} family='light' size={sizes.fontSize.small}>Category: {greenslip.category}</Text>
        </View>
        
        <Text style={styles.descriptionTitle} family='bold' size={sizes.fontSize.large} color={darkTheme.primary}>Description</Text>
        <Text style={styles.description} family='light' size={sizes.fontSize.tiny} color={darkTheme.textDark}>{greenslip.description}</Text>
      </View>

      <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Claim Your NFT</Text>
          <QRCodeStyled
            data={greenslip.uniqueCode}
            style={styles.qrCode}
            padding={20}
            pieceSize={8}
            pieceBorderRadius={4}
            color={darkTheme.text}
            
          />
          <View style={styles.codeContainer}>
            <Text style={styles.uniqueCode}>{greenslip.uniqueCode}</Text>
            <TouchableOpacity onPress={handleCopyCode}>
              <Copy size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          <Text style={styles.instruction}>Scan QR code or use the unique code to claim your NFT</Text>
        </View>
      
      <Button label='Claim as NFT' onPress={handleClaimPress} style={{ marginBottom: 30}}/>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: darkTheme.background }}
      >
         <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Claim Your NFT</Text>
          <CloseCircle size="32" color="red" variant="Bulk" style={{alignSelf: 'flex-end'}}/>
          <View style={styles.walletSection}>
            <Text style={styles.walletDescription}>Connect your wallet to claim this NFT</Text>
            <Button 
              label='Connect Wallet' 
              onPress={handleConnectWallet} 
              style={styles.connectButton}
            />
          </View>
        </View>
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingHorizontal: 5
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    flex: 1
  },
  brand: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    columnGap: 10
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: darkTheme.text,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: darkTheme.text,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: darkTheme.text,
  },
  claimButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginBottom: 20,
  },
  qrCode: {
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  uniqueCode: {
    fontSize: 18,
    color: darkTheme.text,
    marginRight: 10,
  },
  instruction: {
    fontSize: 14,
    color: darkTheme.textDark,
  },
  walletSection: {
    marginTop: 20,
    width: '100%',
  },
  walletDescription: {
    fontSize: 14,
    color: darkTheme.textDark,
    textAlign: 'center',
    marginVertical: 10,
  },
  connectButton: {
    marginTop: 10,
    width: '100%',
  },
})

export default GreenslipDetailScreen;