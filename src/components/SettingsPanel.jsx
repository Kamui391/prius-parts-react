import { useI18n } from "../context/I18nContext.jsx";
import DebouncedInput from "./DebouncedInput.jsx";

const CONDITIONS = [
  ["any", "filters.conditionAny"],
  ["new", "filters.conditionNew"],
  ["used", "filters.conditionUsed"],
];

const SORTS = [
  ["name", "filters.sortName"],
  ["price-asc", "filters.sortPriceAsc"],
  ["price-desc", "filters.sortPriceDesc"],
];

// Хоосон бол null, эс бөгөөс сөрөг биш тоо
const toNumberOrNull = (value) => (value === "" ? null : Math.max(0, Number(value)) || null);

// Төлөв (шинэ / хуучин), үнийн хязгаар, эрэмбэлэлт, шүүлтүүр цэвэрлэх
export default function SettingsPanel({ filters, bounds, onChange, onReset }) {
  const { t } = useI18n();

  return (
    <>
      <section className="app-filter">
        <h3 className="app-filter__title">{t("filters.condition")}</h3>
        <div className="app-segment">
          {CONDITIONS.map(([value, key]) => (
            <button
              key={value}
              type="button"
              className={filters.condition === value ? "is-active" : ""}
              onClick={() => onChange({ condition: value })}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </section>
      <section className="app-filter">
        <h3 className="app-filter__title">{t("filters.price")}</h3>
        <div className="app-price-row">
          <DebouncedInput
            className="input app-input"
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            placeholder={bounds.min}
            aria-label={t("filters.min")}
            delay={300}
            value={filters.minPrice ?? ""}
            onCommit={(text) => onChange({ minPrice: toNumberOrNull(text) })}
          />
          <span>–</span>
          <DebouncedInput
            className="input app-input"
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            placeholder={bounds.max}
            aria-label={t("filters.max")}
            delay={300}
            value={filters.maxPrice ?? ""}
            onCommit={(text) => onChange({ maxPrice: toNumberOrNull(text) })}
          />
        </div>
      </section>
      <section className="app-filter">
        <label className="app-filter__title" htmlFor="sortSelect">
          {t("filters.sort")}
        </label>
        <div className="select is-fullwidth">
          <select id="sortSelect" value={filters.sort} onChange={(event) => onChange({ sort: event.target.value })}>
            {SORTS.map(([value, key]) => (
              <option key={value} value={value}>
                {t(key)}
              </option>
            ))}
          </select>
        </div>
      </section>
      <button type="button" className="button app-btn app-btn--solid is-fullwidth mt-5" onClick={onReset}>
        {t("filters.reset")}
      </button>
    </>
  );
}
