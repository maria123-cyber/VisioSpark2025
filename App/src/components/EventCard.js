// src/components/EventCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../utils/colors';

export default function EventCard({ event, onPress, onRegister, registered }) {
  return (
    <View style={styles.card}>
      <View style={{flex:1}}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.meta}>{event.society} • {event.date} • {event.venue}</Text>
        <Text numberOfLines={2} style={styles.desc}>{event.description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onPress} style={styles.detailBtn}>
          <Text style={styles.detailText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRegister} style={[styles.registerBtn, registered && { backgroundColor: '#ccc' }]} disabled={registered}>
          <Text style={styles.registerText}>{registered ? 'Registered' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: '700', color: Colors.textDark, marginBottom: 4 },
  meta: { color: Colors.muted, fontSize: 12, marginBottom: 8 },
  desc: { color: '#333', fontSize: 13 },
  actions: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' },
  detailBtn: { padding: 8 },
  detailText: { color: Colors.primary, fontWeight: '700' },
  registerBtn: {
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  registerText: { fontWeight: '700' },
});
