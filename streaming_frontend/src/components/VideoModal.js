import React, { useEffect, useRef } from 'react';
import client, { absoluteUrl } from '../api/client';

// PUBLIC_INTERFACE
export default function VideoModal({ video, onClose }) {
  /** Modal wrapping an HTML5 <video> element using backend /stream/{id} */
  const ref = useRef(null);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!video) return null;

  // Build absolute URL for streaming endpoint
  const src = absoluteUrl(`/stream/${encodeURIComponent(video.id || video.video_id)}`);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Playing ${video.title}`}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{video.title}</div>
          <button className="btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <video
            ref={ref}
            style={{ width: '100%', height: 'auto', background: '#000' }}
            controls
            preload="metadata"
            src={src}
            onPlay={async () => {
              // notify backend history endpoint
              try {
                await client.post(`/history/${encodeURIComponent(video.id || video.video_id)}`);
              } catch {
                // ignore
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
