import { View, Text, Button, FlatList } from 'react-native';
import { theme } from '../theme';

type QueueItem = { id: string; content: string };

const queue: QueueItem[] = [
  { id: '1', content: 'First post' },
  { id: '2', content: 'Second post' },
];

export default function Admin() {
  const approve = (id: string) => {
    void id;
  };
  const reject = (id: string) => {
    void id;
  };

  const renderItem = ({ item }: { item: QueueItem }) => (
    <View style={{ padding: 16 }}>
      <Text style={{ color: theme.colors.text }}>{item.content}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Approve" onPress={() => approve(item.id)} />
        <Button title="Reject" onPress={() => reject(item.id)} />
      </View>
    </View>
  );

  return <FlatList data={queue} renderItem={renderItem} keyExtractor={(i) => i.id} />;
}
