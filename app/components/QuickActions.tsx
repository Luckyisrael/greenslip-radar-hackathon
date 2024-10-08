import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScanBarcode, Keyboard, Wallet } from 'iconsax-react-native';
import { Text } from 'app/lib';
import { sizes } from 'app/constants/sizes';

interface QuickAction {
  id: number;
  title: string;
  icon: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'scan-barcode': ScanBarcode,
  keyboard: Keyboard,
  wallet: Wallet,
};

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => {
        const Icon = iconMap[action.icon];
        return (
          <TouchableOpacity key={action.id} style={styles.action}>
            <View style={styles.iconContainer}>
              {Icon && <Icon size={24} color="#4A90E2" variant="Bold" />}
            </View>
            <Text family='semi-bold' size={sizes.fontSize.tiny} color='white'>{action.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,

  },
  action: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default QuickActions;