import { useEffect, useRef, useState } from "react";

// Хэрэглэгч бичиж дуустал (delay мс) хүлээгээд onCommit-ийг дуудна.
// Ингэснээр үсэг бүрт URL, хайлт дахин тооцоологдохгүй.
export default function DebouncedInput({ value, onCommit, delay = 200, ...inputProps }) {
  const [text, setText] = useState(value);
  const committed = useRef(value);

  // Гаднаас (жишээ нь "Цэвэрлэх" товчоор) утга өөрчлөгдвөл input-д тусгана
  useEffect(() => {
    if (value !== committed.current) {
      committed.current = value;
      setText(value);
    }
  }, [value]);

  useEffect(() => {
    if (text === committed.current) return undefined;

    const timer = setTimeout(() => {
      committed.current = text;
      onCommit(text);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, onCommit]);

  return <input {...inputProps} value={text} onChange={(event) => setText(event.target.value)} />;
}
