import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type MediaType = "image" | "video";
type WorkItem = {
  src: string;
  title: string;
  type?: MediaType;
  poster?: string;
};

const PER_PAGE = 18;

/* Mezcla para dar variedad al collage */
function shuffleOnce<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Comprueba en serie qué imagen de póster existe realmente */
function probeImage(url: string): Promise<boolean> {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = url;
  });
}
async function findPoster(
  videoSrc: string,
  explicitPoster?: string,
): Promise<string | null> {
  const m = videoSrc.match(/^(.+)\.[a-z0-9]+$/i);
  const base = m ? m[1] : videoSrc;
  const candidates = [
    explicitPoster,
    `${base}-poster.jpg`,
    `${base}-poster.webp`,
    `${base}.jpg`,
    `${base}.webp`,
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    // eslint-disable-next-line no-await-in-loop
    if (await probeImage(c)) return c;
  }
  return null;
}

/* Miniatura de vídeo robusta:
   - Si existe póster -> <img>
   - Si no, usa <video> que pinta el 1er frame (preload + seek + play→pause)
   - En hover: preview (play), onLeave: pause & reset a 0
*/
const VideoThumb: React.FC<{
  src: string;
  poster?: string;
  alt: string;
  eager?: boolean;
}> = ({ src, poster, alt, eager }) => {
  const [posterUrl, setPosterUrl] = useState<string | null | undefined>(
    undefined,
  );
  const [loaded, setLoaded] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  // Busca un póster real (si no hay, será null y usaremos <video>)
  useEffect(() => {
    let alive = true;
    findPoster(src, poster).then((p) => alive && setPosterUrl(p));
    return () => {
      alive = false;
    };
  }, [src, poster]);

  // Si hay póster -> úsalo
  if (posterUrl) {
    return (
      <img
        src={posterUrl}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="w-full h-auto block rounded-2xl opacity-0 transition-opacity duration-500 ease-out"
        onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
      />
    );
  }

  // Si aún no sabemos o no existe -> <video> con primer frame
  return (
    <video
      ref={vidRef}
      src={src}
      // Nota: usamos auto para asegurar datos del primer frame
      preload="auto"
      muted
      playsInline
      controls={false}
      disablePictureInPicture
      // estilo "skeleton" hasta cargar
      className={[
        "w-full h-auto block rounded-2xl",
        loaded ? "" : "opacity-0",
        "transition-opacity duration-500 ease-out",
      ].join(" ")}
      style={
        loaded
          ? undefined
          : {
              background:
                "linear-gradient(90deg, #e9edf3 25%, #f6f8fb 37%, #e9edf3 63%)",
              backgroundSize: "400% 100%",
              animation: "pulse 1.2s ease-in-out infinite",
            }
      }
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        // Mueve un poco el tiempo para forzar el primer frame
        try {
          v.currentTime = Math.max(
            0.1,
            Math.min(0.2, (v.duration || 0.2) - 0.05),
          );
        } catch {}
      }}
      onLoadedData={async (e) => {
        const v = e.currentTarget;
        // Truco: play→pause para pintar el frame inicial en todos los navegadores
        try {
          await v.play();
          v.pause();
        } catch {
          /* ignoramos restricciones de autoplay si ocurrieran */
        }
        setLoaded(true);
      }}
      onMouseEnter={async () => {
        const v = vidRef.current;
        if (!v) return;
        try {
          await v.play();
        } catch {
          /* ignore */
        }
      }}
      onMouseLeave={() => {
        const v = vidRef.current;
        if (!v) return;
        try {
          v.pause();
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
      }}
      onError={() => {
        // Si algo va mal, mostramos un placeholder sobrio (sin “cuadro en blanco”)
        setLoaded(true);
      }}
    />
  );
};

