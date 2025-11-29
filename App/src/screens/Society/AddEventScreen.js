// src/screens/Society/AddEventScreen.js
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import { db } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function AddEventScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [society, setSociety] = useState('ACM');

  const submit = async () => {
    if (!name || !date || !venue) return Alert.alert('Please fill event name, date, and venue');
    try {
      await addDoc(collection(db, 'events'), {
        name,
        description,
        date,
        venue,
        society,
        createdAt: new Date().toISOString()
      });
      Alert.alert('Success', 'Event added');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={{fontSize:20, fontWeight:'700', marginBottom:8}}>Add Event</Text>
      <InputField placeholder="Event name" value={name} onChangeText={setName} />
      <InputField placeholder="Description" value={description} onChangeText={setDescription} />
      <InputField placeholder="Date & time (e.g., 2025-12-09 10:00)" value={date} onChangeText={setDate} />
      <InputField placeholder="Venue" value={venue} onChangeText={setVenue} />
      <InputField placeholder="Society (ACM / CLS / CSS)" value={society} onChangeText={setSociety} />
      <CustomButton title="Create Event" onPress={submit} />
    </View>
  );
}
