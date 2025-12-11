import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import History from '../pages/History';
import { AuthProvider } from '../hooks/useAuth';
import * as api from '../api/client';

jest.mock('../api/client');

test('renders history items', async () => {
  api.default = {
    get: jest.fn().mockResolvedValue({ data: [{ id: 1, watched_at: new Date().toISOString(), video: { id: 1, title: 'Clip' } }] })
  };

  render(
    <MemoryRouter initialEntries={['/history']}>
      <AuthProvider>
        <Routes>
          <Route path="/history" element={<History />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText('Clip')).toBeInTheDocument();
});
