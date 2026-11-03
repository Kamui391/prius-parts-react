import { useEffect, useState } from "react";
import { useI18n } from "../context/I18nContext.jsx";

// Зүүн талд шүүлтүүрийн sidebar, баруун талд үр дүн бүхий хуудасны загвар.
// Жижиг дэлгэц дээр sidebar нь зүүнээс гарч ирдэг drawer болно.
export default function SidebarLayout({ sidebar, resultText, children }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  // Drawer нээлттэй байх үед: Esc-ээр хаах, ард хуудас гүйхээс сэргийлэх
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("has-sidebar-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-sidebar-open");
    };
  }, [open]);

  return (
    <section className="app-section">
      <div className="container">
        <div className="app-sidebar-layout">
          <aside className={`app-sidebar ${open ? "is-open" : ""}`} aria-label={t("filters.title")}>
            <div className="app-sidebar__head">
              <h2>{t("filters.title")}</h2>
              <button type="button" className="app-icon-btn" onClick={() => setOpen(false)} aria-label={t("filters.close")}>
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            {sidebar}
          </aside>
          <div className={`app-sidebar-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
          <div className="app-sidebar-layout__main">
            <div className="app-toolbar">
              <button
                type="button"
                className="button app-btn app-btn--solid is-hidden-desktop"
                onClick={() => setOpen(true)}
              >
                <i className="fas fa-sliders"></i>&nbsp;{t("filters.open")}
              </button>
              <p className="app-toolbar__count" aria-live="polite">
                {resultText}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
