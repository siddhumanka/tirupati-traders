import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../components/utils';
import { Button } from '../components/ui/button';
import { translations } from '../components/translations.jsx';
import Papa from 'papaparse';

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeBrand, setActiveBrand] = useState('all');
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Papa.parse('/products.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                setProducts(results.data);
                setIsLoading(false);
            },
            error: () => setIsLoading(false),
        });
    }, []);

    const t = translations[language];
    const filteredProducts = products.filter(product => {
        // Brand filter
        const brandMatch = activeBrand === 'all' || product.brand === activeBrand;

        // Product type filter (only for Falcofix brand)
        let typeMatch = true;
        if (activeBrand === 'Falcofix' && activeFilter !== 'all') {
            if (activeFilter === 'wr') typeMatch = product.title === 'Falcofix WR';
            if (activeFilter === 'um') typeMatch = product.title === 'Falcofix Ultra Marine';
            if (activeFilter === 'ebs') typeMatch = product.title === 'Falcofix EBS';
            if (activeFilter === 'wrgold') typeMatch = product.title === 'Falcofix WR Gold';
        }

        return brandMatch && typeMatch;
    });

    // Group products by title and show only one card per product type
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        if (!acc[product.title]) {
            acc[product.title] = [];
        }
        acc[product.title].push(product);
        return acc;
    }, {});

    // Get one representative product per title (smallest size)
    const sortedProducts = Object.values(groupedProducts).map(variants => {
        return variants.sort((a, b) => a.weight - b.weight)[0];
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        {t.premiumQuality}
                    </span>

                    {/* Brand Logos */}
                    {activeBrand === 'Falcofix' && (
                        <div className="flex items-center justify-center gap-6 mb-6">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69355685b7ba1c4a22697f76/8cead059c_pidilite-logo-1.png"
                                alt="Pidilite"
                                crossOrigin="anonymous"
                                className="h-16 md:h-20 object-contain"
                            />
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69355685b7ba1c4a22697f76/c45c91ab2_falcofix-brand.jpg"
                                alt="Falcofix"
                                crossOrigin="anonymous"
                                className="h-16 md:h-20 object-contain"
                            />
                        </div>
                    )}

                    {activeBrand === '3M' && (
                        <div className="flex items-center justify-center mb-6">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69355685b7ba1c4a22697f76/b35f79d2b_3mlogo.png"
                                alt="3M"
                                crossOrigin="anonymous"
                                className="h-16 md:h-20 object-contain"
                            />
                        </div>
                    )}

                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        {activeBrand === 'all' ? t.ourInventory :
                            activeBrand === 'Falcofix' && activeFilter === 'all' ? t.falcofixRange :
                                activeBrand === 'Falcofix' && activeFilter === 'wr' ? t.falcofixWR :
                                    activeBrand === 'Falcofix' && activeFilter === 'um' ? t.falcofixUM :
                                        activeBrand === 'Falcofix' && activeFilter === 'ebs' ? t.falcofixEBS :
                                            activeBrand === 'Falcofix' && activeFilter === 'wrgold' ? t.falcofixWRGold :
                                                activeBrand === '3M' ? t.threeMProducts :
                                                    t.otherProducts}
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        {activeBrand === 'all'
                            ? t.browseInventory
                            : activeBrand === 'Falcofix' && activeFilter === 'all'
                                ? t.industrialGrade
                                : t.selectSize}
                    </p>
                </motion.div>

                {/* Filter */}
                <div className="mb-8 md:mb-10">
                    <ProductFilter
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        activeBrand={activeBrand}
                        setActiveBrand={setActiveBrand}
                    />
                </div>

                {/* Products Grid */}
                {sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Package className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">
                            {activeBrand === 'Falcofix' && activeFilter === 'others'
                                ? t.noProducts
                                : activeBrand === '3M' || activeBrand === 'Others'
                                    ? t.comingSoon
                                    : t.noProducts}
                        </p>
                        <Link to={createPageUrl('Home')}>
                            <Button
                                className="mt-4 bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                    setActiveBrand('all');
                                    setActiveFilter('all');
                                }}
                            >
                                {t.viewAllProducts}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
                    >
                        {sortedProducts.map((product, index) => (
                            <motion.div
                                key={product.product_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} allProducts={products} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Stats Section */}
                {activeBrand === 'all' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    >
                        {[
                            { value: '25+', label: t.yearsExperience },
                            { value: '500+', label: t.happyClients },
                            { value: `${products.length}`, label: t.productVariants },
                            { value: '100%', label: t.qualityAssured }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}