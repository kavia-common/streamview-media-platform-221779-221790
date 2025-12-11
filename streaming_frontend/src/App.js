import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Layout wrapper to include header and sidebar around main content
function ShellLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <aside className="sidebar">
          <CategorySidebar />
        </aside>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

// Route guard that redirects to login when unauthenticated
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="centered">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ShellLayout>
                <Home />
              </ShellLayout>
            }
          />
          <Route
            path="/history"
            element={
              <ShellLayout>
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              </ShellLayout>
            }
          />
          <Route path="/login" element={<Login onSwitchTheme={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
