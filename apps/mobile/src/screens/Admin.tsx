import { useState } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { theme } from '../theme';

type QueueItem = { id: string; content: string };
type Playlist = { id: string; name: string };
type Source = { id: string; url: string };

export default function Admin() {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', content: 'First post' },
    { id: '2', content: 'Second post' },
  ]);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'p1', name: 'Starter Mix' },
    { id: 'p2', name: 'Chill Vibes' },
  ]);
  const [sources, setSources] = useState<Source[]>([
    { id: 's1', url: 'https://example.com/rss' },
  ]);
  const [newSrc, setNewSrc] = useState('');

  const approve = (id: string) => setQueue((q) => q.filter((i) => i.id !== id));
  const reject = (id: string) => setQueue((q) => q.filter((i) => i.id !== id));
  const move = (idx: number, dir: -1 | 1) => {
    const copy = [...playlists];
    const target = idx + dir;
    if (target < 0 || target >= copy.length) return;
    [copy[idx], copy[target]] = [copy[target], copy[idx]];
    setPlaylists(copy);
  };
  const addSource = () => {
    if (!newSrc) return;
    setSources((s) => [...s, { id: String(Date.now()), url: newSrc }]);
    setNewSrc('');
  };
  const removeSource = (id: string) => setSources((s) => s.filter((x) => x.id !== id));

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ padding: 16 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18, marginBottom: 8 }}>
            Moderation Queue
          </Text>
        </View>
      }
      data={queue}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text style={{ color: theme.colors.text }}>{item.content}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title="Approve" onPress={() => approve(item.id)} />
            <Button title="Reject" onPress={() => reject(item.id)} />
          </View>
        </View>
      )}
      ListFooterComponent={
        <View style={{ padding: 16, gap: 16 }}>
          <View>
            <Text style={{ color: theme.colors.text, fontSize: 18, marginBottom: 8 }}>
              Playlists Order
            </Text>
            {playlists.map((p, i) => (
              <View key={p.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ flex: 1, color: theme.colors.text }}>{p.name}</Text>
                <Button title="Up" onPress={() => move(i, -1)} />
                <Button title="Down" onPress={() => move(i, 1)} />
              </View>
            ))}
          </View>
          <View>
            <Text style={{ color: theme.colors.text, fontSize: 18, marginBottom: 8 }}>
              News Sources
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <TextInput
                style={{ flex: 1, borderWidth: 1, padding: 4, color: theme.colors.text }}
                value={newSrc}
                onChangeText={setNewSrc}
                placeholder="https://..."
              />
              <Button title="Add" onPress={addSource} />
            </View>
            {sources.map((s) => (
              <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ flex: 1, color: theme.colors.text }}>{s.url}</Text>
                <Button title="Remove" onPress={() => removeSource(s.id)} />
              </View>
            ))}
          </View>
        </View>
      }
    />
  );
}
