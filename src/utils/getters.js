// Одоогийн хэлний талбарыг сонгоно: nameMn эсвэл nameEn. Байхгүй бол Монгол хэлийг ашиглана.
export function getName(item, language) {
  return item[language === "en" ? "nameEn" : "nameMn"] ?? item.nameMn;
}

// Үнийн саналуудыг хямдаас нь эхлүүлж эрэмбэлнэ
export const sortOffers = (offers) => [...offers].sort((a, b) => a.priceMnt - b.priceMnt);
