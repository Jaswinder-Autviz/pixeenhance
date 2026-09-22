'use client';

import React, { useRef } from 'react';
import { BeforeAfterSlider, ViewMode } from '@/src/components/BeforeAfterSlider';
import { ZoomIn, ZoomOut, Columns, Maximize2, Minimize2, Eye } from 'lucide-react';

interface ImageCanvasProps {
  originalCanvas: HTMLCanvasElement | null;
  processedCanvas: HTMLCanvasElement | null;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({
  originalCanvas,
  processedCanvas,
  viewMode,
  onViewModeChange,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isFullscreen,
  onToggleFullscreen,
  viewportRef
}) => {
  return (
    <div
      ref={viewportRef}
      className="relative flex-1 bg-[#1B1B1B] min-h-[480px] lg:min-h-[640px] flex items-center justify-center overflow-hidden select-none p-4"
      style={{
        backgroundImage: `
          linear-gradient(45deg, #141414 25%, transparent 25%),
          linear-gradient(-45deg, #141414 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #141414 75%),
          linear-gradient(-45deg, transparent 75%, #141414 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}
    >
      {/* Before / After Interactive Slider */}
      {originalCanvas && (
        <BeforeAfterSlider
          originalCanvas={originalCanvas}
          processedCanvas={processedCanvas || originalCanvas}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          zoomLevel={zoomLevel}
          className="max-h-[80vh] shadow-2xl rounded"
        />
      )}

      {/* Floating Canvas Control Toolbar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212]/85 backdrop-blur-md border border-white/10 text-white/90 shadow-2xl z-30">
        {/* Zoom Out */}
        <button
          type="button"
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors disabled:opacity-30"
          title="Zoom Out (-25%)"
        >
          <ZoomOut size={14} />
        </button>

        {/* Zoom Reset */}
        <button
          type="button"
          onClick={onResetZoom}
          className="px-2 py-0.5 rounded text-xs font-mono font-medium hover:bg-white/15 text-white/90 transition-colors"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoomLevel * 100)}%
        </button>

        {/* Zoom In */}
        <button
          type="button"
          onClick={onZoomIn}
          disabled={zoomLevel >= 3}
          className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors disabled:opacity-30"
          title="Zoom In (+25%)"
        >
          <ZoomIn size={14} />
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Split View */}
        <button
          type="button"
          onClick={() => onViewModeChange('split')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            viewMode === 'split' ? 'bg-white/25 text-white' : 'text-white/70 hover:bg-white/10'
          }`}
          title="Split Comparison"
        >
          <Columns size={13} />
          <span>Split</span>
        </button>

        {/* Before */}
        <button
          type="button"
          onClick={() => onViewModeChange('before')}
          className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
            viewMode === 'before' ? 'bg-white/25 text-white' : 'text-white/70 hover:bg-white/10'
          }`}
          title="View Original"
        >
          Before
        </button>

        {/* After */}
        <button
          type="button"
          onClick={() => onViewModeChange('after')}
          className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
            viewMode === 'after' ? 'bg-white/25 text-white' : 'text-white/70 hover:bg-white/10'
          }`}
          title="View Enhanced"
        >
          After
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Fullscreen */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  );
};
