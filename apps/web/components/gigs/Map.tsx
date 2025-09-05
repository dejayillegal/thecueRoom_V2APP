'use client';
import { useEffect, useRef } from 'react';

export interface Marker {
  id: string;
  lat: number;
  lng: number;
}

export default function Map({ center, markers }: { center: [number, number]; markers: Marker[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    async function init() {
      try {
        const maplibregl = (await import('maplibre-gl')).default;
        if (!ref.current) return;
        map = new maplibregl.Map({
          container: ref.current,
          style: 'https://demotiles.maplibre.org/style.json',
          center,
          zoom: 10,
        });
        const features = markers.map((m) => ({
          type: 'Feature',
          properties: {},
          geometry: { type: 'Point', coordinates: [m.lng, m.lat] },
        }));
        map.on('load', () => {
          map.addSource('gigs', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });
          map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'gigs',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': '#1d4ed8',
              'circle-radius': 20,
            },
          });
          map.addLayer({
            id: 'points',
            type: 'circle',
            source: 'gigs',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#f87171',
              'circle-radius': 8,
            },
          });
        });
      } catch {
        // ignore in non-browser environments
      }
    }
    void init();
    return () => {
      if (map) map.remove();
    };
  }, [center, markers]);

  return <div ref={ref} className="h-96 w-full" />;
}
