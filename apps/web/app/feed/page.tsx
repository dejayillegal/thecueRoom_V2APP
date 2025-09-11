'use client';

import { useEffect, useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { getBrowserClient } from '@/lib/supabase-browser';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
}

interface Gig {
  id: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  genre: string;
  status: 'confirmed' | 'pending';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Berghain announces extended Sunday sessions',
    source: 'Resident Advisor',
    time: '2h ago'
  },
  {
    id: '2',
    title: 'Detroit mainstay drops surprise vinyl-only EP',
    source: 'XLR8R',
    time: '4h ago'
  },
  {
    id: '3',
    title: 'Paris warehouse collective unveils fall lineup',
    source: 'Mixmag',
    time: '8h ago'
  },
  {
    id: '4',
    title: 'Modular synth label releases free sample pack',
    source: 'CDM',
    time: '1d ago'
  },
  {
    id: '5',
    title: 'Underground stream hits 1M concurrent listeners',
    source: 'Boiler Room',
    time: '1d ago'
  }
];

const mockGigs: Gig[] = [
  {
    id: '1',
    venue: 'Basement 23',
    location: 'Berlin',
    date: 'Fri 02:00',
    time: 'Industrial Techno',
    genre: 'Techno',
    status: 'confirmed'
  },
  {
    id: '2',
    venue: 'Warehouse Unit 7',
    location: 'London',
    date: 'Sat 03:30',
    time: 'Raw House',
    genre: 'House',
    status: 'pending'
  }
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = getBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <AuthLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <span className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded">Private beta</span>
          </div>
          <p className="text-neutral-400">
            Your feed is tuned to your preferences. Explore sections or upload new content.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6">
          <button className="px-4 py-2 bg-[#D1E231] text-black font-medium rounded">All</button>
          <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Techno</button>
          <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">House</button>
          <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Minimal</button>
          <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Deep</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Studio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Cover Art Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Cover Art</h3>
                <p className="text-neutral-400 text-sm mb-4">Generate striking visuals</p>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#D1E231] text-black font-medium rounded hover:bg-[#C2D629] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Open</span>
                </button>
                <div className="mt-3 text-xs text-neutral-500">View</div>
              </div>

              {/* Memes Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">Memes</h3>
                <p className="text-neutral-400 text-sm mb-4">Spark the community</p>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#D1E231] text-black font-medium rounded hover:bg-[#C2D629] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create</span>
                </button>
                <div className="mt-3 text-xs text-neutral-500">Explore</div>
              </div>

              {/* News Card */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-2">News</h3>
                <p className="text-neutral-400 text-sm mb-4">Curated underground updates</p>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#D1E231] text-black font-medium rounded hover:bg-[#C2D629] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Read</span>
                </button>
                <div className="mt-3 text-xs text-neutral-500">Sources</div>
              </div>
            </div>

            {/* Gigs Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Gigs</h2>
                  <button className="text-sm text-[#D1E231] hover:text-[#C2D629]">Add gig</button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {mockGigs.map((gig) => (
                  <div key={gig.id} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">{gig.venue} • {gig.location}</h3>
                      <p className="text-neutral-400 text-sm">{gig.date} - {gig.time}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      gig.status === 'confirmed' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${
                        gig.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></span>
                      {gig.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* News Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">News spotlights</h2>
                  <span className="text-sm text-neutral-400">Auto-scroll</span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {mockNews.map((news) => (
                  <div key={news.id} className="space-y-2">
                    <h3 className="text-white font-medium text-sm leading-tight">{news.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-neutral-500">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}