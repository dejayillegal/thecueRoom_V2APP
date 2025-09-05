import Link from 'next/link';

interface Track {
  id: string;
  name: string;
  spotifyId: string;
}
interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

const FALLBACK: Playlist[] = [
  {
    id: 'p1',
    name: 'Starter Mix',
    tracks: [
      { id: 't1', name: 'Sample Song', spotifyId: '11dFghVXANMlKmJXsNCbNl' }
    ]
  }
];

async function fetchPlaylists(): Promise<Playlist[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK;
  try {
    const res = await fetch(
      `${url}/rest/v1/playlists?select=id,name,tracks`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    );
    const data = await res.json();
    return (data as Playlist[]) ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function PlaylistsPage() {
  const lists = await fetchPlaylists();
  return (
    <main className="p-4">
      {lists.map((pl) => (
        <section key={pl.id} className="mb-4">
          <h2 className="text-lg font-semibold">{pl.name}</h2>
          <ul className="ml-4 list-disc">
            {pl.tracks.map((t) => (
              <li key={t.id}>
                <Link
                  href={`https://open.spotify.com/track/${t.spotifyId}`}
                  target="_blank"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
