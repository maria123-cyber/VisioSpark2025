// src/screens/Student/EventDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import { db, auth } from '../../../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

export default function EventDetailsScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetch = async () => {
      const d = await getDoc(doc(db, 'events', eventId));
      if (d.exists()) setEvent({ id: d.id, ...d.data() });
      else Alert.alert('Not found', 'Event does not exist');
    };
    fetch();
  }, []);

  const onRegister = async () => {
    try {
      await addDoc(collection(db, 'events', eventId, 'registrations'), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString()
      });
      Alert.alert('Registered', 'You are registered for this event');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (!event) return <View style={[GlobalStyles.centered, { flex: 1 }]}><Text>Loading...</Text></View>;

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>{event.name}</Text>
      <Text style={{ color: '#666', marginVertical: 6 }}>{event.society} • {event.date} • {event.venue}</Text>
      <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12 }}>
        <Text style={{ fontSize: 14, lineHeight: 20 }}>{event.description}</Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <CustomButton title="Register for this event" onPress={onRegister} />
      </View>
    </ScrollView>
  );
}
