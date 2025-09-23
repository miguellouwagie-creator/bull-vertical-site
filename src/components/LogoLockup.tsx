import React from "react";
import bullLogo from "@/assets/bull-logo.jpg";

type Props = {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * Logo + nombre con fallback:
 * 1) Si existe /logo/bull-mark.svg en public → lo usa (nítido).
 * 2) Si no existe → cae a src/assets/bull-logo.jpg (tu imagen actual).
 */
export function LogoLockup({ className = "", href = "#", size = "md" }: Props) {
  const iconSize =
    size === "sm"
      ? "h-7 w-7 md:h-8 md:w-8"
      : size === "lg"
        ? "h-12 w-12 md:h-14 md:w-14"
        : "h-8 w-8 md:h-9 md:w-9";

  return (
    <a
      href={href}
      className={`group flex items-center gap-3 ${className}`}
      aria-label="BULL Vertical Services — Home"
    >
      {/* Marca: intenta SVG público, si falla usa JPG local */}
      <img
        src="/logo/bull-mark.svg"
        alt="BULL mark"
        className={`shrink-0 ${iconSize} object-contain rounded transition-opacity group-hover:opacity-95`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = bullLogo;
        }}
        loading="eager"
        decoding="async"
      />

      {/* Wordmark (texto) */}
      <div className="leading-tight">
        <div className="flex items-baseline gap-2">
          <span className="text-lg md:text-xl font-extrabold text-foreground transition-transform group-hover:scale-[1.01]">
            BULL
          </span>
          <span className="text-base md:text-lg font-semibold text-foreground/80">
            Vertical Services
          </span>
        </div>
        <div className="text-[11px] md:text-xs font-medium text-foreground/60 tracking-wide">
          LLC
        </div>
      </div>
    </a>
  );
}
