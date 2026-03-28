import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type Item = { id?: string; q: string; a: (string | [string, string][])[] };

const PlusIcon = () => (
  <span className="ml-3 text-xl select-none transition-transform duration-200 group-open:rotate-45">
    \uff0b
  </span>
);

export const FAQSection: React.FC = () => {
  const { lang, t } = useLang();

  /*
   * FIX #9: Guard against missing translation key.
   *
   * Previously: `translations[lang].faq` — crashes with
   * "TypeError: Cannot read properties of undefined" if `lang` holds
   * a value not present in the translations map (e.g. corrupted
   * localStorage: "fr", "pt", etc.).
   *
   * Now: optional chaining + nullish fallback to an empty-but-valid
   * object so the section renders gracefully (empty list) instead of
   * throwing and unmounting the whole tree.
   */
  const faqDict = (translations as any)[lang]?.faq ?? { title: "FAQ", items: [] };
  const items = faqDict.items as Item[];

  return (
    <section id="faq" className="scroll-mt-24 px-6 py-16 md:px-10 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        {t("faq.title")}
      </h2>

      <div className="space-y-4">
        {items.map((it, i) => (
          <details
            key={it.id ?? i}
            id={it.id}
            className="group border rounded-lg p-5 scroll-mt-24"
          >
            <summary className="cursor-pointer font-medium text-lg flex items-center justify-between">
              {it.q}
              <PlusIcon />
            </summary>

            <div className="mt-3 text-foreground/90 space-y-3">
              {it.a.map((block, idx) => {
                if (typeof block === "string") return <p key={idx}>{block}</p>;
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-1">
                    {block.map(([title, desc], j) => (
                      <li key={j}>
                        <strong>{title}:</strong> {desc}
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
