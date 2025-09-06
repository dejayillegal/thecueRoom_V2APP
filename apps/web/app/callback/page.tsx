// Make this route compatible with `output: 'export'`
export const dynamic = 'force-static'; // ✅ satisfy Next’s export check
export const revalidate = 0;           // not strictly required, but explicit

import CallbackClient from './CallbackClient';

export default function Page() {
  return <CallbackClient />;
}

