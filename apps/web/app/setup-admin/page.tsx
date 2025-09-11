
'use client';

import { useState } from 'react';

export default function SetupAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createAdminUser = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'dejayillegal@gmail.com',
          password: 'Closer@82'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin user');
      }

      setMessage('Admin user created successfully! You can now sign in with dejayillegal@gmail.com');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Setup</h1>
        
        <p className="text-zinc-300 mb-6">
          Click the button below to create the admin user account.
        </p>

        <button
          onClick={createAdminUser}
          disabled={loading}
          className="w-full bg-[#D1E231] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#C2D629] transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Admin User...' : 'Create Admin User'}
        </button>

        {message && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6 p-4 bg-zinc-800 rounded text-sm text-zinc-400">
          <strong>Admin Credentials:</strong><br />
          Email: dejayillegal@gmail.com<br />
          Password: Closer@82
        </div>
      </div>
    </div>
  );
}
