import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

export default function PostComposer() {
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
    }
  };

  const submit = async () => {
    let path: string | undefined;
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `${Date.now()}.jpg`;
      await supabase.storage.from('posts').upload(filename, blob);
      path = filename;
    }
    await supabase.from('posts').insert({ content, image: path });
    setContent('');
    setImageUri(null);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderWidth: 1, borderColor: theme.colors.muted, padding: 8, color: theme.colors.text, marginBottom: 12 }}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={{ height: 200, marginBottom: 12 }} />}
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Post" onPress={submit} />
    </View>
  );
}
