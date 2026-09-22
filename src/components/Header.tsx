import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ShieldCheck, Sun, Moon, UploadCloud, Layers } from 'lucide-react';

interface HeaderProps {
  onUploadClick?: () => void;
  onOpenBatch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onUploadClick, onOpenBatch }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('app-theme') as 'dark' | 'light' | null;
    const initial = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('app-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo: PixEnhance */}
        <Link to="/" className="brand-logo" aria-label="PixEnhance Homepage">
          <div className="brand-icon">
            <Sparkles size={18} />
          </div>
          <span className="brand-text">PixEnhance</span>
        </Link>

        {/* Center Navigation */}
        <nav className="nav-links" aria-label="Main Navigation">
          <Link
            to="/image-upscaler"
            className={`nav-link ${location.pathname.includes('upscaler') ? 'active' : ''}`}
          >
            AI Enhance
          </Link>
          <Link
            to="/resize-image"
            className={`nav-link ${location.pathname.includes('resize') ? 'active' : ''}`}
          >
            Resize
          </Link>
          <Link
            to="/image-converter"
            className={`nav-link ${location.pathname.includes('converter') ? 'active' : ''}`}
          >
            Convert
          </Link>
          <Link
            to="/image-editor"
            className={`nav-link ${location.pathname.includes('editor') ? 'active' : ''}`}
          >
            Edit
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          <div className="badge-privacy" title="Your images are processed locally in your browser. We do not upload your images to our servers.">
            <ShieldCheck size={14} />
            <span style={{ display: 'inline-block' }}>100% Local</span>
          </div>

          {onOpenBatch && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onOpenBatch}
              title="Open Batch Queue"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem' }}
            >
              <Layers size={15} color="var(--accent-primary)" />
              <span className="hide-mobile">Batch</span>
            </button>
          )}

          <button
            type="button"
            className="btn-icon"
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onUploadClick}
          >
            <UploadCloud size={16} />
            <span>Upload Image</span>
          </button>
        </div>
      </div>
    </header>
  );
};
