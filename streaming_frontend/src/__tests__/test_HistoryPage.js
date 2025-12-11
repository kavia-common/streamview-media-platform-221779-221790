import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import History from '../pages/History';
import { AuthProvider } from '../hooks/useAuth';
import * as api from '../api/client';

jest.mock('../api/client');

test('renders history items', async () => {
  // Mock axios client get so /history resolves with expected list and does not trigger 401 logic
  api.default = {
    get: jest.fn().mockImplementation((url) => {
      if (url === '/history') {
        return Promise.resolve({
          data: [
            { id: 1, title: 'Clip', watched_at: new Date().toISOString() }
          ]
        });
      }
      return Promise.resolve({ data: {} });
    })
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
