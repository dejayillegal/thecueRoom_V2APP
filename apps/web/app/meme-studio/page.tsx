'use client';

import { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';

const templates = [
  { id: 'techno', name: 'Techno', active: true },
  { id: 'house', name: 'House', active: false },
  { id: 'rave', name: 'Rave', active: false },
  { id: 'label-life', name: 'Label Life', active: false },
];

const captionTones = [
  { id: 'dry-humor', name: 'Dry humor' },
  { id: 'sarcastic', name: 'Sarcastic' },
  { id: 'wholesome', name: 'Wholesome' },
  { id: 'savage', name: 'Savage' },
];

export default function MemeStudioPage() {
  const [activeTemplate, setActiveTemplate] = useState('techno');
  const [smartCaptions, setSmartCaptions] = useState(true);
  const [captionTone, setCaptionTone] = useState('dry-humor');
  const [prompt, setPrompt] = useState('inside joke about afterhours, blown subwoofers, gatekeeping the best warehouse');
  const [topText, setTopText] = useState('Input text');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
  };

  return (
    <AuthLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Meme Studio</h1>
            <p className="text-neutral-400 mt-1">Generate, caption, and schedule memes for your drops and events. Keep it raw, keep it funny.</p>
          </div>
          <span className="px-2 py-1 text-xs bg-purple-900/50 text-purple-300 rounded">AI-powered</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Template & Prompt */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h3 className="text-white font-semibold">Template & Prompt</h3>
                <span className="text-sm text-neutral-400">Selected: {templates.find(t => t.id === activeTemplate)?.name}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setActiveTemplate(template.id)}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      activeTemplate === template.id
                        ? 'bg-[#D1E231] text-black'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              {/* Smart Captions */}
              <div className="flex items-center space-x-3 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smartCaptions}
                    onChange={(e) => setSmartCaptions(e.target.checked)}
                    className="w-4 h-4 text-[#D1E231] bg-neutral-700 border-neutral-600 rounded focus:ring-[#D1E231] focus:ring-2"
                  />
                  <span className="text-white">Enable smart captions</span>
                </label>
                
                {smartCaptions && (
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400 text-sm">Caption tone</span>
                    <select
                      value={captionTone}
                      onChange={(e) => setCaptionTone(e.target.value)}
                      className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded px-2 py-1 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                    >
                      {captionTones.map((tone) => (
                        <option key={tone.id} value={tone.id}>{tone.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-white font-semibold mb-3">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-24 p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                placeholder="Describe the meme concept, inside jokes, or scenario..."
              />
            </div>

            {/* Text Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Top text</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-[#D1E231] focus:ring-1 focus:ring-[#D1E231]"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Bottom text</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
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
              <button className="px-6 py-3 bg-neutral-700 text-white font-semibold rounded hover:bg-neutral-600 transition-colors">
                Randomize
              </button>
            </div>
          </div>

          {/* Preview - Right 1/3 */}
          <div className="lg:col-span-1">
            <div>
              <h3 className="text-white font-semibold mb-3">Preview</h3>
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
                {isGenerating ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-2 border-[#D1E231] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-neutral-400 text-sm">Generating meme...</span>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col justify-between p-4">
                    {/* Top text */}
                    {topText && (
                      <div className="text-center">
                        <span className="text-white font-bold text-lg drop-shadow-lg" style={{ textShadow: '2px 2px 0px #000' }}>
                          {topText.toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* Center content */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#D1E231]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Bottom text */}
                    {bottomText && (
                      <div className="text-center">
                        <span className="text-white font-bold text-lg drop-shadow-lg" style={{ textShadow: '2px 2px 0px #000' }}>
                          {bottomText.toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Watermark */}
                    <div className="absolute bottom-2 right-2">
                      <span className="text-xs text-white/70">Meme 1</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Export Buttons */}
              {!isGenerating && (
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-[#D1E231] text-black font-medium rounded hover:bg-[#C2D629] transition-colors">
                    Download
                  </button>
                  <button className="w-full px-4 py-2 bg-neutral-700 text-white font-medium rounded hover:bg-neutral-600 transition-colors">
                    Share to feed
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
