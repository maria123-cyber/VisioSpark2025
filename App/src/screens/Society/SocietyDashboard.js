// src/screens/Society/SocietyDashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import CustomButton from '../../components/CustomButton';
import { db } from '../../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import EventCard from '../../components/EventCard';

export default function SocietyDashboard({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // For demo, fetch all events where society == 'ACM' for example
    const q = query(collection(db, 'events'), where('society', '==', 'ACM'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setEvents(arr);
    }, (err) => {
      Alert.alert('Error', err.message);
    });
    return unsub;
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>Society Dashboard</Text>
      <Text style={{ color: '#666', marginBottom: 12 }}>Manage society events</Text>
      <CustomButton title="Add New Event" onPress={() => navigation.navigate('AddEvent')} style={{ marginBottom: 12 }} />
      <ScrollView>
        {events.map(ev => (
          <EventCard
            key={ev.id}
            event={ev}
            onPress={() => navigation.navigate('RegisteredStudents', { eventId: ev.id })}
            onRegister={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
}
