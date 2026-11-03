import { useI18n } from "../context/I18nContext.jsx";
import { REPO_URL } from "../config.js";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

export default function ContactPage() {
  const { t } = useI18n();
  const items = [t("contact.c2Item1"), t("contact.c2Item2"), t("contact.c2Item3"), t("contact.c2Item4")];

  return (
    <Page titleKey="nav.contact">
      <Hero compact title={t("contact.title")} text={t("contact.text")} />
      <Section>
        <div className="app-grid">
          <article className="app-card">
            <span className="app-card__icon">
              <i className="fab fa-github"></i>
            </span>
            <h3 className="app-card__title">{t("contact.c1Title")}</h3>
            <p className="app-card__text">{t("contact.c1Text")}</p>
            <a
              className="button app-btn app-btn--solid mt-4"
              href={`${REPO_URL}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.c1Button")}
            </a>
          </article>
          <article className="app-card">
            <span className="app-card__icon">
              <i className="fas fa-tags"></i>
            </span>
            <h3 className="app-card__title">{t("contact.c2Title")}</h3>
            <ul className="app-list">
              {items.map((text) => (
                <li key={text}>
                  <i className="fas fa-check"></i>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>
    </Page>
  );
}
