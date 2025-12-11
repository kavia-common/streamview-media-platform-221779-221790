import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { VideosProvider, useVideos } from '../hooks/useVideos';
import * as api from '../api/client';

jest.mock('../api/client');

test('useAuth loads current user', async () => {
  api.default = { get: jest.fn().mockResolvedValue({ data: { id: 1, email: 'me@me.com' } }) };
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { result } = renderHook(() => useAuth(), { wrapper });
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.user?.email).toBe('me@me.com');
});

test('useVideos loads categories and videos', async () => {
  api.default = {
    get: jest.fn()
      .mockResolvedValueOnce({ data: [{ id: 1, name: 'Action' }] }) // /categories
      .mockResolvedValueOnce({ data: [{ id: 2, title: 'Clip', categories: [] }] }) // /videos
  };
  const wrapper = ({ children }) => <VideosProvider>{children}</VideosProvider>;
  const { result } = renderHook(() => useVideos(), { wrapper });
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.categories.length).toBe(1);
  expect(result.current.videos.length).toBe(1);
});
