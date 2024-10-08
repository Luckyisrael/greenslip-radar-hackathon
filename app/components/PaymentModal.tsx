import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Text, Button } from 'app/lib';
import { darkTheme } from 'app/theme/colors';
import { sizes } from 'app/constants/sizes';

interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isVisible, onClose, onPaymentComplete }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle} family="bold" size={sizes.fontSize.large} color={darkTheme.text}>
            Complete Payment
          </Text>
          <Text style={styles.modalText} family="regular" size={sizes.fontSize.medium} color={darkTheme.textDark}>
            Please complete the payment to create your Greenslip.
          </Text>
          <Button label="Pay Now" onPress={onPaymentComplete} style={styles.button} />
          <Button label="Cancel" onPress={onClose} variant="secondary" style={styles.button} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: darkTheme.background,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default PaymentModal;