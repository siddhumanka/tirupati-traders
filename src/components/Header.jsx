import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translations } from './translations.jsx';

export default function Header() {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        window.dispatchEvent(new Event('languageChange'));
    }, [language]);

    const t = translations[language];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
            <div className="bg-blue-900 text-white py-2">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-2 text-xs md:text-sm">
                    <div className="flex items-center gap-4 md:gap-6">
                        <a href="tel:+919422163492" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            <span>+91 94221 63492</span>
                        </a>
                        <a href="mailto:dhiraj.manka@gmail.com" className="flex items-center gap-1.5 hover:text-blue-300 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">dhiraj.manka@gmail.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Inside Jawahar gate, Amravati 444601</span>
                        <span className="md:hidden">Amravati, Maharashtra</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <span className="text-white font-bold text-xl md:text-2xl">S</span>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                                {t.siddharthaMarketing}
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">
                                {t.qualitySolutions}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="w-[100px] h-9 border-slate-200">
                                <Globe className="w-4 h-4 mr-1" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="hi">हिंदी</SelectItem>
                                <SelectItem value="mr">मराठी</SelectItem>
                            </SelectContent>
                        </Select>

                        <a
                            href="https://wa.me/919422163492?text=Hi, I'm interested in your Falcofix products. Please share more details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-blue-300"
                        >
                            <Phone className="w-4 h-4" />
                            {t.contactUs}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}