import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form that posts to /auth/login and sets user via /auth/me */
  const { setUser, refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await client.post('/auth/login', { email, password });
      const u = await refreshUser();
      setUser(u);
      navigate(from, { replace: true });
    } catch (e) {
      setErr('Invalid credentials');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card" role="main" aria-label="Login">
      <h1 className="page-title">Login</h1>
      <form onSubmit={submit}>
        <div className="form-field">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="label" htmlFor="password">Password</label>
          <input id="password" className="input" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {err && <div className="helper" style={{ color: 'var(--danger)' }}>{err}</div>}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Signing in...' : 'Login'}</button>
          <Link className="btn" to="/register">Create account</Link>
        </div>
      </form>
    </div>
  );
}
