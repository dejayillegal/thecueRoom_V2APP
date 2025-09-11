'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  tags: string[];
  region: string;
  time: string;
  category: string;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Beatport updates genre charts amid surge in techno-house',
    excerpt: 'Platform tweaks reflect underground trends. Artists respond with mixed reactions as new tags roll out...',
    source: 'Beatport News',
    tags: ['Techno', 'Global'],
    region: 'Global',
    time: '2h ago',
    category: 'Electronic'
  },
  {
    id: '2',
    title: 'Resident Advisor: Inside Europe\'s micro-club renaissance',
    excerpt: 'Tiny rooms, big systems, zero phones. A look at how micro-venues are shaping the next wave of dance culture...',
    source: 'Resident Advisor',
    tags: ['Underground', 'Europe'],
    region: 'Europe',
    time: '6h ago',
    category: 'Underground'
  }
];

const categories = [
  { id: 'electronic', name: 'Electronic', active: true },
  { id: 'techno', name: 'Techno', active: true },
  { id: 'house', name: 'House', active: false },
  { id: 'underground', name: 'Underground', active: false },
  { id: 'industry', name: 'Industry/Business', active: false },
  { id: 'production', name: 'Production/Education', active: false },
];

const regions = [
  { id: 'india', name: 'India', active: false },
  { id: 'asia', name: 'Asia', active: false },
  { id: 'europe', name: 'Europe', active: false },
  { id: 'global', name: 'Global', active: false },
];

const sources = [
  { name: 'Resident Advisor', category: 'Electronic', region: 'Global' },
  { name: 'Mixmag', category: 'Electronic', region: 'Global' },
  { name: 'DJ Mag', category: 'Electronic', region: 'Global' },
  { name: 'Beatport News', category: 'Techno', region: 'Global' },
];

export default function NewsPage() {
  const [activeCategories, setActiveCategories] = useState(['electronic', 'techno']);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleRegion = (regionId: string) => {
    setActiveRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Curated News Rail</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 text-xs bg-green-900/50 text-green-400 rounded">News</span>
            <span className="px-2 py-1 text-xs bg-neutral-700 text-neutral-300 rounded">Public</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Left 3/4 */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeCategories.includes(category.id)
                      ? 'bg-[#D1E231] text-black'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Region Filters */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => toggleRegion(region.id)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    activeRegions.includes(region.id)
                      ? 'bg-[#D1E231] text-black'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>

            {/* Search and Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search headlines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="popular">Sort: Popular</option>
              </select>
              <button className="px-6 py-3 bg-[#D1E231] text-black font-semibold rounded hover:bg-[#C2D629] transition-colors">
                Refresh
              </button>
            </div>

            {/* News Articles */}
            <div className="space-y-6">
              {mockNews.map((article) => (
                <article key={article.id} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-3 hover:text-[#D1E231] cursor-pointer transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-white font-medium">{article.source}</span>
                      <div className="flex items-center space-x-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-neutral-700 text-neutral-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-neutral-500">{article.time}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-neutral-700 text-white text-sm rounded hover:bg-neutral-600 transition-colors">
                        Open
                      </button>
                      <button className="px-4 py-2 bg-neutral-700 text-white text-sm rounded hover:bg-neutral-600 transition-colors">
                        Copy Link
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Active Filters */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-semibold">Active Filters</h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-sm text-neutral-400 block mb-2">Categories:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeCategories.map(categoryId => {
                      const category = categories.find(c => c.id === categoryId);
                      return category ? (
                        <span key={categoryId} className="text-xs bg-[#D1E231] text-black px-2 py-1 rounded">
                          {category.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-400 block mb-2">Regions: All</span>
                </div>
                
                <div>
                  <span className="text-sm text-neutral-400 block mb-2">Sort: newest</span>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-semibold">Sources</h3>
              </div>
              <div className="p-4 space-y-4">
                {sources.map((source, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-white font-medium">{source.name} —</div>
                    <div className="text-neutral-400">
                      {source.category} • {source.region}
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