import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';

export default function AddEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [society, setSociety] = useState('ACM');
  const [venue, setVenue] = useState('');
  const [dateStr, setDateStr] = useState('');

  const create = async () => {
    if(!title || !dateStr) return Alert.alert('Fill all fields');
    try {
      await addDoc(collection(db, 'events'), {
        title,
        description: desc,
        society,
        venue,
        date: new Date(dateStr), // Simple parsing, expecting YYYY-MM-DD format for prototype
        createdAt: new Date()
      });
      Alert.alert('Success', 'Event Created');
      navigation.goBack();
    } catch(e) { Alert.alert('Error', e.message); }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <TextInput label="Event Title" value={title} onChangeText={setTitle} style={GlobalStyles.input} />
      <TextInput label="Society (ACM, CLS, CSS)" value={society} onChangeText={setSociety} style={GlobalStyles.input} />
      <TextInput label="Description" value={desc} onChangeText={setDesc} multiline style={GlobalStyles.input} />
      <TextInput label="Venue" value={venue} onChangeText={setVenue} style={GlobalStyles.input} />
      <TextInput label="Date (YYYY-MM-DD)" value={dateStr} onChangeText={setDateStr} style={GlobalStyles.input} />
      <CustomButton label="Publish Event" onPress={create} />
    </ScrollView>
  );
}