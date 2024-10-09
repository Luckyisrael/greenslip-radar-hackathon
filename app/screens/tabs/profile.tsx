import { ScrollView, StyleSheet,TouchableOpacity, View, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from 'app/components/Header'
import { Button, Screen, Text } from 'app/lib'
import { darkTheme } from 'app/theme/colors'
import { 
  UserAdd,
  InfoCircle, 
  MessageQuestion, 
  Setting2, 
  Wallet3,
  Lock1,
  LogoutCurve
} from 'iconsax-react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { sizes } from 'app/constants/sizes';
import { useOkto, OktoContextType, User } from 'okto-sdk-react-native'
import { useUserStore } from 'app/store/userStore';

type RootStackParamList = {
  About: undefined;
  Support: undefined;
  Settings: undefined;
  Wallet: undefined;
  Security: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Profile = () => {
  const { getUserDetails } = useOkto() as OktoContextType;
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };
  const handleLogout = async () => {
    await logout();
    // Navigate to Login screen or any other appropriate screen after logout
    navigation.navigate('Overview' as never);
  };


  useEffect(() => {
    getUserDetails()
      .then((result) => {
        setUserDetails(result);
        console.log('user deets', userDetails)
      })
      .catch((error) => {
        console.log('error: ', error)
      });
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user logged in</Text>
        <Button label="Go to Login" onPress={() => navigation.navigate('Login' as never)} />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      <ScrollView>
        <View style={styles.header}>
          
           {user?.photo && (
              <Image
                source={{ uri: user.photo }}
                style={styles.profileImage}
              />
            )}
          <Text style={styles.name} family='bold' size={sizes.fontSize.xlarge} color={darkTheme.text}>
            {user?.name}
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text  family='regular' size={sizes.fontSize.small} color={darkTheme.textDark}>
              {userDetails?.email}
            </Text>
            <Text style={styles.email} family='regular' size={sizes.fontSize.tiny} color={darkTheme.textDark}>
              {userDetails?.user_id}
            </Text>
          </View>
        </View>

        <View style={styles.navigationSection}>
          <NavigationItem 
            icon={<InfoCircle size={24} color={darkTheme.primary} />}
            title="About"
            onPress={() => navigateTo('About')}
          />
          <NavigationItem 
            icon={<MessageQuestion size={24} color={darkTheme.primary} />}
            title="Support"
            onPress={() => navigateTo('Support')}
          />
          <NavigationItem 
            icon={<Setting2 size={24} color={darkTheme.primary} />}
            title="Settings"
            onPress={() => navigateTo('Settings')}
          />
          <NavigationItem 
            icon={<Wallet3 size={24} color={darkTheme.primary} />}
            title="Wallet"
            onPress={() => navigateTo('Wallet')}
          />
          <NavigationItem 
            icon={<Lock1 size={24} color={darkTheme.primary} />}
            title="Security"
            onPress={() => navigateTo('Security')}
          />
        </View>

        <Button 
          label="Log Out" 
          onPress={handleLogout}
          style={{backgroundColor: darkTheme.error}}
          
        />
      </ScrollView>
    </Screen>
  );
};

export default Profile;

interface NavigationItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.navigationItem} onPress={onPress}>
    {icon}
    <Text style={styles.navigationText} family='semi-bold' size={sizes.fontSize.medium} color={darkTheme.textDark}>
      {title}
    </Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingHorizontal: 5
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    marginBottom: 5,
  },
  email: {
    marginBottom: 20,
  },
  navigationSection: {
    paddingLeft: 10
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: sizes.borderRadius.xlarge,
    columnGap: 10,
    borderBottomColor: darkTheme.textDark
  },
  navigationText: {
    marginLeft: 15,
  },

});