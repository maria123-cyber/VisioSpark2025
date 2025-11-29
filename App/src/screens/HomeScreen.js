import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import GlobalStyles from '../styles/globalStyles';
import Colors from '../utils/colors';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    signOut(auth).then(() => navigation.replace('Login'));
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.row}>
        <Text style={GlobalStyles.title}>UniWeek Home</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: Colors.error }}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={{ marginBottom: 20, color: Colors.textLight }}>Select a dashboard to proceed:</Text>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Student Card */}
        <TouchableOpacity 
          style={[styles.bigCard, { backgroundColor: Colors.primary }]}
          onPress={() => navigation.navigate('StudentDashboard')}
        >
          <Text style={styles.cardEmoji}>🎓</Text>
          <Text style={styles.cardText}>Student Dashboard</Text>
          <Text style={styles.cardSubText}>Browse & Register for Events</Text>
        </TouchableOpacity>

        {/* Society Card */}
        <TouchableOpacity 
          style={[styles.bigCard, { backgroundColor: Colors.secondary }]}
          onPress={() => navigation.navigate('SocietyDashboard')}
        >
          <Text style={styles.cardEmoji}>🏛️</Text>
          <Text style={styles.cardText}>Society Dashboard</Text>
          <Text style={styles.cardSubText}>Manage Events & Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigCard: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 20,
  },
  cardEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubText: {
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  }
});