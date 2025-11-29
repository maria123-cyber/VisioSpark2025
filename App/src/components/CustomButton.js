import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Colors from '../utils/colors';

export default function CustomButton({ label, onPress, mode = 'contained', loading = false, style, color }) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      style={[styles.btn, style]}
      contentStyle={{ paddingVertical: 6 }}
      buttonColor={mode === 'contained' ? (color || Colors.primary) : undefined}
      textColor={mode === 'outlined' ? (color || Colors.primary) : '#fff'}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    marginVertical: 8,
  }
});