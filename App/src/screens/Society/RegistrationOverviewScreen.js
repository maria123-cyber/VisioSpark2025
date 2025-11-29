import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import GlobalStyles from '../../styles/globalStyles';

export default function RegistrationOverviewScreen() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'registrations'));
      setRegs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={regs}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.studentEmail}
            description={`Registered for: ${item.eventTitle}`}
            left={props => <List.Icon {...props} icon="account" />}
            style={{ backgroundColor: '#fff', marginBottom: 5, borderRadius: 8 }}
          />
        )}
        ListEmptyComponent={<Text>No registrations found.</Text>}
      />
    </View>
  );
}