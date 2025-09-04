import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro';
import RootNavigator from './src/navigation/RootNavigator';
import { useOfflineCache } from './src/lib/useOfflineCache';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  useOfflineCache(queryClient);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    SourceCodePro_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
