import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BackButton } from '../components/BackButton';
import Details from '../screens/welcome/selectRoleScreen';
import Overview from '../screens/welcome/overview';
import ConsumerAuth from 'app/screens/auth/consumerAuth';
import BusinessAuth from 'app/screens/auth/businessAuth';
import Home from 'app/screens/tabs/home';
import Profile from 'app/screens/tabs/profile';
import Wallet from 'app/screens/tabs/wallet';
import DiscoverScreen from 'app/screens/tabs/discover';
import Scan from 'app/screens/tabs/scan';
import { TabBarIcon } from 'app/components/TabBarIcon';
import { Clipboard, I3DCubeScan, Keyboard, ProfileTick, Wallet2, Discover } from 'iconsax-react-native';
import { darkTheme } from 'app/theme/colors';
import GreenslipDetailScreen from 'app/screens/greenslipData/greenslipDataScreen';
import { Greenslip } from 'app/constants/greenslipData';
import { KeyboardAvoidingView, Platform } from 'react-native';
import RedeemScreen from 'app/screens/tabs/scan';
import CreateGreenslipScreen from 'app/screens/greenslipData/CreateGreenslip';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  ConsumerAuth: undefined;
  BusinessAuth: undefined;
  TabScreens: undefined;
  GreenslipDetail: { greenslip: Greenslip };
  CreateGreenslip: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


const RootStack = () => {
  return (
      <Stack.Navigator initialRouteName="Overview" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="ConsumerAuth" component={ConsumerAuth} options={{ presentation: 'modal'}} />
        <Stack.Screen name="BusinessAuth" component={BusinessAuth} options={{ presentation: 'modal'}} />
        <Stack.Screen name="CreateGreenslip" component={CreateGreenslipScreen} options={{ title: 'Create Greenslip' }} />
      
        <Stack.Screen 
          name="GreenslipDetail" 
          component={GreenslipDetailScreen} 
          options={({ route }) => ({ title: route.params.greenslip.title })}
        />
        <Stack.Screen name="TabScreens" component={MyTabs}/>
      </Stack.Navigator>
  );
}

const MyTabs = () => {
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: darkTheme.primary,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: darkTheme.primaryLight, 
        tabBarStyle: {
          height: 65,
          backgroundColor: darkTheme.background,
          borderTopColor: darkTheme.background,
          borderTopWidth: 0
        }
      }}>
      <Tab.Screen 
          name="Home" 
          component={Home}  
          options={{ title: 'Dashboard', tabBarIcon: ({ color, focused }) => <Keyboard size="32" color={color} variant={focused? "Bold" : "Broken"}/>,
        }}/>
{/*       <Tab.Screen 
        name="Wallet" 
        component={Wallet}
        options={{ title: 'Wallet', tabBarIcon: ({ color }) => <Wallet2 size="32" color={color} variant="Bold"/>,
        }}/> */}
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen} 
        options={{ title: 'Discover', tabBarIcon: ({ color, focused }) => <Discover size="32" color={color} variant={focused? "Bold" : "Broken"}/>,
        }}/>
      <Tab.Screen 
        name="Scan" 
        component={RedeemScreen} 
        options={{ title: 'Scan', tabBarIcon: ({ color, focused }) => <I3DCubeScan size="32" color={color} variant={focused? "Bold" : "Broken"}/>,
        }}/>
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile', tabBarIcon: ({ color, focused }) => <ProfileTick size="32" color={color} variant={focused? "Bold" : "Broken"}/>,
        }}/>
    </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

export {
  RootStack,
  MyTabs
}