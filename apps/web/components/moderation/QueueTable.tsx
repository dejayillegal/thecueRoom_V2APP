'use client';

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
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="px-2 py-1 text-left">Target</th>
          <th className="px-2 py-1 text-left">Reason</th>
        </tr>
      </thead>
      <tbody>
        {mockQueue.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="px-2 py-1">{r.targetType}</td>
            <td className="px-2 py-1">{r.reason ?? 'n/a'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
