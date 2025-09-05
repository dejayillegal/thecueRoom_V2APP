'use client';

import { useState } from 'react';

interface Props {
  targetId: string;
  targetType: string;
}

export default function ReportButton({ targetId, targetType }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const reason = window.prompt('Reason for report?') ?? undefined;
    setSubmitting(true);
    try {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId, targetType, reason })
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={submit}
      className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
      disabled={submitting}
    >
      {submitting ? 'Reporting…' : 'Report'}
    </button>
  );
}
