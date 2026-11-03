// Vite-ийн BASE_URL ("./") нь GitHub Pages-ийн дэд хаяг дээр ч замыг зөв болгоно.
const BASE = import.meta.env.BASE_URL;

export const DATA_URLS = {
  parts: `${BASE}data/parts.json`,
  suppliers: `${BASE}data/suppliers.json`,
  images: `${BASE}data/images.json`,
};

export const IMAGE_BASE = `${BASE}img/parts/`;

// Өөрийн GitHub repository-ийн хаяг
export const REPO_URL = "https://github.com/Kamui391/prius-parts-react";
