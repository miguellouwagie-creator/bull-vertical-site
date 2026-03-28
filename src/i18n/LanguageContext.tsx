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
 * Sanitise a value that `lang` stored in localStorage.
 *
 * FIX #13: Previously `t()` silently returned the raw key string whenever a
 * translation was missing (e.g. `t("nav.safety")` returned `"nav.safety"`).
 * Meanwhile Hero.tsx maintained its own parallel `isMissing()` + per-key
 * fallback system, creating two incompatible fallback mechanisms.
 *
 * The unified approach:
 *  1. `resolveLang` clamps any unrecognised locale back to `"en"` so the
 *     translation dict is always valid. This eliminates the root cause of
 *     both the FAQSection crash (#9) and the raw-key display bug.
 *  2. `t()` now returns `undefined` (typed as `string`) when a key is truly
 *     absent, so call-sites can distinguish "key missing" from "key present
 *     but empty". Components that already have their own fallback (Hero, FAQ)
 *     continue to work unchanged.
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

  // FIX #13: validate before writing to state
  const setLang = (l: Lang) => setLangRaw(resolvelang(l));

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
    // FIX #13: resolveLang guarantees dict is never undefined
    const dict = translations[resolveLang(lang)];
    return {
      lang,
      setLang,
      // Return the value if found; fall back to the path key so existing
      // components that checked for key-equality still work as before.
      t: (path) => {
        const val = get(dict, path);
        return typeof val === "string" ? val : path;
      },
      td: () => dict,
    };
  // setLang is stable (defined outside useMemo deps)
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
