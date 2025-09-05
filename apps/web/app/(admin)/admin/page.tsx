'use client';
import { useState } from 'react';

interface QueueItem { id: string; content: string; }
interface Playlist { id: string; name: string; }
interface Source { id: string; url: string; }

export default function AdminPage() {
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', content: 'First post' },
    { id: '2', content: 'Second post' },
  ]);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 'p1', name: 'Starter Mix' },
    { id: 'p2', name: 'Chill Vibes' },
  ]);
  const [sources, setSources] = useState<Source[]>([
    { id: 's1', url: 'https://example.com/rss' },
  ]);
  const [newSrc, setNewSrc] = useState('');

  const approve = (id: string) => setQueue((q) => q.filter((i) => i.id !== id));
  const reject = (id: string) => setQueue((q) => q.filter((i) => i.id !== id));
  const move = (idx: number, dir: -1 | 1) => {
    const copy = [...playlists];
    const target = idx + dir;
    if (target < 0 || target >= copy.length) return;
    [copy[idx], copy[target]] = [copy[target], copy[idx]];
    setPlaylists(copy);
  };
  const addSource = () => {
    if (!newSrc) return;
    setSources((s) => [...s, { id: String(Date.now()), url: newSrc }]);
    setNewSrc('');
  };
  const removeSource = (id: string) => setSources((s) => s.filter((x) => x.id !== id));

  return (
    <main className="space-y-8 p-4">
      <section>
        <h2 className="mb-2 text-xl font-semibold">Moderation Queue</h2>
        <ul className="space-y-2">
          {queue.map((q) => (
            <li key={q.id} className="flex items-center justify-between">
              <span>{q.content}</span>
              <div className="space-x-2">
                <button className="rounded bg-green-500 px-2 text-white" onClick={() => approve(q.id)}>Approve</button>
                <button className="rounded bg-red-500 px-2 text-white" onClick={() => reject(q.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold">Playlists Order</h2>
        <ul className="space-y-2">
          {playlists.map((p, i) => (
            <li key={p.id} className="flex items-center justify-between">
              <span>{p.name}</span>
              <div className="space-x-2">
                <button className="rounded bg-gray-200 px-2" onClick={() => move(i, -1)}>Up</button>
                <button className="rounded bg-gray-200 px-2" onClick={() => move(i, 1)}>Down</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold">News Sources</h2>
        <div className="mb-2 flex space-x-2">
          <input className="flex-1 rounded border p-1" value={newSrc} onChange={(e) => setNewSrc(e.target.value)} placeholder="https://..." />
          <button className="rounded bg-blue-500 px-2 text-white" onClick={addSource}>Add</button>
        </div>
        <ul className="space-y-2">
          {sources.map((s) => (
            <li key={s.id} className="flex items-center justify-between">
              <span>{s.url}</span>
              <button className="rounded bg-red-500 px-2 text-white" onClick={() => removeSource(s.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
