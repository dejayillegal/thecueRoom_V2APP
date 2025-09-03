import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function Landing() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0B0B' }}>
      <Text style={{ color: 'white' }}>Landing</Text>
    </View>
  );
}

function Feed() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0B0B' }}>
      <Text style={{ color: 'white' }}>Feed</Text>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Feed" component={Feed} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
