'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

const stylePresets = [
  { id: 'brutalist', name: 'Brutalist', active: true },
  { id: 'acid', name: 'Acid', active: false },
  { id: 'industrial', name: 'Industrial', active: false },
  { id: 'minimal', name: 'Minimal', active: false },
  { id: 'deep', name: 'Deep', active: false },
];

export default function CoverArtPage() {
  const [activePreset, setActivePreset] = useState('brutalist');
  const [prompt, setPrompt] = useState('high contrast, monochrome, glitch typography, concrete textures, neon lime accent');
  const [artist, setArtist] = useState('Your alias');
  const [trackTitle, setTrackTitle] = useState('Untitled 303');
  const [primaryColor, setPrimaryColor] = useState('Lime');
  const [explicitLabel, setExplicitLabel] = useState('None');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const handleRandomize = () => {
    const prompts = [
      'high contrast, monochrome, glitch typography, concrete textures, neon lime accent',
      'acid house vibes, retro synthwave, purple and green gradients',
      'industrial metal, dark ambient, rust textures, minimal design',
      'deep house aesthetic, warm tones, vinyl texture, subtle gradients',
      'minimal techno, geometric shapes, black and white, clean typography'
    ];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    if (randomPrompt) {
      setPrompt(randomPrompt);
    }
  };

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Cover Art Studio</h1>
            <p className="text-neutral-400 mt-1">Describe your vibe and get 3x square covers and a wide banner. Export as PNG/JPG.</p>
          </div>
          <span className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded">AI-powered</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Style Presets */}
            <div>
              <h3 className="text-white font-semibold mb-3">Style presets</h3>
              <div className="flex flex-wrap gap-2">
                {stylePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset.id)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      activePreset === preset.id
                        ? 'bg-[#D1E231] text-black'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-white font-semibold mb-3">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                placeholder="Describe the visual style, mood, and elements you want..."
              />
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Artist</label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Track/EP title</label>
                <input
                  type="text"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Primary color</label>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Explicit label</label>
                <input
                  type="text"
                  value={explicitLabel}
                  onChange={(e) => setExplicitLabel(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 px-6 py-3 bg-[#D1E231] text-black font-semibold rounded hover:bg-[#C2D629] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
              <button
                onClick={handleRandomize}
                className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded hover:bg-neutral-600 transition-colors"
              >
                Randomize
              </button>
            </div>
          </div>

          {/* Preview - Right 1/3 */}
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-white font-semibold mb-3">Preview</h3>
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg aspect-square flex items-center justify-center mb-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-2 border-[#D1E231] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-neutral-400 text-sm">Generating...</span>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <div className="w-full h-32 bg-gradient-to-br from-lime-400 to-lime-600 rounded mb-4 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">{artist}</span>
                    </div>
                    <h4 className="text-white font-medium mb-2">{trackTitle}</h4>
                    <p className="text-neutral-400 text-sm">{activePreset} style</p>
                  </div>
                )}
              </div>

              {/* Export Buttons */}
              {!isGenerating && (
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-[#D1E231] text-black font-medium rounded hover:bg-[#C2D629] transition-colors">
                    Export selected
                  </button>
                  <button className="w-full px-4 py-2 bg-neutral-700 text-white font-medium rounded hover:bg-neutral-600 transition-colors">
                    Save to library
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}