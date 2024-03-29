// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import fa from "./translations/fa.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
