import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';

export default function FeedbackScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const submit = async () => {
    if(!rating || !comment) return Alert.alert("Please enter details");
    await addDoc(collection(db, 'feedback'), {
      eventId,
      studentId: auth.currentUser.uid,
      rating: parseInt(rating),
      comment,
      createdAt: new Date()
    });
    Alert.alert('Thanks', 'Feedback submitted');
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Rate Event</Text>
      <TextInput label="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" style={GlobalStyles.input} />
      <TextInput label="Comments" value={comment} onChangeText={setComment} multiline style={GlobalStyles.input} />
      <CustomButton label="Submit" onPress={submit} />
    </View>
  );
}