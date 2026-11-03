// Хуудасны дээд талын том хэсэг. compact = true бол дотоод хуудсанд зориулсан намхан хувилбар.
export default function Hero({ eyebrow, title, text, actions, compact = false }) {
  return (
    <section className={`app-hero ${compact ? "is-compact" : ""}`}>
      <div className="container app-hero__inner">
        {eyebrow && <span className="app-eyebrow">{eyebrow}</span>}
        <h1 className="app-hero__title">{title}</h1>
        {text && <p className="app-hero__text">{text}</p>}
        {actions && <div className="app-hero__actions">{actions}</div>}
      </div>
    </section>
  );
}
