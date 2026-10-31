/**
 * Mirror feed URLs for one proxy subscription.
 *
 * One row of `proxy_subscriptions` owns one primary `url` plus an optional
 * JSON-encoded list of extra feed URLs stored in `mirror_urls`. The primary
 * stays required; mirrors are opt-in and default to none, so existing rows
 * sync exactly one feed as before.
 *
 * This module owns parsing, coercion and persistence of that column. Fetching
 * and merging live in `multiSource.ts`; the sync body in
 * `subscriptionService.ts` consumes both.
 */
import type { ProxySubscriptionRecord } from "./subscriptionService";
import { redactSubscriptionUrl } from "./url";

/** Upper bound on extra feeds per subscription. */
export const MAX_MIRROR_URLS = 5;

/**
 * Parse the raw `mirror_urls` column into a clean list. Tolerates every
 * legacy shape: NULL, empty string, malformed JSON, non-array JSON and
 * non-string entries all read as no mirrors. Never throws.
 */
export function parseMirrorUrls(raw: unknown): string[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((entry): entry is string => typeof entry === "string");
  } catch {
    return [];
  }
}

/**
 * Coerce a caller-supplied mirror list into storage shape. Trims entries,
 * drops empties, removes duplicates and mirrors equal to the primary URL,
 * and caps the list at MAX_MIRROR_URLS. `undefined`/`null` mean absent.
 * Never throws.
 */
export function coerceMirrorUrls(input: unknown, primaryUrl: string): string[] | null {
  if (input === undefined || input === null) return null;
  if (!Array.isArray(input)) return null;
  const primary = typeof primaryUrl === "string" ? primaryUrl.trim() : "";
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of input) {
    if (typeof entry !== "string") continue;
    const url = entry.trim();
    if (!url || url === primary || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
    if (out.length >= MAX_MIRROR_URLS) break;
  }
  return out;
}

/**
 * Responses redact mirror credentials, so a client that edits a
 * subscription can send a mirror back in its redacted form. Such an entry
 * maps back to the stored mirror it redacts from, so saving the list
 * unchanged never strips the stored credentials. Never throws.
 */
export function restoreRedactedMirrors(input: unknown, stored: string[]): unknown {
  if (!Array.isArray(input)) return input;
  return input.map((entry) => {
    if (typeof entry !== "string") return entry;
    const trimmed = entry.trim();
    const original = stored.find(
      (mirror) => mirror !== trimmed && redactSubscriptionUrl(mirror) === trimmed
    );
    return original ?? entry;
  });
}

/** Encode a coerced list for the `mirror_urls` column (`null` when empty). */
export function encodeMirrorUrls(mirrors: string[] | null): string | null {
  if (!mirrors || mirrors.length === 0) return null;
  return JSON.stringify(mirrors);
}

/**
 * Ordered fetch targets for a subscription: primary first, then mirrors.
 * Order is significant — first arrival wins every dedupe downstream.
 */
export function subscriptionFeedUrls(
  sub: Pick<ProxySubscriptionRecord, "url" | "mirrorUrls">
): string[] {
  const extra = Array.isArray(sub.mirrorUrls) ? sub.mirrorUrls : [];
  return [sub.url, ...extra];
}
