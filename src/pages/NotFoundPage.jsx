import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import Page from "../components/Page.jsx";
import Section from "../components/Section.jsx";

export default function NotFoundPage() {
  const { t } = useI18n();

  return (
    <Page titleKey="notFound.title">
      <Section>
        <div className="app-404">
          <p className="app-404__code">{t("notFound.title")}</p>
          <p className="app-card__text mb-5">{t("notFound.text")}</p>
          <Link className="button app-btn app-btn--solid" to="/home">
            {t("notFound.button")}
          </Link>
        </div>
      </Section>
    </Page>
  );
}
