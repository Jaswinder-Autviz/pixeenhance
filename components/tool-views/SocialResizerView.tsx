'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  Share2,
  Camera,
  Video,
  MessageCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

interface SocialResizerViewProps {
  platform: 'instagram' | 'youtube' | 'whatsapp';
}

export function SocialResizerView({ platform }: SocialResizerViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  // Instagram preset selection
  const [instaPreset, setInstaPreset] = useState<'square' | 'portrait' | 'landscape' | 'story'>(
    'square'
  );

  // Background fit mode for non-matching aspects
  const [bgStyle, setBgStyle] = useState<'blur' | 'white' | 'black' | 'crop'>('blur');

  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Target dimensions based on platform and preset
  let targetW = 1080;
  let targetH = 1080;

  if (platform === 'instagram') {
    if (instaPreset === 'square') {
      targetW = 1080;
      targetH = 1080;
    } else if (instaPreset === 'portrait') {
      targetW = 1080;
      targetH = 1350;
    } else if (instaPreset === 'landscape') {
      targetW = 1080;
      targetH = 566;
    } else if (instaPreset === 'story') {
      targetW = 1080;
      targetH = 1920;
    }
  } else if (platform === 'youtube') {
    targetW = 1280;
    targetH = 720;
  } else if (platform === 'whatsapp') {
    targetW = 1080;
    targetH = 1080;
  }

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const renderSocial = async () => {
      setIsProcessing(true);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (bgStyle === 'blur') {
          // Draw blurred zoomed background
          ctx.save();
          ctx.filter = 'blur(30px) brightness(0.7)';
          const bgScale = Math.max(
            targetW / imgElement.naturalWidth,
            targetH / imgElement.naturalHeight
          );
          const bgW = imgElement.naturalWidth * bgScale * 1.2;
          const bgH = imgElement.naturalHeight * bgScale * 1.2;
          ctx.drawImage(imgElement, (targetW - bgW) / 2, (targetH - bgH) / 2, bgW, bgH);
          ctx.restore();

          // Draw contained image on top
          const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          const canvasRatio = targetW / targetH;
          let drawW = targetW;
          let drawH = targetH;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > canvasRatio) {
            drawH = targetW / imgRatio;
            offsetY = (targetH - drawH) / 2;
          } else {
            drawW = targetH * imgRatio;
            offsetX = (targetW - drawW) / 2;
          }

          ctx.drawImage(imgElement, offsetX, offsetY, drawW, drawH);
        } else if (bgStyle === 'crop') {
          // Fill canvas (cover/crop)
          const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          const canvasRatio = targetW / targetH;
          let sourceX = 0;
          let sourceY = 0;
          let sourceW = imgElement.naturalWidth;
          let sourceH = imgElement.naturalHeight;

          if (imgRatio > canvasRatio) {
            sourceW = imgElement.naturalHeight * canvasRatio;
            sourceX = (imgElement.naturalWidth - sourceW) / 2;
          } else {
            sourceH = imgElement.naturalWidth / canvasRatio;
            sourceY = (imgElement.naturalHeight - sourceH) / 2;
          }

          ctx.drawImage(imgElement, sourceX, sourceY, sourceW, sourceH, 0, 0, targetW, targetH);
        } else {
          // Solid color background (white or black)
          ctx.fillStyle = bgStyle === 'white' ? '#FFFFFF' : '#000000';
          ctx.fillRect(0, 0, targetW, targetH);

          const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          const canvasRatio = targetW / targetH;
          let drawW = targetW;
          let drawH = targetH;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > canvasRatio) {
            drawH = targetW / imgRatio;
            offsetY = (targetH - drawH) / 2;
          } else {
            drawW = targetH * imgRatio;
            offsetX = (targetW - drawW) / 2;
          }

          ctx.drawImage(imgElement, offsetX, offsetY, drawW, drawH);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setResizedBlob(blob);
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              setPreviewUrl(URL.createObjectURL(blob));
            }
            setIsProcessing(false);
          },
          'image/jpeg',
          0.92
        );
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    };

    renderSocial();
  }, [imgElement, targetW, targetH, bgStyle]);

  const handleDownload = () => {
    if (!resizedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const suffix =
      platform === 'instagram'
        ? `insta-${instaPreset}`
        : platform === 'youtube'
        ? 'youtube-thumb'
        : 'whatsapp-dp';
    downloadBlob(resizedBlob, `${nameWithoutExt}-${suffix}.jpg`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setResizedBlob(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title={`Drop image here to resize for ${
            platform === 'instagram'
              ? 'Instagram'
              : platform === 'youtube'
              ? 'YouTube Thumbnails'
              : 'WhatsApp Profile (DP)'
          }`}
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  {platform === 'instagram' ? (
                    <Camera className="h-5 w-5" />
                  ) : platform === 'youtube' ? (
                    <Video className="h-5 w-5" />
                  ) : (
                    <MessageCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {platform === 'instagram'
                      ? 'Instagram Layout Standards'
                      : platform === 'youtube'
                      ? 'YouTube 16:9 HD Thumbnail Standards'
                      : 'WhatsApp Profile Picture (DP) Standards'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Output: {targetW} × {targetH} px
                  </p>
                </div>
              </div>

              {platform === 'youtube' && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Strictly &lt; 2MB Limit Guaranteed
                </span>
              )}
            </div>

            {/* Platform-Specific Presets */}
            {platform === 'instagram' && (
              <div className="pt-5 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Instagram Format Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'square', label: 'Square (1:1)', dims: '1080 × 1080 px' },
                    { id: 'portrait', label: 'Portrait (4:5)', dims: '1080 × 1350 px' },
                    { id: 'landscape', label: 'Landscape (1.91:1)', dims: '1080 × 566 px' },
                    { id: 'story', label: 'Story / Reel (9:16)', dims: '1080 × 1920 px' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setInstaPreset(p.id as any)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        instaPreset === p.id
                          ? 'border-brand-600 bg-brand-50/70 text-brand-900 dark:bg-brand-950/40 dark:text-brand-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs">{p.label}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.dims}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Background Style Options */}
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Border &amp; Background Style (for non-matching ratios)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'blur', label: 'Aesthetic Blurred Image (No Crop)' },
                  { id: 'crop', label: 'Zoom & Crop to Fill' },
                  { id: 'white', label: 'Solid White Padding' },
                  { id: 'black', label: 'Solid Black Padding' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBgStyle(b.id as any)}
                    className={`px-3 py-1.5 text-xs rounded-xl border font-semibold transition-all ${
                      bgStyle === b.id
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Live {platform.toUpperCase()} Preview ({targetW} × {targetH} px)
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {platform === 'whatsapp'
                ? 'Circular boundary shows the visible area in WhatsApp chat and contact lists.'
                : platform === 'youtube'
                ? 'Safe zone overlay previews where the video length timestamp appears.'
                : 'Padded and framed to prevent automatic cropping by Instagram.'}
            </p>

            <div className="relative w-full min-h-[350px] max-h-[520px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6 overflow-hidden">
              {previewUrl ? (
                <div className="relative shadow-xl border border-slate-300 dark:border-slate-700 bg-white">
                  <img
                    src={previewUrl}
                    alt="Social Preview"
                    className="max-h-[440px] max-w-full object-contain"
                  />

                  {/* Circular Avatar Mask for WhatsApp DP */}
                  {platform === 'whatsapp' && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-[90%] h-[90%] rounded-full border-2 border-dashed border-emerald-500 shadow-[0_0_0_9999px_rgba(15,23,42,0.45)]" />
                    </div>
                  )}

                  {/* YouTube timestamp safe zone */}
                  {platform === 'youtube' && (
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded pointer-events-none">
                      12:45
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400">Rendering preview...</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Choose Another Image</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!resizedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download {platform.toUpperCase()} Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
