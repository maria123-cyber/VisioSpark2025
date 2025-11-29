import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';

export default function SocietyDashboard({ navigation }) {
  const OptionCard = ({ title, icon, route, color }) => (
    <TouchableOpacity 
      style={[styles.optionCard, { borderLeftColor: color }]} 
      onPress={() => navigation.navigate(route)}
    >
      <Text style={{ fontSize: 30 }}>{icon}</Text>
      <Text style={styles.optionText}>{title}</Text>
      <Text style={{ color: Colors.primary }}>Arrow</Text>
    </TouchableOpacity>
  );

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Society Admin Panel</Text>
      <Text style={{ marginBottom: 20 }}>Manage your society activities</Text>

      <OptionCard 
        title="Event Management" 
        icon="📅" 
        route="ManageEvents" 
        color={Colors.primary} 
      />
      <OptionCard 
        title="Registration Overview" 
        icon="👥" 
        route="RegistrationOverview" 
        color={Colors.secondary} 
      />
      <OptionCard 
        title="Analytics & Charts" 
        icon="📊" 
        route="Analytics" 
        color={Colors.acm} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    borderLeftWidth: 6,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 15,
  }
});