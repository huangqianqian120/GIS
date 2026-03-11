'use client';

import { X, MapPin, Clock, Globe, Calendar, Users, Star, ExternalLink } from 'lucide-react';
import type { Museum } from '@/lib/museums-data';
import { museumTypeColors, museumTypeLabels, continentLabels } from '@/lib/museums-data';
import { cn } from '@/lib/utils';

interface MuseumDetailCardProps {
  museum: Museum;
  onClose: () => void;
}

export function MuseumDetailCard({ museum, onClose }: MuseumDetailCardProps) {
  const typeColor = museumTypeColors[museum.type];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg bg-black/90 border border-[#00FF00]/30 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div 
          className="relative h-32 flex items-end p-6"
          style={{ 
            background: `linear-gradient(135deg, #00FF0040 0%, #00FF0010 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
          >
            <X className="w-4 h-4 text-[#00FF00]" />
          </button>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
              style={{ backgroundColor: '#00FF00' }}
            >
              <span className="text-black font-bold">
                {museum.name.charAt(0)}
              </span>
            </div>
            <div>
              <span 
                className="inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-1"
                style={{ backgroundColor: '#00FF0030', color: '#00FF00' }}
              >
                {museumTypeLabels[museum.type]}
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">
                {museum.nameLocal || museum.name}
              </h2>
              {museum.nameLocal && (
                <p className="text-sm text-white/70">{museum.name}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed">
            {museum.description}
          </p>
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoItem 
              icon={MapPin} 
              label="位置"
              value={`${museum.city}, ${museum.country}`}
            />
            <InfoItem 
              icon={Globe} 
              label="大洲"
              value={continentLabels[museum.continent]}
            />
            <InfoItem 
              icon={Calendar} 
              label="成立年份"
              value={`${museum.foundedYear}年`}
            />
            <InfoItem 
              icon={Star} 
              label="热门度"
              value={
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ width: `${museum.popularity}%`, backgroundColor: typeColor }}
                    />
                  </div>
                  <span className="text-xs">{museum.popularity}%</span>
                </div>
              }
            />
          </div>
          
          {/* Opening Hours */}
          <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
            <Clock className="w-4 h-4 text-[#00FF00] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-white/60 mb-1">开放时间</p>
              <p className="text-sm text-white">{museum.openingHours}</p>
            </div>
          </div>
          
          {/* Annual Visitors */}
          {museum.annualVisitors && (
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <Users className="w-4 h-4 text-[#00FF00] shrink-0" />
              <div>
                <p className="text-xs text-white/60">年访客量</p>
                <p className="text-sm font-medium text-white">
                  {(museum.annualVisitors / 1000000).toFixed(1)}M 人次/年
                </p>
              </div>
            </div>
          )}
          
          {/* Highlights */}
          <div>
            <p className="text-xs text-white/60 mb-2">馆藏亮点</p>
            <div className="flex flex-wrap gap-1.5">
              {museum.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs text-[#00FF00] border border-[#00FF00]/30 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {museum.website && (
              <a
                href={museum.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors",
                  "bg-[#00FF00] text-black hover:bg-[#00FF00]/90"
                )}
              >
                <ExternalLink className="w-4 h-4" />
                访问官网
              </a>
            )}
            <button
              onClick={() => {
                const url = `https://www.google.com/maps?q=${museum.lat},${museum.lng}`;
                window.open(url, '_blank');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm border border-[#00FF00] text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              查看地图
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: any; 
  label: string; 
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-[#00FF00] mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-white/60">{label}</p>
        <div className="text-sm font-medium text-white truncate">{value}</div>
      </div>
    </div>
  );
}
