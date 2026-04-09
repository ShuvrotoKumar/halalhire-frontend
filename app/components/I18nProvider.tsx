'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import trTranslation from '../../public/locales/tr/translation.json';
import arTranslation from '../../public/locales/ar/translation.json';

import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next for the client
if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      returnEmptyString: false,
      fallbackLng: 'en',
      defaultNS: 'translation',
      resources: {
        en: { translation: enTranslation },
        de: { translation: deTranslation },
        tr: { translation: trTranslation },
        ar: { translation: arTranslation },
      },
      detection: {
        order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie'],
      },
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}
