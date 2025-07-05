'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languageStorage } from './storage';

interface Translations {
    [key: string]: { [lang: string]: string };
}

interface TranslationsContextType {
    translations: Translations;
    appLanguages: string[];
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string) => string;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
    const [translations, setTranslations] = useState<Translations>(languageStorage.getTranslations() || {});
    const [appLanguages, setAppLanguages] = useState<string[]>([]);
    const [language, setLanguageState] = useState<string>(languageStorage.getAppLanguage() || '');

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const appLanguagesResponse = await fetch('/api/translations?model=getAppLanguages');
                const data = await appLanguagesResponse.json(); // ["en","he","ar"]
                languageStorage.setAppLanguage(data.appLanguages);

                const translationsResponse = await fetch('/api/translations?model=getTranslations');
                const translationsData = await translationsResponse.json();
                languageStorage.setTranslations(translationsData.translations);

            }
            catch (error) {
                console.error('Failed to fetch translations:', error);
            }
        };

        fetchTranslations();
    }, []);

    const setLanguage = (lang: string) => {
        if (appLanguages.includes(lang)) {
            setLanguageState(lang);
            languageStorage.setAppLanguage(lang);
        }
    };

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <TranslationsContext.Provider value={{ translations, appLanguages, language, setLanguage, t }}>
            {children}
        </TranslationsContext.Provider>
    );
};

export const useTranslations = () => {
    const context = useContext(TranslationsContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a TranslationsProvider');
    }
    return context;
};
