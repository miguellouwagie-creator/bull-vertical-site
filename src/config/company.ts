/**
 * Single source of truth for all company contact data.
 * Sensitive values (phone, email) are read from environment variables
 * so they are never hardcoded in the codebase.
 *
 * In development: create a `.env.local` file (see .env.example).
 * In production:  set variables in your hosting dashboard (Cloudflare Pages, etc.).
 */

/** Official street address — keep in sync with LD+JSON in index.html */
export const ADDRESS_TEXT = "515 N.W. 59th Ave., Ste. 519, Miami, FL 33126";

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

  /** E.164 phone number for tel: links */
  phone: import.meta.env.VITE_PHONE_E164 as string,

  /** WhatsApp number (no '+') for wa.me links — Spanish market */
  waPhoneEs: import.meta.env.VITE_WA_PHONE_ES as string,

  /** Public contact email */
  email: import.meta.env.VITE_CONTACT_EMAIL as string,
};
