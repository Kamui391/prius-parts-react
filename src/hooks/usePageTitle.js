import { useEffect } from "react";
import { useI18n } from "../context/I18nContext.jsx";

// Хөтчийн табны гарчгийг хуудас, хэлээр нь шинэчилнэ
export function usePageTitle(titleKey) {
  const { t } = useI18n();

  useEffect(() => {
    document.title = `${t(titleKey)} · Prius Parts`;
  }, [t, titleKey]);
}
