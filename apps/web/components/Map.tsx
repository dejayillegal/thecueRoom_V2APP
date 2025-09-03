'use client';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

interface Marker {
  id: string;
  lng: number;
  lat: number;
}

export default function Map({ center, markers = [] }: { center: [number, number]; markers?: Marker[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined' || process.env.NODE_ENV === 'test') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const map = new maplibregl.Map({
      container: ref.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center,
      zoom: 12,
      attributionControl: false,
      fadeDuration: reduce ? 0 : 300
    });
    markers.forEach((m) => {
      new maplibregl.Marker().setLngLat([m.lng, m.lat]).addTo(map);
    });
    return () => map.remove();
  }, [center, markers]);

  return <div ref={ref} className="h-64 w-full" />;
}
