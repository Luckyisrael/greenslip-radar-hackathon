import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Keyboard,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { BlurView } from 'expo-blur'
import { FingerCricle, CloseCircle } from 'iconsax-react-native';
import { Greenslip, greenslips } from 'app/constants/greenslipData';
import GreenslipsMasonry from 'app/components/GreenslipMasonary';
import { darkTheme } from 'app/theme/colors';
import Header from 'app/components/Header';
import { Screen } from 'app/lib';
import { useUserStore } from 'app/store/userStore';

const { height, width } = Dimensions.get('window');

const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGreenslips, setFilteredGreenslips] = useState<Greenslip[]>(greenslips);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = greenslips.filter(greenslip => 
          greenslip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          greenslip.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          greenslip.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGreenslips(filtered);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setFilteredGreenslips(greenslips);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const searchBarTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Slight upward movement when focused
  });

  const contentOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  return (
    <Screen>
      <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this value as needed
    >
      <Header userName={user.name} />
      <Animated.View 
        style={[
          styles.searchContainer, 
          { transform: [{ translateY: searchBarTranslateY }] },
          isFocused && styles.focusedSearchContainer
        ]}
      >
        <FingerCricle size={24} color="#4A90E2" />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search brands, categories, or greenslips"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isLoading && <ActivityIndicator size="small" color="#4A90E2" />}
        {searchQuery.length > 0 && !isLoading && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <CloseCircle size={24} color="#4A90E2" />
          </TouchableOpacity>
        )}
      </Animated.View>
      
      <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
        <FlatList
          data={[{ key: 'grid' }]}
          renderItem={() => (
            <GreenslipsMasonry greenslips={filteredGreenslips} header='Find your next discount' />
          )}
          keyExtractor={(item) => item.key}
        />
      </Animated.View>
      
      {isFocused && (
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          onPress={() => {
            Keyboard.dismiss();
            inputRef.current?.blur();
          }}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            tint="dark"
            intensity={70}
          />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingHorizontal: 5
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 8,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  focusedSearchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 8,
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
});

export default DiscoverScreen;