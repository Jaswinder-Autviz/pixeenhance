import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-columns">
          {/* Column 1: Brand & Description */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">
                <Sparkles size={18} />
              </div>
              <span className="brand-text">PixEnhance</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '320px' }}>
              The modern online image suite for high-resolution upscaling, enhancement, resizing, and format conversion.
            </p>
            <div className="badge-privacy">
              <ShieldCheck size={14} />
              <span>Complete Privacy Guarantee</span>
            </div>
          </div>

          {/* Column 2: Tools */}
          <div>
            <h4 className="footer-header">Tools</h4>
            <ul className="footer-nav-list">
              <li><Link to="/image-upscaler">AI Image Upscaler</Link></li>
              <li><Link to="/image-upscaler-2x">Upscale 2×</Link></li>
              <li><Link to="/image-upscaler-4x">Upscale 4×</Link></li>
              <li><Link to="/face-enhancer">Face Enhancer</Link></li>
              <li><Link to="/resize-image">Image Resizer</Link></li>
              <li><Link to="/image-converter">Format Converter</Link></li>
              <li><Link to="/image-editor">Studio Editor</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="footer-header">Resources</h4>
            <ul className="footer-nav-list">
              <li><Link to="/resize-image-to-a4">A4 Print Guidelines</Link></li>
              <li><Link to="/resize-image-for-instagram">Instagram Sizing Guide</Link></li>
              <li><Link to="/youtube-thumbnail-maker">YouTube Thumbnail Specs</Link></li>
              <li><Link to="/webp-converter">WebP vs PNG vs JPG</Link></li>
              <li><Link to="/image-sharpener">Sharpening Documentation</Link></li>
              <li><Link to="/image-denoiser">Noise Reduction Guide</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="footer-header">Company</h4>
            <ul className="footer-nav-list">
              <li><a href="#about" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About PixEnhance</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Zero-Log Privacy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Terms of Service</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer">Open Source AI Tech</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} PixEnhance. All image processing occurs strictly on your device.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Made for creators with</span>
            <Heart size={14} color="var(--accent-pink)" fill="var(--accent-pink)" />
          </div>
        </div>
      </div>
    </footer>
  );
};
