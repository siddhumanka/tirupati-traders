import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { translations } from './translations.jsx';

export default function Footer() {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(localStorage.getItem('language') || 'en');
        };
        window.addEventListener('languageChange', handleLanguageChange);
        return () => window.removeEventListener('languageChange', handleLanguageChange);
    }, []);

    const t = translations[language];
    return (
        <footer className="bg-blue-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t.siddharthaMarketing}</h3>
                                <p className="text-sm text-slate-400">{t.since}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {t.trustedPartner}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{t.contactInformation}</h4>
                        <div className="space-y-3">
                            <a href="tel:+919422163492" className="flex items-center gap-3 text-slate-300 hover:text-blue-300 transition-colors">
                                <Phone className="w-5 h-5" />
                                <span>+91 94221 63492</span>
                            </a>
                            <a href="mailto:dhiraj.manka@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-blue-300 transition-colors">
                                <Mail className="w-5 h-5" />
                                <span>dhiraj.manka@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-slate-300">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>Inside Jawahar gate,<br />Amravati 444601, Maharashtra</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">{t.getInTouch}</h4>
                        <p className="text-slate-400 text-sm">
                            {t.haveQuestions}
                        </p>
                        <a
                            href="https://wa.me/919422163492?text=Hi, I'm interested in your Falcofix products. Please share more details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                            {t.chatOnWhatsApp}
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400 text-sm">
                    <p>© {new Date().getFullYear()} {t.siddharthaMarketing}. {t.allRightsReserved}.</p>
                </div>
            </div>
        </footer>
    );
}