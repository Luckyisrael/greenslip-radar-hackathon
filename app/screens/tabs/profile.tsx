import { ScrollView, StyleSheet,TouchableOpacity, View, Image, StatusBar } from 'react-native'
import React from 'react'
import Header from 'app/components/Header'
import { Button, Screen, Text } from 'app/lib'
import { darkTheme } from 'app/theme/colors'
import { 
  User, 
  InfoCircle, 
  MessageQuestion, 
  Setting2, 
  Wallet3,
  Lock1,
  LogoutCurve
} from 'iconsax-react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { sizes } from 'app/constants/sizes'

type RootStackParamList = {
  About: undefined;
  Support: undefined;
  Settings: undefined;
  Wallet: undefined;
  Security: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Profile = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <Screen style={styles.container}>
      <StatusBar backgroundColor={darkTheme.background} />
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.profileImage}
          />
          <Text style={styles.name} family='bold' size={sizes.fontSize.xlarge} color={darkTheme.text}>
            Lucky Israel
          </Text>
          <Text style={styles.email} family='regular' size={sizes.fontSize.small} color={darkTheme.textDark}>
            Luckyisrael4real@gmail.com
          </Text>
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
          onPress={() => console.log('Logging out...')} 
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