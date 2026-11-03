import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { defaultFilters } from "../services/partService.js";

// URL-ийн query нэр -> filters-ийн түлхүүр.  Жишээ: #/parts?q=шүүлтүүр&gen=gen3&cat=engine
const PARAMS = {
  q: "query",
  gen: "generation",
  cat: "category",
  cond: "condition",
  min: "minPrice",
  max: "maxPrice",
  sort: "sort",
};
const NUMBER_KEYS = ["minPrice", "maxPrice"];
const CONDITIONS = ["any", "new", "used"];
const SORTS = ["name", "price-asc", "price-desc"];

// URLSearchParams -> filters
function parseFilters(params) {
  const filters = { ...defaultFilters };

  for (const [param, key] of Object.entries(PARAMS)) {
    const value = params.get(param);
    if (value === null || value === "") continue;

    filters[key] = NUMBER_KEYS.includes(key) ? Number(value) || null : value;
  }

  // URL-ийг гараар засаж буруу утга оруулсан тохиолдолд default руу буцаана
  if (!CONDITIONS.includes(filters.condition)) filters.condition = defaultFilters.condition;
  if (!SORTS.includes(filters.sort)) filters.sort = defaultFilters.sort;
  return filters;
}

// filters -> URLSearchParams. Default утгатай шүүлтүүрийг URL-д оруулахгүй.
function toParams(filters) {
  const params = new URLSearchParams();

  for (const [param, key] of Object.entries(PARAMS)) {
    if (filters[key] !== defaultFilters[key] && filters[key] !== null) {
      params.set(param, filters[key]);
    }
  }
  return params;
}

// Шүүлтүүрийн төлөв нь URL-д хадгалагдана. Тиймээс хуудас дахин ачаалагдахад, холбоос хуваалцахад алдагдахгүй.
export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const updateFilters = useCallback(
    (patch) => {
      // replace: true -> хөтчийн "буцах" түүхийг хэт дүүргэхгүй
      setSearchParams((previous) => toParams({ ...parseFilters(previous), ...patch }), { replace: true });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams]);

  return { filters, updateFilters, resetFilters };
}
