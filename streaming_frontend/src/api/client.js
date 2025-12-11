import axios from 'axios';

const DEFAULT_BASE = 'http://localhost:3001';

const BASE_URL = process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim() !== ''
  ? process.env.REACT_APP_API_BASE
  : DEFAULT_BASE;

const client = axios.create({
  baseURL: BASE_URL,
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
  /** Build absolute URL to API for usage in <video src>. */
  if (!path.startsWith('/')) path = `/${path}`;
  return `${BASE_URL}${path}`;
}

export default client;
