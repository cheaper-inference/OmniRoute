import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { isRuntimeDocsMirrorPath } from "../../scripts/build/docsMirrorRuntime.mjs";
import { LOCALES } from "@/i18n/config";
import { resolveDataDir } from "@/lib/dataPaths";
import { resolveSafeI18nSectionDir } from "@/lib/docsI18nPath";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("docs/i18n-remote");

// npm installs ship no docs/i18n tree (#20438: the mirrors pushed the 3.8.54 tarball over the
// registry's size limit). For those installs the /docs route fetches the one mirror a request
// needs from the repository, pinned to the installed version's tag, and caches it under DATA_DIR.
// The host, repository and path layout are fixed here; a request only picks a locale and a page,
// both validated before any URL is built.
const MIRROR_ORIGIN = "https://raw.githubusercontent.com";
const MIRROR_REPOSITORY = "cheaper-inference/OmniRoute";

export const DOCS_I18N_REMOTE_TIMEOUT_MS = 5_000;
export const DOCS_I18N_REMOTE_MAX_BYTES = 2 * 1024 * 1024;
/** How long a page the tag does not have (404, unusable body) stays a known miss. */
const MISS_TTL_MS = 6 * 60 * 60 * 1000;
/** How long a server error or an unreachable network stops lookups. */
const RETRY_TTL_MS = 10 * 60 * 1000;
/** The miss table is bounded by locales × pages; this cap only guards against surprises. */
const MAX_REMEMBERED_MISSES = 20_000;

// Release tags are `v<semver>`; nightly tags add a `-nightly.<date>.<sha>` suffix.
const VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const SOURCE_PATH_RE = /^[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*\.md$/;
const DISABLED_VALUES = new Set(["0", "false", "off", "no"]);

export type DocsI18nRemoteOptions = {
  /** Overrides OMNIROUTE_DOCS_I18N_REMOTE. */
  enabled?: boolean;
  fetchImpl?: typeof fetch;
  /** Cache base; one `v<version>` directory below it per installed version. */
  cacheDir?: string;
  /** Defaults to the app's own package.json version. */
  version?: string;
  timeoutMs?: number;
  maxBytes?: number;
};

type Lookup = { version: string; relPath: string; url: string; cacheRoot: string; file: string };

const missUntil = new Map<string, number>();
const inFlight = new Map<string, Promise<boolean>>();

export function isDocsI18nRemoteEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env.OMNIROUTE_DOCS_I18N_REMOTE?.trim().toLowerCase();
  return !value || !DISABLED_VALUES.has(value);
}

/**
 * The raw GitHub URL of a runtime mirror at the `v<version>` tag, or `null` when the version is
 * not a release version or the path is not a mirror the docs route may serve
 * (`isRuntimeDocsMirrorPath`, which also rejects the operator-internal security pages).
 */
export function buildDocsMirrorUrl(version: string, relPath: string): string | null {
  if (!VERSION_RE.test(version) || !isRuntimeDocsMirrorPath(relPath)) return null;
  const url = new URL(`${MIRROR_ORIGIN}/${MIRROR_REPOSITORY}/v${version}/${relPath}`);
  return url.origin === MIRROR_ORIGIN ? url.href : null;
}

/**
 * `docs/i18n/<locale>/docs/<section>/<FILE>.md` for a request, or `null`.
 *
 * `sourcePath` is the English page's file (`page.path` from the docs source, e.g.
 * `getting-started/QUICK-START.md`); it only supplies the file name's case, which the slug lost.
 * It must name the same page as the validated slug, so the request decides nothing the guard
 * did not accept.
 */
function resolveMirrorRelPath(locale: string, slug: string[], sourcePath: string): string | null {
  if (locale === "en" || !LOCALES.includes(locale)) return null;
  if (!resolveSafeI18nSectionDir("/", locale, slug)) return null;

  const source = sourcePath.replace(/^\.\//, "");
  if (!SOURCE_PATH_RE.test(source)) return null;
  if (source.toLowerCase() !== `${slug.join("/")}.md`.toLowerCase()) return null;

  const relPath = `docs/i18n/${locale}/docs/${source}`;
  return isRuntimeDocsMirrorPath(relPath) ? relPath : null;
}

function resolveLookup(
  locale: string,
  slug: string[],
  sourcePath: string,
  options: DocsI18nRemoteOptions
): Lookup | null {
  const version = options.version ?? APP_CONFIG.version;
  const relPath = resolveMirrorRelPath(locale, slug, sourcePath);
  if (!relPath) return null;
  const url = buildDocsMirrorUrl(version, relPath);
  if (!url) return null;

  const cacheBase = options.cacheDir ?? path.join(resolveDataDir(), "cache", "docs-i18n");
  const cacheRoot = path.join(cacheBase, `v${version}`);
  // Same chokepoint as the bundled tree: the cache is laid out as `<cacheRoot>/i18n/...`.
  const sectionDir = resolveSafeI18nSectionDir(cacheRoot, locale, slug);
  if (!sectionDir) return null;
  const file = path.join(sectionDir, path.posix.basename(relPath));
  if (path.dirname(file) !== sectionDir) return null;

  return { version, relPath, url, cacheRoot, file };
}

function rememberMiss(key: string, ttlMs: number): void {
  if (missUntil.size >= MAX_REMEMBERED_MISSES) missUntil.clear();
  missUntil.set(key, Date.now() + ttlMs);
}

function isRemembered(key: string): boolean {
  const until = missUntil.get(key);
  if (until === undefined) return false;
  if (until > Date.now()) return true;
  missUntil.delete(key);
  return false;
}

/** Reads at most `maxBytes`; `null` when the body is larger. Throws on a network error or timeout. */
async function readCappedBytes(response: Response, maxBytes: number): Promise<Buffer | null> {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!response.body) return null;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

/** Strict UTF-8 decode; `null` for a body that is not valid UTF-8. */
function decodeUtf8(bytes: Buffer): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

function writeAtomically(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(tmp, content, "utf8");
    fs.renameSync(tmp, file);
  } catch (err) {
    fs.rmSync(tmp, { force: true });
    throw err;
  }
}

