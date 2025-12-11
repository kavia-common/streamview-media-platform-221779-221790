import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CategorySidebar from '../components/CategorySidebar';
import { VideosProvider } from '../hooks/useVideos';

test('renders CategorySidebar with header', () => {
  render(
    <MemoryRouter>
      <VideosProvider>
        <CategorySidebar />
      </VideosProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/Categories/i)).toBeInTheDocument();
});
