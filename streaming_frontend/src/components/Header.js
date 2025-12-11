import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import client from '../api/client';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header with brand, search, and auth actions. */
  const { user, setUser } = useAuth();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (q) params.set('q', q);
    else params.delete('q');
    navigate({ pathname: '/', search: params.toString() });
  };

  const logout = async () => {
    try {
      await client.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="brand">
        <span className="dot" />
        <Link to="/" className="link" aria-label="StreamView Home">StreamView</Link>
      </div>

      <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, flex: 1, maxWidth: 640, marginLeft: 8 }}>
        <input
          type="search"
          className="input"
          placeholder="Search videos..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search videos"
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <nav className="header-actions">
        <Link to="/history" className="btn">History</Link>
        {!user ? (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        ) : (
          <>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Hi, {user.username || user.email}</span>
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
