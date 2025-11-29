import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Main
import HomeScreen from '../screens/HomeScreen';

// Student
import StudentDashboard from '../screens/Student/StudentDashboard';
import EventDetailsScreen from '../screens/Student/EventDetailsScreen';
import CalendarScreen from '../screens/Student/CalendarScreen';
import FeedbackScreen from '../screens/Student/FeedbackScreen';

// Society
import SocietyDashboard from '../screens/Society/SocietyDashboard';
import ManageEventsScreen from '../screens/Society/ManageEventsScreen';
import AddEventScreen from '../screens/Society/AddEventScreen';
import RegistrationOverviewScreen from '../screens/Society/RegistrationOverviewScreen';
import AnalyticsScreen from '../screens/Society/AnalyticsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Splash & Auth */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main Entry */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Student Flow */}
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: true, title: 'Event Details' }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true, title: 'My Schedule' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: true, title: 'Feedback' }} />

      {/* Society Flow */}
      <Stack.Screen name="SocietyDashboard" component={SocietyDashboard} />
      <Stack.Screen name="ManageEvents" component={ManageEventsScreen} options={{ headerShown: true, title: 'Manage Events' }} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ headerShown: true, title: 'Add Event' }} />
      <Stack.Screen name="RegistrationOverview" component={RegistrationOverviewScreen} options={{ headerShown: true, title: 'Registrations' }} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{ headerShown: true, title: 'Analytics' }} />
    </Stack.Navigator>
  );
}