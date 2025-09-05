import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import TOTPSetup from '../components/TOTPSetup';
import { theme } from '../theme';

type Provider = 'google' | 'apple';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [showTotp, setShowTotp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  const oauth = async (provider: Provider) => {
    setError(null);
    try {
      await supabase.auth.signInWithOAuth({ provider });
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (showTotp) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: theme.colors.background }}>
        <TOTPSetup />
      </View>
    );
  }

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
          <Button title="Send Magic Link" color={theme.colors.lime} onPress={send} />
          <View style={{ height: 12 }} />
          <Button title="Sign in with Google" color={theme.colors.lime} onPress={() => oauth('google')} />
          <View style={{ height: 12 }} />
          <Button title="Sign in with Apple" color={theme.colors.lime} onPress={() => oauth('apple')} />
          <View style={{ height: 12 }} />
          <Button title="Setup TOTP" color={theme.colors.lime} onPress={() => setShowTotp(true)} />
          {error && (
            <Text style={{ color: 'red', marginTop: 12 }}>{error}</Text>
          )}
        </>
      )}
    </View>
  );
}
