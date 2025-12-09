// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';

// Wrapper to handle old URL format (ProductDetails?id=xxx) → redirect to /product-details?id=xxx
function LegacyRedirect() {
    const location = useLocation();
    if (location.pathname === '/ProductDetails') {
        return <Navigate to={`/product-details${location.search}`} replace />;
    }
    return null;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* Legacy redirect for old links */}
                    <Route path="/ProductDetails" element={<LegacyRedirect />} />

                    {/* Main routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/product-details" element={<ProductDetails />} />

                    {/* Catch-all redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    </React.StrictMode>
);