'use client';

import { Globe, MapPin, Share2, RotateCcw, Maximize, Info } from 'lucide-react';
import type { ViewPreset } from '@/components/globe/museum-globe';
import { cn } from '@/lib/utils';

interface ViewControlsProps {
  currentView: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  onReset: () => void;
  onShare: () => void;
  onInfo: () => void;
}

const viewButtons: { id: ViewPreset; label: string; icon?: boolean }[] = [
  { id: 'default', label: '全球', icon: true },
  { id: 'europe', label: '欧洲' },
  { id: 'asia', label: '亚洲' },
  { id: 'americas', label: '美洲' },
  { id: 'africa', label: '非洲' },
  { id: 'oceania', label: '大洋洲' },
];

export function ViewControls({ 
  currentView, 
  onViewChange, 
  onReset, 
  onShare,
  onInfo,
}: ViewControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* View Presets */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-1.5 shadow-xl">
        <div className="flex flex-col gap-1">
          {viewButtons.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                currentView === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {icon && <Globe className="w-4 h-4" />}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-1.5 shadow-xl">
        <div className="flex flex-col gap-1">
          <ControlButton
            icon={RotateCcw}
            label="重置视角"
            onClick={onReset}
          />
          <ControlButton
            icon={Share2}
            label="分享"
            onClick={onShare}
          />
          <ControlButton
            icon={Info}
            label="关于"
            onClick={onInfo}
          />
        </div>
      </div>
    </div>
  );
}

function ControlButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      title={label}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
