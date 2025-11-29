// src/screens/Student/FeedbackScreen.js
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import { db, auth } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function FeedbackScreen({ route }) {
  const [eventId, setEventId] = useState(route?.params?.eventId || '');
  const [feedback, setFeedback] = useState('');

  const submit = async () => {
    if (!eventId || !feedback) return Alert.alert('Please select event and write feedback');
    try {
      await addDoc(collection(db, 'events', eventId, 'feedback'), {
        uid: auth.currentUser.uid,
        feedback,
        createdAt: new Date().toISOString()
      });
      Alert.alert('Thanks', 'Feedback submitted');
      setFeedback('');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>Give Feedback</Text>
      <Text style={{ color: '#666', marginBottom: 8 }}>Paste event ID (from details) to give feedback</Text>
      <InputField placeholder="Event ID" value={eventId} onChangeText={setEventId} />
      <InputField placeholder="Write your feedback..." value={feedback} onChangeText={setFeedback} />
      <CustomButton title="Submit Feedback" onPress={submit} />
    </View>
  );
}
