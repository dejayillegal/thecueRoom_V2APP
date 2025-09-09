'use client';

import AuthHashHandler from '@/components/auth/AuthHashHandler';
import Header from '@/components/Header';
import { Suspense } from 'react';

export default function Landing() {
  return (
    <main className="min-h-screen bg-black text-neutral-200">
      {/* magic-link parser */}
      <Suspense>
        <AuthHashHandler />
      </Suspense>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Welcome to thecueRoom</h1>
        <p className="mt-4 max-w-3xl text-neutral-300">
          an AI-powered studio and community for underground techno and house artists.
        </p>
        <p className="mt-2 max-w-3xl text-neutral-300">
          Create with smart tools, stay verified and scam-free, and tap into a curated feed of underground news, gigs, and culture.
        </p>
        <p className="mt-2 italic text-purple-300">
          Where music meets machine, and the underground stays pure.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="rounded bg-[#D1E231] px-4 py-2 text-black font-semibold hover:bg-[#C2D629] transition-colors">
            Join the Community
          </button>
          <button className="rounded border border-neutral-600 px-4 py-2 text-neutral-200 hover:border-[#D1E231] transition-colors">
            Learn More
          </button>
        </div>
        <div className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/landing.svg`}
            alt="TheCueRoom marketing landing"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-bold text-white mb-6">What you get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Row 1 */}
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">AI Cover Art</h3>
            <p className="text-sm text-neutral-400">Generate unique cover art from vibe, genre, and text prompt. Share-able.</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">AI Meme Generator</h3>
            <p className="text-sm text-neutral-400">Turn prompts (optional ref image) into on-brand memes—safe and share-able.</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">AI Artist Verification</h3>
            <p className="text-sm text-neutral-400">Gemini-assisted checks; re-check & needs-info supported.</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">Secure Auth & Tiered Access</h3>
            <p className="text-sm text-neutral-400">Private dashboard unlocks after approval; robust loading/empty/error states.</p>
          </div>

          {/* Row 2 */}
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">Curated News Rail</h3>
            <p className="text-sm text-neutral-400">Categories—Electronic, Techno, House, Underground, Industry, Production/Education (regions: USA/Asia/Europe).</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">Gig Radar</h3>
            <p className="text-sm text-neutral-400">Discover underground gigs—Berghain-first, global by design.</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">Admin Console</h3>
            <p className="text-sm text-neutral-400">Approve artists, manage flags & content ops, monitor system health.</p>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="font-semibold text-white mb-2">Invite-Only Community</h3>
            <p className="text-sm text-neutral-400">Built for serious techno/house creators.</p>
          </div>
        </div>
      </section>

      {/* Two column section */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Community Feed Preview */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Community Feed Preview</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#D1E231] rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-[#D1E231] font-semibold">Kara Nova</span>
                  <span className="text-neutral-400"> · 2h — </span>
                  <span className="text-neutral-300">&quot;New set up on SC — jungle rollers recorded live in Mana Rainforest.&quot;</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#D1E231] rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-[#D1E231] font-semibold">Ryan</span>
                  <span className="text-neutral-400"> · 4h — </span>
                  <span className="text-neutral-300">&quot;Looking for a lighting tech for Saturday&apos;s gig — DM me.&quot;</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#D1E231] rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-[#D1E231] font-semibold">Sol</span>
                  <span className="text-neutral-400"> · 6h — </span>
                  <span className="text-neutral-300">&quot;Posted a new mix: Deep night drive at 128 BPM.&quot;</span>
                </div>
              </div>
            </div>
          </div>

          {/* How TheCueRoom Works */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">How TheCueRoom Works</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#D1E231] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <div>
                  <p className="text-neutral-300">Apply or get invited by verified members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#D1E231] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <div>
                  <p className="text-neutral-300">Build your EPK & Stage Plot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#D1E231] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <div>
                  <p className="text-neutral-300">Post, reply, and discover gigs/collabs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#D1E231] text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-neutral-300">Tune your AI feed with a &apos;Why&apos; explainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded border border-neutral-800 bg-neutral-900/30 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to plug into the underground?</h2>
          <p className="text-neutral-300 mb-6">Join the community, build your profile, and get seen by the right people.</p>
          <div className="flex gap-3">
            <button className="rounded bg-[#D1E231] px-6 py-3 text-black font-semibold hover:bg-[#C2D629] transition-colors">
              Join the Community
            </button>
            <button className="rounded border border-neutral-600 px-6 py-3 text-neutral-200 hover:border-[#D1E231] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <p className="text-white font-semibold mb-2">© TheCueRoom. Built for serious techno & house artists.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-neutral-400">
              <li>Overview</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Community</h4>
            <ul className="space-y-1 text-neutral-400">
              <li>Feed</li>
              <li>Gig Radar</li>
              <li>Playlists</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-neutral-400">
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Social</h4>
            <ul className="space-y-1 text-neutral-400">
              <li>Instagram</li>
              <li>SoundCloud</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
