import { sizes } from 'app/constants/sizes';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ImageSourcePropType,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Banner {
  id: number;
  image: ImageSourcePropType;
}

interface CarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  banners,
  autoPlay = true,
  autoPlayInterval = 2000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        if (activeIndex === banners.length - 1) {
          scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        } else {
          scrollViewRef.current?.scrollTo({
            x: (activeIndex + 1) * screenWidth,
            animated: true,
          });
        }
      }, autoPlayInterval);

      return () => clearInterval(intervalId);
    }
  }, [activeIndex, autoPlay, autoPlayInterval, banners.length]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  const renderIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                { width },
                index === activeIndex ? styles.activeIndicator : undefined,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        {banners.map((banner) => (
          <Image
            key={banner.id}
            source={banner.image}
            style={styles.image}
          
          />
        ))}
      </ScrollView>
      {renderIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  image: {
    width: screenWidth,
    height: 200,
    borderRadius: sizes.borderRadius.xlarge
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#4A90E2',
  },
});

export default Carousel;