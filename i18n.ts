import i18next from 'i18next'
import enTranslation from './public/locales/en/translation.json'
import deTranslation from './public/locales/de/translation.json'
import trTranslation from './public/locales/tr/translation.json'
import arTranslation from './public/locales/ar/translation.json'

// Initialize a pure i18next instance for Server Components
if (!i18next.isInitialized) {
  i18next.init({
    returnEmptyString: false,
    fallbackLng: 'en',
    defaultNS: 'translation',
    resources: {
      en: { translation: enTranslation },
      de: { translation: deTranslation },
      tr: { translation: trTranslation },
      ar: { translation: arTranslation },
    },
  })
}

export default i18next
