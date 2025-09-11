'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

const settingsCategories = [
  { id: 'profile', name: 'Profile', active: true },
  { id: 'account', name: 'Account', active: false },
  { id: 'security', name: 'Security', active: false },
  { id: 'notifications', name: 'Notifications', active: false },
  { id: 'integrations', name: 'Integrations', active: false },
  { id: 'billing', name: 'Billing', active: false },
  { id: 'accessibility', name: 'Accessibility', active: false },
  { id: 'invites', name: 'Invites', active: false },
  { id: 'danger', name: 'Danger Zone', active: false },
];

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('profile');
  const [displayName, setDisplayName] = useState('Artist name');
  const [handle, setHandle] = useState('@thecueroom');
  const [location, setLocation] = useState('City, Country');
  const [bio, setBio] = useState('Underground techno/house artist...');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/...');
  const [soundcloudUrl, setSoundcloudUrl] = useState('https://soundcloud.com/...');
  const [bandcampUrl, setBandcampUrl] = useState('');

  const handleAvatarUpload = () => {
    // Simulate file upload
    console.log('Avatar upload clicked');
  };

  return (
    <AuthLayout>
      <div className="flex min-h-full">
        {/* Settings Sidebar */}
        <div className="w-64 bg-neutral-900 border-r border-neutral-800">
          <div className="p-4 border-b border-neutral-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#D1E231] rounded flex items-center justify-center">
                <span className="text-black text-sm font-bold">T</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Admin</div>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {settingsCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'bg-[#D1E231] text-black font-medium'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">Profile</h1>
                <p className="text-neutral-400 mt-1">Public profile for artists — avatar, name, socials.</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs bg-green-900/50 text-green-400 rounded">Settings</span>
                <span className="px-2 py-1 text-xs bg-neutral-700 text-neutral-300 rounded">Invite-first</span>
                <button className="px-4 py-2 bg-neutral-700 text-white text-sm rounded hover:bg-neutral-600 transition-colors">
                  Back to Dashboard
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="max-w-2xl space-y-8">
              
              {/* Avatar Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Avatar</label>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-neutral-700 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={handleAvatarUpload}
                        className="px-4 py-2 bg-neutral-700 text-white text-sm rounded hover:bg-neutral-600 transition-colors"
                      >
                        Upload .png .jpg .jpeg .webp
                      </button>
                      <p className="text-neutral-500 text-xs mt-1">Max 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Display Name</label>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                  />
                </div>
              </div>

              {/* Handle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Handle</label>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Location</label>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Bio</label>
                </div>
                <div className="md:col-span-2">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-white font-semibold mb-2">Social Links</label>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-neutral-400 text-sm mb-1">Instagram</label>
                    <input
                      type="url"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-sm mb-1">SoundCloud</label>
                    <input
                      type="url"
                      value={soundcloudUrl}
                      onChange={(e) => setSoundcloudUrl(e.target.value)}
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-sm mb-1">Bandcamp</label>
                    <input
                      type="url"
                      value={bandcampUrl}
                      onChange={(e) => setBandcampUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button className="px-8 py-3 bg-[#D1E231] text-black font-semibold rounded hover:bg-[#C2D629] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}