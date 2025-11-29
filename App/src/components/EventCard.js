import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import Colors from '../utils/colors';
import GlobalStyles from '../styles/globalStyles';

export default function EventCard({ event, onPress }) {
  // Determine badge color
  let badgeColor = Colors.primary;
  if (event.society === 'ACM') badgeColor = Colors.acm;
  if (event.society === 'CLS') badgeColor = Colors.cls;
  if (event.society === 'CSS') badgeColor = Colors.css;

  const dateStr = event.date?.seconds 
    ? new Date(event.date.seconds * 1000).toDateString() 
    : new Date(event.date).toDateString();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[GlobalStyles.card, { borderLeftWidth: 5, borderLeftColor: badgeColor }]}>
        <View style={GlobalStyles.row}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: badgeColor, fontWeight: 'bold', marginBottom: 4 }}>
              {event.society} • {event.venue}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.text }}>
              {event.title}
            </Text>
            <Text style={{ color: Colors.textLight, marginTop: 4 }}>
              {dateStr}
            </Text>
          </View>
          <Avatar.Icon size={40} icon="calendar" style={{ backgroundColor: '#F0F0F0' }} color={badgeColor} />
        </View>
      </View>
    </TouchableOpacity>
  );
}