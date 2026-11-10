/**
 * Antigravity / Google Cloud Code "verify your account" challenge & appeal links.
 *
 * Google answers some Antigravity requests with `403 VALIDATION_REQUIRED`
 * ("Verify your account to continue") or `403 PERMISSION_DENIED (TOS_VIOLATION)`
 * ("This service has been disabled in this account for violation of Terms of Service")
 * and ships the URL that unlocks or appeals the account in the error body —
 * `error.details[].metadata.validation_url`, `error.details[].metadata.appeal_url`,
 * `error.details[].links[].url`, `ineligibleTiers[].validationUrl` or free text.
 * errorClassifier.ts already handles classification; this module extracts the
 * URL so the dashboard can offer it to the operator.
 *
 * Pure (no DB, no logging): the URL may carry a continuation token, so callers
 * must never log it or echo it into a client-facing error body.
 */

type JsonRecord = Record<string, unknown>;

const GOOGLE_ACCOUNTS_HOST = "accounts.google.com";
const GOOGLE_MYACCOUNT_HOST = "myaccount.google.com";
const GOOGLE_FORMS_HOST = "forms.gle";
const GOOGLE_DOCS_HOST = "docs.google.com";
export const GOOGLE_AGE_VERIFICATION_URL = "https://myaccount.google.com/age-verification";
const VERIFICATION_WORDING =
  /validation|verif|appeal|tos_violation|violation of terms|restricted_age|age-verification/i;
const AGE_VERIFICATION_WORDING =
  /restricted_age|18 years(?: old)?(?: or older)?|verif(?:y|ied|ication).*age|age.*verif(?:y|ied|ication)/i;
