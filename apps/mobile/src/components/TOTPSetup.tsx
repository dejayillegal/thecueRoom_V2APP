import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

export default function TOTPSetup() {
  const [qr, setQr] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
      if (data?.totp) {
        setQr(data.totp.qr_code);
        setFactorId(data.id);
      }
    })();
  }, []);

  const verify = async () => {
    if (!factorId) return;
    const { error } = await supabase.auth.mfa.verify({ factorId, code });
    if (!error) {
      const user = (await supabase.auth.getUser()).data.user;
      if (user) {
        await supabase.from('profiles').update({ mfa_enrolled: true }).eq('id', user.id);
      }
      setDone(true);
    }
  };

  if (done) return <Text style={{ color: theme.colors.text }}>TOTP enabled</Text>;

  return (
    <View>
      {qr && (
        <Image source={{ uri: `data:image/png;base64,${qr}` }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      )}
      <Text style={{ color: theme.colors.text, marginVertical: 8 }}>
        Save your recovery codes safely.
      </Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        placeholder="123456"
        style={{ borderWidth: 1, borderColor: theme.colors.muted, padding: 8, color: theme.colors.text, marginBottom: 12 }}
      />
      <Button title="Verify" color={theme.colors.lime} onPress={verify} />
    </View>
  );
}
