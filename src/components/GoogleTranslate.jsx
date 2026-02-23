import React, { useEffect, useState, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'pt', label: 'Português', short: 'PT' },
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'de', label: 'Deutsch', short: 'DE' },
    { code: 'zh-CN', label: '中文', short: 'ZH' },
];

const GoogleTranslate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('es');
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Detectar si el usuario ya tiene un idioma configurado en cookies de Google
        const match = document.cookie.match(/googtrans=\/es\/([^;]+)/);
        if (match && match[1]) {
            setCurrentLang(match[1]);
        } else {
            // Auto detectar del navegador
            const userLang = navigator.language || navigator.userLanguage;
            const langCode = userLang?.split('-')[0] || 'es';
            if (langCode !== 'es') {
                setCurrentLang(langCode);
                document.cookie = `googtrans=/es/${langCode}; path=/`;
                document.cookie = `googtrans=/es/${langCode}; path=/; domain=.${window.location.hostname}`;
            }
        }

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'es', autoDisplay: false },
                'google_translate_element'
            );
        };

        if (!document.querySelector('script[src*="translate.google.com"]')) {
            const addScript = document.createElement('script');
            addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            addScript.async = true;
            document.body.appendChild(addScript);
        }

        // Click outside para cerrar
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (langCode) => {
        setCurrentLang(langCode);
        setIsOpen(false);

        // Cambiar valor en la herramienta invisible de Google Translate
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
            selectElement.value = langCode;
            selectElement.dispatchEvent(new Event('change'));
        } else {
            // Fallback: usar cookie y recargar si el select de google no cargó aún
            document.cookie = `googtrans=/es/${langCode}; path=/`;
            document.cookie = `googtrans=/es/${langCode}; path=/; domain=.${window.location.hostname}`;
            window.location.reload();
        }
    };

    const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || { short: currentLang.toUpperCase(), label: currentLang };

    return (
        <div className="relative flex items-center z-50 text-inherit" ref={dropdownRef}>
            {/* Widget oculto de Google - no lo borramos porque es necesario para que funcione */}
            <div id="google_translate_element" className="fixed -top-96 opacity-0 pointer-events-none"></div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors flex items-center gap-1.5 focus:outline-none"
                title="Cambiar idioma"
            >
                <Globe className="w-5 h-5" />
                <span className="font-semibold text-sm tracking-wide">
                    {currentLangObj.short}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-12 right-0 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-black/10 border border-slate-100 dark:border-slate-700 overflow-hidden"
                    >
                        <div className="py-2">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between ${currentLang === lang.code
                                        ? 'text-primary font-bold bg-primary/5'
                                        : 'text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    <span>{lang.label}</span>
                                    <span className={`text-xs ${currentLang === lang.code ? 'text-primary' : 'text-slate-400'}`}>
                                        {lang.short}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS para ocultar el banner de Google como antes */}
            <style>{`
                .skiptranslate iframe, .goog-te-banner-frame.skiptranslate { display: none !important; }
                body { top: 0px !important; }
                .goog-logo-link { display: none !important; }
                .goog-te-gadget { color: transparent !important; font-size: 0px !important; }
                .goog-te-gadget span { display: none !important; }
            `}</style>
        </div>
    );
};

export default GoogleTranslate;
