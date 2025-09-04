import { View, Text } from 'react-native';
import { theme } from '../theme';
import type { ComponentType } from 'react';

let MarketingLanding: ComponentType<Record<string, unknown>> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  MarketingLanding = require('../../../../MarketingLanding.svg').default;
} catch {
  MarketingLanding = null;
}

export default function Landing() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
      {MarketingLanding ? (
        <MarketingLanding width={200} height={200} />
      ) : (
        <Text style={{ color: theme.colors.text }}>Landing</Text>
      )}
    </View>
  );
}
