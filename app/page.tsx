'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { MuseumGlobe, type ViewPreset } from '@/components/globe/museum-globe';
import { MuseumDetailCard } from '@/components/museum/museum-detail-card';
import { MuseumHoverCard } from '@/components/museum/museum-hover-card';
import { SearchBar } from '@/components/search/search-bar';
import { ViewControls } from '@/components/controls/view-controls';
import { InfoModal } from '@/components/modals/info-modal';
import { ShareModal } from '@/components/modals/share-modal';
import { museums as allMuseums, type Museum } from '@/lib/museums-data';
import { translations, type Language } from '@/lib/i18n';

export default function MuseumGlobePage() {
  // Client-side mounting state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const t = translations[language];
  
  // State
  const [viewPreset, setViewPreset] = useState<ViewPreset>('default');
  const [selectedMuseum, setSelectedMuseum] = useState<Museum | null>(null);
  const [hoveredMuseum, setHoveredMuseum] = useState<Museum | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showInfoModal, setShowInfoModal] = useState(false);
   const [showShareModal, setShowShareModal] = useState(false);

  // All museums (no filtering)
  const museums = allMuseums;

  // Handlers
  const handleMuseumClick = useCallback((museum: Museum) => {
    setSelectedMuseum(museum);
    setHoveredMuseum(null);
  }, []);

  const handleMuseumHover = useCallback((museum: Museum | null) => {
    setHoveredMuseum(museum);
  }, []);

  const handleSearchSelect = useCallback((museum: Museum) => {
    setSelectedMuseum(museum);
    // Set view to the museum's continent
    const continentViewMap: Record<string, ViewPreset> = {
      'Europe': 'europe',
      'Asia': 'asia',
      'North America': 'americas',
      'South America': 'americas',
      'Africa': 'africa',
      'Oceania': 'oceania',
    };
    const newView = continentViewMap[museum.continent] || 'default';
    setViewPreset(newView);
  }, []);

  const handleReset = useCallback(() => {
    setViewPreset('default');
  }, []);

  // Track mouse position for hover card
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Show loading state during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <main className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-bold text-[#00FF00]">{t.title}</h1>
          <p className="text-xs text-[#00FF00]/70 animate-pulse">{t.loading}</p>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Globe */}
      <div className="absolute inset-0">
        <MuseumGlobe
          museums={museums}
          onMuseumClick={handleMuseumClick}
          onMuseumHover={handleMuseumHover}
          viewPreset={viewPreset}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Title */}
          <div className="bg-[#00FF00] px-4 py-2">
            <h1 className="text-lg md:text-xl font-bold text-black leading-tight">
              {t.title}
            </h1>
            <p className="text-xs text-black/70">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="flex-1 md:w-auto">
              <SearchBar 
                museums={allMuseums}
                onSelect={handleSearchSelect}
                placeholder={t.searchPlaceholder}
              />
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-3 py-2 text-sm font-medium border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00]/10 rounded transition-colors whitespace-nowrap"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Right Sidebar - Controls */}
      <aside className="absolute right-4 md:right-6 top-24 md:top-28 z-10 hidden md:block">
        <ViewControls
          currentView={viewPreset}
          onViewChange={setViewPreset}
          onReset={handleReset}
          onShare={() => setShowShareModal(true)}
          onInfo={() => setShowInfoModal(true)}
          t={t}
        />
      </aside>

      {/* Mobile Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden">
        <div className="flex items-center justify-between gap-2 bg-card/95 backdrop-blur-md border border-border rounded-xl p-2 shadow-xl">
          <button
            onClick={() => setShowInfoModal(true)}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            关于
          </button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-primary font-medium">{museums.length}</span>
            <span className="text-muted-foreground">座博物馆</span>
          </div>
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            分享
          </button>
        </div>
      </div>

      {/* Hover Card */}
      {hoveredMuseum && !selectedMuseum && (
        <MuseumHoverCard
          museum={hoveredMuseum}
          position={mousePosition}
        />
      )}

      {/* Detail Card Modal */}
      {selectedMuseum && (
        <MuseumDetailCard
          museum={selectedMuseum}
          onClose={() => setSelectedMuseum(null)}
        />
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}

      {/* Gradient Overlays for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/60 to-transparent pointer-events-none" />
    </main>
  );
}
