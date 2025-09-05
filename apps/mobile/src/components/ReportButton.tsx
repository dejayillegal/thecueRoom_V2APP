import { useState } from 'react';
import { Alert, Button, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

interface Props {
  targetId: string;
  targetType: string;
}

export default function ReportButton({ targetId, targetType }: Props) {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      let reason: string | undefined;
      if (Platform.OS === 'ios') {
        reason = await new Promise<string | undefined>((resolve) => {
          Alert.prompt('Reason for report?', undefined, (text) => resolve(text || undefined));
        });
      }
      await supabase
        .from('reports')
        .insert({ target_id: targetId, target_type: targetType, reason });
      Alert.alert('Report submitted');
    } finally {
      setLoading(false);
    }
  };

  return <Button title={loading ? 'Reporting...' : 'Report'} onPress={submit} disabled={loading} />;
}
