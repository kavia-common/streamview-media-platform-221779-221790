import React from 'react';

// PUBLIC_INTERFACE
export default function VideoCard({ video, onClick }) {
  /** Small card showing video thumbnail, title and meta. */
  const title = video.title || 'Untitled';
  const thumb = video.thumbnail_url || video.thumb || '';
  const category = video.category || video.category_name || 'General';
  const duration = video.duration || '';

  return (
    <div className="card" onClick={() => onClick(video)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') onClick(video);}}>
      {/* Placeholder thumb area when no image */}
      {thumb ? (
        <img src={thumb} alt={title} className="card-thumb" />
      ) : (
        <div className="card-thumb" aria-hidden="true" />
      )}
      <div className="card-body">
        <div className="card-title" title={title}>{title}</div>
        <div className="card-meta">{category}{duration ? ` • ${duration}` : ''}</div>
      </div>
    </div>
  );
}
