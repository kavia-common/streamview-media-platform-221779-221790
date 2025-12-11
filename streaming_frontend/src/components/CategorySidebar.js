import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVideos } from '../hooks/useVideos';

// PUBLIC_INTERFACE
export default function CategorySidebar() {
  /** Sidebar listing categories and enabling filter by category. */
  const { categories, category, setCategory } = useVideos();
  const navigate = useNavigate();
  const location = useLocation();

  const onSelect = (c) => {
    setCategory(c);
    const params = new URLSearchParams(location.search);
    if (c) params.set('category', c);
    else params.delete('category');
    navigate({ pathname: '/', search: params.toString() });
  };

  return (
    <div>
      <div className="page-header" style={{ padding: '8px 12px' }}>
        <div className="page-title" style={{ fontSize: 14 }}>Categories</div>
      </div>
      <ul className="category-list">
        <li
          className={`category-item ${!category ? 'active' : ''}`}
          onClick={() => onSelect('')}
          role="button"
          tabIndex={0}
          onKeyDown={(e)=>{ if(e.key==='Enter') onSelect('');}}
        >
          <span>All</span>
        </li>
        {categories.map((c) => (
          <li
            key={c}
            className={`category-item ${category === c ? 'active' : ''}`}
            onClick={() => onSelect(c)}
            role="button"
            tabIndex={0}
            onKeyDown={(e)=>{ if(e.key==='Enter') onSelect(c);}}
          >
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
