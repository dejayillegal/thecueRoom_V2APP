'use client';

import { useState } from 'react';

export default function SetupAdminPage() {
  const [email, setEmail] = useState('dejayillegal@gmail.com');
  const [password, setPassword] = useState('Closer@82');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createAdminUser = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: 'admin'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Admin user created successfully! You can now sign in.');
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8">Setup Admin User</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded text-white"
            />
          </div>
          
          <button
            onClick={createAdminUser}
            disabled={loading}
            className="w-full bg-[#D1FF3D] text-black p-3 rounded font-semibold hover:bg-[#C2D629] disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Admin User'}
          </button>
          
          {message && (
            <div className={`p-3 rounded ${
              message.includes('❌') 
                ? 'bg-red-950/50 border border-red-600 text-red-300' 
                : 'bg-green-950/50 border border-green-600 text-green-300'
            }`}>
              {message}
            </div>
          )}

          <div className="mt-8 p-4 bg-neutral-900 rounded border border-neutral-700">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-neutral-300">
              <li>Click "Create Admin User" to set up the admin account</li>
              <li>Once successful, go back to the main page</li>
              <li>Click "Sign In" and use these credentials</li>
              <li>You should be logged in as an admin user</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}