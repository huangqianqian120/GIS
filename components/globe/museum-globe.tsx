'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Museum } from '@/lib/museums-data';
import { museumTypeColors } from '@/lib/museums-data';

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Loading Globe...</p>
      </div>
    </div>
  ),
});

interface MuseumGlobeProps {
  museums: Museum[];
  onMuseumClick: (museum: Museum) => void;
  onMuseumHover: (museum: Museum | null) => void;
  viewPreset?: ViewPreset;
}

export type ViewPreset = 'default' | 'europe' | 'asia' | 'americas' | 'africa' | 'oceania';

const viewPresets: Record<ViewPreset, { lat: number; lng: number; altitude: number }> = {
  default: { lat: 30, lng: 0, altitude: 2.5 },
  europe: { lat: 50, lng: 10, altitude: 1.5 },
  asia: { lat: 35, lng: 105, altitude: 1.8 },
  americas: { lat: 25, lng: -100, altitude: 2 },
  africa: { lat: 0, lng: 20, altitude: 1.8 },
  oceania: { lat: -25, lng: 135, altitude: 2 },
};

export function MuseumGlobe({ museums, onMuseumClick, onMuseumHover, viewPreset = 'default' }: MuseumGlobeProps) {
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize globe controls
  useEffect(() => {
    if (globeRef.current && globeReady) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 500;
      }
    }
  }, [globeReady]);

  // Handle view preset changes
  useEffect(() => {
    if (globeRef.current && globeReady) {
      const preset = viewPresets[viewPreset];
      globeRef.current.pointOfView(preset, 1000);
    }
  }, [viewPreset, globeReady]);

  // Calculate marker size based on popularity
  const getMarkerSize = useCallback((museum: Museum) => {
    const baseSize = 0.3;
    const popularityBonus = (museum.popularity / 100) * 0.7;
    return baseSize + popularityBonus;
  }, []);

  // Marker HTML element - tech style with glow
  const markerElement = useCallback((museum: Museum) => {
    const el = document.createElement('div');
    el.className = 'museum-marker';
    el.style.cssText = `
      width: 10px;
      height: 10px;
      background: #E8E8E8;
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 
        0 0 6px #E8E8E8,
        0 0 12px #E8E8E8,
        0 0 20px #C0C0C0,
        inset 0 0 3px rgba(255,255,255,0.9);
      cursor: pointer;
      animation: techPulse 1s ease-in-out infinite;
    `;
    
    return el;
  }, []);

  // Points data for globe
  const pointsData = useMemo(() => {
    return museums.map(museum => ({
      ...museum,
      size: getMarkerSize(museum),
      color: museumTypeColors[museum.type],
    }));
  }, [museums, getMarkerSize]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <style jsx global>{`
        @keyframes techPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
            box-shadow: 
              0 0 6px #E8E8E8,
              0 0 12px #E8E8E8,
              0 0 20px #C0C0C0;
          }
          50% { 
            transform: scale(2);
            opacity: 0.5;
            box-shadow: 
              0 0 10px #FFFFFF,
              0 0 20px #E8E8E8,
              0 0 35px #C0C0C0;
          }
        }
        .museum-marker:hover {
          transform: scale(1.5) !important;
          z-index: 100;
        }
      `}</style>
      
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          showGraticules={true}
          showAtmosphere={false}
          
          // Points (museums) - custom HTML markers with tech style
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointEl={markerElement}
          pointsMerge={false}
          onPointClick={(point: any) => onMuseumClick(point as Museum)}
          onPointHover={(point: any) => onMuseumHover(point as Museum | null)}
          
          onGlobeReady={() => setGlobeReady(true)}
          animateIn={true}
        />
      )}
      
      
    </div>
  );
}
