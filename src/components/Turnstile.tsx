/**
 * Cloudflare Turnstile widget — invisible/managed CAPTCHA.
 *
 * Usage:
 *   <Turnstile siteKey={VITE_TURNSTILE_SITE_KEY} onVerify={(token) => setToken(token)} />
 *
 * The widget script (challenges.cloudflare.com) is loaded once globally
 * via index.html. This component renders the target div and calls
 * window.turnstile.render() after mount.
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
    if (!containerRef.current) return;

    // Retry until the Turnstile script has loaded (async defer in index.html)
    const tryRender = () => {
      if (!window.turnstile) {
        setTimeout(tryRender, 100);
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current!, {
        sitekey: siteKey,
        theme,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
      });
    };
    tryRender();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={containerRef} className="cf-turnstile" />;
}
