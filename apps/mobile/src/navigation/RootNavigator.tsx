import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screens/Landing';
import Login from '../screens/Login';
import Feed from '../screens/Feed';
import PostComposer from '../screens/PostComposer';
import MemeStudio from '../screens/MemeStudio';
import Playlists from '../screens/Playlists';
import GigRadar from '../screens/GigRadar';
import Profile from '../screens/Profile';
import Admin from '../screens/Admin';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Feed: undefined;
  PostComposer: undefined;
  MemeStudio: undefined;
  Playlists: undefined;
  GigRadar: undefined;
  Profile: { id?: string } | undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="PostComposer" component={PostComposer} />
      <Stack.Screen name="MemeStudio" component={MemeStudio} />
      <Stack.Screen name="Playlists" component={Playlists} />
      <Stack.Screen name="GigRadar" component={GigRadar} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  );
}
