import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { VideosProvider } from '../hooks/useVideos';
import * as api from '../api/client';

jest.mock('../api/client');

test('renders home with grid heading', async () => {
  api.default = { get: jest.fn().mockResolvedValue({ data: [] }) };
  render(
    <MemoryRouter initialEntries={['/']}>
      <VideosProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </VideosProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText(/Browse/i)).toBeInTheDocument();
});
