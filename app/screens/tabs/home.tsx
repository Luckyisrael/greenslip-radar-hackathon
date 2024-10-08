import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Screen, Text } from 'app/lib'
import { darkTheme } from 'app/theme/colors'
import UserLocation from 'app/components/UserLocation';
import GreenslipStats from 'app/components/GreenslipStats';
import BannerCarousel from 'app/components/BannerCarousel';
import Carousel from 'app/components/BannerCarousel';
import QuickActions from 'app/components/QuickActions';
import RecentGreenslips from 'app/components/RecentGreenslips';
import GreenslipsMasonry from 'app/components/GreenslipMasonary';
import { Greenslip, greenslips } from 'app/constants/greenslipData';
import Header from 'app/components/Header';
import CreateGreenslipScreen from '../greenslipData/CreateGreenslip';
import PaymentModal from 'app/components/PaymentModal';
import FloatingActionButton from 'app/components/FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Dummy data
const userData = {
  location: 'Port Harcourt, Nigeria.',
  totalClaimed: 15,
  redeemed: 8,
  pending: 7,
};

const banners = [
  { id: 1, image: require('../../../assets/discount.jpg') },
  { id: 2, image: require('../../../assets/tickets.jpg') },
  { id: 3, image: require('../../../assets/blackfriday.jpg') },
];

const quickActions = [
  { id: 1, title: 'Scan QR', icon: 'qr-code' },
  { id: 2, title: 'Enter Code', icon: 'keyboard' },
  { id: 3, title: 'My Wallet', icon: 'wallet' },
];

type RootStackParamList = {
  CreateGreenslip: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateGreenslip'>;


const Home = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleFABPress = () => {
    navigation.navigate('CreateGreenslip');
  };

  const featuredGreenslips = greenslips.slice(0, 3);
  const [isCreateScreenVisible, setIsCreateScreenVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const handleCreateGreenslip = (greenslipData: any) => {
    console.log('Greenslip data:', greenslipData);
    setIsCreateScreenVisible(false);
    setIsPaymentModalVisible(true);
  };

  const handlePaymentComplete = () => {
    // Here you would typically process the payment and create the Greenslip
    console.log('Payment completed');
    setIsPaymentModalVisible(false);
    // Add logic to save the Greenslip
  };

  return (
    <Screen style={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      <Header />
      <GreenslipStats
      location={userData.location}
        totalClaimed={userData.totalClaimed}
        redeemed={userData.redeemed}
        pending={userData.pending}
      />
       <View style={styles.carouselContainer}>
        <Carousel banners={banners} />
      </View>
      <QuickActions actions={quickActions} />
      <GreenslipsMasonry greenslips={featuredGreenslips} header='Recent Greenslips' />

      <FloatingActionButton onPress={handleFABPress} />

      {isCreateScreenVisible && (
        <CreateGreenslipScreen
          onCreateGreenslip={handleCreateGreenslip}
          onClose={() => setIsCreateScreenVisible(false)}
        />
      )}

      <PaymentModal
        isVisible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </Screen>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkTheme.background,
        paddingHorizontal: 5
    },
    carouselContainer: {
      marginBottom: 16,
    },
})