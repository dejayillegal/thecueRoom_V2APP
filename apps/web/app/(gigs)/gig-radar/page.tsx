'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

interface Gig {
  id: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  genres: string[];
  status: 'live' | 'afterhours' | 'industrial' | 'house' | 'rave' | 'open-air' | 'ambient';
}

const mockGigs: Gig[] = [
  {
    id: '1',
    time: 'Sat, 01:00',
    venue: 'Tresor Basement',
    location: 'Berlin',
    description: '',
    genres: ['Techno', 'Live', 'Invite'],
    status: 'live'
  },
  {
    id: '2',
    time: 'Sun, 04:30',
    venue: 'Secret Warehouse',
    location: 'Neukölln',
    description: '',
    genres: ['Afterhours', 'House'],
    status: 'afterhours'
  },
  {
    id: '3',
    time: 'Fri, 23:00',
    venue: 'Griessmühle Pop-up',
    location: '',
    description: '',
    genres: ['Industrial', 'Rave'],
    status: 'industrial'
  },
  {
    id: '4',
    time: 'Thu, 22:00',
    venue: 'Berghain Garden',
    location: '',
    description: '',
    genres: ['House', 'Open air'],
    status: 'house'
  },
  {
    id: '5',
    time: 'Mon, 20:00',
    venue: 'About Blank',
    location: '',
    description: '',
    genres: ['Live', 'Ambient'],
    status: 'ambient'
  }
];

const timeFilters = [
  { id: 'weekend', name: 'This weekend' },
  { id: 'afterhours', name: 'Afterhours' },
  { id: 'all-ages', name: 'All ages' },
  { id: 'warehouse', name: 'Warehouse' },
];

export default function GigsPage() {
  const [city, setCity] = useState('Berlin');
  const [genres, setGenres] = useState('Techno, House');
  const [activeTimeFilter, setActiveTimeFilter] = useState('weekend');
  const [calendarView, setCalendarView] = useState('monthly');

  const getStatusColor = (status: string) => {
    const colors = {
      live: 'bg-red-900/50 text-red-400',
      afterhours: 'bg-purple-900/50 text-purple-400',
      industrial: 'bg-orange-900/50 text-orange-400',
      house: 'bg-blue-900/50 text-blue-400',
      rave: 'bg-green-900/50 text-green-400',
      'open-air': 'bg-cyan-900/50 text-cyan-400',
      ambient: 'bg-gray-900/50 text-gray-400'
    };
    return colors[status as keyof typeof colors] || colors.live;
  };

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gigs</h1>
            <p className="text-neutral-400 mt-1">Discover, submit, and manage underground gigs. Synced to your calendar, built for late nights.</p>
          </div>
          <span className="px-2 py-1 text-xs bg-green-900/50 text-green-400 rounded">Invite-first</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Genre</label>
                <input
                  type="text"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
            </div>

            {/* Time Filters */}
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveTimeFilter(filter.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeTimeFilter === filter.id
                      ? 'bg-[#D1E231] text-black'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-white font-semibold mb-4">Upcoming</h2>
              <div className="space-y-4">
                {mockGigs.map((gig) => (
                  <div key={gig.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-white font-medium">{gig.time}</span>
                          <span className="text-neutral-400">—</span>
                          <span className="text-white font-medium">{gig.venue}{gig.location && `, ${gig.location}`}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {gig.genres.map((genre, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(genre.toLowerCase())}`}
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Calendar & Map */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Calendar Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-semibold">Calendar</h3>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <h4 className="text-white font-medium text-lg">Monthly calendar UI</h4>
                  <p className="text-neutral-400 text-sm mt-2">Interactive calendar view would be implemented here</p>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-center p-2 text-neutral-500">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <div 
                      key={day} 
                      className={`text-center p-2 rounded cursor-pointer transition-colors ${
                        day === 15 
                          ? 'bg-[#D1E231] text-black' 
                          : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-semibold">Map</h3>
              </div>
              <div className="h-64 bg-neutral-800 rounded-b-lg flex items-center justify-center relative overflow-hidden">
                {/* Mock Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20">
                  <div className="absolute inset-4 border border-neutral-600 rounded">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-[#D1E231] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-neutral-400 text-sm">Berlin area</p>
                        <p className="text-neutral-500 text-xs">Interactive map integration</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map markers */}
                <div className="absolute top-8 left-8">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-16 right-12">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-12 left-16">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
