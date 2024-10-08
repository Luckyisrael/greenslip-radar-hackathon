import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TicketStar, Clock } from 'iconsax-react-native';
import { Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const itemHeight = 150; // Fixed height for all items
const gap = 10; // Gap between items
const containerPadding = 5; // Padding of the container
const availableWidth = screenWidth - (2 * containerPadding) - gap;

interface Greenslip {
  id: number;
  title: string;
  brand: string;
  expiryDate: Date;
}

type RootStackParamList = {
    GreenslipDetail: { greenslip: Greenslip };
  };
  
  type GreenslipsMasonryNavigationProp = StackNavigationProp<RootStackParamList, 'GreenslipDetail'>;
  
  interface GreenslipsMasonryProps {
    greenslips: Greenslip[];
    header: string;
  }
  
  const GreenslipsMasonry: React.FC<GreenslipsMasonryProps> = ({ greenslips, header }) => {
    const navigation = useNavigation<GreenslipsMasonryNavigationProp>();
  
    const getCountdown = (expiryDate: Date) => {
      const now = new Date();
      const difference = expiryDate.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 3600 * 24));
      return `${days} days left`;
    };
  
    const renderGreenslip = (greenslip: Greenslip, index: number) => {
      let itemStyle;
      const rowIndex = Math.floor(index / 3);
      const positionInRow = index % 3;
  
      if (positionInRow === 2) {
        itemStyle = [styles.greenslipItem, { width: availableWidth }];
      } else if (rowIndex % 2 === 0) {
        itemStyle = [
          styles.greenslipItem,
          positionInRow === 0
            ? { width: availableWidth * 0.6 - gap / 2 }
            : { width: availableWidth * 0.4 - gap / 2 }
        ];
      } else {
        itemStyle = [
          styles.greenslipItem,
          positionInRow === 0
            ? { width: availableWidth * 0.4 - gap / 2 }
            : { width: availableWidth * 0.6 - gap / 2 }
        ];
      }
  
      return (
        <TouchableOpacity 
          key={greenslip.id} 
          style={itemStyle}
          onPress={() => navigation.navigate('GreenslipDetail', { greenslip })}
        >
          <View style={styles.iconContainer}>
          <TicketStar size={sizes.iconSize.medium} color="#4A90E2" variant="Bold" />
          </View>
          <View style={styles.contentContainer}>
          <Text family='bold' size={sizes.fontSize.small} color={darkTheme.textDark}>{greenslip.brand}</Text>
          <Text family='light' size={sizes.fontSize.small - 2} numberOfLines={2} color={darkTheme.textDark}>{greenslip.title}</Text>
            <View style={styles.countdownContainer}>
                <Clock size={16} color={darkTheme.secondaryLight} variant="Bold" />
                <Text size={sizes.fontSize.small - 2} family='light' color={darkTheme.accent}>{getCountdown(greenslip.expiryDate)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text family='bold' color={darkTheme.textDark} size={sizes.fontSize.large}>{header}</Text>
        <View style={styles.grid}>
          {greenslips.map(renderGreenslip)}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    rowGap: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  greenslipItem: {
    height: itemHeight,
    backgroundColor: darkTheme.surface,
    borderRadius: sizes.borderRadius.xlarge,
    marginBottom: gap,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    /* shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, */
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    rowGap: 4
  },
  brandName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 4,
  },
  greenslipTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  countdownText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
});

export default GreenslipsMasonry;