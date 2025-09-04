import { FlatList, View, Text, Button, Linking } from 'react-native';
import { theme } from '../theme';

type Track = { id: string; title: string; spotifyId: string };
type Playlist = { id: string; name: string; tracks: Track[] };

const sample: Playlist[] = [
  {
    id: 'pl1',
    name: 'Top Hits',
    tracks: [
      { id: 't1', title: 'Song A', spotifyId: '123' },
      { id: 't2', title: 'Song B', spotifyId: '456' },
    ],
  },
];

export default function Playlists() {
  const open = (id: string) => Linking.openURL(`spotify:track:${id}`);

  const renderTrack = ({ item }: { item: Track }) => (
    <Button title={item.title} onPress={() => open(item.spotifyId)} />
  );

  const renderItem = ({ item }: { item: Playlist }) => (
    <View style={{ padding: 16 }}>
      <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{item.name}</Text>
      <FlatList data={item.tracks} renderItem={renderTrack} keyExtractor={(t) => t.id} />
    </View>
  );

  return <FlatList data={sample} renderItem={renderItem} keyExtractor={(i) => i.id} />;
}
