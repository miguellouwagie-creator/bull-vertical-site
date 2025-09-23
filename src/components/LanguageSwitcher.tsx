import React from "react";
import { useLang } from "@/i18n/LanguageContext";

/** SVGs inline para consistencia visual */
const USFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 7410 3900"
    className={className}
    aria-hidden
    focusable="false"
  >
    <path fill="#b22234" d="M0 0h7410v3900H0z" />
    <path
      stroke="#fff"
      strokeWidth="300"
      d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410"
    />
    <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
    <g fill="#fff">
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: r % 2 === 0 ? 6 : 5 }).map((_, c) => {
          const x = r % 2 === 0 ? 247 + c * 494 : 494 + c * 494;
          const y = 210 + r * 210;
          const star = (
            cx: number,
            cy: number,
            r1: number,
            r2: number,
            n: number,
          ) => {
            const pts: string[] = [];
            for (let i = 0; i < n * 2; i++) {
              const ang = (Math.PI / n) * i - Math.PI / 2;
              const r = i % 2 === 0 ? r1 : r2;
              pts.push(`${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`);
            }
            return pts.join(" ");
          };
          return <polygon key={`${r}-${c}`} points={star(x, y, 90, 40, 5)} />;
        }),
      )}
    </g>
  </svg>
);

const ESFlag: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 3 2" className={className} aria-hidden focusable="false">
    <rect width="3" height="2" fill="#AA151B" />
    <rect y="0.5" width="3" height="1" fill="#F1BF00" />
  </svg>
);

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLang();

  const base =
    "inline-flex items-center justify-center h-9 w-12 rounded-md border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
  const active = "border-foreground/50 shadow-sm";
  const idle = "border-transparent opacity-80 hover:opacity-100";

  return (
    <div className="flex items-center gap-2">
      {/* Español */}
      <button
        aria-label="Cambiar a español"
        title="Español"
        className={`${base} ${lang === "es" ? active : idle}`}
        onClick={() => setLang("es")}
      >
        <ESFlag className="w-6 h-6" />
        <span className="sr-only">Español</span>
      </button>

      {/* Inglés (EE. UU.) */}
      <button
        aria-label="Switch to English"
        title="English (US)"
        className={`${base} ${lang === "en" ? active : idle}`}
        onClick={() => setLang("en")}
      >
        <USFlag className="w-6 h-6" />
        <span className="sr-only">English</span>
      </button>
    </div>
  );
};
