import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, Text, Button,  } from 'app/lib';
import { darkTheme } from 'app/theme/colors';
import { sizes } from 'app/constants/sizes';
import CustomInput from 'app/components/CustomInput';
import PaymentModal from 'app/components/PaymentModal';


const CreateGreenslipScreen: React.FC = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('');
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const handleCreate = () => {
    const greenslipData = {
      title,
      description,
      expiryDate,
      category,
    };
    console.log('Greenslip data:', greenslipData);
    setIsPaymentModalVisible(true);
  };

  const handlePaymentComplete = () => {
    // Here you would typically process the payment and create the Greenslip
    console.log('Payment completed');
    setIsPaymentModalVisible(false);
    // Add logic to save the Greenslip
    navigation.goBack(); // Return to Home screen
  };

  return (
    <Screen style={styles.container}>
        <StatusBar backgroundColor={darkTheme.background} />
      <ScrollView>
        <Text  family="bold" size={sizes.fontSize.large} color={darkTheme.textDark}>
          Create New Greenslip
        </Text>
        <Text  family="light" size={sizes.fontSize.small} color={darkTheme.textDark}>
          Fill these form to create your greenslip
        </Text>
        <View style={[styles.spacing, { marginTop: 20}]}>
            <Text color={darkTheme.textDark} family='semi-bold' size={sizes.fontSize.small}>Title</Text>
            <CustomInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            />
        </View>
        <View style={styles.spacing}>
            <Text color={darkTheme.textDark} family='semi-bold' size={sizes.fontSize.small}>Description</Text>
            <CustomInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
        </View>
        <View style={styles.spacing}>
            <Text color={darkTheme.textDark} family='semi-bold' size={sizes.fontSize.small}>Date of expiration</Text>
            <CustomInput
                placeholder="Expiry Date (YYYY-MM-DD)"
                value={expiryDate}
                onChangeText={setExpiryDate}
                
                />
        </View>
        <View style={styles.spacing}>
            <Text color={darkTheme.textDark} family='semi-bold' size={sizes.fontSize.small}>Total number of greenslips</Text>
            <CustomInput
                placeholder="Number to be minted"
                value={category}
                onChangeText={setCategory}
                />
        </View>
        <View style={styles.spacing}>
                <Text color={darkTheme.textDark} family='semi-bold' size={sizes.fontSize.small}>Type of greenslip</Text>
                <CustomInput
                placeholder="type"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
                />
        </View>
        <Button label="Create Greenslip" onPress={handleCreate} style={styles.button} />
        <Button label="Cancel" onPress={() => navigation.goBack()} variant="secondary" style={styles.button} />
      </ScrollView>

      <PaymentModal
        isVisible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  spacing: {
    rowGap: 10
  }
});

export default CreateGreenslipScreen;