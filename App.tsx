import "react-native-gesture-handler";
import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
//import * as SplashScreen from 'expo-splash-screen';

import { RootStack, MyTabs } from "./app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

//SplashScreen.preventAutoHideAsync();
export default function App() {

  const [fontsLoaded] = useFonts({
    'Manrope-Bold': require('./assets/fonts/Manrope-Bold.ttf'),
    'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Light': require('./assets/fonts/Manrope-Light.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-ExtraLight': require('./assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-ExtraBold': require('./assets/fonts/Manrope-ExtraBold.ttf'),
  });
	 
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      //await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

		return (
      <BottomSheetModalProvider>
        <NavigationContainer onReady={() => onLayoutRootView()}>
          {/* <AppNavigator /> */}
          <RootStack />
        </NavigationContainer>
        </BottomSheetModalProvider>

    ) 
	
}
