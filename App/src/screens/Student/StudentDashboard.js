import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import EventCard from '../../components/EventCard';
import GlobalStyles from '../../styles/globalStyles';
import Colors from '../../utils/colors';
import CustomButton from '../../components/CustomButton';

export default function StudentDashboard({ navigation }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSociety, setFilterSociety] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(list);
      setFilteredEvents(list);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = events;
    if (filterSociety) {
      result = result.filter(e => e.society === filterSociety);
    }
    if (searchQuery) {
      result = result.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredEvents(result);
  }, [searchQuery, filterSociety, events]);

  return (
    <View style={GlobalStyles.container}>
      <Searchbar
        placeholder="Search Events..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginBottom: 10, backgroundColor: '#fff' }}
      />
      
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Chip selected={filterSociety === null} onPress={() => setFilterSociety(null)} style={{ marginRight: 5 }}>All</Chip>
        <Chip selected={filterSociety === 'ACM'} onPress={() => setFilterSociety('ACM')} style={{ marginRight: 5 }}>ACM</Chip>
        <Chip selected={filterSociety === 'CLS'} onPress={() => setFilterSociety('CLS')} style={{ marginRight: 5 }}>CLS</Chip>
        <Chip selected={filterSociety === 'CSS'} onPress={() => setFilterSociety('CSS')}>CSS</Chip>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate('EventDetails', { event: item })} />
        )}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchEvents} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating Action Button for Calendar */}
      <View style={{ position: 'absolute', bottom: 20, right: 20, left: 20 }}>
        <CustomButton label="My Schedule" onPress={() => navigation.navigate('Calendar')} />
      </View>
    </View>
  );
}