// Bounded quantifier keeps the scan linear on untrusted upstream text. A backslash ends the
// link unless it escapes a slash, so raw text like `...x=1\"` does not leak into the URL.
const FREE_TEXT_URL =
  /https:(?:\\\/\\\/|\/\/)(?:accounts\.google\.com|myaccount\.google\.com|forms\.gle|docs\.google\.com(?:\/|\\\/)forms)(?:\/|\\\/)(?:[^\s"'\\<>]|\\\/){1,2048}/i;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** Only Google account verification or official Google appeal forms are ever surfaced as a link. */
export function isGoogleVerificationUrl(candidate: unknown): candidate is string {
  if (typeof candidate !== "string" || candidate.length === 0) return false;
  try {
    const normalized = candidate.replace(/\\\//g, "/");
    const parsed = new URL(normalized);
    if (parsed.protocol !== "https:") return false;
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === GOOGLE_ACCOUNTS_HOST ||
      hostname === GOOGLE_MYACCOUNT_HOST ||
      hostname === GOOGLE_FORMS_HOST
    ) {
      return true;
    }
    if (hostname === GOOGLE_DOCS_HOST && parsed.pathname.startsWith("/forms/")) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function isRestrictedAgeTier(tier: JsonRecord | null): boolean {
  if (!tier) return false;
  if (tier.reasonCode === "RESTRICTED_AGE") return true;
  const msg = typeof tier.reasonMessage === "string" ? tier.reasonMessage : "";
  return AGE_VERIFICATION_WORDING.test(msg);
}

function collectJsonCandidates(json: JsonRecord, out: unknown[]): void {
  for (const tier of asArray(json.ineligibleTiers)) {
    const record = asRecord(tier);
    if (record) {
      out.push(record.validationUrl, record.validation_url, record.appeal_url);
      if (isRestrictedAgeTier(record)) {
        out.push(GOOGLE_AGE_VERIFICATION_URL);
      }
    }
  }
  out.push(json.validationUrl, json.validation_url, json.appeal_url);
  if (isRestrictedAgeTier(json)) {
    out.push(GOOGLE_AGE_VERIFICATION_URL);
  }

  const err = asRecord(json.error) ?? json;
  const details = asArray(err.details)
    .map(asRecord)
    .filter((d): d is JsonRecord => d !== null);
  for (const detail of details) {
    const meta = asRecord(detail.metadata);
    if (meta) {
      out.push(meta.validation_url, meta.validationUrl, meta.appeal_url, meta.appealUrl);
      if (isRestrictedAgeTier(meta)) {
        out.push(GOOGLE_AGE_VERIFICATION_URL);
      }
    }
    if (detail.reason === "RESTRICTED_AGE") {
      out.push(GOOGLE_AGE_VERIFICATION_URL);
    }
  }

  // Help links are generic (they also point at support pages), so only trust
  // them when the error itself is a verification challenge.
  const message = typeof err.message === "string" ? err.message : "";
  const isVerificationError =
    VERIFICATION_WORDING.test(message) ||
    details.some((d) => typeof d.reason === "string" && VERIFICATION_WORDING.test(d.reason));

  if (AGE_VERIFICATION_WORDING.test(message)) {
    out.push(GOOGLE_AGE_VERIFICATION_URL);
  }

  if (!isVerificationError) return;
  for (const detail of details) {
    for (const link of asArray(detail.links)) out.push(asRecord(link)?.url);
  }
}

/**
 * Best-effort extraction of the Google account-verification URL from an upstream
 * payload (parsed JSON or raw text). Returns the normalized URL, or null.
 */
export function extractVerificationUrl(payload: unknown): string | null {
  if (payload === null || payload === undefined) return null;

  let json: unknown = payload;
  let text = "";
  if (typeof payload === "string") {
    text = payload;
    try {
      json = JSON.parse(payload);
    } catch {
      json = null;
    }
  }

  const candidates: unknown[] = [];
  const root = asRecord(Array.isArray(json) ? json[0] : json);
  if (root) collectJsonCandidates(root, candidates);

  if (text && VERIFICATION_WORDING.test(text)) {
    const match = text.match(FREE_TEXT_URL);
    if (match) candidates.push(match[0]);
    if (AGE_VERIFICATION_WORDING.test(text)) {
      candidates.push(GOOGLE_AGE_VERIFICATION_URL);
    }
  }

  for (const candidate of candidates) {
    const normalized = typeof candidate === "string" ? candidate.replace(/\\\//g, "/") : candidate;
    if (isGoogleVerificationUrl(normalized)) return new URL(normalized).href;
  }
  return null;
}

// Unlike FREE_TEXT_URL this keeps going past a backslash: a raw JSON body may hold the
// continuation token behind a `\u0026`, and masking too much is the safe side for a log.
const ANY_ACCOUNTS_OR_APPEAL_URL =
  /https:(?:\\\/\\\/|\/\/)(?:accounts\.google\.com|myaccount\.google\.com|forms\.gle|docs\.google\.com(?:\/|\\\/)forms(?:\/|\\\/))[^\s"'<>]{1,2048}/gi;

/** Masks every accounts.google.com and appeal link so a raw upstream body can be logged safely. */
export function redactVerificationUrls(text: string): string {
  return text.replace(ANY_ACCOUNTS_OR_APPEAL_URL, "[verification-url]");
}

/** Reads the persisted link from a connection's providerSpecificData (validated). */
export function readStoredVerificationUrl(providerSpecificData: unknown): string | null {
  const url = asRecord(providerSpecificData)?.verificationUrl;
  return isGoogleVerificationUrl(url) ? url : null;
}

/**
 * Targets a Google verification or appeal URL to a specific Google account email
 * using Google's official AccountChooser service endpoint.
 *
 * If the user has multiple Google accounts logged in their browser, opening a raw
 * URL like `https://myaccount.google.com/age-verification` opens the browser's default
 * account (index 0). Wrapping it with `AccountChooser?Email=<email>&continue=<url>`
 * pre-selects the exact account matching this connection.
 */
export function targetGoogleVerificationUrl(
  url: string | null | undefined,
  email: string | null | undefined
): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return null;

  try {
    const parsed = new URL(trimmedUrl);
    const host = parsed.hostname.toLowerCase();
    // The QR code challenge (accounts.google.com/signin/continue) and the appeal form (forms.gle)
    // carry session-specific continuation tokens and must open directly without wrapping.
    // ONLY generic Google MyAccount pages (like age-verification) require targeting the specific
    // account email to prevent the browser from defaulting to the primary signed-in Google profile.
    if (host !== GOOGLE_MYACCOUNT_HOST) {
      return trimmedUrl;
    }

    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      return trimmedUrl;
    }
    if (
      parsed.hostname.toLowerCase() === "accounts.google.com" &&
      parsed.pathname === "/AccountChooser"
    ) {
      return trimmedUrl;
    }

    if (!parsed.searchParams.has("authuser")) {
      parsed.searchParams.set("authuser", trimmedEmail);
    }

    const chooserUrl = new URL("https://accounts.google.com/AccountChooser");
    chooserUrl.searchParams.set("Email", trimmedEmail);
    chooserUrl.searchParams.set("continue", parsed.toString());
    return chooserUrl.toString();
  } catch {
    return trimmedUrl;
  }
}
