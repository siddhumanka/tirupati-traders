import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {createPageUrl} from '../components/utils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import {Button} from "../components/ui/button";
import {Badge} from "../components/ui/badge";
import {Card} from "../components/ui/card";
import {Select, SelectItem} from "../components/ui/select";
import {ArrowLeft, CheckCircle, Info, MessageCircle, Package, Phone} from 'lucide-react';
import {motion} from 'framer-motion';
import Papa from "papaparse";

export default function ProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const [allProducts, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // <-- missing state

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

    const product = allProducts.find(p => p.product_id === productId);

    // Get all variants (same title, different types)
    const variants = allProducts
        .filter(p => product && p.title === product.title)
        .sort((a, b) => a.weight - b.weight);

    const [selectedType, setSelectedType] = useState(productId);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <Header/>
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h2>
                    <Link to={createPageUrl('Home')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back to Products
                        </Button>
                    </Link>
                </div>
                <Footer/>
            </div>
        );
    }

    const selectedProduct = variants.find(p => p.product_id === selectedType) || product;
    const discount = Math.round(((selectedProduct.price - selectedProduct.sale_price) / selectedProduct.price) * 100);

    const formatWeight = (type) => {
        if (type < 1) return `${type * 1000}`;
        return `${type}`;
    };

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in ${selectedProduct.title} (${formatWeight(selectedProduct.weight)}) - SKU: ${selectedProduct.product_id}. Price: ₹${selectedProduct.sale_price}. Please share more details.`
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Header/>

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <Link to={createPageUrl('Home')}>
                    <Button variant="ghost" className="mb-6 hover:bg-blue-50">
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Products
                    </Button>
                </Link>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Product Image */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                    >
                        <Card className="overflow-hidden bg-white border-0 shadow-xl rounded-2xl sticky top-24">
                            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    crossOrigin="anonymous"
                                    className="w-full h-auto object-contain"
                                />
                                {discount > 0 && (
                                    <Badge
                                        className="absolute top-6 left-6 bg-emerald-500 text-white font-bold px-4 py-2 rounded-full text-base">
                                        {discount}% OFF
                                    </Badge>
                                )}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="space-y-6"
                    >
                        <div>
                            <Badge variant="outline" className="border-blue-200 text-blue-700 mb-3 px-3 py-1">
                                {selectedProduct.brand || 'Falcofix'}
                            </Badge>
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">
                                SKU: {selectedProduct.product_id}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {selectedProduct.title}
                            </h1>
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-4xl font-bold text-slate-900">
                                    ₹{selectedProduct.sale_price.toLocaleString('en-IN')}
                                </span>
                                {selectedProduct.price !== selectedProduct.sale_price && (
                                    <span className="text-xl text-slate-400 line-through">
                                        ₹{selectedProduct.price.toLocaleString('en-IN')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Type Selector */}
                        {variants.length > 1 && (
                            <Card className="p-6 bg-blue-50 border-blue-100">
                                <label
                                    className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4"/>
                                    Select Type
                                </label>
                                <Select value={selectedType} onValueChange={setSelectedType} className="w-full bg-white border-blue-200 h-12 text-base">
                                    {variants.map((variant) => (
                                        <SelectItem key={variant.product_id} value={variant.product_id} className="text-base py-3">
                                            {formatWeight(variant.weight)} — ₹{typeof variant.sale_price === 'number' ? variant.sale_price.toLocaleString('en-IN') : 'N/A'}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </Card>
                        )}

                        {/* Product Details */}
                        <Card className="p-6">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-600"/>
                                Product Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Type</span>
                                    <span className="font-semibold">{formatWeight(selectedProduct.weight)}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Product Type</span>
                                    <span className="font-semibold capitalize">{selectedProduct.product_type}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-slate-600">Brand</span>
                                    <span className="font-semibold">{selectedProduct.brand || 'Falcofix'}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Features */}
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
                            <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                            <div className="space-y-3">
                                {[
                                    'High-quality industrial adhesive',
                                    'Strong bonding performance',
                                    'Suitable for various applications',
                                    'Trusted by professionals'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"/>
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                asChild
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white h-14 text-base rounded-xl font-semibold shadow-lg shadow-green-200"
                            >
                                <a
                                    href={`https://wa.me/919422163492?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2"/>
                                    WhatsApp Inquiry
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-14 text-base rounded-xl font-semibold"
                            >
                                <a href="tel:+919422163492">
                                    <Phone className="w-5 h-5 mr-2"/>
                                    Call Now
                                </a>
                            </Button>
                        </div>

                        {/* Contact Info */}
                        <Card className="p-6 bg-slate-50">
                            <h3 className="font-semibold mb-3">Need Help?</h3>
                            <p className="text-slate-600 text-sm mb-3">
                                Contact us for pricing, bulk orders, or any questions about this product.
                            </p>
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center gap-2 text-slate-700">
                                    <Phone className="w-4 h-4 text-blue-600"/>
                                    <a href="tel:+919422163492" className="hover:text-blue-600">+91 94221 63492</a>
                                </p>
                                <p className="flex items-center gap-2 text-slate-700">
                                    <MessageCircle className="w-4 h-4 text-green-600"/>
                                    Available on WhatsApp
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Related Products */}
                {variants.length > 1 && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.3}}
                        className="mt-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                            Available Types
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {variants.map((variant) => (
                                <Card
                                    key={variant.product_id}
                                    onClick={() => setSelectedType(variant.product_id)}
                                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                        variant.product_id === selectedType
                                            ? 'ring-2 ring-blue-600 bg-blue-50'
                                            : 'hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="text-center">
                                        <Package className={`w-8 h-8 mx-auto mb-2 ${
                                            variant.product_id === selectedType ? 'text-blue-600' : 'text-slate-400'
                                        }`}/>
                                        <p className="font-bold text-slate-900 mb-1">
                                            {formatWeight(variant.weight)}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                            ₹{variant.sale_price.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>

            <Footer/>
        </div>
    );
}