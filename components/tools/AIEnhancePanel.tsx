'use client';

import React, { useState } from 'react';
import {
  DenoiseLevel,
  FaceEnhanceConfig,
  SharpenLevel,
  UpscaleFactor
} from '@/lib/image-processing/types';
import { Sparkles, Cpu, UserCheck, ShieldCheck, CloudLightning, Loader2, CheckCircle2 } from 'lucide-react';

interface AIEnhancePanelProps {
  upscale: UpscaleFactor;
  faceEnhance: FaceEnhanceConfig;
  sharpen: SharpenLevel;
  denoise: DenoiseLevel;
  originalWidth: number;
  originalHeight: number;
  onUpscaleChange: (factor: UpscaleFactor) => void;
  onFaceEnhanceChange: (config: FaceEnhanceConfig) => void;
  onSharpenChange: (level: SharpenLevel) => void;
  onDenoiseChange: (level: DenoiseLevel) => void;
  onGeminiEnhance?: (mode: 'general' | 'face' | 'restore') => Promise<void>;
  isProcessing: boolean;
}

export const AIEnhancePanel: React.FC<AIEnhancePanelProps> = ({
  upscale,
  faceEnhance,
  sharpen,
  denoise,
  originalWidth,
  originalHeight,
  onUpscaleChange,
  onFaceEnhanceChange,
  onSharpenChange,
  onDenoiseChange,
  onGeminiEnhance,
  isProcessing
}) => {
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);

  const handleGeminiTrigger = async (mode: 'general' | 'face' | 'restore') => {
    if (!onGeminiEnhance || isGeminiLoading || isProcessing) return;
    setIsGeminiLoading(true);
    setGeminiResult(null);
    try {
      await onGeminiEnhance(mode);
      setGeminiResult('Gemini neural analysis and enhancement applied.');
      setTimeout(() => setGeminiResult(null), 6000);
    } catch (err: any) {
      console.error('Gemini enhance error:', err);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const sharpenOptions: Array<{ level: SharpenLevel; label: string }> = [
    { level: 'none', label: 'None' },
    { level: 'low', label: 'Subtle' },
    { level: 'medium', label: 'Balanced' },
    { level: 'high', label: 'Crisp' }
  ];

  const denoiseOptions: Array<{ level: DenoiseLevel; label: string }> = [
    { level: 'none', label: 'Off' },
    { level: 'low', label: 'Light' },
    { level: 'medium', label: 'Medium' },
    { level: 'high', label: 'Deep' }
  ];

  return (
    <div className="flex flex-col gap-6 text-charcoal">
      {/* 1. Super-Resolution Upscaling */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              AI Super-Resolution
            </h3>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-canvas-warm border border-charcoal-border text-charcoal-subtle font-mono">
            Real-ESRGAN
          </span>
        </div>

        <p className="text-xs text-charcoal-muted leading-relaxed">
          Reconstruct high-frequency pixel transitions with deep convolutional neural weights running directly on your device.
        </p>

        {/* Multiplier Option Cards */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onUpscaleChange(1)}
            disabled={isProcessing}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
              upscale === 1
                ? 'bg-charcoal text-canvas-light border-charcoal shadow-sm'
                : 'bg-canvas-light text-charcoal border-charcoal-border hover:border-bronze hover:bg-canvas-warm'
            }`}
          >
            <span className="text-xs opacity-75 mb-0.5">1×</span>
            <span className="text-sm font-bold">Native</span>
            <span className="text-[10px] opacity-70 mt-1">Original</span>
          </button>

          <button
            type="button"
            onClick={() => onUpscaleChange(2)}
            disabled={isProcessing}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
              upscale === 2
                ? 'bg-charcoal text-canvas-light border-charcoal shadow-sm'
                : 'bg-canvas-light text-charcoal border-charcoal-border hover:border-bronze hover:bg-canvas-warm'
            }`}
          >
            <span className="text-xs text-bronze mb-0.5">✦</span>
            <span className="text-sm font-bold">Upscale 2×</span>
            <span className="text-[10px] text-bronze-rich font-medium mt-1">Double Res</span>
          </button>

          <button
            type="button"
            onClick={() => onUpscaleChange(4)}
            disabled={isProcessing}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
              upscale === 4
                ? 'bg-charcoal text-canvas-light border-charcoal shadow-sm'
                : 'bg-canvas-light text-charcoal border-charcoal-border hover:border-bronze hover:bg-canvas-warm'
            }`}
          >
            <span className="text-xs text-bronze mb-0.5">✦✦</span>
            <span className="text-sm font-bold">Upscale 4×</span>
            <span className="text-[10px] text-bronze-rich font-medium mt-1">4K Output</span>
          </button>
        </div>

        {/* Target Dimensions Banner */}
        {originalWidth > 0 && originalHeight > 0 && (
          <div className="flex items-center justify-between p-2.5 rounded bg-canvas-warm border border-charcoal-border/70 text-xs">
            <span className="text-charcoal-muted">Target Output:</span>
            <span className="font-mono font-bold text-charcoal">
              {originalWidth * upscale} × {originalHeight * upscale} px
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
          <ShieldCheck size={13} className="text-emerald-700" />
          <span>Processed on your device (100% private)</span>
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 2. Gemini Cloud AI Intelligent Enhancement */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudLightning size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Gemini Intelligent Enhance
            </h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-bronze/15 text-bronze-dark font-medium border border-bronze/30">
            Cloud AI
          </span>
        </div>

        <p className="text-xs text-charcoal-muted leading-relaxed">
          Uses Google Gemini multi-modal vision models to assess tonal balance, restore micro-contrast, and optimize image clarity.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleGeminiTrigger('general')}
            disabled={isProcessing || isGeminiLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-canvas-warm border border-charcoal-border hover:border-bronze hover:bg-canvas-light text-xs font-semibold text-charcoal transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            {isGeminiLoading ? (
              <>
                <Loader2 size={14} className="animate-spin text-bronze" />
                <span>Consulting Gemini Vision...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-bronze" />
                <span>Intelligent Detail Restoration</span>
              </>
            )}
          </button>

          {geminiResult && (
            <div className="flex items-center gap-2 p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{geminiResult}</span>
            </div>
          )}
        </div>

        <span className="text-[11px] text-charcoal-subtle italic">
          This AI feature securely processes your image using intelligent cloud vision.
        </span>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 3. Face Clarity & Enhancement */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Facial Clarity
            </h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={faceEnhance.enabled}
              onChange={(e) => onFaceEnhanceChange({ ...faceEnhance, enabled: e.target.checked })}
              disabled={isProcessing}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-charcoal-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-charcoal" />
          </label>
        </div>

        {faceEnhance.enabled && (
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-charcoal-muted font-medium">
              <span>Enhancement Strength</span>
              <span className="font-mono text-charcoal">{faceEnhance.strength}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={faceEnhance.strength}
              onChange={(e) => onFaceEnhanceChange({ ...faceEnhance, strength: Number(e.target.value) })}
              disabled={isProcessing}
              className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
            />
          </div>
        )}
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 4. Denoise & Sharpen Controls */}
      <div className="grid grid-cols-2 gap-4">
        {/* Denoise */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-charcoal font-serif">Noise Reduction</span>
          <div className="grid grid-cols-2 gap-1">
            {denoiseOptions.map((opt) => (
              <button
                key={opt.level}
                type="button"
                onClick={() => onDenoiseChange(opt.level)}
                disabled={isProcessing}
                className={`py-1.5 px-2 rounded text-[11px] font-medium border transition-colors ${
                  denoise === opt.level
                    ? 'bg-charcoal text-canvas-light border-charcoal'
                    : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sharpen */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-charcoal font-serif">Edge Clarity</span>
          <div className="grid grid-cols-2 gap-1">
            {sharpenOptions.map((opt) => (
              <button
                key={opt.level}
                type="button"
                onClick={() => onSharpenChange(opt.level)}
                disabled={isProcessing}
                className={`py-1.5 px-2 rounded text-[11px] font-medium border transition-colors ${
                  sharpen === opt.level
                    ? 'bg-charcoal text-canvas-light border-charcoal'
                    : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
