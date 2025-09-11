
'use client';

import { useState } from 'react';

export default function SetupAdminPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const createAdminUser = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'dejayillegal@gmail.com',
          password: 'Closer@82',
          role: 'admin'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Admin user created successfully!\nUser ID: ${data.user.id}\nEmail: ${data.user.email}\nRole: ${data.user.role}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error: any) {
      setResult(`❌ Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Setup</h1>
        
        <div className="bg-neutral-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Admin User</h2>
          <div className="space-y-2 text-sm text-neutral-300 mb-4">
            <p><strong>Email:</strong> dejayillegal@gmail.com</p>
            <p><strong>Password:</strong> Closer@82</p>
            <p><strong>Role:</strong> admin</p>
          </div>
          
          <button
            onClick={createAdminUser}
            disabled={loading}
            className="w-full bg-[#D1FF3D] text-black font-semibold py-3 px-6 rounded hover:bg-[#C2D629] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating Admin User...' : 'Create Admin User'}
          </button>
        </div>

        {result && (
          <div className={`rounded-lg p-6 whitespace-pre-line ${
            result.includes('✅') 
              ? 'bg-green-900/30 border border-green-700 text-green-300'
              : 'bg-red-900/30 border border-red-700 text-red-300'
          }`}>
            {result}
          </div>
        )}

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="text-[#D1FF3D] hover:text-[#C2D629] underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
