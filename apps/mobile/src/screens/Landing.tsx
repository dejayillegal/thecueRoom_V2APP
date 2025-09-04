import { View, Text, Button } from 'react-native';
import { theme } from '../theme';
import type { ComponentType } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

let MarketingLanding: ComponentType<Record<string, unknown>> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  MarketingLanding = require('../../../../MarketingLanding.svg').default;
} catch {
  MarketingLanding = null;
}

export default function Landing() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
      {MarketingLanding ? (
        <MarketingLanding width={200} height={200} />
      ) : (
        <Text style={{ color: theme.colors.text }}>Landing</Text>
      )}
      <Button title="Enter" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
}
