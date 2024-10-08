import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Location } from 'iconsax-react-native';
import { Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';

interface UserLocationProps {
  location: string;
}

const UserLocation: React.FC<UserLocationProps> = ({ location }) => {
  return (
    <View style={styles.container}>
      <Location size={24} color="#4A90E2" variant="Bold" />
      <Text family='bold' size={sizes.fontSize.small} color={darkTheme.primaryLight}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    columnGap: 10
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default UserLocation;