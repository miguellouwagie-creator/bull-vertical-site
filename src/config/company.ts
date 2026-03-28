/**
 * Single source of truth for all company contact data.
 *
 * Sensitive values (phone, email, WhatsApp) are read from Vite environment
 * variables so they are NEVER hardcoded in the codebase.
 *
 * Development : copy .env.example → .env.local and fill real values.
 * Production  : set variables in Cloudflare Pages dashboard
 *               (Settings > Environment variables).
 *
 * Runtime guard: if a variable is missing at build time, the fallback
 * empty string is returned so the UI degrades gracefully (link href=""
 * rather than href="undefined") and the type stays `string` throughout.
 */

/** Official street address — keep in sync with LD+JSON in index.html */
export const ADDRESS_TEXT = "515 N.W. 59th Ave., Ste. 519, Miami, FL 33126";

/** Read a VITE_ env variable; return empty string (not undefined) if absent. */
function env(key: string): string {
  const val = (import.meta.env as Record<string, string | undefined>)[key];
  if (import.meta.env.DEV && !val) {
    // Warn loudly in development so the developer knows what to configure.
    console.warn(
      `[company.ts] Missing env variable "${key}". ` +
      `Create .env.local from .env.example and restart the dev server.`,
    );
  }
  return val ?? "";
}

export const COMPANY = {
  name: "BULL Vertical Services LLC",
  addressText: ADDRESS_TEXT,
  address: {
    streetAddress: "515 N.W. 59th Ave., Ste. 519",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33126",
    addressCountry: "US",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS_TEXT),

  /** E.164 phone number for tel: links — e.g. +17861234567 */
  phone: env("VITE_PHONE_E164"),

  /** WhatsApp number (no '+') for wa.me links — Spanish market */
  waPhoneEs: env("VITE_WA_PHONE_ES"),

  /** Public contact email */
  email: env("VITE_CONTACT_EMAIL"),
};
