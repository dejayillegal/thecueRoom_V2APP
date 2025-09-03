'use client';
import { useState } from 'react';
import Map from '@/components/Map';

interface Gig {
  id: string;
  name: string;
  genre: string;
  lat: number;
  lng: number;
}

export default function GigClient({ gigs }: { gigs: Gig[] }) {
  const [genre, setGenre] = useState('all');
  const filtered = gigs.filter((g) => genre === 'all' || g.genre === genre);
  const genres = Array.from(new Set(gigs.map((g) => g.genre)));
  return (
    <main className="flex flex-col gap-4 p-4 md:flex-row">
      <div className="md:w-1/3">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mb-2 w-full rounded border p-1"
        >
          <option value="all">All</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="space-y-1">
          {filtered.map((g) => (
            <li key={g.id}>{g.name}</li>
          ))}
        </ul>
      </div>
      <div className="md:flex-1">
        <Map
          center={[77.5946, 12.9716]}
          markers={filtered.map((g) => ({ id: g.id, lng: g.lng, lat: g.lat }))}
        />
      </div>
    </main>
  );
}
