import * as React from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Paintbrush,
  Droplets,
  Wrench,
  ShieldCheck,
  Building2,
  ChevronDown,
  Check,
} from "lucide-react";

/** Iconos por id de servicio (usa un fallback si no hay match) */
const iconById: Record<string, React.ReactNode> = {
  "window-cleaning": <Sparkles className="h-5 w-5" />,
  "stain-removal": <Sparkles className="h-5 w-5" />,
  "sealant-cleaning": <ShieldCheck className="h-5 w-5" />,
  "post-construction": <Sparkles className="h-5 w-5" />,
  "maintenance-programs": <Wrench className="h-5 w-5" />,
  "pressure-washing": <Droplets className="h-5 w-5" />,
  "high-rise-painting": <Paintbrush className="h-5 w-5" />,
  "regular-painting": <Paintbrush className="h-5 w-5" />,
};

export default function ServicesSection() {
  const { lang } = useLang();
  const sv = (translations as any)[lang]?.services;

  const title =
    sv?.title ?? (lang === "es" ? "Nuestros servicios" : "Our Services");
  const subtitle =
    sv?.subtitle ??
    (lang === "es"
      ? "Soluciones completas de acceso con cuerdas para los rascacielos de Miami"
      : "Complete rope-access solutions for Miami’s high-rise buildings");
  const selectedLabel =
    sv?.selectedLabel ??
    (lang === "es" ? "Servicios seleccionados:" : "Selected services:");
  const quoteSelectedCta =
    sv?.quoteSelectedCta ??
    (lang === "es"
      ? "Presupuesto de los seleccionados"
      : "Quote for Selected Services");

  const items: Array<{
    id: string;
    title: string;
    description: string;
    benefits: string[];
  }> = sv?.items ?? [];

  const [selected, setSelected] = React.useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const [open, setOpen] = React.useState<Record<string, boolean>>({}); // “More details” por card
  const tMore = lang === "es" ? "Más detalles" : "More details";
  const tLess = lang === "es" ? "Menos detalles" : "Less details";

  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </header>

        {/* Tray de seleccionados */}
        {selected.length > 0 && (
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">{selectedLabel}</span>
            {selected.map((id) => {
              const t = items.find((x) => x.id === id)?.title ?? id;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-sm"
                >
                  <Check className="h-4 w-4 text-primary" />
                  {t}
                </span>
              );
            })}
            <Button asChild className="ml-auto h-9 px-3">
              <a href="#contact">{quoteSelectedCta}</a>
            </Button>
          </div>
        )}

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s) => {
            const shown = s.benefits.slice(0, 3);
            const rest = s.benefits.slice(3);
            const expanded = !!open[s.id];
            const Icon = iconById[s.id] ?? (
              // Fallback genérico
              <Building2 className="h-5 w-5" />
            );

            return (
              <Card
                key={s.id}
                variant="tinted"
                interactive
                selected={selected.includes(s.id)}
                className="min-h-[220px]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-primary/15 text-primary p-2">
                      {Icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{s.title}</CardTitle>
                      {/* clamp en línea (por si no tienes el plugin de line-clamp) */}
                      <CardDescription
                        className="text-sm"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {s.description}
                      </CardDescription>
                    </div>

                    {/* Botón select */}
                    <button
                      onClick={() => toggle(s.id)}
                      aria-label={
                        selected.includes(s.id)
                          ? lang === "es"
                            ? "Quitar"
                            : "Deselect"
                          : lang === "es"
                            ? "Seleccionar"
                            : "Select"
                      }
                      className={[
                        "ml-2 grid h-8 w-8 place-items-center rounded-full border",
                        "bg-background/70 backdrop-blur",
                        selected.includes(s.id)
                          ? "text-primary border-primary/30"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-1.5 text-sm">
                    {shown.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/40" />
                        <span className="text-foreground/90">{b}</span>
                      </li>
                    ))}
                    {expanded &&
                      rest.map((b, i) => (
                        <li key={`x-${i}`} className="flex gap-2">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary/25" />
                          <span className="text-foreground/90">{b}</span>
                        </li>
                      ))}
                  </ul>

                  {rest.length > 0 && (
                    <button
                      onClick={() =>
                        setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))
                      }
                      className="mt-3 inline-flex items-center gap-1 text-sm text-primary"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                      {expanded ? tLess : tMore}
                    </button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
