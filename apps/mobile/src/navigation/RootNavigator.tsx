import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screens/Landing';

export type RootStackParamList = {
  Landing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
