import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const send = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: theme.colors.background }}>
      {sent ? (
        <Text style={{ color: theme.colors.text }}>Check your email.</Text>
      ) : (
        <>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ borderWidth: 1, borderColor: theme.colors.muted, padding: 8, color: theme.colors.text, marginBottom: 12 }}
          />
          <Button title="Send Magic Link" onPress={send} />
        </>
      )}
    </View>
  );
}
