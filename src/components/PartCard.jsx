import { useI18n } from "../context/I18nContext.jsx";
import { generations, getCategory } from "../data/catalog.js";
import { getName } from "../utils/getters.js";

const CONDITION_KEYS = { new: "filters.conditionNew", used: "filters.conditionUsed" };

// Зураг байвал дарж томруулах товч, үгүй бол ангиллын дүрс
function Thumb({ part, name, imageUrls, onOpenGallery }) {
  const { t } = useI18n();

  if (imageUrls.length === 0) {
    return (
      <div className="app-part__thumb is-placeholder">
        <i className={`fas ${getCategory(part.category).icon}`}></i>
      </div>
    );
  }

  return (
    <button type="button" className="app-part__thumb" onClick={onOpenGallery} aria-label={t("gallery.open")}>
      <img src={imageUrls[0]} alt={name} loading="lazy" />
      {imageUrls.length > 1 && (
        <span className="app-part__badge">
          <i className="fas fa-images"></i> {imageUrls.length}
        </span>
      )}
    </button>
  );
}

export default function PartCard({ part, offers, supplierMap, imageUrls, onOpenGallery }) {
  const { t, language, formatMoney } = useI18n();
  const category = getCategory(part.category);
  const name = getName(part, language);

  return (
    <article className="app-part">
      <Thumb part={part} name={name} imageUrls={imageUrls} onOpenGallery={onOpenGallery} />
      <div className="app-part__body">
        <span className="app-part__category">
          <i className={`fas ${category.icon}`}></i> {t(category.key)}
        </span>
        <h3 className="app-part__name">{name}</h3>
        <p className="app-part__number">{part.partNumber}</p>
        <div className="app-part__tags">
          {part.generations
            .map((id) => generations.find((item) => item.id === id))
            .filter(Boolean)
            .map((item) => (
              <span key={item.id} className="app-tag">
                {item.name}
              </span>
            ))}
        </div>
        <p className="app-part__price">
          <span>{t("results.from")}</span>
          <strong>{formatMoney(offers[0].priceMnt)}</strong>
        </p>
        <details className="app-offers">
          <summary>
            {t("results.compare")} ({offers.length})
          </summary>
          <ul>
            {offers.map((offer, index) => {
              const supplier = supplierMap.get(offer.supplierId);
              return (
                <li key={`${offer.supplierId}-${offer.condition}`} className={offers.length > 1 && index === 0 ? "is-best" : ""}>
                  <span>
                    {supplier ? getName(supplier, language) : "—"}{" "}
                    <em className={`app-tag is-${offer.condition}`}>{t(CONDITION_KEYS[offer.condition])}</em>
                  </span>
                  <strong>{formatMoney(offer.priceMnt)}</strong>
                </li>
              );
            })}
          </ul>
        </details>
      </div>
    </article>
  );
}
