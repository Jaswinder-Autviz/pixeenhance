import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="breadcrumbs-nav">
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={13} style={{ opacity: 0.5 }} />
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
