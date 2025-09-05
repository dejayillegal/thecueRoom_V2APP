import Constants from 'expo-constants';
import { supabase } from './supabase';

// minimal declarations to satisfy TypeScript
declare module 'expo-notifications' {
  export function getPermissionsAsync(): Promise<{ status: 'granted' | 'denied' | 'undetermined' }>;
  export function requestPermissionsAsync(): Promise<{ status: 'granted' | 'denied' | 'undetermined' }>;
  export function getExpoPushTokenAsync(options?: { projectId?: string }): Promise<{ data: string }>;
}

export async function registerDeviceForPush(categories: string[] = []) {
  const Notifications = await import('expo-notifications');
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    ({ status } = await Notifications.requestPermissionsAsync());
  }
  if (status !== 'granted') return null;
  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId
    })
  ).data;
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from('notification_prefs')
      .upsert(
        { userId: user.id, expoPushToken: token, categories },
        { onConflict: 'userId' }
      );
  }
  return token;
}
