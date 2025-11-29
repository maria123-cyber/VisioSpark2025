import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, List } from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import GlobalStyles from '../../styles/globalStyles';

export default function CalendarScreen() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'registrations'), where('studentId', '==', auth.currentUser.uid));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMyEvents(list);
    };
    fetch();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>My Registrations</Text>
      <FlatList
        data={myEvents}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.eventTitle}
            description={new Date(item.eventDate.seconds * 1000).toDateString()}
            left={props => <List.Icon {...props} icon="check-circle" color="green" />}
            style={GlobalStyles.card}
          />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No events registered yet.</Text>}
      />
    </View>
  );
}