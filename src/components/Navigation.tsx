import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";
import { LogoLockup } from "@/components/LogoLockup";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t } = useLang();

  // Links visibles (sin "Process"; "Contact" va como CTA aparte)
  const navItems = [
    { href: "#services", label: t("nav.services") },
    { href: "#safety", label: t("nav.safety") },
    { href: "#faq", label: t("nav.faq") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observa las secciones y marca el link activo según el scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = ["services", "safety", "faq", "contact"]; // incluye contact para accesibilidad
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // de los que están en viewport, elige el de mayor ratio
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (inView.length > 0) {
          const current = (inView[0].target as HTMLElement).id;
          setActiveId(current);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.56] },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isActiveHref = (href: string) => activeId && `#${activeId}` === href;

  return (
    <nav
      aria-label="Primary"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all",
        "backdrop-blur-xl",
        scrolled
          ? "bg-white/85 border-b border-border shadow-sm"
          : "bg-gradient-to-b from-white/70 to-transparent",
      ].join(" ")}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo + nombre (con fallback a JPG) */}
          <LogoLockup size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActiveHref(item.href) ? "true" : undefined}
                    className={[
                      "px-3 py-2 text-sm font-semibold rounded-full transition relative",
                      "text-foreground/80 hover:text-foreground hover:bg-foreground/5",
                      isActiveHref(item.href)
                        ? "bg-foreground/10 text-foreground"
                        : "",
                      "after:absolute after:left-3 after:right-3 after:-bottom-0.5",
                      "after:h-[2px] after:origin-left after:scale-x-0 hover:after:scale-x-100",
                      "after:transition-transform after:bg-foreground/30",
                    ].join(" ")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA Contact (principal) */}
            <a
              href="#contact"
              aria-current={activeId === "contact" ? "true" : undefined}
            >
              <Button className="h-9 px-4 text-sm font-semibold shadow-sm">
                {t("nav.contact")}
              </Button>
            </a>

            {/* Language Switcher */}
            <div className="pl-3 ml-1 border-l border-border/60">
              <LanguageSwitcher onChange={() => setIsOpen(false)} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <div className="px-4 pb-2">
              <LanguageSwitcher onChange={() => setIsOpen(false)} />
            </div>

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActiveHref(item.href) ? "true" : undefined}
                className={[
                  "block py-2 px-4 text-[15px] font-semibold rounded-lg transition-colors",
                  "text-foreground/90 hover:bg-foreground/5",
                  isActiveHref(item.href) ? "bg-foreground/5" : "",
                ].join(" ")}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-2">
              <Button asChild className="w-full h-10 font-semibold shadow-sm">
                <a
                  href="#contact"
                  aria-current={activeId === "contact" ? "true" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {t("nav.contact")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
