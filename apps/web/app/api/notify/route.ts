import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user?.user_metadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { category, message } = await req.json();
  const { data } = await supabase
    .from('notification_prefs')
    .select('expoPushToken')
    .contains('categories', [category]);
  const tokens = (data ?? []).map((r) => r.expoPushToken).filter(Boolean);
  await Promise.all(
    tokens.map((t) =>
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: t, title: message.title, body: message.body })
      })
    )
  );
  return NextResponse.json({ sent: tokens.length });
}
