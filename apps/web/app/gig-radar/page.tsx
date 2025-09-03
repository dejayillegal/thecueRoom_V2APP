import GigClient from './GigClient';

interface Gig {
  id: string;
  name: string;
  genre: string;
  lat: number;
  lng: number;
}

const PLACEHOLDER: Gig[] = [
  { id: 'g1', name: 'Indie Night', genre: 'indie', lat: 12.9716, lng: 77.5946 },
  { id: 'g2', name: 'Rock Fest', genre: 'rock', lat: 12.98, lng: 77.6 }
];

async function fetchGigs(): Promise<Gig[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return PLACEHOLDER;
  try {
    const res = await fetch(
      `${url}/rest/v1/gigs?select=id,name,genre,lat,lng`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    );
    const data = await res.json();
    return (data as Gig[]) ?? PLACEHOLDER;
  } catch {
    return PLACEHOLDER;
  }
}

export default async function GigRadarPage() {
  const gigs = await fetchGigs();
  return <GigClient gigs={gigs} />;
}
