'use client';

import React from 'react';
import { Sparkles, Scaling, SlidersHorizontal, RefreshCw } from 'lucide-react';

export type ToolTab = 'ai' | 'resize' | 'edit' | 'convert';

interface EditorSidebarProps {
  activeTab: ToolTab;
  onTabChange: (tab: ToolTab) => void;
  disabled?: boolean;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeTab,
  onTabChange,
  disabled
}) => {
  const tabs: Array<{ id: ToolTab; label: string; icon: React.FC<{ size?: number; className?: string }> }> = [
    { id: 'ai', label: 'AI Studio', icon: Sparkles },
    { id: 'resize', label: 'Resize', icon: Scaling },
    { id: 'edit', label: 'Edit & Tone', icon: SlidersHorizontal },
    { id: 'convert', label: 'Convert', icon: RefreshCw },
  ];

  return (
    <aside className="w-full lg:w-20 bg-canvas-warm/95 border-b lg:border-b-0 lg:border-r border-charcoal-border/80 flex lg:flex-col items-center justify-around lg:justify-start lg:pt-6 gap-2 lg:gap-4 p-2 select-none z-10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            disabled={disabled}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all ${
              isActive
                ? 'bg-charcoal text-canvas-light shadow-sm'
                : 'text-charcoal-muted hover:bg-canvas-light hover:text-charcoal'
            }`}
            title={tab.label}
          >
            <Icon size={20} className={isActive ? 'text-bronze' : 'text-current'} />
            <span className="text-[10px] font-semibold mt-1 tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
