import { MMKV } from 'react-native-mmkv';
import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const storage = new MMKV();

export function initOffline(queryClient: QueryClient) {
  const persister = createSyncStoragePersister({
    storage: {
      getItem: (key: string) => storage.getString(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key)
    }
  });
  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 48
  });
}
