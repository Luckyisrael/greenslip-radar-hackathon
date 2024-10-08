import "react-native-gesture-handler";
import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { OktoProvider, BuildType } from 'okto-sdk-react-native'
//import * as SplashScreen from 'expo-splash-screen';

import { RootStack, MyTabs } from "./app/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

//SplashScreen.preventAutoHideAsync();

const oktoAppId = '884741c7-da1b-44bb-8562-41c1dba393d5';
const oktoApiKey = '7c632d57-817e-407b-836a-a4ce76755944';
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
      <OktoProvider apiKey={oktoApiKey} buildType={BuildType.SANDBOX}>
        <BottomSheetModalProvider>
        <NavigationContainer onReady={() => onLayoutRootView()}>
          {/* <AppNavigator /> */}
          <RootStack />
        </NavigationContainer>
        </BottomSheetModalProvider>
      </OktoProvider>
    ) 
}
