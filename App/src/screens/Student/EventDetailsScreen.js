import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import * as Calendar from 'expo-calendar';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const [registering, setRegistering] = useState(false);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Please login first");

      // Check if already registered
      const q = query(collection(db, 'registrations'), where('eventId', '==', event.id), where('studentId', '==', user.uid));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        Alert.alert('Info', 'You are already registered for this event.');
        setRegistering(false);
        return;
      }

      // Register
      await addDoc(collection(db, 'registrations'), {
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        studentId: user.uid,
        studentEmail: user.email,
        registeredAt: new Date()
      });

      Alert.alert('Success', 'Successfully registered!');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
    setRegistering(false);
  };

  const addToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find(c => c.isPrimary) || calendars[0];
        
        await Calendar.createEventAsync(defaultCalendar.id, {
          title: event.title,
          startDate: new Date(event.date.seconds * 1000),
          endDate: new Date((event.date.seconds * 1000) + (2 * 60 * 60 * 1000)), // default 2 hours
          location: event.venue,
          notes: event.description
        });
        Alert.alert('Success', 'Event added to device calendar.');
      } else {
        Alert.alert('Permission', 'Calendar permission is required.');
      }
    } catch (e) {
      Alert.alert('Error', 'Could not add to calendar (Simulator/Permissions issue).');
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={[GlobalStyles.title, { color: Colors.primary }]}>{event.title}</Text>
      <Text style={[GlobalStyles.subtitle, { color: Colors.textLight }]}>{event.society} Event</Text>
      
      <View style={GlobalStyles.card}>
        <Text style={{ fontWeight: 'bold' }}>📅 Date:</Text>
        <Text style={{ marginBottom: 10 }}>{new Date(event.date.seconds * 1000).toLocaleString()}</Text>
        
        <Text style={{ fontWeight: 'bold' }}>📍 Venue:</Text>
        <Text style={{ marginBottom: 10 }}>{event.venue}</Text>
        
        <Text style={{ fontWeight: 'bold' }}>📝 Description:</Text>
        <Text>{event.description}</Text>
      </View>

      <CustomButton label="Register Now" onPress={handleRegister} loading={registering} />
      <CustomButton label="Add to Calendar" mode="outlined" onPress={addToCalendar} />
      <CustomButton label="Rate / Feedback" mode="text" onPress={() => navigation.navigate('Feedback', { eventId: event.id })} />
    </ScrollView>
  );
}