import React, { useState, useRef, useEffect, useCallback } from 'react';

export type ViewMode = 'split' | 'before' | 'after';

interface BeforeAfterSliderProps {
  originalCanvas: HTMLCanvasElement | null;
  processedCanvas: HTMLCanvasElement | null;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  className?: string;
  zoomLevel?: number;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalCanvas,
  processedCanvas,
  viewMode = 'split',
  className = '',
  zoomLevel = 1
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement>(null);

  // Render original canvas
  useEffect(() => {
    if (!beforeCanvasRef.current || !originalCanvas) return;
    const canvas = beforeCanvasRef.current;
    canvas.width = originalCanvas.width;
    canvas.height = originalCanvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(originalCanvas, 0, 0);
    }
  }, [originalCanvas]);

  // Render processed canvas
  useEffect(() => {
    if (!afterCanvasRef.current || !processedCanvas) return;
    const canvas = afterCanvasRef.current;
    canvas.width = processedCanvas.width;
    canvas.height = processedCanvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(processedCanvas, 0, 0);
    }
  }, [processedCanvas]);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  if (!originalCanvas || !processedCanvas) {
    return (
      <div className="canvas-viewport" style={{ color: 'var(--text-muted)' }}>
        No image loaded in workspace.
      </div>
    );
  }

  const aspectRatio = `${originalCanvas.width} / ${originalCanvas.height}`;

  return (
    <div
      ref={containerRef}
      className={`before-after-container relative overflow-hidden select-none ${className}`}
      style={{
        aspectRatio,
        transform: zoomLevel !== 1 ? `scale(${zoomLevel})` : undefined,
        transformOrigin: 'center center',
        transition: isDragging ? 'none' : 'transform 200ms ease'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Before and after image comparison slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Before Layer (Base Flow Canvas - keeps container dimensions fixed) */}
      <canvas
        ref={beforeCanvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          opacity: viewMode === 'after' ? 0 : 1,
          transition: 'opacity 150ms ease'
        }}
      />

      {/* After Layer (Absolute Overlay) */}
      <div
        className="after-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          opacity: viewMode === 'before' ? 0 : 1,
          clipPath:
            viewMode === 'split'
              ? `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
              : 'none',
          transition: isDragging ? 'none' : 'clip-path 100ms ease, opacity 150ms ease'
        }}
      >
        <canvas
          ref={afterCanvasRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>

      {/* Draggable Vertical Handle with Center ↔ Icon */}
      {viewMode === 'split' && (
        <div
          className="split-handle"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="split-handle-btn" aria-hidden="true">
            <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>&#8596;</span>
          </div>
        </div>
      )}

      {/* BEFORE / AFTER Frosted Badges */}
      {viewMode !== 'after' && (
        <span className="badge-layer before">BEFORE</span>
      )}
      {viewMode !== 'before' && (
        <span className="badge-layer after">AFTER</span>
      )}
    </div>
  );
};
