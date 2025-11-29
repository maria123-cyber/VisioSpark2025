import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import SimpleChart from '../../components/SimpleChart';
import GlobalStyles from '../../styles/globalStyles';

export default function AnalyticsScreen() {
  const [socData, setSocData] = useState([]);
  const [totalReg, setTotalReg] = useState(0);

  useEffect(() => {
    const calc = async () => {
      const snap = await getDocs(collection(db, 'registrations'));
      setTotalReg(snap.size);
      
      const counts = { ACM: 0, CLS: 0, CSS: 0 };
      snap.docs.forEach(d => {
        // Assuming we saved 'eventSociety' or retrieve event data. 
        // For prototype, let's randomly assign if field missing or assume logic
        // In real app, fetch event details for each registration or store societyName in registration
        const data = d.data();
        // Fallback for demo if data structure varies
        if(data.eventTitle && data.eventTitle.includes('Code')) counts.ACM++;
        else if(data.eventTitle && data.eventTitle.includes('Cricket')) counts.CSS++;
        else counts.CLS++; // simplified logic
      });

      setSocData([
        { label: 'ACM', value: counts.ACM },
        { label: 'CLS', value: counts.CLS },
        { label: 'CSS', value: counts.CSS },
      ]);
    };
    calc();
  }, []);

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Performance Analytics</Text>
      
      <View style={[GlobalStyles.card, { alignItems: 'center' }]}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#4A90E2' }}>{totalReg}</Text>
        <Text>Total Student Registrations</Text>
      </View>

      <View style={GlobalStyles.card}>
        <SimpleChart title="Registrations by Society" data={socData} />
      </View>

      <View style={GlobalStyles.card}>
        <SimpleChart title="Popularity Trends" data={[
          { label: 'Coding', value: 15 },
          { label: 'Sports', value: 25 },
          { label: 'Debates', value: 10 },
        ]} />
      </View>
    </ScrollView>
  );
}