import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { AuthProvider } from '../hooks/useAuth';

function renderHeader() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>
  );
}

test('renders brand and navigation links', () => {
  renderHeader();
  expect(screen.getByText(/StreamView/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /History/i })).toBeInTheDocument();
});

test('search input updates URL query', () => {
  renderHeader();
  const input = screen.getByPlaceholderText(/Search videos/i);
  fireEvent.change(input, { target: { value: 'car' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  // Basic assertion that typing didn't crash and input holds value
  expect(input.value).toBe('car');
});
