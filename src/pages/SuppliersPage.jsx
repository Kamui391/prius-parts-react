import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

export default function SuppliersPage() {
  const { t } = useI18n();

  const types = [
    { icon: "fa-store", title: t("suppliers.t1Title"), text: t("suppliers.t1Text") },
    { icon: "fa-screwdriver-wrench", title: t("suppliers.t2Title"), text: t("suppliers.t2Text") },
    { icon: "fa-box-open", title: t("suppliers.t3Title"), text: t("suppliers.t3Text") },
  ];

  return (
    <Page titleKey="nav.suppliers">
      <Hero compact title={t("suppliers.title")} text={t("suppliers.text")} />
      <Section>
        <div className="app-grid">
          {types.map((item) => (
            <article key={item.icon} className="app-card">
              <span className="app-card__icon">
                <i className={`fas ${item.icon}`}></i>
              </span>
              <h3 className="app-card__title">{item.title}</h3>
              <p className="app-card__text">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="app-cta">
          <div>
            <h2>{t("suppliers.ctaTitle")}</h2>
            <p>{t("suppliers.ctaText")}</p>
          </div>
          <Link className="button app-btn app-btn--accent" to="/contact">
            {t("suppliers.ctaButton")}
          </Link>
        </div>
      </Section>
    </Page>
  );
}
