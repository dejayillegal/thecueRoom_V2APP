'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

const genres = [
  { id: 'techno', name: 'Techno', description: 'Underground techno beats from Detroit to Berlin', color: 'from-red-600 to-red-800' },
  { id: 'house', name: 'House', description: 'Deep house vibes and soulful grooves', color: 'from-blue-600 to-blue-800' },
  { id: 'minimal', name: 'Minimal', description: 'Stripped-down electronic minimalism', color: 'from-gray-600 to-gray-800' },
  { id: 'industrial', name: 'Industrial', description: 'Heavy industrial sounds and dark atmospheres', color: 'from-orange-600 to-orange-800' },
  { id: 'acid', name: 'Acid', description: 'Classic acid house with 303 basslines', color: 'from-green-600 to-green-800' },
  { id: 'ambient', name: 'Ambient', description: 'Atmospheric and experimental soundscapes', color: 'from-purple-600 to-purple-800' },
];

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Genres</h1>
            <p className="text-neutral-400 mt-1">Explore different electronic music genres and discover new artists.</p>
          </div>
          <span className="px-2 py-1 text-xs bg-blue-900/50 text-blue-400 rounded">Discovery</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedGenre === genre.id ? 'ring-2 ring-[#D1E231]' : ''
              }`}
            >
              <div className={`h-48 bg-gradient-to-br ${genre.color} p-6 flex flex-col justify-between`}>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{genre.name}</h3>
                  <p className="text-white/80 text-sm">{genre.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">Click to explore</span>
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedGenre && (
          <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              {genres.find(g => g.id === selectedGenre)?.name} - Coming Soon
            </h2>
            <p className="text-neutral-400">
              Genre-specific artists, playlists, and events will be displayed here in future updates.
            </p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}