import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders app without crashing and shows Browse heading on home', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  // Header should render brand and home route content "Browse"
  expect(await screen.findByText(/Browse/i)).toBeInTheDocument();
});
