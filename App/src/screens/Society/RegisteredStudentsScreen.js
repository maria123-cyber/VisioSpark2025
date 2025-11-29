// src/screens/Society/RegisteredStudentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function RegisteredStudentsScreen({ route }) {
  const { eventId } = route.params;
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'events', eventId, 'registrations'));
      setRegs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>Registered Students</Text>
      {regs.length === 0 ? <Text style={{marginTop:12}}>No registrations yet</Text> : regs.map(r => (
        <View key={r.id} style={GlobalStyles.card}>
          <Text style={{ fontWeight:'700' }}>{r.name || r.email}</Text>
          <Text style={{ color:'#666', marginTop:4 }}>{r.registeredAt || r.createdAt}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
