// src/screens/Student/CalendarScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import { db, auth } from '../../../firebase';
import { collectionGroup, query, where, getDocs } from 'firebase/firestore';

export default function CalendarScreen() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const fetchRegs = async () => {
      // using collectionGroup to fetch registrations across all events
      try {
        const q = query(collectionGroup(db, 'registrations'), where('uid', '==', auth.currentUser.uid));
        const snap = await getDocs(q);
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setRegs(arr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRegs();
  }, []);

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>My Calendar</Text>
      <Text style={{ color: '#666', marginBottom: 12 }}>Registered events</Text>
      {regs.length === 0 ? <Text>No registered events yet</Text> : regs.map(r => (
        <View key={r.id} style={GlobalStyles.card}>
          <Text style={{ fontWeight: '700' }}>{r.eventName || 'Event'}</Text>
          <Text style={{ color: '#666' }}>{r.registeredAt}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
