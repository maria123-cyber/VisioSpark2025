// src/screens/Auth/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    if (!name || !email || !password) return Alert.alert('Please fill all fields');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const uid = userCred.user.uid;
      // create profile doc
      await setDoc(doc(db, 'users', uid), {
        uid,
        name,
        email: email.trim(),
        role: 'student', // default role
        createdAt: new Date().toISOString(),
      });
      // auth listener in App.js will redirect
    } catch (err) {
      Alert.alert('Registration failed', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent:'center', padding: 20, backgroundColor: '#F5F7FA' }}>
      <View>
        <Text style={{fontSize:26, fontWeight:'700', marginBottom:6}}>Create Account</Text>
        <Text style={{color:'#666', marginBottom:18}}>Register to join UniWeek</Text>

        <InputField placeholder="Full name" value={name} onChangeText={setName} />
        <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <CustomButton title="Register" onPress={onRegister} style={{ marginTop: 12 }} />
      </View>
    </ScrollView>
  );
}
