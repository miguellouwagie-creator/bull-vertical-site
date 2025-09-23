import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations, type Lang } from "./translations";

type Dict = (typeof translations)["en"];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
  td: () => Dict; // bloque del idioma actual (útil para arrays/objetos)
};

const LanguageContext = createContext<Ctx | null>(null);

function get(obj: any, path: string) {
  return path
    .split(".")
    .reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Lang>("en");

  // Carga idioma guardado o detecta ES por navegador
  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored) setLang(stored);
    else if (navigator.language?.toLowerCase().startsWith("es")) setLang("es");
  }, []);

  // Persiste idioma seleccionado
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // ✅ Actualiza <html lang=".."> (accesibilidad/SEO) y dirección del texto
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      // Si algún día añades idiomas RTL, ajusta aquí:
      const rtlLangs = new Set<string>(["ar", "he", "fa", "ur"]);
      document.documentElement.setAttribute(
        "dir",
        rtlLangs.has(lang) ? "rtl" : "ltr",
      );
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const dict = translations[lang];
    return {
      lang,
      setLang,
      t: (path) => get(dict, path) ?? path,
      td: () => dict,
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
