import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import CustomButton from '../../components/CustomButton';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [society, setSociety] = useState('ACM');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if(!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData = {
        name,
        email,
        role,
        createdAt: new Date(),
        // Only add society field if handler
        ...(role === 'handler' && { society })
      };

      await setDoc(doc(db, 'users', res.user.uid), userData);
      
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[GlobalStyles.container, { paddingVertical: 40 }]}>
      <Text style={GlobalStyles.title}>Create Account</Text>
      
      <TextInput mode="outlined" label="Full Name" value={name} onChangeText={setName} style={GlobalStyles.input} />
      <TextInput mode="outlined" label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={GlobalStyles.input} />
      <TextInput mode="outlined" label="Password" value={password} onChangeText={setPassword} secureTextEntry style={GlobalStyles.input} />

      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>I am a:</Text>
      <RadioButton.Group onValueChange={setRole} value={role}>
        <View style={GlobalStyles.row}>
          <Text>Student</Text>
          <RadioButton value="student" />
        </View>
        <View style={GlobalStyles.row}>
          <Text>Society Handler</Text>
          <RadioButton value="handler" />
        </View>
      </RadioButton.Group>

      {role === 'handler' && (
        <View style={{ backgroundColor: '#eef2f5', padding: 10, borderRadius: 8, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Select Society:</Text>
          <RadioButton.Group onValueChange={setSociety} value={society}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                <RadioButton value="ACM" /><Text>ACM</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                <RadioButton value="CLS" /><Text>CLS</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="CSS" /><Text>CSS</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      )}

      <CustomButton label="Register" onPress={handleRegister} loading={loading} style={{ marginTop: 20 }} />
      <CustomButton label="Back to Login" mode="text" onPress={() => navigation.navigate('Login')} />
    </ScrollView>
  );
}