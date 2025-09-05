'use client';

import { useState, useTransition } from 'react';
import { approveReport, rejectReport } from '@/app/(admin)/admin/actions';

interface Report {
  id: string;
  targetType: string;
  reason?: string;
}

const mockQueue: Report[] = [
  { id: '1', targetType: 'post', reason: 'spam' },
  { id: '2', targetType: 'comment', reason: 'abuse' }
];

export default function QueueTable() {
  const [queue, setQueue] = useState(mockQueue);
  const [pending, startTransition] = useTransition();

  const handle = (fn: typeof approveReport, id: string) =>
    startTransition(async () => {
      await fn(id);
      setQueue((q) => q.filter((r) => r.id !== id));
    });

  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="px-2 py-1 text-left">Target</th>
          <th className="px-2 py-1 text-left">Reason</th>
          <th className="px-2 py-1 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {queue.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="px-2 py-1">{r.targetType}</td>
            <td className="px-2 py-1">{r.reason ?? 'n/a'}</td>
            <td className="px-2 py-1">
              <button
                type="button"
                className="mr-2 rounded bg-green-600 px-2 py-1 text-white"
                disabled={pending}
                onClick={() => handle(approveReport, r.id)}
              >
                Approve
              </button>
              <button
                type="button"
                className="rounded bg-red-600 px-2 py-1 text-white"
                disabled={pending}
                onClick={() => handle(rejectReport, r.id)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
