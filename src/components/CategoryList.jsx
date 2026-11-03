import { useI18n } from "../context/I18nContext.jsx";
import { categories, generations } from "../data/catalog.js";

// Үе, ангиллын шүүлтүүр. Нэг товшилт: сонгогдсон бол болиулж, үгүй бол сонгоно.
export default function CategoryList({ filters, counts, onChange }) {
  const { t } = useI18n();
  const toggle = (key, value) => onChange({ [key]: filters[key] === value ? null : value });

  return (
    <>
      <section className="app-filter">
        <h3 className="app-filter__title">{t("filters.generation")}</h3>
        <div className="app-chips">
          {generations.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`app-chip ${filters.generation === item.id ? "is-active" : ""}`}
              onClick={() => toggle("generation", item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </section>
      <section className="app-filter">
        <h3 className="app-filter__title">{t("filters.category")}</h3>
        <div className="app-filter-list">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`app-filter-list__item ${filters.category === item.id ? "is-active" : ""}`}
              onClick={() => toggle("category", item.id)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{t(item.key)}</span>
              <span className="app-count">{counts[item.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
