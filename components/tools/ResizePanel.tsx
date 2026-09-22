'use client';

import React from 'react';
import { PresetSize, ResizeConfig, ResizeFitMode } from '@/lib/image-processing/types';
import { PRESET_SIZES } from '@/lib/image-processing/presets';
import { ResizeEngine } from '@/lib/image-processing/engines/ResizeEngine';
import { Scaling, Lock, Unlock } from 'lucide-react';

interface ResizePanelProps {
  config: ResizeConfig;
  originalWidth: number;
  originalHeight: number;
  onChange: (config: ResizeConfig) => void;
  disabled?: boolean;
}

export const ResizePanel: React.FC<ResizePanelProps> = ({
  config,
  originalWidth,
  originalHeight,
  onChange,
  disabled
}) => {
  const handleWidthChange = (val: number) => {
    if (config.lockAspect) {
      const { width, height } = ResizeEngine.calculateAspectRatioDimensions(
        originalWidth,
        originalHeight,
        val,
        config.height,
        'width'
      );
      onChange({ ...config, width, height, presetId: undefined });
    } else {
      onChange({ ...config, width: val, presetId: undefined });
    }
  };

  const handleHeightChange = (val: number) => {
    if (config.lockAspect) {
      const { width, height } = ResizeEngine.calculateAspectRatioDimensions(
        originalWidth,
        originalHeight,
        config.width,
        val,
        'height'
      );
      onChange({ ...config, width, height, presetId: undefined });
    } else {
      onChange({ ...config, height: val, presetId: undefined });
    }
  };

  const toggleAspectLock = () => {
    onChange({ ...config, lockAspect: !config.lockAspect });
  };

  const handlePresetSelect = (preset: PresetSize) => {
    onChange({
      ...config,
      width: preset.width,
      height: preset.height,
      presetId: preset.id
    });
  };

  const setFitMode = (mode: ResizeFitMode) => {
    onChange({ ...config, mode });
  };

  const categories: Array<PresetSize['category']> = ['Social', 'Display', 'Print'];

  return (
    <div className="flex flex-col gap-6 text-charcoal">
      {/* 1. Custom Dimensions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scaling size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Custom Dimensions
            </h3>
          </div>
          <button
            type="button"
            onClick={toggleAspectLock}
            disabled={disabled}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              config.lockAspect
                ? 'bg-canvas-warm text-charcoal border-charcoal-border'
                : 'bg-canvas-light text-charcoal-subtle border-charcoal-border/60'
            }`}
          >
            {config.lockAspect ? <Lock size={12} className="text-bronze-deep" /> : <Unlock size={12} />}
            <span>{config.lockAspect ? 'Locked' : 'Unlocked'}</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <label className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold block mb-1">
              Width (px)
            </label>
            <input
              type="number"
              min={1}
              max={16000}
              value={config.width || ''}
              onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
              disabled={disabled}
              className="w-full px-3 py-2 rounded-md border border-charcoal-border bg-canvas-light text-charcoal text-sm font-mono focus:border-charcoal focus:outline-none"
            />
          </div>

          <div className="col-span-1 text-center text-charcoal-subtle font-mono text-base pt-5">
            &times;
          </div>

          <div className="col-span-2">
            <label className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold block mb-1">
              Height (px)
            </label>
            <input
              type="number"
              min={1}
              max={16000}
              value={config.height || ''}
              onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
              disabled={disabled}
              className="w-full px-3 py-2 rounded-md border border-charcoal-border bg-canvas-light text-charcoal text-sm font-mono focus:border-charcoal focus:outline-none"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between p-2.5 rounded bg-canvas-warm border border-charcoal-border/60 text-xs">
          <div>
            <span className="text-charcoal-muted">Original: </span>
            <span className="font-mono font-medium">{originalWidth} × {originalHeight}</span>
          </div>
          <div>
            <span className="text-charcoal-muted">Output: </span>
            <span className="font-mono font-bold text-bronze-deep">{config.width} × {config.height}</span>
          </div>
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 2. Popular Presets */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
          Standard Presets
        </h3>

        <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-charcoal-subtle">
                {cat}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_SIZES.filter((p) => p.category === cat).map((p) => {
                  const isSelected = config.presetId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p)}
                      disabled={disabled}
                      className={`flex flex-col items-start p-2 rounded border text-left transition-colors ${
                        isSelected
                          ? 'bg-charcoal text-canvas-light border-charcoal'
                          : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
                      }`}
                    >
                      <span className="text-xs font-semibold truncate w-full">{p.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {p.width} × {p.height}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 3. Scaling & Fit Mode */}
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
          Scaling Mode
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['fit', 'fill', 'stretch'] as ResizeFitMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFitMode(mode)}
              disabled={disabled}
              className={`py-2 px-2.5 rounded text-xs font-medium border capitalize transition-colors text-center ${
                config.mode === mode
                  ? 'bg-charcoal text-canvas-light border-charcoal'
                  : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
              }`}
            >
              {mode === 'fit' ? 'Fit (Letterbox)' : mode === 'fill' ? 'Fill (Crop)' : 'Stretch'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
