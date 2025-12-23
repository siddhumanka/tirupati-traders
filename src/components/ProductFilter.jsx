import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProductFilter({ activeFilter, setActiveFilter, activeBrand, setActiveBrand }) {
    const brands = [
        { id: 'all', label: 'All Brands' },
        { id: 'Falcofix', label: 'Falcofix' },
        { id: 'Bluecoat', label: 'Bluecoat' },
    ];

    const filterOptions = {
        Falcofix: [
            { id: 'all', label: 'All Products' },
            { id: 'wr', label: 'Falcofix WR' },
            { id: 'um', label: 'Ultra Marine' },
            { id: 'ebs', label: 'Falcofix EBS' },
            { id: 'fb', label: 'Falco Bond' },
            { id: 'wrgold', label: 'WR Gold' },
        ],
        Bluecoat: [
            { id: 'all', label: 'All Products' },
            { id: 'd3', label: 'Bluecoat D3' },
            { id: 'marine', label: 'Bluecoat Marine' },
        ],
    };

    const filters = filterOptions[activeBrand] || [];

    return (
        <div className="space-y-4">
            {/* Brand Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {brands.map((brand) => (
                    <Button
                        key={brand.id}
                        onClick={() => {
                            setActiveBrand(brand.id);
                            setActiveFilter('all');
                        }}
                        variant={activeBrand === brand.id ? "default" : "outline"}
                        className={`
                            rounded-full px-5 md:px-6 py-2 font-medium transition-all duration-300
                            ${activeBrand === brand.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-300'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }
                        `}
                    >
                        {brand.label}
                    </Button>
                ))}
            </div>

            {/* Product Type Filter (only for Falcofix) */}
            {filters.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {filters.map((filter) => (
                        <Button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            variant={activeFilter === filter.id ? "default" : "outline"}
                            className={`
                                rounded-full px-5 md:px-6 py-2 font-medium transition-all duration-300
                                ${activeFilter === filter.id
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-300'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                            }
                            `}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}