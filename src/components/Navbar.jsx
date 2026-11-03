import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../context/I18nContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

// Цэсийн зүйлсийг нэг массивт хадгална. Цэс нэмэх бол нэг мөр нэмэхэд хангалттай.
const navItems = [
  { to: "/home", icon: "fa-house", key: "nav.home" },
  { to: "/parts", icon: "fa-screwdriver-wrench", key: "nav.parts" },
  { to: "/calculator", icon: "fa-calculator", key: "nav.calculator" },
  { to: "/suppliers", icon: "fa-store", key: "nav.suppliers" },
  { to: "/contact", icon: "fa-envelope", key: "nav.contact" },
];

export default function Navbar() {
  const { t, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Хуудас солигдоход гар утасны цэсийг хаана
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="app-header">
      <nav className="navbar app-navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item app-brand" to="/home">
              <img src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="" width="38" height="38" />
              <span className="app-brand__text">
                <strong>{t("brand.name")}</strong>
                <small>{t("brand.tagline")}</small>
              </span>
            </Link>
            <a
              role="button"
              tabIndex={0}
              className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              onKeyDown={(event) => event.key === "Enter" && setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${menuOpen ? "is-active" : ""}`}>
            <div className="navbar-start app-nav-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `navbar-item app-nav-link ${isActive ? "is-active" : ""}`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{t(item.key)}</span>
                </NavLink>
              ))}
            </div>
            <div className="navbar-end">
              <div className="navbar-item app-nav-tools">
                <button className="app-icon-btn" type="button" onClick={toggleTheme} aria-label={t("nav.theme")}>
                  <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                </button>
                <button className="app-icon-btn is-text" type="button" onClick={toggleLanguage} aria-label={t("nav.language")}>
                  {t("nav.languageShort")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
