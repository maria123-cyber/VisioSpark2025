// src/screens/Extra/SearchFilterScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../styles/globalStyles';
import EventCard from '../../components/EventCard';
import { db } from '../../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function SearchFilterScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'events'), (snap) => {
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const filtered = events.filter(ev => {
    if (filter !== 'All' && ev.society !== filter) return false;
    if (q && !ev.name.toLowerCase().includes(q.toLowerCase()) && !ev.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerTitle}>Search & Filter</Text>
      <TextInput placeholder="Search events..." value={q} onChangeText={setQ} style={{ backgroundColor:'#fff', borderRadius:12, padding:10, marginVertical:10 }} />
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:12 }}>
        {['All','ACM','CLS','CSS'].map(s => (
          <TouchableOpacity key={s} onPress={() => setFilter(s)} style={{ padding:8, backgroundColor: filter===s ? '#3A6EA5' : '#fff', borderRadius:10 }}>
            <Text style={{ color: filter===s ? '#fff' : '#333', fontWeight:'700' }}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {filtered.map(ev => (
          <EventCard key={ev.id} event={ev} onPress={() => navigation.navigate('EventDetails', { eventId: ev.id })} onRegister={() => {}} />
        ))}
      </ScrollView>
    </View>
  );
}
