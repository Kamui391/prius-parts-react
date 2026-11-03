import { useState } from "react";
import { useI18n } from "../context/I18nContext.jsx";
import Page from "../components/Page.jsx";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

const emptyForm = { price: "", qty: "1", tax: "", delivery: "", labour: "" };

// Хоосон, буруу утгыг 0 болгоно. Тоо ширхэг хамгийн багадаа 1.
const toNumber = (value, min = 0) => Math.max(min, Number(value) || 0);

// Нэг талбар: label + тоон input
function Field({ id, label, value, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          className="input app-input"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const { t, formatMoney } = useI18n();
  const [form, setForm] = useState(emptyForm);
  const setField = (name) => (value) => setForm((current) => ({ ...current, [name]: value }));

  // Тооцоо нь form-оос шууд гарна (өөр state хадгалах шаардлагагүй)
  const price = toNumber(form.price);
  const qty = toNumber(form.qty, 1);
  const delivery = toNumber(form.delivery);
  const labour = toNumber(form.labour);
  const subtotal = price * qty;
  const tax = (subtotal * toNumber(form.tax)) / 100;
  const total = subtotal + tax + delivery + labour;

  return (
    <Page titleKey="nav.calculator">
      <Hero compact title={t("calculator.title")} text={t("calculator.text")} />
      <Section>
        <div className="app-calc">
          <div className="app-panel">
            <Field id="calcPrice" label={t("calculator.price")} value={form.price} onChange={setField("price")} />
            <Field id="calcQty" label={t("calculator.qty")} value={form.qty} onChange={setField("qty")} />
            <Field id="calcTax" label={t("calculator.tax")} value={form.tax} onChange={setField("tax")} />
            <Field id="calcDelivery" label={t("calculator.delivery")} value={form.delivery} onChange={setField("delivery")} />
            <Field id="calcLabour" label={t("calculator.labour")} value={form.labour} onChange={setField("labour")} />
            <button type="button" className="button app-btn app-btn--solid" onClick={() => setForm(emptyForm)}>
              {t("calculator.reset")}
            </button>
          </div>

          <aside className="app-result">
            <h3>{t("calculator.resultTitle")}</h3>
            <p className="app-result__total">{formatMoney(total)}</p>
            <div className="app-result__row">
              <span>{t("calculator.subtotal")}</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <div className="app-result__row">
              <span>{t("calculator.taxAmount")}</span>
              <strong>{formatMoney(tax)}</strong>
            </div>
            <div className="app-result__row">
              <span>{t("calculator.deliveryAmount")}</span>
              <strong>{formatMoney(delivery)}</strong>
            </div>
            <div className="app-result__row">
              <span>{t("calculator.labourAmount")}</span>
              <strong>{formatMoney(labour)}</strong>
            </div>
            <p className="app-result__note">{t("calculator.note")}</p>
          </aside>
        </div>
      </Section>
    </Page>
  );
}
