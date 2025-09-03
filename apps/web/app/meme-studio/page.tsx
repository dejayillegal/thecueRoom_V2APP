'use client';
import { useEffect, useRef, useState } from 'react';

function seedFrom(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = Math.imul(31, h) + text.charCodeAt(i);
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function MemeStudioPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [caption, setCaption] = useState('Cue it');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rng = mulberry32(seedFrom(caption));
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px sans-serif';
    ctx.fillText(caption, 10, 30 + rng() * 100);
    ctx.font = '12px sans-serif';
    ctx.fillText('thecueroom', canvas.width - 90, canvas.height - 10);
  }, [caption]);

  return (
    <main className="p-4">
      <input
        className="mb-2 w-full rounded border px-2 py-1"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <canvas ref={canvasRef} width={300} height={300} className="border" />
    </main>
  );
}
