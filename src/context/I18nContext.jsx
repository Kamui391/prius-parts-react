import { createContext, useContext, useEffect, useMemo, useState } from "react";
import mn from "../locales/mn.js";
import en from "../locales/en.js";
import { formatDate, formatMoney } from "../utils/format.js";

const dictionaries = { mn, en };
const DEFAULT_LANGUAGE = "mn";
const I18nContext = createContext(null);

function getInitialLanguage() {
  const saved = localStorage.getItem("language");
  return saved in dictionaries ? saved : DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  // Хэл солигдох үед л шинээр үүсэх тул context-ийг хэрэглэж буй component-ууд автоматаар дахин зурагдана
  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setLanguage((current) => (current === "mn" ? "en" : "mn")),
      // t("nav.home") -> dictionaries[хэл].nav.home. Олдохгүй бол замыг өөрийг нь буцаана.
      t: (path) => path.split(".").reduce((node, key) => node?.[key], dictionaries[language]) ?? path,
      formatMoney: (amount) => formatMoney(amount, language),
      formatDate: (isoDate) => formatDate(isoDate, language),
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n нь I18nProvider дотор ашиглагдана");
  return context;
}
