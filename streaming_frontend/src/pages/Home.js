import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideosProvider, useVideos } from '../hooks/useVideos';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';

function HomeInner() {
  const { videos, loading } = useVideos();
  const [params] = useSearchParams();
  const [active, setActive] = useState(null);

  const q = params.get('q') || '';
  const filtered = useMemo(() => {
    if (!q) return videos;
    const qq = q.toLowerCase();
    return videos.filter(
      (v) =>
        (v.title && v.title.toLowerCase().includes(qq)) ||
        (v.description && v.description.toLowerCase().includes(qq))
    );
  }, [q, videos]);

  if (loading) {
    return <div className="centered">Loading videos...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Browse</div>
        <div className="helper">{filtered.length} results</div>
      </div>
      <div className="grid">
        {filtered.map((v) => (
          <VideoCard key={v.id || v.video_id} video={v} onClick={setActive} />
        ))}
      </div>

      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function Home() {
  /** Browse page wrapped with VideosProvider to provide categories and list. */
  return (
    <VideosProvider>
      <HomeInner />
    </VideosProvider>
  );
}
