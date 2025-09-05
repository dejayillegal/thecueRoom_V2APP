import { useState } from 'react';
import { Alert, Button } from 'react-native';
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
      await supabase.from('reports').insert({ target_id: targetId, target_type: targetType });
      Alert.alert('Report submitted');
    } finally {
      setLoading(false);
    }
  };

  return <Button title={loading ? 'Reporting...' : 'Report'} onPress={submit} disabled={loading} />;
}
