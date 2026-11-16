const defaultApiBaseUrl = import.meta.env.PROD ? 'https://backend-aerius.vercel.app' : '';
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/+$/, '');

export const apiUrl = (path) => `${apiBaseUrl}/${path.replace(/^\/+/, '')}`;
