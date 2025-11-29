// src/screens/Auth/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../utils/colors';
import GlobalStyles from '../styles/globalStyles';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Auth');
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[GlobalStyles.centered, { flex: 1, backgroundColor: Colors.primary }]}>
      <Text style={{ color: '#fff', fontSize: 28, fontWeight: '800' }}>UniWeek</Text>
      <Text style={{ color: '#fff', marginTop: 8 }}>Student Week Management</Text>
    </View>
  );
}
