import React, { useState } from 'react';
import { BatchItem, PipelineSettings } from '../lib/image-processing/types';
import { ImageProcessor } from '../lib/image-processing/engines/ImageProcessor';
import { ConversionEngine } from '../lib/image-processing/engines/ConversionEngine';
import { Layers, Upload, Play, CheckCircle2, AlertCircle, Trash2, Download } from 'lucide-react';

interface BatchProcessorProps {
  currentSettings: PipelineSettings;
  isOpen: boolean;
  onClose: () => void;
}

export const BatchProcessor: React.FC<BatchProcessorProps> = ({
  currentSettings,
  isOpen,
  onClose
}) => {
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [currentProcessingId, setCurrentProcessingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newItems: BatchItem[] = [];

    Array.from(e.target.files).forEach((file) => {
      const id = Math.random().toString(36).substring(2, 9);
      newItems.push({
        id,
        file,
        meta: {
          name: file.name,
          size: file.size,
          width: 0,
          height: 0,
          format: file.type || 'image/jpeg',
          megapixels: 0
        },
        previewUrl: URL.createObjectURL(file),
        status: 'pending',
        progress: 0
      });
    });

    setItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const runBatchQueue = async () => {
    setIsProcessingQueue(true);

    for (const item of items) {
      if (item.status === 'done') continue;

      setCurrentProcessingId(item.id);
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: 'processing', progress: 10 } : i))
      );

      try {
        // Load image into canvas
        const img = new Image();
        img.src = item.previewUrl;
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        // Execute pipeline
        const result = await ImageProcessor.executePipeline(canvas, currentSettings);

        // Export to Blob
        const blob = await ImageProcessor.exportImage(result.outputCanvas, {
          ...currentSettings.exportConfig,
          width: result.outputCanvas.width,
          height: result.outputCanvas.height
        });

        const outputUrl = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: 'done',
                  progress: 100,
                  outputBlob: blob,
                  outputUrl,
                  outputDimensions: { width: result.outputCanvas.width, height: result.outputCanvas.height }
                }
              : i
          )
        );
      } catch (err) {
        console.error('Batch item failed:', err);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: 'error', error: 'Processing error' } : i
          )
        );
      }
    }

    setCurrentProcessingId(null);
    setIsProcessingQueue(false);
  };

  const downloadAll = () => {
    items.forEach((item) => {
      if (item.outputBlob) {
        const ext = ConversionEngine.getExtensionForFormat(currentSettings.exportConfig.format);
        const nameWithoutExt = item.meta.name.substring(0, item.meta.name.lastIndexOf('.')) || item.meta.name;
        ConversionEngine.downloadBlob(item.outputBlob, `${nameWithoutExt}-pixenhance.${ext}`);
      }
    });
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Batch Processing Queue">
      <div className="modal-card" style={{ maxWidth: '640px', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--accent-primary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
              Batch Processing Queue
            </h3>
          </div>
          <button type="button" className="btn-icon" onClick={onClose}>
            &times;
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Apply current enhance, upscale, and resize settings to multiple images locally in your browser.
        </p>

        {/* Upload Multiple Trigger */}
        <label
          className="upload-dropzone"
          style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: '1.25rem'
          }}
        >
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={handleFilesSelected}
            disabled={isProcessingQueue}
          />
          <Upload size={24} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to Add Multiple Images</span>
        </label>

        {/* Items List */}
        <div style={{ maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: '1.5rem' }}>
              No images queued yet.
            </div>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <img
                    src={it.previewUrl}
                    alt={it.meta.name}
                    style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {it.meta.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {ConversionEngine.formatBytes(it.meta.size)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {it.status === 'done' && <CheckCircle2 size={16} color="var(--accent-emerald)" />}
                  {it.status === 'processing' && <span className="pulsing-dot" />}
                  {it.status === 'error' && <AlertCircle size={16} color="var(--accent-rose)" />}
                  {!isProcessingQueue && (
                    <button
                      type="button"
                      className="btn-icon"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => removeItem(it.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={downloadAll}
            disabled={items.filter((i) => i.status === 'done').length === 0}
            style={{ fontSize: '0.85rem' }}
          >
            <Download size={15} /> Download All Completed
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={runBatchQueue}
            disabled={items.length === 0 || isProcessingQueue}
            style={{ fontSize: '0.85rem' }}
          >
            <Play size={15} /> {isProcessingQueue ? 'Processing Queue...' : 'Start Batch Process'}
          </button>
        </div>
      </div>
    </div>
  );
};
