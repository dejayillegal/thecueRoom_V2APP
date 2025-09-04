import { FlatList, View, Text, Button } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

const PAGE_SIZE = 10;

type Post = { id: string; content: string; created_at?: string };

export default function Feed() {
  const fetchPosts = async ({ pageParam = 0 }): Promise<Post[]> => {
    const from = pageParam * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data } = await supabase
      .from('posts')
      .select<Post>('id, content, created_at')
      .order('created_at', { ascending: false })
      .range(from, to);
    return data ?? [];
  };

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });

  const posts = data?.pages.flatMap((p) => p) ?? [];

  const renderItem = ({ item }: { item: Post }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: theme.colors.surface }}>
      <Text style={{ color: theme.colors.text, marginBottom: 8 }}>{item.content}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="React" onPress={() => {}} />
        <Button title="Comment" onPress={() => {}} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.5}
    />
  );
}
