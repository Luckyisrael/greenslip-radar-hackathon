import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Greenslip {
  id: number;
  title: string;
  width: 'full' | 'half';
}

interface RecentGreenslipsProps {
  greenslips: Greenslip[];
}

const RecentGreenslips: React.FC<RecentGreenslipsProps> = ({ greenslips }) => {
  const renderGreenslip = (greenslip: Greenslip) => {
    const itemStyle = [
      styles.greenslipItem,
      greenslip.width === 'full' ? styles.fullWidth : styles.halfWidth,
    ];

    return (
      <TouchableOpacity key={greenslip.id} style={itemStyle}>
        <Text style={styles.greenslipTitle}>{greenslip.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Greenslips</Text>
      <View style={styles.grid}>
        {greenslips.map(renderGreenslip)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  greenslipItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: (screenWidth - 48) / 2, // Accounting for container padding and gap
  },
  greenslipTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RecentGreenslips;