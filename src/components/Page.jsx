import { usePageTitle } from "../hooks/usePageTitle.js";

// Хуудас бүрийн wrapper: табны гарчиг + хуудас солигдох анимац (.app-page)
export default function Page({ titleKey, children }) {
  usePageTitle(titleKey);
  return <div className="app-page">{children}</div>;
}
