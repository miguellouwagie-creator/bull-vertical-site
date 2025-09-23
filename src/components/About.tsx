import React, { useState } from "react";
import aboutImage from "@/assets/window-cleaning-2.jpg";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { CheckCircle2 } from "lucide-react";

export const About: React.FC = () => {
  const { lang, t } = useLang();
  const dict = (translations as any)[lang]?.about ?? {};
  const stats = (translations as any)[lang]?.reviews?.stats ?? {
    buildings: {
      value: "600+",
      label: lang === "es" ? "Edificios" : "Buildings",
    },
    years: { value: "10+", label: lang === "es" ? "Años" : "Years" },
    rating: { value: "5★", label: lang === "es" ? "Valoración" : "Rating" },
  };

  const body: string[] = dict.body ?? [
    "Founded in 2015 after training in rope-access techniques alongside Spanish experts from Windows Leaders. With 10+ years in the field and over 600 buildings serviced across Miami, we’ve built a reputation for excellence and safety.",
    "We evolved from GM Windows Cleaning to BULL Vertical Services LLC, staying fully committed to quality, compliance, and safety. Our team brings professional expertise to every high-rise project throughout Miami-Dade County.",
  ];

  const points: string[] = dict.points ?? [
    "OSHA-aligned safety procedures",
    "Rope-access specialists for high-rise",
    "Fully licensed & insured",
    "Clear planning and resident comms",
  ];

  const eyebrow =
    dict.eyebrow ?? (lang === "es" ? "Sobre nosotros" : "About us");
  const readMoreLabel =
    dict.readMore ?? (lang === "es" ? "Leer más" : "Read more");
  const readLessLabel =
    dict.readLess ?? (lang === "es" ? "Leer menos" : "Read less");

  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="py-10 md:py-14 bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* TEXTO (más estrecho para ganar altura) */}
          <div className="lg:col-span-6 order-2 lg:order-1 self-center max-w-xl">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary mb-3">
              {eyebrow}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {t("about.title")}
            </h2>

            <div className="mt-4 space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>{body[0]}</p>
              {/* En desktop, mostramos el 2º párrafo; en móvil, colapsable */}
              {body[1] && <p className="hidden lg:block">{body[1]}</p>}
              {body.slice(1).map((p, i) => (
                <p
                  key={`m-${i}`}
                  className={`lg:hidden ${expanded ? "block" : "hidden"}`}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Bullets compactos en 2 columnas */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm md:text-base text-foreground/90"
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Stats para completar altura */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4 ring-1 ring-border">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stats.buildings.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stats.buildings.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stats.years.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stats.years.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stats.rating.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stats.rating.label}
                </div>
              </div>
            </div>

            {/* Acciones (en móvil mostramos toggle) */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto lg:hidden"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? readLessLabel : readMoreLabel}
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <a href="#contact">{t("hero.cta")}</a>
              </Button>
            </div>
          </div>

          {/* IMAGEN (derecha) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[720px]">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/25 via-transparent to-teal-300/25 blur-2xl" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-border rotate-[0.4deg]">
                <img
                  src={aboutImage}
                  alt="Rope access window cleaners at work on a high-rise"
                  className="absolute inset-0 h-full w-full object-cover object-[62%_18%]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
