// src/components/InputField.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../utils/colors';

export default function InputField({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8b8b8b"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111',
    borderWidth: 1,
    borderColor: '#eee',
  },
});
