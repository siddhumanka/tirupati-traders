// src/Components/utils/index.js
// Utility functions for the app

export function createPageUrl(page, params = {}) {
  let url = `/${page}`;
  const query = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  if (query) url += `?${query}`;
  return url;
}

