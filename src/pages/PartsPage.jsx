import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "../context/I18nContext.jsx";
import { usePartsData } from "../hooks/usePartsData.js";
import { useFilters } from "../hooks/useFilters.js";
import { countByCategory, getPriceBounds, searchParts } from "../services/partService.js";
import { getImageUrls } from "../services/imageService.js";
import { getName } from "../utils/getters.js";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
import SearchBox from "../components/SearchBox.jsx";
import CategoryList from "../components/CategoryList.jsx";
import SettingsPanel from "../components/SettingsPanel.jsx";
import PartResults from "../components/PartResults.jsx";
import ImageModal from "../components/ImageModal.jsx";

export default function PartsPage() {
  const { t, language, formatDate } = useI18n();
  const { status, parts, meta, supplierMap, imageMap, reload } = usePartsData();
  const { filters, updateFilters, resetFilters } = useFilters();
  const [galleryPartId, setGalleryPartId] = useState(null);

  // Хэл солигдоход галерей хаагдана (товчны aria текст хуучин хэлээрээ үлдэхгүй)
  useEffect(() => {
    setGalleryPartId(null);
  }, [language]);

  // Шүүлтүүр, хэл өөрчлөгдөх үед л дахин тооцоолно
  const results = useMemo(() => (parts ? searchParts(parts, filters, language) : []), [parts, filters, language]);
  const counts = useMemo(() => (parts ? countByCategory(parts, filters) : {}), [parts, filters]);
  const closeGallery = useCallback(() => setGalleryPartId(null), []);

  const header = <Hero compact title={t("parts.title")} text={t("parts.text")} />;

  if (status === "loading") {
    return (
      <Page titleKey="nav.parts">
        {header}
        <Section>
          <p className="app-loading">{t("results.loading")}</p>
        </Section>
      </Page>
    );
  }

  if (status === "error") {
    return (
      <Page titleKey="nav.parts">
        {header}
        <Section>
          <div className="app-empty">
            <i className="fas fa-triangle-exclamation"></i>
            <h3>{t("results.error")}</h3>
            <button type="button" className="button app-btn app-btn--solid mt-4" onClick={reload}>
              {t("results.retry")}
            </button>
          </div>
        </Section>
      </Page>
    );
  }

  const galleryPart = parts.find((part) => part.id === galleryPartId);

  return (
    <Page titleKey="nav.parts">
      {header}

      {meta.demo && (
        <div className="container">
          <p className="app-notice">
            <i className="fas fa-circle-info"></i>
            <span>
              {t("results.demoNotice")} {t("results.updated")}: {formatDate(meta.updated)}
            </span>
          </p>
        </div>
      )}

      <SidebarLayout
        resultText={`${results.length} ${t("results.count")}`}
        sidebar={
          <>
            <SearchBox value={filters.query} onCommit={(query) => updateFilters({ query })} />
            <CategoryList filters={filters} counts={counts} onChange={updateFilters} />
            <SettingsPanel filters={filters} bounds={getPriceBounds(parts)} onChange={updateFilters} onReset={resetFilters} />
          </>
        }
      >
        <PartResults
          results={results}
          supplierMap={supplierMap}
          imageMap={imageMap}
          onOpenGallery={setGalleryPartId}
          onReset={resetFilters}
        />
      </SidebarLayout>

      {galleryPart && (
        <ImageModal title={getName(galleryPart, language)} urls={getImageUrls(imageMap, galleryPart.id)} onClose={closeGallery} />
      )}
    </Page>
  );
}
