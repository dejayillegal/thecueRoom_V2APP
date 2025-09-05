import { NextResponse } from 'next/server';

// Exchange client credentials for an access token.
export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    return NextResponse.json({ error: 'SPOTIFY credentials missing' }, { status: 501 });
  }
  const auth = Buffer.from(`${id}:${secret}`).toString('base64');
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'token fetch failed' }, { status: 502 });
  }
}
