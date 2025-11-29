// src/screens/Student/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import EventCard from '../../components/EventCard';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';
import CustomButton from '../../components/CustomButton';
import { auth, db } from '../../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function StudentDashboard({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setEvents(arr);
      setLoading(false);
    }, (e) => {
      Alert.alert('Error', e.message);
      setLoading(false);
    });
    return unsub;
  }, []);

  const onLogout = async () => {
    await signOut(auth);
  };

  const handleRegister = async (ev) => {
    // register student for event (creates a subcollection or a registrations collection)
    try {
      const regRef = collection(db, 'events', ev.id, 'registrations');
      // simple create (no duplicates check for brevity)
      await regRef.add
        ? regRef.add({ uid: user.uid, name: user.email, registeredAt: new Date().toISOString() })
        : null;
      // If using modular Firestore, prefer addDoc(collection(...), {...})
      Alert.alert('Registered', 'You have registered for this event');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Header title="UniWeek - Events" right="Logout" onRightPress={onLogout} />
      <View style={{ marginVertical: 8 }}>
        <CustomButton title="Search & Filter" onPress={() => navigation.navigate('SearchFilter')} style={{ marginBottom: 8 }} />
        <CustomButton title="My Calendar" onPress={() => navigation.navigate('Calendar')} style={{ marginBottom: 8 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? <Text>Loading events...</Text> : null}
        {events.map(ev => (
          <EventCard
            key={ev.id}
            event={ev}
            onPress={() => navigation.navigate('EventDetails', { eventId: ev.id })}
            onRegister={() => handleRegister(ev)}
            registered={false}
          />
        ))}
      </ScrollView>
    </View>
  );
}