export const WorkGallery: React.FC = () => {
  const { lang } = useLang();
  const dict = (translations as any)[lang]?.work ?? {};

  const labels = {
    title:
      dict.title ??
      (lang === "es" ? "Trabajos en ejecución" : "Work in progress"),
    desc:
      dict.description ??
      (lang === "es"
        ? "Selección de proyectos recientes con el equipo trabajando en cuerda o con sistemas de acceso."
        : "A selection of recent jobs while our technicians were on-rope or using access systems."),
    loadMore: lang === "es" ? "Ver más" : "Load more",
    videoBadge: lang === "es" ? "Vídeo" : "Video",
    viewerLabel: lang === "es" ? "Visor de galería" : "Gallery viewer",
    itemsLoaded:
      lang === "es"
        ? (n: number) => `Se han cargado ${n} elementos.`
        : (n: number) => `${n} items loaded.`,
  };

  // 📦 /public/work/  (sin categorías)
  const RAW_ITEMS: WorkItem[] = [
    { src: "/work/1.jpg", title: "Work 1" },
    { src: "/work/a2.jpg", title: "Work a2" },
    { src: "/work/b.jpg", title: "Work b" },
    { src: "/work/b2.jpg", title: "Work b2" },
    { src: "/work/c.jpg", title: "Work c" },
    { src: "/work/c2.jpg", title: "Work c2" },
    { src: "/work/d.jpg", title: "Work d" },
    { src: "/work/d2.jpg", title: "Work d2" },
    { src: "/work/e.jpg", title: "Work e" },
    { src: "/work/e2.jpg", title: "Work e2" },
    { src: "/work/f.jpg", title: "Work f" },
    { src: "/work/f2.jpg", title: "Work f2" },
    { src: "/work/g.jpg", title: "Work g" },
    { src: "/work/h.jpg", title: "Work h" },
    { src: "/work/i.jpg", title: "Work i" },
    { src: "/work/j.jpg", title: "Work j" },
    { src: "/work/k.jpg", title: "Work k" },
    { src: "/work/l.jpg", title: "Work l" },
    { src: "/work/m.jpg", title: "Work m" },
    { src: "/work/n.jpg", title: "Work n" },
    { src: "/work/o.jpg", title: "Work o" },
    { src: "/work/p.jpg", title: "Work p" },
    { src: "/work/q.jpg", title: "Work q" },
    { src: "/work/r.jpg", title: "Work r" },
    { src: "/work/s.jpg", title: "Work s" },
    { src: "/work/t.jpg", title: "Work t" },
    { src: "/work/u.jpg", title: "Work u" },
    { src: "/work/w.jpg", title: "Work w" },
    { src: "/work/y.jpg", title: "Work y" },
    { src: "/work/z.jpg", title: "Work z" },

    // Vídeos: si tienes póster estático (recomendado), déjalo en `poster`
    {
      src: "/work/v1.mp4",
      title: "Video v1",
      type: "video",
      poster: "/work/v1-poster.jpg",
    },
    {
      src: "/work/v2.mp4",
      title: "Video v2",
      type: "video",
      poster: "/work/v2-poster.jpg",
    },
  ];

  const SHUFFLED = useMemo(() => shuffleOnce(RAW_ITEMS), []);
  const [visible, setVisible] = useState(PER_PAGE);
  const [openAt, setOpenAt] = useState<number | null>(null);
  const liveRegionRef = useRef<HTMLParagraphElement>(null);

  const visibleItems = SHUFFLED.slice(0, visible);
  const canLoadMore = visible < SHUFFLED.length;

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = labels.itemsLoaded(
        visibleItems.length,
      );
    }
  }, [visibleItems.length, labels]);

  // Navegación por teclado en el visor
  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight")
        setOpenAt((i) => (i === null ? i : (i + 1) % visibleItems.length));
      if (e.key === "ArrowLeft")
        setOpenAt((i) =>
          i === null ? i : (i - 1 + visibleItems.length) % visibleItems.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAt, visibleItems.length]);

  // Al cerrar el lightbox, pausa vídeo
  useEffect(() => {
    if (openAt === null) return;
    return () => {
      const el = document.getElementById(
        "bv-lightbox-video",
      ) as HTMLVideoElement | null;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
    };
  }, [openAt]);

  return (
    <section
      id="work"
      className="py-20 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {labels.title}
          </h2>
        </div>

        {/* Masonry por columnas */}
        <div className="columns-2 sm:columns-3 lg:columns-5 xl:columns-6 gap-4 [column-fill:_balance]">
          {visibleItems.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              onClick={() => setOpenAt(idx)}
              className={[
                "group mb-4 w-full break-inside-avoid overflow-hidden",
                "rounded-2xl bg-card ring-1 ring-border shadow-sm",
                "transition duration-200 hover:shadow-md hover:-translate-y-0.5",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
              ].join(" ")}
              aria-label={item.title}
            >
              {item.type === "video" ? (
                <div className="relative">
                  <VideoThumb
                    src={item.src}
                    poster={item.poster}
                    alt={item.title}
                    eager={idx < 6}
                  />
                  <span className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] text-white">
                    <Play className="h-3 w-3" /> {labels.videoBadge}
                  </span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  loading={idx < 6 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="w-full h-auto block rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:scale-[1.01]"
                  onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                  style={{
                    background:
                      "linear-gradient(90deg, #e9edf3 25%, #f6f8fb 37%, #e9edf3 63%)",
                    backgroundSize: "400% 100%",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {canLoadMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisible((v) => v + PER_PAGE)}
              className="inline-flex items-center justify-center rounded-md border px-4 h-10 text-sm font-medium hover:bg-accent"
            >
              {labels.loadMore}
            </button>
            <p ref={liveRegionRef} aria-live="polite" className="sr-only" />
          </div>
        )}
      </div>

      {/* Lightbox */}
      {openAt !== null && visibleItems[openAt] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenAt(null)}
          role="dialog"
          aria-modal="true"
          aria-label={labels.viewerLabel}
        >
          {/* Cerrar */}
          <button
            aria-label={lang === "es" ? "Cerrar" : "Close"}
            onClick={() => setOpenAt(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Prev */}
          {visibleItems.length > 1 && (
            <button
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setOpenAt((i) =>
                  i === null
                    ? i
                    : (i - 1 + visibleItems.length) % visibleItems.length,
                );
              }}
              aria-label={lang === "es" ? "Anterior" : "Previous"}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Contenido */}
          <div
            className="max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {visibleItems[openAt].type === "video" ? (
              <video
                id="bv-lightbox-video"
                src={visibleItems[openAt].src}
                controls
                playsInline
                muted
                className="max-h-[85vh] w-auto h-auto mx-auto rounded-lg"
              />
            ) : (
              <img
                src={visibleItems[openAt].src}
                alt={visibleItems[openAt].title}
                className="max-h-[85vh] w-auto h-auto mx-auto rounded-lg"
                draggable={false}
                decoding="async"
              />
            )}
          </div>

          {/* Next */}
          {visibleItems.length > 1 && (
            <button
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setOpenAt((i) =>
                  i === null ? i : (i + 1) % visibleItems.length,
                );
              }}
              aria-label={lang === "es" ? "Siguiente" : "Next"}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
