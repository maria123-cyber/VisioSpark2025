// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../utils/colors';

export default function Header({ title, right, onRightPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {right ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightBtn}>
          <Text style={styles.rightText}>{right}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textDark,
    fontSize: 18,
    fontWeight: '700',
  },
  rightBtn: {
    padding: 8,
  },
  rightText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
