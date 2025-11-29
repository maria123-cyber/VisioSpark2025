import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import GlobalStyles from '../../styles/globalStyles';
import EventCard from '../../components/EventCard';
import CustomButton from '../../components/CustomButton';
import Colors from '../../utils/colors';

export default function ManageEventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const q = query(collection(db, 'events'));
    const snap = await getDocs(q);
    setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchEvents);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    Alert.alert('Confirm', 'Delete this event?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: async () => {
        await deleteDoc(doc(db, 'events', id));
        Alert.alert('Deleted');
        fetchEvents();
      }}
    ]);
  };

  return (
    <View style={GlobalStyles.container}>
      <CustomButton label="+ Create New Event" onPress={() => navigation.navigate('AddEvent')} />
      <FlatList
        data={events}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <EventCard event={item} onPress={() => {}} />
            </View>
            <IconButton icon="delete" iconColor={Colors.error} onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}