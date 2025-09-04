import { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../theme';

const gigs = [
  { id: 'g1', title: 'Rock Night', lat: 12.9716, lng: 77.5946, category: 'rock' },
  { id: 'g2', title: 'Jazz Fest', lat: 12.9816, lng: 77.6046, category: 'jazz' },
];

export default function GigRadar() {
  const [filter, setFilter] = useState<'all' | 'rock' | 'jazz'>('all');
  const filtered = gigs.filter((g) => filter === 'all' || g.category === filter);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{ latitude: 12.9716, longitude: 77.5946, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
      >
        {filtered.map((g) => (
          <Marker key={g.id} coordinate={{ latitude: g.lat, longitude: g.lng }} title={g.title} />
        ))}
      </MapView>
      <View style={{ padding: 8, backgroundColor: theme.colors.surface }}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="Rock" onPress={() => setFilter('rock')} />
        <Button title="Jazz" onPress={() => setFilter('jazz')} />
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <Text style={{ color: theme.colors.text }}>{item.title}</Text>}
        />
      </View>
    </View>
  );
}
