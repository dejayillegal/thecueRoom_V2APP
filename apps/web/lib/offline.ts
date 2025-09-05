import localforage from 'localforage';

const VERSION = 1;
const TTL = 1000 * 60 * 60 * 48; // 48h

function key(name: string) {
  return `v${VERSION}:${name}`;
}

export async function getCached<T>(name: string): Promise<T | null> {
  const cached = await localforage.getItem<{ ts: number; data: T }>(key(name));
  if (!cached) return null;
  if (Date.now() - cached.ts > TTL) {
    await localforage.removeItem(key(name));
    return null;
  }
  return cached.data;
}

export async function setCached<T>(name: string, data: T) {
  await localforage.setItem(key(name), { ts: Date.now(), data });
}
