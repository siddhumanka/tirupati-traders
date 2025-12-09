// src/utils.js
export const createPageUrl = (path) => {
    if (path.includes('?')) {
        const [page, query] = path.split('?');
        if (page === 'Home') return `/?${query}`;
        if (page === 'ProductDetails') return `/product-details?${query}`;
        return `/${page.toLowerCase()}?${query}`;
    }
    return path === 'Home' ? '/' : `/${path.toLowerCase()}`;
};