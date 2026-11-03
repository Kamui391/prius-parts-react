import { useI18n } from "../context/I18nContext.jsx";
import DebouncedInput from "./DebouncedInput.jsx";

// Нэр, дугаараар хайх талбар
export default function SearchBox({ value, onCommit }) {
  const { t } = useI18n();

  return (
    <section className="app-filter">
      <label className="app-filter__title" htmlFor="partQuery">
        {t("filters.search")}
      </label>
      <div className="control has-icons-left">
        <DebouncedInput
          id="partQuery"
          className="input app-input"
          type="search"
          autoComplete="off"
          placeholder={t("filters.searchPlaceholder")}
          value={value}
          onCommit={onCommit}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass"></i>
        </span>
      </div>
    </section>
  );
}
