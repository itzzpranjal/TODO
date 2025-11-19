const ensureTrailingSlash = (url) => (url.endsWith('/') ? url : `${url}/`);

const FALLBACK_API_URL = 'http://localhost:3000/';

export const API_BASE_URL = (() => {
  const envUrl = import.meta.env?.VITE_API_URL;
  if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return ensureTrailingSlash(envUrl.trim());
  }
  return ensureTrailingSlash(FALLBACK_API_URL);
})();


