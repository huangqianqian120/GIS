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
        className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">如果地球是一座博物馆</h2>
              <p className="text-sm text-muted-foreground">If Earth Were a Museum</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            这是一个沉浸式全球博物馆可视化平台，将全球知名博物馆以3D形式附着在地球对应经纬度位置上。
            您可以通过拖拽、缩放、旋转来探索这个文化星球，发现世界各地的艺术瑰宝与历史遗产。
          </p>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold">功能特点</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>3D地球场景支持拖拽、缩放、旋转交互</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>按大洲、国家、类型、年代等维度筛选展示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>点击博物馆查看详细信息和馆藏亮点</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>支持搜索、视角预设、分享等辅助功能</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold">数据来源</h3>
            <p className="text-sm text-muted-foreground">
              博物馆数据综合自Wikidata等公开数据源，包含全球50+座著名博物馆的基本信息、开放时间、馆藏亮点等。
            </p>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive" /> for culture lovers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
