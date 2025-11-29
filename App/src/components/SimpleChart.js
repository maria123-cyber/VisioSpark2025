import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../utils/colors';

export default function SimpleChart({ data, title }) {
  // Data format: [{ label: 'ACM', value: 10 }, ...]
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 12 }}>{item.label}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.value}</Text>
          </View>
          <View style={{ height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden' }}>
            <View 
              style={{ 
                height: '100%', 
                backgroundColor: Colors.primary, 
                width: `${(item.value / maxValue) * 100}%`,
                borderRadius: 5
              }} 
            />
          </View>
        </View>
      ))}
    </View>
  );
}