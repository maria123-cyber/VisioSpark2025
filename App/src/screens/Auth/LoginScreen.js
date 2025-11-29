import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
//import { auth } from '../../../firebase';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if(!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth listener in App.js usually handles this, but for explicit navigation flow:
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[GlobalStyles.container, { justifyContent: 'center' }]}>
      <Text style={[GlobalStyles.title, { textAlign: 'center', color: Colors.primary }]}>Welcome Back</Text>
      <Text style={{ textAlign: 'center', marginBottom: 30, color: Colors.textLight }}>Sign in to continue to UniWeek</Text>

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={GlobalStyles.input}
        autoCapitalize="none"
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={GlobalStyles.input}
      />

      <CustomButton label="Login" onPress={handleLogin} loading={loading} />
      
      <CustomButton 
        label="Create Account" 
        mode="text" 
        onPress={() => navigation.navigate('Register')} 
      />
    </View>
  );
}