/**
 * Cloudflare Turnstile widget — invisible/managed CAPTCHA.
 *
 * Fix #1: Memory leak — setTimeout retry loop is now properly cancelled
 * on unmount via a `cancelled` flag + `clearTimeout`.
 *
 * Docs: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
 */
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
}

export function Turnstile({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = "light",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // FIX #1: cancelled flag + stored timeout id so the retry loop is
    // fully stopped on unmount — no more dangling setTimeouts.
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tryRender = () => {
      if (cancelled) return;
      if (!window.turnstile) {
        timeoutId = setTimeout(tryRender, 100);
        return;
      }
      // Guard: container may already be removed if unmounted during the wait
      if (!containerRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
      });
    };

    tryRender();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  // Callbacks intentionally excluded: changing them must not re-render the widget.
  // Only siteKey changes warrant a full re-render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={containerRef} className="cf-turnstile" />;
}
