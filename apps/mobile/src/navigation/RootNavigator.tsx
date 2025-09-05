import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { loadSession, initSessionListener } from '../lib/session';
import Login from '../screens/Login';
import Feed from '../screens/Feed';
import PostComposer from '../screens/PostComposer';
import MemeStudio from '../screens/MemeStudio';
import Playlists from '../screens/Playlists';
import GigRadar from '../screens/GigRadar';
import Profile from '../screens/Profile';
import Admin from '../screens/Admin';

export type RootStackParamList = {
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    loadSession().then(setSession);
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    initSessionListener();
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator>
      {session ? (
        <>
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="PostComposer" component={PostComposer} />
          <Stack.Screen name="MemeStudio" component={MemeStudio} />
          <Stack.Screen name="Playlists" component={Playlists} />
          <Stack.Screen name="GigRadar" component={GigRadar} />
          <Stack.Screen name="Profile" component={Profile} />
          {session.user.app_metadata?.role === 'admin' && (
            <Stack.Screen name="Admin" component={Admin} />
          )}
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
