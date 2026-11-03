// Гарчигтай, container бүхий агуулгын хэсэг. alt = true бол өөр өнгийн арын хэсэг.
export default function Section({ title, text, alt = false, children }) {
  return (
    <section className={`app-section ${alt ? "is-alt" : ""}`}>
      <div className="container">
        {title && (
          <header className="app-section__head">
            <h2 className="app-section__title">{title}</h2>
            {text && <p className="app-section__text">{text}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