/**
 * Why a fetch failed. `offline` (timeout or network error) stops lookups for the whole version;
 * anything else is remembered for that page only, for `retryAfterMs`.
 */
type FetchFailure = { reason: string; offline: boolean; retryAfterMs: number };

const offlineFailure = (reason: string): FetchFailure => ({
  reason,
  offline: true,
  retryAfterMs: RETRY_TTL_MS,
});

const pageFailure = (reason: string, retryAfterMs: number = MISS_TTL_MS): FetchFailure => ({
  reason,
  offline: false,
  retryAfterMs,
});

async function discardBody(response: Response): Promise<void> {
  await response.body?.cancel().catch(() => {});
}

/** `null` for a `200` text response from the requested URL, otherwise why it is refused. */
async function checkResponse(response: Response, url: string): Promise<FetchFailure | null> {
  let failure: FetchFailure | null = null;
  if (response.url && response.url !== url) {
    failure = pageFailure("unexpected-url");
  } else if (response.status !== 200) {
    const retryAfterMs = response.status >= 500 ? RETRY_TTL_MS : MISS_TTL_MS;
    failure = pageFailure(`status-${response.status}`, retryAfterMs);
  } else if (!/^text\/(?:plain|markdown)\b/i.test(response.headers.get("content-type") ?? "")) {
    failure = pageFailure("content-type");
  }
  if (failure) await discardBody(response);
  return failure;
}

/** Reads, decodes and caches an accepted response; `null` once the file is in the cache. */
async function storeBody(
  response: Response,
  file: string,
  maxBytes: number,
  signal: AbortSignal
): Promise<FetchFailure | null> {
  let bytes: Buffer | null;
  try {
    bytes = await readCappedBytes(response, maxBytes);
  } catch {
    return offlineFailure(signal.aborted ? "timeout" : "network");
  }
  if (bytes === null) return pageFailure("too-large");

  const text = decodeUtf8(bytes);
  if (text === null) return pageFailure("invalid-utf8");

  try {
    writeAtomically(file, text);
  } catch {
    return pageFailure("cache-write", RETRY_TTL_MS);
  }
  return null;
}

/** Fetches the mirror into the cache; `null` on success. */
async function fetchIntoCache(
  lookup: Lookup,
  options: DocsI18nRemoteOptions
): Promise<FetchFailure | null> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const signal = AbortSignal.timeout(options.timeoutMs ?? DOCS_I18N_REMOTE_TIMEOUT_MS);

  let response: Response;
  try {
    // `redirect: "error"`: the pinned raw URL never redirects, so a redirect is refused rather than
    // followed to whatever host it names. `no-store`: this module is the cache, not Next's fetch cache.
    response = await fetchImpl(lookup.url, {
      redirect: "error",
      signal,
      cache: "no-store",
      headers: { accept: "text/plain" },
    });
  } catch {
    return offlineFailure(signal.aborted ? "timeout" : "network");
  }

  const refused = await checkResponse(response, lookup.url);
  if (refused) return refused;
  return storeBody(response, lookup.file, options.maxBytes ?? DOCS_I18N_REMOTE_MAX_BYTES, signal);
}

/**
 * Make the mirror for this request available in the DATA_DIR cache, fetching it from the pinned
 * tag on a cache miss. Returns the cache's docs root (laid out like `docs/`, so the caller reads it
 * back through `resolveSafeI18nSectionDir`) or `null`, in which case the English page is served.
 *
 * Only meant for installs without a bundled docs/i18n tree; the caller checks that. Never throws.
 */
export async function ensureRemoteDocsMirror(
  locale: string,
  slug: string[],
  sourcePath: string,
  options: DocsI18nRemoteOptions = {}
): Promise<string | null> {
  if (!(options.enabled ?? isDocsI18nRemoteEnabled())) return null;

  const lookup = resolveLookup(locale, slug, sourcePath, options);
  if (!lookup) return null;
  if (fs.existsSync(lookup.file)) return lookup.cacheRoot;

  // A network failure stops lookups for the whole version: an offline install waits on the
  // timeout once per back-off window, not once per page.
  const offlineKey = `${lookup.version}|network`;
  const pageKey = `${lookup.version}|${lookup.relPath}`;
  if (isRemembered(offlineKey) || isRemembered(pageKey)) return null;

  let pending = inFlight.get(pageKey);
  if (!pending) {
    pending = fetchIntoCache(lookup, options)
      .catch((): FetchFailure => pageFailure("unexpected", RETRY_TTL_MS))
      .then((failure) => {
        if (!failure) return true;
        rememberMiss(failure.offline ? offlineKey : pageKey, failure.retryAfterMs);
        log.warn(
          { locale, page: lookup.relPath, version: lookup.version, reason: failure.reason },
          "Could not fetch the translated doc; serving English"
        );
        return false;
      })
      .finally(() => inFlight.delete(pageKey));
    inFlight.set(pageKey, pending);
  }
  return (await pending) ? lookup.cacheRoot : null;
}
