const localeOf = (language) => (language === "mn" ? "mn-MN" : "en-US");

// 1250000 -> "1,250,000 ₮"
export function formatMoney(value, language) {
  const number = new Intl.NumberFormat(localeOf(language), { maximumFractionDigits: 0 }).format(value);
  return `${number} ₮`;
}

// "2026-10-22" -> тухайн хэлний форматаар (жишээ нь "Oct 22, 2026")
export function formatDate(isoDate, language) {
  return new Intl.DateTimeFormat(localeOf(language), { dateStyle: "medium" }).format(new Date(isoDate));
}
