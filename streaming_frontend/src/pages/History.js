import React, { useEffect, useState } from 'react';
import client from '../api/client';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

// PUBLIC_INTERFACE
export default function History() {
  /** Fetches user watch history and displays as a grid. */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await client.get('/history');
        if (mounted) setItems(res.data || []);
      } catch {
        // ignore; global 401 handler will redirect
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="centered">Loading history...</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">History</div>
        <div className="helper">{items.length} items</div>
      </div>
      <div className="grid">
        {items.map((v) => (
          <VideoCard key={v.id || v.video_id} video={v} onClick={setActive} />
        ))}
      </div>
      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </div>
  );
}
