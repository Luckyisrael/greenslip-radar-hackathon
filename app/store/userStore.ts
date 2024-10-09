import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export interface CustomUser {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string | null;
}

interface UserState {
  user: CustomUser | null;
  setUser: (user: CustomUser | null) => void;
  clearUser: () => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    AsyncStorage.setItem('user', JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    AsyncStorage.removeItem('user');
  },
  logout: async () => {
    try {
      await GoogleSignin.signOut();
      set({ user: null });
      AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
}));

// Load user from AsyncStorage on app start
export const loadUserFromStorage = async () => {
  const userJson = await AsyncStorage.getItem('user');
  if (userJson) {
    const user = JSON.parse(userJson) as CustomUser;
    useUserStore.getState().setUser(user);
  }
};