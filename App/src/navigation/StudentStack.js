// src/navigation/StudentStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDashboard from '../screens/Student/StudentDashboard';
import EventDetailsScreen from '../screens/Student/EventDetailsScreen';
import CalendarScreen from '../screens/Student/CalendarScreen';
import FeedbackScreen from '../screens/Student/FeedbackScreen';
import SearchFilterScreen from '../screens/Extra/SearchFilterScreen';

const Stack = createNativeStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
    </Stack.Navigator>
  );
}
