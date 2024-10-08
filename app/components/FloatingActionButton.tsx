import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Add } from 'iconsax-react-native';
import { darkTheme } from 'app/theme/colors';

interface FABProps {
  onPress: () => void;
  style?: ViewStyle;
}

const FloatingActionButton: React.FC<FABProps> = ({ onPress, style }) => (
  <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
    <Add size={24} color={darkTheme.text} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: darkTheme.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999, // Ensure it's above other elements
  },
});

export default FloatingActionButton;