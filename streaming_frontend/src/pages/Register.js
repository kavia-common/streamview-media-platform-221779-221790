import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form posting to /auth/register followed by login flow. */
  const { setUser, refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await client.post('/auth/register', { email, username, password });
      await client.post('/auth/login', { email, password });
      const u = await refreshUser();
      setUser(u);
      navigate('/', { replace: true });
    } catch (e) {
      setErr('Could not register. Try a different email/username.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="page-title">Create account</h1>
      <form onSubmit={submit}>
        <div className="form-field">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="label" htmlFor="username">Username</label>
          <input id="username" className="input" type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="label" htmlFor="password">Password</label>
          <input id="password" className="input" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        {err && <div className="helper" style={{ color: 'var(--danger)' }}>{err}</div>}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Creating...' : 'Register'}</button>
          <Link className="btn" to="/login">Back to login</Link>
        </div>
      </form>
    </div>
  );
}
