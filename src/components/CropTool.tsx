import React from 'react';
import { AspectRatioOption, CropRect } from '../lib/image-processing/types';
import { Crop as CropIcon, Check, X } from 'lucide-react';

interface CropToolProps {
  currentCrop?: CropRect;
  imageWidth: number;
  imageHeight: number;
  onApplyCrop: (crop: CropRect) => void;
  onResetCrop: () => void;
  disabled?: boolean;
}

export const CropTool: React.FC<CropToolProps> = ({
  currentCrop,
  imageWidth,
  imageHeight,
  onApplyCrop,
  onResetCrop,
  disabled
}) => {
  const ratios: Array<{ id: AspectRatioOption; label: string; ratio?: number }> = [
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
        // Image is wider than ratio
        cropH = imageHeight;
        cropW = Math.round(imageHeight * item.ratio);
      } else {
        // Image is taller than ratio
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

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CropIcon size={16} color="var(--accent-primary)" />
          Aspect Ratio Crop
        </span>
        {currentCrop && (
          <button
            type="button"
            className="btn btn-subtle"
            onClick={onResetCrop}
            disabled={disabled}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }}
          >
            Reset
          </button>
        )}
      </div>

      <p className="tool-group-desc">
        Select a predefined aspect ratio to automatically center-crop the canvas.
      </p>

      <div className="grid-3">
        {ratios.map((r) => {
          const isSelected = currentCrop?.aspect === r.id;
          return (
            <button
              key={r.id}
              type="button"
              className={`option-card-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleRatioSelect(r)}
              disabled={disabled}
              style={{ padding: '0.5rem' }}
            >
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{r.label}</span>
            </button>
          );
        })}
      </div>

      {currentCrop && (
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>Cropped Area:</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-primary)' }}>
            {currentCrop.width} × {currentCrop.height} px
          </span>
        </div>
      )}
    </div>
  );
};
