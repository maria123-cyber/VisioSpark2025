// src/screens/Extra/LeaderboardScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';

export default function LeaderboardScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>Leaderboard</Text>
      <Text style={{ color:'#666', marginTop:12 }}>Coming soon — you can track top participants here.</Text>
    </View>
  );
}
