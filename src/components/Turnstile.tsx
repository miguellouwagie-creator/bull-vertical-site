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
    let cancelled = false;
    /*
     * TSC FIX: initialise as `undefined` so TypeScript knows the variable may
     * not have been assigned when the cleanup runs synchronously (i.e. when
     * window.turnstile was already available and setTimeout was never called).
     * `clearTimeout(undefined)` is a no-op in browsers but the compiler cannot
     * verify that without the explicit `| undefined` annotation.
     */
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tryRender = () => {
      if (cancelled) return;
      if (!window.turnstile) {
        timeoutId = setTimeout(tryRender, 100);
        return;
      }
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
      // Safe: clearTimeout(undefined) is a no-op; no TS2454 with the | undefined type.
      clearTimeout(timeoutId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  // Callbacks intentionally excluded: changing them must not re-render the widget.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={containerRef} className="cf-turnstile" />;
}
