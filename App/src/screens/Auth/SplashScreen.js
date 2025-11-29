import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after 3s
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={[Colors.primary, '#2980B9']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Placeholder for Unsplash Image - using text/icon for stability */}
      <Text style={{ fontSize: 60 }}>🎓</Text>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 20 }}>UniWeek</Text>
      <Text style={{ fontSize: 16, color: '#E0E0E0', marginTop: 10 }}>Connect. Compete. Celebrate.</Text>
    </LinearGradient>
  );
}