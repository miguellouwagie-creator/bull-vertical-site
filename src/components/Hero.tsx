import React from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

export const Hero = () => {
  const { t, lang } = useLang() as { t: (k: string) => string; lang?: string };

  // Si i18n devuelve la clave (no existe la traducción), usamos fallback por idioma
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

  // Texto corto con fallback por idioma
  const title = tr(
    "hero_short.title",
    "Crystal-clear towers.\nZero hassle.",
    "Rascacielos impecables.\nCero complicaciones.",
  );
  const chipsStr = tr(
    "hero_short.chips",
    "24–48h scheduling • IRATA-certified • Fully insured",
    "Planificación 24–48 h • Certificación IRATA • Asegurados",
  );
  const cta1 = tr("hero.cta", "Get a quote", "Solicitar presupuesto");
  const cta2 = tr("hero.cta2", "Technical visit", "Visita técnica");

  const chips = chipsStr.split("•").map((s) => s.trim());

  return (
    // Altura = alto de pantalla - navbar (4rem = h-16). Cambia 4rem si tu navbar mide otra cosa.
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Fondo: imagen visible y nítida (WebP optimizado desde /public/hero) */}
      <img
        src="/hero/cover.webp"
        srcSet="/hero/cover-768.webp 768w, /hero/cover-1280.webp 1280w, /hero/cover-1920.webp 1920w"
        sizes="100vw"
        alt="Rope-access window cleaning on Miami high-rises"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "70% 50%" }}
        loading="eager"
        decoding="async"
      />

      {/* Overlay MUY sutil: un foco radial detrás del texto + pequeños fades */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Spotlight: ajusta los números para más/menos oscuridad */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 22% 45%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.20) 36%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0) 75%)",
          }}
        />
        {/* Sombras muy suaves arriba/abajo para que el texto siempre se lea */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-3xl text-left text-white">
          {/* Título: dos líneas fuertes, sin efectos raros */}
          <h1 className="whitespace-pre-line text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
            {title}
          </h1>

          {/* Chips: beneficios rápidos (mejor que un párrafo largo) */}
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

          {/* CTAs */}
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
