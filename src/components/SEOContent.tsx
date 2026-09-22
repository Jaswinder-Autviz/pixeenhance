import React from 'react';
import { FAQ, DEFAULT_FAQS } from './FAQ';
import { AdSlot } from './AdSlot';
import { Sparkles, Layers, CheckCircle2, Sliders, Shield } from 'lucide-react';

export const SEOContent: React.FC = () => {
  return (
    <div className="seo-content-section">
      <div className="container">
        {/* Banner Ad Placement */}
        <AdSlot type="banner" />

        <div className="seo-content-grid">
          {/* Main Educational Articles */}
          <article className="article-prose">
            <h2>What is Image Upscaling and How Does AI Super-Resolution Work?</h2>
            <p>
              Image upscaling is the process of increasing the pixel dimensions of a digital graphic or photograph.
              Historically, graphics software relied on mathematical interpolation methods such as <strong>Nearest Neighbor</strong>,{' '}
              <strong>Bilinear</strong>, and <strong>Bicubic</strong> interpolation. While these algorithms compute intermediate pixel values,
              they cannot invent details that were lost during capture or downsampling, resulting in blurriness, pixelation, and softened edges.
            </p>
            <p>
              <strong>Deep Learning Super-Resolution (AI Upscaling)</strong> completely revolutionizes this paradigm.
              By utilizing deep convolutional neural networks such as <em>Real-ESRGAN</em>, the neural model has been trained on millions of
              high-frequency image pairs. It learns to recognize natural textures—such as hair strands, fabric weaves, foliage, text glyphs,
              and skin pores—and reconstructs plausible, razor-sharp details that look authentic and crisp at 200% or 400% zoom.
            </p>

            <h2>How to Increase Image Resolution to 4K</h2>
            <p>
              4K resolution represents a canvas of <strong>3840 × 2160 pixels</strong> (or approximately 8.3 megapixels).
              Transforming standard 1080p (1920 × 1080) footage or web photos into high-resolution 4K wallpaper or print assets is straightforward:
            </p>
            <ul>
              <li><strong>Step 1:</strong> Drag and drop your image into the PixEnhance upload canvas.</li>
              <li><strong>Step 2:</strong> In the <em>AI Enhance</em> sidebar, click <strong>Upscale 2×</strong> (for 1080p to 4K) or <strong>Upscale 4×</strong> (for smaller 720p/SD imagery).</li>
              <li><strong>Step 3:</strong> The local WebGPU engine processes tiles asynchronously and doubles or quadruples both axis dimensions.</li>
              <li><strong>Step 4:</strong> Download your pristine, uncompressed PNG or high-quality WebP file.</li>
            </ul>

            <h2>How to Resize an Image Without Losing Quality</h2>
            <p>
              Resizing without distortion requires matching the correct scaling mode to your target canvas:
            </p>
            <ul>
              <li><strong>Fit:</strong> Shrinks or expands the image so the entire photograph fits within the boundary without cropping. Letterbox bars are added if the aspect ratios differ.</li>
              <li><strong>Fill / Crop:</strong> Scales the photo to fill the target dimensions completely, trimming equal margins from the top/bottom or left/right. Ideal for social banners and YouTube thumbnails.</li>
              <li><strong>Stretch:</strong> Forces the image to the exact width and height, ignoring native proportions. Use this only when matching skewed textures.</li>
            </ul>

            <h2>Format Comparison: JPG vs PNG vs WebP</h2>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Format</th>
                    <th>Compression</th>
                    <th>Transparency</th>
                    <th>Best Used For</th>
                    <th>Average Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>WebP</strong></td>
                    <td>Lossy & Lossless</td>
                    <td>Yes (Alpha)</td>
                    <td>Modern websites, responsive apps, web galleries</td>
                    <td>⭐⭐⭐⭐⭐ (Highest)</td>
                  </tr>
                  <tr>
                    <td><strong>PNG</strong></td>
                    <td>Lossless (Deflate)</td>
                    <td>Yes (Full Alpha)</td>
                    <td>Logos, screenshots, UI icons, graphic illustrations</td>
                    <td>⭐⭐⭐ (Large file size)</td>
                  </tr>
                  <tr>
                    <td><strong>JPG / JPEG</strong></td>
                    <td>Lossy (DCT)</td>
                    <td>No</td>
                    <td>Digital photography, legacy print, email attachments</td>
                    <td>⭐⭐⭐⭐ (Good compatibility)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>How to Resize Images for Instagram and Social Media</h2>
            <p>
              Instagram enforces strict maximum width limits (1080 px) and automatically compresses or crops files that do not adhere to their approved aspect ratios:
            </p>
            <ul>
              <li><strong>Square Posts (1:1):</strong> 1080 × 1080 px — standard grid showcase.</li>
              <li><strong>Vertical / Portrait Posts (4:5):</strong> 1080 × 1350 px — occupies the largest vertical area on mobile feeds for maximum engagement.</li>
              <li><strong>Horizontal / Landscape (1.91:1):</strong> 1080 × 566 px — cinematic panoramic posts.</li>
              <li><strong>Stories & Reels (9:16):</strong> 1080 × 1920 px — full-screen vertical video and photography.</li>
            </ul>

            <h2>How to Create YouTube Thumbnails (1280 × 720)</h2>
            <p>
              YouTube recommends an upload resolution of <strong>1280 × 720 pixels</strong> with a minimum width of 640 pixels and an aspect ratio of 16:9.
              Keep file sizes under 2MB. Use our YouTube thumbnail preset with slight saturation (+15%) and sharpness boost to ensure your video stands out in mobile feeds.
            </p>

            <h2>How to Sharpen and Fix Blurry Photos</h2>
            <p>
              Motion blur, lens softness, and aggressive compression can obscure fine details.
              Using our <strong>Unsharp Mask Convolution filter</strong>, PixEnhance identifies micro-contrast transitions and boosts edge separation.
              Combine a <em>Medium Denoise</em> pass (which eliminates background digital grain) with a <em>Low or Medium Sharpen</em> pass to restore professional clarity.
            </p>

            <FAQ items={DEFAULT_FAQS} />
          </article>

          {/* Sidebar Highlights & Ad */}
          <aside>
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <Shield size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Complete Privacy Guarantee</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                All processing takes place privately on your device with zero cloud uploads or tracking.
              </p>
              <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-emerald)" /> No cloud uploads or server storage
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-emerald)" /> Works completely offline
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={15} color="var(--accent-emerald)" /> Zero watermark & unlimited usage
                </li>
              </ul>
            </div>

            <AdSlot type="rectangle" />

            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginTop: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={18} color="var(--accent-primary)" />
                Supported Presets
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div><strong>A4 Print:</strong> 2480 × 3508 px (300 DPI)</div>
                <div><strong>Instagram Portrait:</strong> 1080 × 1350 px</div>
                <div><strong>YouTube Thumb:</strong> 1280 × 720 px</div>
                <div><strong>4K UHD:</strong> 3840 × 2160 px</div>
                <div><strong>Trade Book 6×9:</strong> 1800 × 2700 px</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
