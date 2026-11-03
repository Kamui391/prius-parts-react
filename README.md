# Prius Parts — React хувилбар

Prius машины эд ангийн үнийн лавлах. Vite + React 18 + React Router (HashRouter) + Bulma/Sass.

- Эд ангийн хайлт, шүүлт (үе, ангилал, төлөв, үнийн хязгаар), нийлүүлэгч бүрийн үнийн харьцуулалт
- Шүүлтүүр URL-д хадгалагдана (`#/parts?cat=brakes&gen=gen3`)
- Зургийн галерей, үнийн тооцоолуур
- Тод / харанхуй горим, Монгол / Англи хэл

> `public/data/parts.json` доторх өгөгдөл жишээ (demo) юм. Үнэ, нийцлийн мэдээлэл бодит биш.

## Ажиллуулах
```bash
npm install
npm run placeholders   # түр зураг үүсгэнэ (зөвхөн анх удаа, эсвэл бодит зураггүй үед)
npm run dev            # http://localhost:5173 (хөгжүүлэлт)
npm run build          # шалгалт + images.json + vite build -> docs/
npm run preview        # build хийсэн сайтыг шалгах
```

Бусад командууд: `npm run validate` (parts.json шалгах), `npm run check:locales` (mn/en түлхүүр шалгах), `npm run images` (images.json шинэчлэх).

## GitHub Pages
```bash
npm run build
git add -A
git commit -m "React хувилбар"
git push origin main
```
Settings -> Pages -> Branch: `main`, хавтас: `/docs`. `src/config.js` доторх `REPO_URL`-ийг өөрийн repository-оор солино.
