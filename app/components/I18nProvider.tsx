'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import trTranslation from '../../public/locales/tr/translation.json';
import arTranslation from '../../public/locales/ar/translation.json';

let isInitialized = false;

export function I18nProvider({ children, initialLocale = 'en' }: { children: React.ReactNode, initialLocale?: string }) {
  if (!isInitialized) {
    i18next
      .use(initReactI18next)
      .init({
        lng: initialLocale,
        fallbackLng: 'en',
        defaultNS: 'translation',
        resources: {
          en: { translation: enTranslation },
          de: { translation: deTranslation },
          tr: { translation: trTranslation },
          ar: { translation: arTranslation },
        },
        interpolation: {
          escapeValue: false, // react already safes from xss
        },
      });
    isInitialized = true;
  }

  // Ensure language matches the server's initialLocale during SSR and fast refresh
  if (i18next.language !== initialLocale) {
     if (typeof window === 'undefined') {
        i18next.changeLanguage(initialLocale);
     }
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}
