'use client';
import { useState } from 'react';
import Map, { Marker } from '../../../components/gigs/Map';

interface Gig extends Marker {
  name: string;
  genre: string;
}

const GIGS: Gig[] = [
  { id: 'g1', name: 'Indie Night', genre: 'indie', lat: 12.9716, lng: 77.5946 },
  { id: 'g2', name: 'Rock Fest', genre: 'rock', lat: 12.98, lng: 77.6 },
];

export default function GigRadarPage() {
  const [genre, setGenre] = useState('all');
  const filtered = GIGS.filter((g) => genre === 'all' || g.genre === genre);
  const genres = Array.from(new Set(GIGS.map((g) => g.genre)));

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
        <Map center={[77.5946, 12.9716]} markers={filtered} />
      </div>
    </main>
  );
}
