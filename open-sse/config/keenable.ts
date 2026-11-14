/**
 * Keenable shared client constants.
 *
 * Keenable serves search and fetch without a key on `/public` endpoints, and
 * those require the calling app to name itself in `X-Keenable-Title` (the API
 * answers 400 without it). Search (open-sse/handlers/search/keenableSearch.ts),
 * fetch (open-sse/executors/keenable-fetch.ts) and the dashboard key check all
 * read the host and the header from here so they can never drift apart.
 *
 * Docs: https://docs.keenable.ai/api-reference
 */

/** Fixed API host. A configured key is only ever sent here. */
export const KEENABLE_API_BASE = "https://api.keenable.ai";

/** Header Keenable uses to attribute a request to the calling app. */
export const KEENABLE_TITLE_HEADER = "X-Keenable-Title";

/** The value OmniRoute sends on every Keenable call, keyless or keyed. */
export const KEENABLE_APP_TITLE = "OmniRoute";
