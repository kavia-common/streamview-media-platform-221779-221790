import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../api/client';

const VideosCtx = createContext({
  videos: [],
  categories: [],
  category: '',
  setCategory: () => {},
  loading: true
});

// PUBLIC_INTERFACE
export function VideosProvider({ children }) {
  /** Provides videos and categories with filtering by category via query param or state. */
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Sync category with query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || '';
    setCategory(cat);
  }, [location.search]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const [catRes, vidRes] = await Promise.all([
          client.get('/categories'),
          client.get('/videos', { params: category ? { category } : {} }),
        ]);
        if (!mounted) return;
        setCategories((catRes.data || []).map((c) => c.name || c));
        setVideos(vidRes.data || []);
      } catch {
        if (!mounted) return;
        setCategories([]);
        setVideos([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [category]);

  const value = useMemo(() => ({ videos, categories, category, setCategory, loading }), [videos, categories, category, loading]);

  return <VideosCtx.Provider value={value}>{children}</VideosCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useVideos() {
  /** Access videos context for listing and categories. */
  return useContext(VideosCtx);
}
