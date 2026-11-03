import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../context/I18nContext.jsx";

// Зургийн галерей. createPortal нь modal-ыг <body> дээр зурна (ард хуудасны бүтцээс хамааралгүй).
export default function ImageModal({ title, urls, onClose }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const closeButton = useRef(null);
  const multiple = urls.length > 1;

  // Нээгдэхэд хаах товч руу focus очиж, ард хуудас гүйхээс сэргийлнэ. Хаагдахад focus-ыг буцаана.
  useEffect(() => {
    const opener = document.activeElement;
    document.body.classList.add("has-modal-open");
    closeButton.current?.focus();

    return () => {
      document.body.classList.remove("has-modal-open");
      opener?.focus?.();
    };
  }, []);

  // Гараар удирдах: Esc хаана, ← → зураг солино
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (multiple && event.key === "ArrowLeft") setIndex((i) => (i - 1 + urls.length) % urls.length);
      if (multiple && event.key === "ArrowRight") setIndex((i) => (i + 1) % urls.length);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [multiple, onClose, urls.length]);

  return createPortal(
    <div className="app-modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="app-modal__backdrop" onClick={onClose} />
      <figure className="app-modal__figure">
        <img className="app-modal__image" src={urls[index]} alt={title} />
        <figcaption className="app-modal__caption">
          {title} · {index + 1} / {urls.length}
        </figcaption>
      </figure>
      <button ref={closeButton} type="button" className="app-modal__btn is-close" onClick={onClose} aria-label={t("gallery.close")}>
        <i className="fas fa-xmark"></i>
      </button>
      {multiple && (
        <>
          <button
            type="button"
            className="app-modal__btn is-prev"
            onClick={() => setIndex((i) => (i - 1 + urls.length) % urls.length)}
            aria-label={t("gallery.prev")}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            type="button"
            className="app-modal__btn is-next"
            onClick={() => setIndex((i) => (i + 1) % urls.length)}
            aria-label={t("gallery.next")}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
