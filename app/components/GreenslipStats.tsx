import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import { Location } from 'iconsax-react-native';
import { darkTheme } from 'app/theme/colors';

interface GreenslipStatsProps {
  totalClaimed: number;
  redeemed: number;
  pending: number;
  location: string;
}


const GreenslipStats: React.FC<GreenslipStatsProps> = ({ totalClaimed, redeemed, pending, location }) => {
  return (
    <View style={styles.container}>
        <UserLocation location={location} />
      <View style={styles.statContainer}>
        <StatItem title="Total Claimed" value={totalClaimed} />
        <StatItem title="Redeemed" value={redeemed} />
        <StatItem title="Pending" value={pending} />
      </View>
    </View>
  );
};

interface StatItemProps {
  title: string;
  value: number;
}

const StatItem: React.FC<StatItemProps> = ({ title, value }) => (
  <View style={styles.statItem}>
    <Text family='bold' size={sizes.fontSize.medium} color={darkTheme.background}>{title}</Text>
    <Text family='bold' size={sizes.fontSize.xlarge}>{value}</Text>
  </View>
);

interface UserLocationProps {
    location: string;
  }
  
  const UserLocation: React.FC<UserLocationProps> = ({ location }) => {
    return (
      <View style={styles.location}>
        <Location size={24} color={darkTheme.background } variant="Bold" />
        <Text family='bold' size={sizes.fontSize.small} color={darkTheme.text}>{location}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: darkTheme.primary,
    marginBottom: 16,
    borderRadius: sizes.borderRadius.xlarge
    //borderBottomEndRadius: sizes.borderRadius.xlarge,
    //borderBottomStartRadius: sizes.borderRadius.xlarge
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statTitle: {
    fontSize: 14,
    color: '#888',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    columnGap: 10
  },
});

export default GreenslipStats;