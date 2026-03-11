'use client';

import { X, Github, Globe, Heart } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-black/90 border border-[#00FF00]/30 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-[#00FF00]" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00FF00] flex items-center justify-center">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Museum Globe</h2>
              <p className="text-sm text-white/60">Explore World's Museums</p>
            </div>
          </div>
          
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            An immersive 3D visualization platform showcasing global museums on an interactive Earth globe. 
            Explore cultural treasures and historical heritage from around the world through drag, zoom, and rotate interactions.
          </p>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-[#00FF00]">Features</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>Interactive 3D globe with drag, zoom, and rotate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>Filter by continent, country, type, and era</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>Click museums for detailed info and highlights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>Search, view presets, and sharing features</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-[#00FF00]">Data Source</h3>
            <p className="text-sm text-white/70">
              Museum data sourced from public databases including 110+ famous museums worldwide with basic info, opening hours, and highlights.
            </p>
          </div>
          
          <div className="pt-4 border-t border-[#00FF00]/30">
            <p className="text-xs text-white/50 text-center flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#00FF00]" /> for culture lovers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
