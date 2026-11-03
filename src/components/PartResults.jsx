import { useI18n } from "../context/I18nContext.jsx";
import { getImageUrls } from "../services/imageService.js";
import PartCard from "./PartCard.jsx";

export default function PartResults({ results, supplierMap, imageMap, onOpenGallery, onReset }) {
  const { t } = useI18n();

  if (results.length === 0) {
    return (
      <div className="app-empty">
        <i className="fas fa-magnifying-glass"></i>
        <h3>{t("results.emptyTitle")}</h3>
        <p>{t("results.emptyText")}</p>
        <button type="button" className="button app-btn app-btn--solid mt-4" onClick={onReset}>
          {t("filters.reset")}
        </button>
      </div>
    );
  }

  return (
    <div className="app-parts">
      {results.map(({ part, offers }) => (
        <PartCard
          key={part.id}
          part={part}
          offers={offers}
          supplierMap={supplierMap}
          imageUrls={getImageUrls(imageMap, part.id)}
          onOpenGallery={() => onOpenGallery(part.id)}
        />
      ))}
    </div>
  );
}
