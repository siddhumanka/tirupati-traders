import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Package } from "lucide-react";
import { motion } from "framer-motion";
import { translations } from './translations.jsx';

export default function ProductCard({ product, allProducts = [] }) {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(localStorage.getItem('language') || 'en');
        };
        window.addEventListener('languageChange', handleLanguageChange);
        return () => window.removeEventListener('languageChange', handleLanguageChange);
    }, []);

    const t = translations[language];
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);

    const formatWeight = (weight) => {
        if (weight < 1) return `${weight * 1000}g`;
        return `${weight} KG`;
    };

    // Get all sizes for this product
    const variants = allProducts.filter(p => p.title === product.title);
    const sizeRange = variants.length > 1
        ? `${formatWeight(Math.min(...variants.map(v => v.weight)))} - ${formatWeight(Math.max(...variants.map(v => v.weight)))}`
        : formatWeight(product.weight);

    const priceRange = variants.length > 1
        ? `₹${Math.min(...variants.map(v => v.sale_price)).toLocaleString('en-IN')} - ₹${Math.max(...variants.map(v => v.sale_price)).toLocaleString('en-IN')}`
        : `₹${product.sale_price.toLocaleString('en-IN')}`;

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in ${product.title}. Please share more details.`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl">
                <Link to={createPageUrl(`ProductDetails?id=${product.product_id}`)} className="block">
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="aspect-square p-6 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                crossOrigin="anonymous"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {variants.length > 1 && (
                            <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-full">
                                {variants.length} Sizes
                            </Badge>
                        )}
                        {discount > 0 && variants.length === 1 && (
                            <Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1 rounded-full">
                                {discount}% OFF
                            </Badge>
                        )}
                    </div>
                </Link>

                <div className="p-5 space-y-4">
                    <Link to={createPageUrl(`ProductDetails?id=${product.product_id}`)} className="block">
                        <div className="mb-3">
                            <Badge variant="outline" className="border-blue-200 text-blue-700 mb-2">
                                {product.brand || 'Falcofix'}
                            </Badge>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                {product.product_id}
                            </p>
                            <h3 className="text-lg font-semibold text-slate-800 leading-tight hover:text-blue-600 transition-colors">
                                {product.title}
                            </h3>
                        </div>
                    </Link>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-500 font-medium">
                                {variants.length > 1 ? `${t.sizes}: ${sizeRange}` : `${t.size}: ${sizeRange}`}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-slate-900">
                                {priceRange}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            asChild
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-medium shadow-lg shadow-blue-200"
                        >
                            <Link to={createPageUrl(`ProductDetails?id=${product.product_id}`)}>
                                {t.viewDetails}
                            </Link>
                        </Button>
                        <Button
                            asChild
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 px-4"
                        >
                            <a
                                href={`https://wa.me/919422163492?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}