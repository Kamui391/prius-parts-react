import { useI18n } from "../context/I18nContext.jsx";
import { REPO_URL } from "../config.js";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="app-footer">
      <div className="container app-footer__inner">
        <p>
          <strong>{t("brand.name")}</strong> · {t("footer.text")} · {new Date().getFullYear()}
        </p>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> {t("footer.github")}
        </a>
      </div>
    </footer>
  );
}
