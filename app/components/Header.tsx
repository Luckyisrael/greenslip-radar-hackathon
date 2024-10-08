import { StyleSheet, View } from 'react-native'
import React from 'react';
import { Text } from 'app/lib';
import { ProfileCircle, Notification } from 'iconsax-react-native';
import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';

const Header = () => {
  return (
    <View style={styles.container}>
        <ProfileCircle size={sizes.iconSize.large + 10} color={darkTheme.accent} variant="Bulk"/>
      <View style={{flex: 1}}>
        <Text size={sizes.fontSize.large} family='bold' color={darkTheme.text}>Welcome, Lucky</Text>
        <Text size={sizes.fontSize.small} family='light' color={darkTheme.text}>HN7cABqLq46Es1jh92dQQi.......</Text>
      </View>
      <View style={{backgroundColor: darkTheme.surface, borderRadius: 50, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Notification size={sizes.iconSize.medium} color={darkTheme.accent} variant="Bold"/>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
        marginVertical: 10
    }
})