// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import StudentStack from './StudentStack';
import SocietyStack from './SocietyStack';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!user ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        // Decide which stack based on custom claim or a simple flag in user profile
        // Here we simply send to StudentStack; societies can sign in with a society account and you can route based on role.
        <Stack.Screen name="Main" component={StudentStack} />
      )}
      <Stack.Screen name="SocietyMain" component={SocietyStack} />
    </Stack.Navigator>
  );
}
