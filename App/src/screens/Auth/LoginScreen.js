// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!email || !password) return Alert.alert('Please enter email and password');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // auth listener in App.js will redirect
    } catch (err) {
      Alert.alert('Login failed', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent:'center', padding: 20, backgroundColor: '#F5F7FA' }}>
      <View>
        <Text style={{fontSize:28, fontWeight:'800', marginBottom:6}}>Welcome Back</Text>
        <Text style={{color:'#666', marginBottom:18}}>Login to continue to UniWeek</Text>

        <InputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <InputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <CustomButton title="Login" onPress={onLogin} style={{ marginTop: 12 }} />

        <View style={{ flexDirection: 'row', justifyContent:'center', marginTop: 18 }}>
          <Text style={{color:'#666'}}>Don't have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#3A6EA5', fontWeight: '700' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
