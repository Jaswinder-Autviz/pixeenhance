import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { ImageMeta } from '../lib/image-processing/types';

interface ImageUploaderProps {
  onImageLoaded: (image: HTMLImageElement, file: File, meta: ImageMeta) => void;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageLoaded, className = '' }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    setErrorMsg(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Unsupported format. Please upload a JPG, PNG, or WebP image.');
      return;
    }

    // Safety check for extreme file size (> 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setErrorMsg('File exceeds 100MB browser memory limit. Please choose a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Dimension guard (> 16000 px can crash canvas rendering contexts)
        if (img.width > 16000 || img.height > 16000) {
          setErrorMsg('Image dimensions exceed 16,000 pixels. Please resize first.');
          return;
        }

        const mp = parseFloat(((img.width * img.height) / 1000000).toFixed(2));
        const meta: ImageMeta = {
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
          format: file.type || 'image/jpeg',
          megapixels: mp
        };

        onImageLoaded(img, file, meta);
      };
      img.onerror = () => {
        setErrorMsg('Failed to load image. The file may be corrupt.');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Instant demo sample image
  const loadSampleImage = () => {
    setIsLoadingSample(true);
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Atmospheric rich background
      const grad = ctx.createLinearGradient(0, 0, 960, 640);
      grad.addColorStop(0, '#090a14');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 640);

      // Glowing orbs
      const rad1 = ctx.createRadialGradient(320, 240, 10, 320, 240, 280);
      rad1.addColorStop(0, 'rgba(139, 92, 246, 0.85)');
      rad1.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
      rad1.addColorStop(1, 'transparent');
      ctx.fillStyle = rad1;
      ctx.beginPath();
      ctx.arc(320, 240, 280, 0, Math.PI * 2);
      ctx.fill();

      const rad2 = ctx.createRadialGradient(680, 420, 10, 680, 420, 260);
      rad2.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
      rad2.addColorStop(0.6, 'rgba(236, 72, 153, 0.3)');
      rad2.addColorStop(1, 'transparent');
      ctx.fillStyle = rad2;
      ctx.beginPath();
      ctx.arc(680, 420, 260, 0, Math.PI * 2);
      ctx.fill();

      // Sharp architectural geometric grids
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2;
      ctx.strokeRect(220, 160, 520, 320);

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = 240; x < 720; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 170);
        ctx.lineTo(x, 470);
        ctx.stroke();
      }
      for (let y = 180; y < 460; y += 30) {
        ctx.beginPath();
        ctx.moveTo(230, y);
        ctx.lineTo(730, y);
        ctx.stroke();
      }

      // Elegant typographic layout
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PixEnhance Studio', 480, 300);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px monospace';
      ctx.fillText('Test Canvas • 960 × 640 px • Neural Super-Resolution', 480, 345);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'pixenhance-demo-sample.png', { type: 'image/png' });
          const img = new Image();
          img.onload = () => {
            const meta: ImageMeta = {
              name: 'pixenhance-demo-sample.png',
              size: blob.size,
              width: 960,
              height: 640,
              format: 'image/png',
              megapixels: 0.61
            };
            setIsLoadingSample(false);
            onImageLoaded(img, file, meta);
          };
          img.src = URL.createObjectURL(blob);
        }
      }, 'image/png');
    }
  };

  return (
    <div className={`uploader-wrap ${className}`}>
      <div
        className={`upload-dropzone ${isDragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Drop your image here or click to browse"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: 'none' }}
          onChange={handleChange}
        />

        <div className="upload-icon-container">
          <UploadCloud size={38} />
        </div>

        <h3 className="upload-title">
          Drop your image here, <span style={{ color: 'var(--accent-primary)' }}>or click to browse</span>
        </h3>
        <p className="upload-sub">
          Paste directly from clipboard (Ctrl+V) anywhere. All processing executes 100% locally on your machine.
        </p>

        <div className="upload-tags">
          <span className="tag-pill">JPG</span>
          <span className="tag-pill">PNG</span>
          <span className="tag-pill">WebP</span>
          <span className="tag-pill" style={{ color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '3px', verticalAlign: '-1px' }} />
            Zero Cloud Uploads
          </span>
          <span className="tag-pill">Max 100MB</span>
        </div>

        {errorMsg && (
          <div
            style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-rose)',
              background: 'rgba(244, 63, 94, 0.12)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem'
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Demo sample trigger */}
      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={(e) => {
            e.stopPropagation();
            loadSampleImage();
          }}
          disabled={isLoadingSample}
          style={{ fontSize: '0.85rem', gap: '0.45rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}
        >
          <Sparkles size={15} color="var(--accent-primary)" />
          <span>{isLoadingSample ? 'Creating test canvas...' : 'Or test instantly with a demo image'}</span>
        </button>
      </div>
    </div>
  );
};
