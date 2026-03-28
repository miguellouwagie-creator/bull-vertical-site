import React from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

export const Hero = () => {
  const { t, lang } = useLang() as { t: (k: string) => string; lang?: string };

  const isMissing = (res: string, key: string) =>
    !res ||
    res === key ||
    res.trim().toLowerCase() === key.trim().toLowerCase() ||
    /^[a-z0-9_]+\.[a-z0-9_.-]+$/i.test(res);

  const tr = (key: string, enFallback: string, esFallback: string) => {
    const useES = (lang || "").toLowerCase().startsWith("es");
    const fb = useES ? esFallback : enFallback;
    try {
      const res = t ? t(key) : "";
      return isMissing(res, key) ? fb : res;
    } catch {
      return fb;
    }
  };

  const title = tr(
    "hero_short.title",
    "Crystal-clear towers.\nZero hassle.",
    "Rascacielos impecables.\nCero complicaciones.",
  );
  const chipsStr = tr(
    "hero_short.chips",
    "24\u201348h scheduling \u2022 IRATA-certified \u2022 Fully insured",
    "Planificaci\u00f3n 24\u201348\u00a0h \u2022 Certificaci\u00f3n IRATA \u2022 Asegurados",
  );
  const cta1 = tr("hero.cta", "Get a quote", "Solicitar presupuesto");
  const cta2 = tr("hero.cta2", "Technical visit", "Visita t\u00e9cnica");

  const chips = chipsStr.split("\u2022").map((s) => s.trim());

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/*
        FIX #7: src now matches the href in the <link rel="preload"> in index.html
        (/hero/cover-1920.webp). Previously src was "/hero/cover.webp" which does
        not exist in the srcSet, causing the browser to:
          1. Download cover.webp as a separate, unpreloaded request
          2. Ignore the preloaded cover-1920.webp entirely (wasted preload)
        fetchpriority="high" reinforces LCP priority to the browser scheduler.
      */}
      <img
        src="/hero/cover-1920.webp"
        srcSet="/hero/cover-768.webp 768w, /hero/cover-1280.webp 1280w, /hero/cover-1920.webp 1920w"
        sizes="100vw"
        alt="Rope-access window cleaning on Miami high-rises"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "70% 50%" }}
        loading="eager"
        decoding="async"
        // @ts-ignore — fetchpriority is a valid HTML attribute; React types lag behind.
        fetchpriority="high"
      />

      {/* Overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 22% 45%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.20) 36%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0) 75%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-3xl text-left text-white">
          <h1 className="whitespace-pre-line text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c, i) => (
              <span
                key={i}
                className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="h-11 px-6 text-sm font-semibold shadow-sm"
              asChild
            >
              <a href="#contact">{cta1}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6 text-sm font-semibold text-white border-white/40 bg-white/10 hover:bg-white hover:text-primary"
              asChild
            >
              <a href="#contact">{cta2}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
