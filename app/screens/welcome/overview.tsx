import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Animated, Easing, StatusBar } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { Screen } from 'app/lib';
import { Text, Button } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';
import { moderateScale } from 'react-native-size-matters';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const welcomePng1 = require('../../../assets/welcome.png');
  const welcomePng2 = require('../../../assets/Welcome-cuate.png');
  const welcomePng3 = require('../../../assets/welcome.png');

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 3,
          duration: 9000, // Total duration for all three images
          useNativeDriver: true,
          easing: Easing.linear
        })
      ).start();
    };

    startAnimation();
  }, [fadeAnim]);

  const opacity1 = fadeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [1, 0, 0, 1]
  });

  const opacity2 = fadeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, 1, 0, 0]
  });

  const opacity3 = fadeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, 0, 1, 0]
  });

  return (
    <Screen>
      <StatusBar backgroundColor={darkTheme.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size={sizes.fontSize.xlarge} family='bold' color={darkTheme.text}>Welcome to Greenslip</Text>
          <View style={styles.imageContainer}>
            <Animated.Image 
              source={welcomePng1} 
              resizeMode='contain' 
              style={[styles.image, { opacity: opacity1 }]} 
            />
            <Animated.Image 
              source={welcomePng2} 
              resizeMode='contain' 
              style={[styles.image, { opacity: opacity2 }]} 
            />
            <Animated.Image 
              source={welcomePng3} 
              resizeMode='contain' 
              style={[styles.image, { opacity: opacity3 }]} 
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            onPress={() =>
              navigation.navigate('Details', {
                name: 'Dan',
              })
            }
            label="Get Started"
          />
        </View>
      </View>
    </Screen>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingHorizontal: 20
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: moderateScale(500),
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  footer: {
    marginBottom: 20
  }
});