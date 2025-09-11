
'use client';

import { useEffect, useState } from 'react';
import { SessionProvider } from '@/app/providers';
import BrandLogo from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(209, 255, 61, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(209, 255, 61, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <BrandLogo className="h-16 w-auto mx-auto mb-6" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          the<span className="text-lime-300">cue</span>Room
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Underground techno. Curated community.<br />
          <span className="text-lime-300">Bangalore's finest</span> in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => window.location.href = '?auth=1'}
            className="bg-lime-300 text-black font-bold px-8 py-3 rounded-none hover:bg-lime-400 transition-colors"
          >
            Join the Underground
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/feed'}
            className="border-lime-300 text-lime-300 font-bold px-8 py-3 rounded-none hover:bg-lime-300 hover:text-black transition-colors"
          >
            Explore Feed
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      title: "Curated Feed",
      description: "Underground techno news and artist posts. No mainstream, no self-promo.",
      icon: "🎵"
    },
    {
      title: "Gig Radar",
      description: "Bangalore-only gigs. Real venues, verified dates, underground events.",
      icon: "📍"
    },
    {
      title: "Weekly Playlists",
      description: "Fresh techno and house selections. Updated every week by the community.",
      icon: "🎧"
    },
    {
      title: "Creative Studio",
      description: "AI-powered meme and cover art generator for the underground scene.",
      icon: "🎨"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Built for the <span className="text-lime-300">Underground</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-black border border-gray-800 p-6 hover:border-lime-300 transition-colors">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Strictly <span className="text-lime-300">Moderated</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-lime-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl">✓</span>
            </div>
            <h3 className="text-white font-bold mb-2">Verified Artists</h3>
            <p className="text-gray-400 text-sm">Manual approval process. Real artists only.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-lime-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl">🛡️</span>
            </div>
            <h3 className="text-white font-bold mb-2">Zero Tolerance</h3>
            <p className="text-gray-400 text-sm">No scams, no bullying, no mainstream content.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-lime-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl">🎯</span>
            </div>
            <h3 className="text-white font-bold mb-2">Underground Focus</h3>
            <p className="text-gray-400 text-sm">Techno and house only. Keep it underground.</p>
          </div>
        </div>
        
        <Button 
          onClick={() => window.location.href = '?auth=1'}
          className="bg-lime-300 text-black font-bold px-12 py-4 rounded-none hover:bg-lime-400 transition-colors"
        >
          Request Access
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <BrandLogo className="h-8 w-auto mb-2" />
            <p className="text-gray-400 text-sm">Underground techno community • Bangalore</p>
          </div>
          
          <div className="flex space-x-8 text-sm">
            <a href="/legal/privacy.html" className="text-gray-400 hover:text-lime-300 transition-colors">
              Privacy
            </a>
            <a href="/legal/terms.html" className="text-gray-400 hover:text-lime-300 transition-colors">
              Terms
            </a>
            <a href="mailto:support@thecueroom.io" className="text-gray-400 hover:text-lime-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} theCueRoom. Underground since 2024.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Content() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeatureGrid />
      <CommunitySection />
      <Footer />
    </main>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
}
