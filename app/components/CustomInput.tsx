import { sizes } from 'app/constants/sizes';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'app/lib';
import { darkTheme } from 'app/theme/colors';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  success?: boolean;
  style?: ViewStyle;
}

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  success,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focusedInput,
          error ? styles.errorInput : success ? styles.successInput : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={darkTheme.accent}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        cursorColor={darkTheme.accent}
        
      />
      {error && <Text family='light' size={sizes.fontSize.tiny} color={darkTheme.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    rowGap: 5
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: sizes.borderRadius.xlarge,
    padding: 15,
    fontSize: sizes.fontSize.medium,
    color: darkTheme.text
  },
  focusedInput: {
    borderColor: '#4A90E2',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: darkTheme.error
  },
  successInput: {
    borderColor: 'green',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;