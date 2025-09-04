'use client';
import { useState } from 'react';
interface Artist {
  id: string;
  name: string;
}

export default function AdminClient({ initialArtists }: { initialArtists: Artist[] }) {
  const [list, setList] = useState(initialArtists);
  return (
    <main className="p-4">
      <h1 className="mb-2 text-xl font-semibold">Moderation Queue</h1>
      <ul className="space-y-2">
        {list.map((a) => (
          <li key={a.id} className="flex items-center justify-between">
            <span>{a.name}</span>
            <button
              className="h-8 rounded bg-green-500 px-2 text-sm text-white"
              onClick={() => setList((l) => l.filter((x) => x.id !== a.id))}
            >
              Verify
            </button>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p>All artists verified</p>}
    </main>
  );
}
