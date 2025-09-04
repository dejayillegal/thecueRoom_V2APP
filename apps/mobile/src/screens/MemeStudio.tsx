import { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i);
  }
  return h;
}

export default function MemeStudio() {
  const [text, setText] = useState('');

  const bg = `hsl(${hash(text) % 360},70%,60%)`;

  const exportMeme = async () => {
    const blob = new Blob([text], { type: 'text/plain' });
    await supabase.storage.from('memes').upload(`${Date.now()}.txt`, blob);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bg }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Meme text"
        style={{ backgroundColor: theme.colors.surface, color: theme.colors.text, padding: 8, width: '80%', marginBottom: 16 }}
      />
      <Text style={{ position: 'absolute', bottom: 8, right: 8, color: theme.colors.text }}>TheCueRoom</Text>
      <Button title="Export" onPress={exportMeme} />
    </View>
  );
}
