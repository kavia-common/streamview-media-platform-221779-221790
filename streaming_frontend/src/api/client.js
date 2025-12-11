import axios from 'axios';

const envBase =
  process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim() !== ''
    ? process.env.REACT_APP_API_BASE.trim()
    : '';

/**
 * Base URL for API requests.
 *
 * Behavior:
 * - If REACT_APP_API_BASE is set, that absolute URL is used (e.g. "https://api.example.com").
 * - Otherwise, we default to same-origin ('') so that:
 *   - In development, Create React App's "proxy" setting forwards requests to the FastAPI backend.
 *   - In production, a reverse proxy or same-origin deployment can serve both frontend and backend.
 *
 * NOTE:
 * - We intentionally do NOT hard-code "http://localhost:3001" here, because that breaks
 *   when the app is served from a tunneled/remote URL (e.g. codespaces) or over HTTPS.
 */
const BASE_URL = envBase;

const client = axios.create({
  // When BASE_URL is '', axios treats request URLs as relative to the current origin.
  baseURL: BASE_URL || undefined,
  withCredentials: true,
});

// 401 handling: redirect to login
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname !== '/login') {
        const to = '/login';
        window.location.replace(to);
      }
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
export function absoluteUrl(path) {
  /** Build absolute URL to API for usage in <video src> and other places. */
  if (!path.startsWith('/')) path = `/${path}`;
  // If BASE_URL is empty, this returns a same-origin path (e.g. "/stream/1"),
  // which works with the CRA dev proxy or any same-origin deployment.
  return `${BASE_URL}${path}`;
}

export default client;
