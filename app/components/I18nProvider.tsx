'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json';
import deTranslation from '../../public/locales/de/translation.json';
import trTranslation from '../../public/locales/tr/translation.json';
import arTranslation from '../../public/locales/ar/translation.json';

export function I18nProvider({ children, initialLocale = 'en' }: { children: React.ReactNode, initialLocale?: string }) {
  const [i18nInstance] = useState(() => {
    const instance = i18next.createInstance();
    instance
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
    return instance;
  });

  useEffect(() => {
    if (i18nInstance.language !== initialLocale) {
      i18nInstance.changeLanguage(initialLocale);
    }
  }, [initialLocale, i18nInstance]);

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}
