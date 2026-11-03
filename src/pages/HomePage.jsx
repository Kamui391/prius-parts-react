import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import { categories, generations } from "../data/catalog.js";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

export default function HomePage() {
  const { t } = useI18n();

  const features = [
    { icon: "fa-scale-balanced", title: t("home.f1Title"), text: t("home.f1Text") },
    { icon: "fa-calculator", title: t("home.f2Title"), text: t("home.f2Text") },
    { icon: "fa-shield-halved", title: t("home.f3Title"), text: t("home.f3Text") },
  ];

  return (
    <Page titleKey="nav.home">
      <Hero
        eyebrow={t("home.eyebrow")}
        title={t("home.title")}
        text={t("home.text")}
        actions={
          <>
            <Link className="button app-btn app-btn--accent" to="/parts">
              {t("home.ctaPrimary")}
            </Link>
            <Link className="button app-btn app-btn--ghost" to="/calculator">
              {t("home.ctaSecondary")}
            </Link>
          </>
        }
      />

      <Section title={t("home.featuresTitle")} text={t("home.featuresText")}>
        <div className="app-grid">
          {features.map((item) => (
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

      <Section alt title={t("home.categoriesTitle")} text={t("home.categoriesText")}>
        <div className="app-grid is-tight">
          {categories.map((item) => (
            // Ангилал дээр дарахад хайлтын хуудас шүүлтүүртэй нь нээгдэнэ: #/parts?cat=battery
            <Link key={item.id} className="app-tile" to={`/parts?cat=${item.id}`}>
              <i className={`fas ${item.icon}`}></i>
              <span>{t(item.key)}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={t("home.generationsTitle")} text={t("home.generationsText")}>
        <div className="app-grid is-tight">
          {generations.map((item) => (
            <Link key={item.id} className="app-gen" to={`/parts?gen=${item.id}`}>
              <strong>{item.name}</strong>
              <span>{item.years}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="app-cta">
          <div>
            <h2>{t("home.ctaTitle")}</h2>
            <p>{t("home.ctaText")}</p>
          </div>
          <Link className="button app-btn app-btn--accent" to="/suppliers">
            {t("home.ctaButton")}
          </Link>
        </div>
      </Section>
    </Page>
  );
}
