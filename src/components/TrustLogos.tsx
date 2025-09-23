import React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export const TrustLogos = () => {
  const { lang, t } = useLang();
  const projects = translations[lang].trust.projects;
  const len = projects.length;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary mb-4">
            Featured projects
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("trust.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            {t("trust.description")}
          </p>
        </div>

        {/* Grid:
            - base: 1 col
            - sm:   2 cols
            - lg:   6 cols (cada tarjeta ocupa 2 -> 3 por fila)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {projects.map((project, idx) => {
            const isLast = idx === len - 1;
            const isSecondLast = idx === len - 2;

            // --- Colocación en lg (6 cols / cada card col-span-2) ---
            // Sobran 2 (len % 3 === 2): ponlas centradas -> col-start 2 y 4
            const lgCenterTwo =
              len % 3 === 2 && (isSecondLast || isLast)
                ? isSecondLast
                  ? "lg:col-start-2"
                  : "lg:col-start-4"
                : "";

            // Sobra 1 (len % 3 === 1): céntrala -> col-start 3
            const lgCenterOne = len % 3 === 1 && isLast ? "lg:col-start-3" : "";

            // --- Centrado en sm (2 cols) cuando sobra 1 ---
            const smCenterOne =
              len % 2 === 1 && isLast
                ? "sm:col-span-2 sm:max-w-xl sm:mx-auto" // centrado en sm
                : "";

            return (
              <article
                key={`${project.name}-${idx}`}
                className={`group relative overflow-hidden rounded-2xl ring-1 ring-border bg-card shadow-sm hover:shadow-md transition-shadow
                            ${smCenterOne} lg:col-span-2 ${lgCenterTwo} ${lgCenterOne}`}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-sm">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-white/85 text-sm leading-snug">
                    {project.description}
                  </p>
                </div>

                <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-focus-within:ring-primary/40 transition-[ring] pointer-events-none" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
