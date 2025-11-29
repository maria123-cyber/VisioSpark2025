// src/navigation/SocietyStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SocietyDashboard from '../screens/Society/SocietyDashboard';
import AddEventScreen from '../screens/Society/AddEventScreen';
import EditEventScreen from '../screens/Society/EditEventScreen';
import RegisteredStudentsScreen from '../screens/Society/RegisteredStudentsScreen';
import EventDetailsScreen from '../screens/Student/EventDetailsScreen';

const Stack = createNativeStackNavigator();

export default function SocietyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SocietyDashboard" component={SocietyDashboard} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
      <Stack.Screen name="EditEvent" component={EditEventScreen} />
      <Stack.Screen name="RegisteredStudents" component={RegisteredStudentsScreen} />
      <Stack.Screen name="EventDetailsSociety" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}
