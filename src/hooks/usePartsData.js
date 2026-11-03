import { useEffect, useState } from "react";
import { loadParts, loadMeta } from "../services/partService.js";
import { loadSupplierMap } from "../services/supplierService.js";
import { loadImageMap } from "../services/imageService.js";

// Өгөгдлийг ачаалж, төлвийг ("loading" | "ready" | "error") буцаана.
export function usePartsData() {
  const [state, setState] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Хэрэглэгч өөр хуудас руу шилжсэн бол хуучин хүсэлтийн үр дүнг орхино
    let cancelled = false;
    setState({ status: "loading" });

    Promise.all([loadParts(), loadMeta(), loadSupplierMap(), loadImageMap()])
      .then(([parts, meta, supplierMap, imageMap]) => {
        if (!cancelled) setState({ status: "ready", parts, meta, supplierMap, imageMap });
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { ...state, reload: () => setAttempt((count) => count + 1) };
}
