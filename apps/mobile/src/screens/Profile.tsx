import { View, Text, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type ProfileData = { id: string; name: string; verified?: boolean };

export default function Profile({ route }: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setSessionId(data.user?.id ?? null));
  }, []);

  const profileId = route.params?.id ?? sessionId;

  const { data: profile } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const { data } = await supabase
        .from('profiles')
        .select<ProfileData>('id, name, verified')
        .eq('id', profileId)
        .single();
      return data ?? null;
    },
    enabled: !!profileId,
  });

  const isOwner = sessionId === profileId;
  const canEdit = isOwner && !!profile?.verified;
  const [name, setName] = useState('');
  useEffect(() => {
    if (profile) setName(profile.name ?? '');
  }, [profile]);

  const save = async () => {
    if (profileId) await supabase.from('profiles').update({ name }).eq('id', profileId);
  };

  if (!profile) return null;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text, fontSize: 24 }}>
        {profile.name} {profile.verified && '✅'}
      </Text>
      {canEdit && (
        <>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{ borderWidth: 1, borderColor: theme.colors.muted, color: theme.colors.text, padding: 8, marginVertical: 12 }}
          />
          <Button title="Save" onPress={save} />
        </>
      )}
    </View>
  );
}
