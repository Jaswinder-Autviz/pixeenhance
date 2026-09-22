'use client';

import React from 'react';
import {
  AspectRatioOption,
  ColorAdjustments,
  CropRect,
  RotateFlipState
} from '@/lib/image-processing/types';
import { Crop, RotateCw, FlipHorizontal, FlipVertical, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface EditPanelProps {
  crop?: CropRect;
  rotateFlip: RotateFlipState;
  adjustments: ColorAdjustments;
  imageWidth: number;
  imageHeight: number;
  onApplyCrop: (crop: CropRect) => void;
  onResetCrop: () => void;
  onRotateFlipChange: (state: RotateFlipState) => void;
  onAdjustmentsChange: (adj: ColorAdjustments) => void;
  disabled?: boolean;
}

export const EditPanel: React.FC<EditPanelProps> = ({
  crop,
  rotateFlip,
  adjustments,
  imageWidth,
  imageHeight,
  onApplyCrop,
  onResetCrop,
  onRotateFlipChange,
  onAdjustmentsChange,
  disabled
}) => {
  const cropRatios: Array<{ id: AspectRatioOption; label: string; ratio?: number }> = [
    { id: 'free', label: 'Free' },
    { id: '1:1', label: '1:1 (Square)', ratio: 1 },
    { id: '4:5', label: '4:5 (Portrait)', ratio: 4 / 5 },
    { id: '16:9', label: '16:9 (Cinema)', ratio: 16 / 9 },
    { id: '9:16', label: '9:16 (Story)', ratio: 9 / 16 },
    { id: '2:3', label: '2:3 (Photo)', ratio: 2 / 3 }
  ];

  const handleRatioSelect = (item: { id: AspectRatioOption; ratio?: number }) => {
    let cropW = imageWidth;
    let cropH = imageHeight;

    if (item.ratio) {
      if (imageWidth / imageHeight > item.ratio) {
        cropH = imageHeight;
        cropW = Math.round(imageHeight * item.ratio);
      } else {
        cropW = imageWidth;
        cropH = Math.round(imageWidth / item.ratio);
      }
    }

    const cropX = Math.round((imageWidth - cropW) / 2);
    const cropY = Math.round((imageHeight - cropH) / 2);

    onApplyCrop({
      x: cropX,
      y: cropY,
      width: cropW,
      height: cropH,
      aspect: item.id
    });
  };

  const handleRotate90 = () => {
    const nextRot = ((rotateFlip.rotation + 90) % 360) as 0 | 90 | 180 | 270;
    onRotateFlipChange({ ...rotateFlip, rotation: nextRot });
  };

  const handleFlipH = () => {
    onRotateFlipChange({ ...rotateFlip, flipH: !rotateFlip.flipH });
  };

  const handleFlipV = () => {
    onRotateFlipChange({ ...rotateFlip, flipV: !rotateFlip.flipV });
  };

  const handleResetAdjustments = () => {
    onAdjustmentsChange({ brightness: 0, contrast: 0, saturation: 0, blur: 0 });
  };

  return (
    <div className="flex flex-col gap-6 text-charcoal">
      {/* 1. Crop Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crop size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Aspect Ratio Crop
            </h3>
          </div>
          {crop && (
            <button
              type="button"
              onClick={onResetCrop}
              disabled={disabled}
              className="text-xs text-rose-700 hover:text-rose-900 font-medium underline"
            >
              Reset Crop
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {cropRatios.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleRatioSelect(r)}
              disabled={disabled}
              className={`py-2 px-2 text-xs font-semibold rounded border transition-colors ${
                crop?.aspect === r.id
                  ? 'bg-charcoal text-canvas-light border-charcoal'
                  : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 2. Rotate & Flip */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
          Orientation
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={handleRotate90}
            disabled={disabled}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded border border-charcoal-border bg-canvas-light text-xs font-medium hover:bg-canvas-warm transition-colors"
          >
            <RotateCw size={14} className="text-bronze-rich" />
            <span>+90&deg;</span>
          </button>

          <button
            type="button"
            onClick={handleFlipH}
            disabled={disabled}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded border text-xs font-medium transition-colors ${
              rotateFlip.flipH
                ? 'bg-charcoal text-canvas-light border-charcoal'
                : 'border-charcoal-border bg-canvas-light hover:bg-canvas-warm'
            }`}
          >
            <FlipHorizontal size={14} />
            <span>Flip H</span>
          </button>

          <button
            type="button"
            onClick={handleFlipV}
            disabled={disabled}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded border text-xs font-medium transition-colors ${
              rotateFlip.flipV
                ? 'bg-charcoal text-canvas-light border-charcoal'
                : 'border-charcoal-border bg-canvas-light hover:bg-canvas-warm'
            }`}
          >
            <FlipVertical size={14} />
            <span>Flip V</span>
          </button>
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 3. Tonal Sliders */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Tonal Balance
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAdjustments}
            disabled={disabled}
            className="text-xs text-charcoal-muted hover:text-charcoal flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>Reset</span>
          </button>
        </div>

        {/* Brightness */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-charcoal-muted font-medium">
            <span>Brightness</span>
            <span className="font-mono text-charcoal">{adjustments.brightness > 0 ? `+${adjustments.brightness}` : adjustments.brightness}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            value={adjustments.brightness}
            onChange={(e) => onAdjustmentsChange({ ...adjustments, brightness: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
          />
        </div>

        {/* Contrast */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-charcoal-muted font-medium">
            <span>Contrast</span>
            <span className="font-mono text-charcoal">{adjustments.contrast > 0 ? `+${adjustments.contrast}` : adjustments.contrast}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            value={adjustments.contrast}
            onChange={(e) => onAdjustmentsChange({ ...adjustments, contrast: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
          />
        </div>

        {/* Saturation */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-charcoal-muted font-medium">
            <span>Saturation</span>
            <span className="font-mono text-charcoal">{adjustments.saturation > 0 ? `+${adjustments.saturation}` : adjustments.saturation}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            value={adjustments.saturation}
            onChange={(e) => onAdjustmentsChange({ ...adjustments, saturation: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
          />
        </div>

        {/* Blur */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-charcoal-muted font-medium">
            <span>Gaussian Blur</span>
            <span className="font-mono text-charcoal">{adjustments.blur}</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={adjustments.blur}
            onChange={(e) => onAdjustmentsChange({ ...adjustments, blur: Number(e.target.value) })}
            disabled={disabled}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
          />
        </div>
      </div>
    </div>
  );
};
