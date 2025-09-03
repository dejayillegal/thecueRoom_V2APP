import AdminClient from './AdminClient';

interface Artist {
  id: string;
  name: string;
}
const PLACEHOLDER: Artist[] = [{ id: 'a1', name: 'Demo Artist' }];

async function fetchArtists(): Promise<Artist[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return PLACEHOLDER;
  try {
    const res = await fetch(
      `${url}/rest/v1/artists?select=id,name,verified&verified=eq.false`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' }
    );
    const data = await res.json();
    return (data as Artist[]) ?? PLACEHOLDER;
  } catch {
    return PLACEHOLDER;
  }
}

export default async function AdminPage() {
  const artists = await fetchArtists();
  return <AdminClient initialArtists={artists} />;
}
