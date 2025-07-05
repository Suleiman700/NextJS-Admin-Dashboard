'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { languageStorage } from './storage';

interface Translations {
    [key: string]: string;
}

interface TranslationsContextType {
    translations: Translations;
    appLanguages: string[];
    language: string;
    direction: 'ltr' | 'rtl';
    setLanguage: (language: string) => void;
    t: (key: string) => string;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
    const [translations, setTranslations] = useState<Translations>(languageStorage.getTranslations() || {});
    const [appLanguages, setAppLanguages] = useState<string[]>(languageStorage.getAppLanguage() || []);
    const [language, setLanguageState] = useState<string>(languageStorage.getViewLanguage() || 'en');
    const direction = (translations.dir === 'rtl' ? 'rtl' : 'ltr') as 'ltr' | 'rtl';

    useEffect(() => {
        document.documentElement.dir = direction;
    }, [direction]);

    useEffect(() => {
        const initialize = async () => {
            try {
                // 1. Fetch available languages
                const appLanguagesResponse = await fetch('/api/translations?model=getAppLanguages');
                const langData = await appLanguagesResponse.json();
                const availableLangs = langData.appLanguages || [];
                setAppLanguages(availableLangs);
                languageStorage.setAppLanguage(availableLangs);

                // 2. Determine current language
                let currentLang = languageStorage.getViewLanguage();
                if (!currentLang || !availableLangs.includes(currentLang)) {
                    currentLang = availableLangs[0] || 'en';
                    languageStorage.setViewLanguage(currentLang);
                }
                setLanguageState(currentLang);

                // 3. Fetch translations for the current language
                const translationsResponse = await fetch(`/api/translations?model=getTranslations&langCode=${currentLang}`);
                const translationsData = await translationsResponse.json();
                const newTranslations = translationsData.translations || {};
                setTranslations(newTranslations);
                languageStorage.setTranslations(newTranslations);

            } catch (error) {
                console.error('Failed to initialize translations:', error);
            }
        };

        initialize();
    }, []);

    const setLanguage = async (lang: string) => {
        if (appLanguages.includes(lang)) {
            try {
                const translationsResponse = await fetch(`/api/translations?model=getTranslations&langCode=${lang}`);
                const translationsData = await translationsResponse.json();

                setLanguageState(lang);
                languageStorage.setViewLanguage(lang);

                const newTranslations = translationsData.translations || {};
                setTranslations(newTranslations);
                languageStorage.setTranslations(newTranslations);
            } catch (error) {
                console.error(`Failed to fetch translations for ${lang}:`, error);
            }
        }
    };

    const t = (key: string): string => {
        return translations[key] || key;
    };

    return (
        <TranslationsContext.Provider value={{ translations, appLanguages, language, direction, setLanguage, t }}>
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
