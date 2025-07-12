import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';
import uzTranslation from './locales/uz.json';

const resources = {
  uz: {
    translation: uzTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz', // default language
    fallbackLng: 'uz',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
