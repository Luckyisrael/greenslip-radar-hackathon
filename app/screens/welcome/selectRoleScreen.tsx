import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import { Screen, Button } from 'app/lib';
import { Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';
import { darkTheme } from 'app/theme/colors';

const { width } = Dimensions.get('window');

const topImages = [
  require('../../../assets/Queue-cuate.png'),
  require('../../../assets/Barcode-amico.png'),
  require('../../../assets/Discount-cuate.png'),
  require('../../../assets/GroupDiscussion.png'),
  require('../../../assets/QRCode-pana.png'),
];

const bottomImages = [
  require('../../../assets/QRCode-pana.png'),
  require('../../../assets/Retailmarkdown-bro.png'),
  require('../../../assets/Retailmarkdown-pana.png'),
  require('../../../assets/SecureServer-cuate.png'),
  require('../../../assets/shop1.gif'),
];

const IMAGE_SIZE = width / 1.5; // Adjust this value to change image size
const IMAGE_SPACING = 10;
const SCROLL_INTERVAL = 50;

const Marquee = ({ images, direction }: { images: any[], direction: 'left' | 'right' }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = direction === 'left' 
      ? -(IMAGE_SIZE + IMAGE_SPACING) * images.length
      : (IMAGE_SIZE + IMAGE_SPACING) * images.length;

    const animation = Animated.timing(scrollX, {
      toValue: toValue,
      duration: 30000, // Adjust this value to change speed
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(animation).start();
  }, [scrollX, images.length, direction]);

  const renderImages = () => {
    const doubledImages = [...images, ...images];
    return doubledImages.map((img, index) => (
      <View key={index} style={styles.imageWrapper}>
        <Image
          source={img}
          style={styles.marqueeImage}
          resizeMode="contain"
        />
      </View>
    ));
  };

  return (
    <View style={styles.marqueeContainer}>
      <StatusBar backgroundColor={darkTheme.background} />
      <Animated.View 
        style={[
          styles.marqueeContent,
          { transform: [{ translateX: scrollX }] }
        ]}
      >
        {renderImages()}
      </Animated.View>
    </View>
  );
};

export default function Details() {
  const navigation = useNavigation();

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Marquee images={topImages} direction="right" />
        <Marquee images={bottomImages} direction="left" />
      </View>
      <View style={styles.footer}>
        <Button 
          variant='primary' 
          label='consumer' 
          onPress={() => { navigation.navigate('ConsumerAuth' as keyof RootStackParamList) }}
        />
        <Button 
          variant='secondary' 
          label='business' 
          onPress={() => { navigation.navigate('BusinessAuth' as keyof RootStackParamList) }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  marqueeContainer: {
    height: IMAGE_SIZE,
    marginVertical: 10,
    width: '100%',
    overflow: 'hidden',
  },
  marqueeContent: {
    flexDirection: 'row',
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginHorizontal: IMAGE_SPACING / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marqueeImage: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    padding: 10
  },
  footer: {
    padding: 20,
    rowGap: 15
  },
});