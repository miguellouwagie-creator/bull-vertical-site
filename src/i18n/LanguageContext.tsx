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
  td: () => Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

function get(obj: any, path: string): any {
  return path
    .split(".")
    .reduce((o, k) => (o != null && k in o ? o[k] : undefined), obj);
}

/**
 * FIX #13: Unified language resolution + single fallback mechanism.
 *
 *  1. `resolveLang` clamps any unrecognised locale back to "en" so the
 *     translation dict is always valid. Eliminates the root cause of both
 *     the FAQSection crash (#9) and the raw-key display bug.
 *  2. `t()` returns the path key as-is when a translation is absent, so
 *     components that already check for key-equality continue to work.
 *  3. `setLang` validates before writing to state so a bad locale from
 *     external code cannot corrupt the context.
 */
const SUPPORTED_LANGS = new Set(Object.keys(translations) as Lang[]);

function resolveLang(candidate: string | null): Lang {
  if (candidate && SUPPORTED_LANGS.has(candidate as Lang)) {
    return candidate as Lang;
  }
  return "en";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangRaw] = useState<Lang>("en");

  // FIX #13: validate before writing to state (typo corrected: resolveLang, not resolvelang)
  const setLang = (l: Lang) => setLangRaw(resolveLang(l));

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    const detected = navigator.language?.toLowerCase().startsWith("es")
      ? "es"
      : null;
    setLangRaw(resolveLang(stored ?? detected));
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      const rtlLangs = new Set<string>(["ar", "he", "fa", "ur"]);
      document.documentElement.setAttribute(
        "dir",
        rtlLangs.has(lang) ? "rtl" : "ltr",
      );
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    // resolveLang guarantees dict is never undefined
    const dict = translations[resolveLang(lang)];
    return {
      lang,
      setLang,
      t: (path) => {
        const val = get(dict, path);
        return typeof val === "string" ? val : path;
      },
      td: () => dict,
    };
  // setLang is stable (closure defined outside useMemo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
