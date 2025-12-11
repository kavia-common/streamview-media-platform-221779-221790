import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AuthProvider } from '../hooks/useAuth';
import * as api from '../api/client';

jest.mock('../api/client');

test('login submits and navigates', async () => {
  api.default = {
    post: jest.fn()
      .mockResolvedValueOnce({ data: { id: 1, email: 'a@a.com' } }) // /auth/login
      .mockResolvedValue({ data: { id: 1, email: 'a@a.com' } }),    // /auth/me after
    get: jest.fn().mockResolvedValue({ data: { id: 1, email: 'a@a.com' } })
  };

  render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@a.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret123' } });
  fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => expect(api.default.post).toHaveBeenCalled());
});

test('register submits', async () => {
  api.default = { post: jest.fn().mockResolvedValue({ data: { id: 2, email: 'b@b.com' } }) };

  render(
    <MemoryRouter initialEntries={['/register']}>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'b@b.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secret123' } });
  fireEvent.submit(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(api.default.post).toHaveBeenCalled());
});
