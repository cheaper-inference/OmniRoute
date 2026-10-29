/**
 * Model surfaces the published OpenCode catalog declares (`provider.npm`), read by
 * `open-sse/config/providerModels.ts` to pick a key-based model's endpoint (Responses for
 * `@ai-sdk/openai`, Messages for `@ai-sdk/anthropic`). Nothing here imports a `node:`
 * builtin or a `src/` module: `providerModels.ts` is reachable from the client bundle and
 * the open-sse → src boundary is ratcheted.
 *
 * Opt-in. The lookup answers only when the `OPENCODE_PUBLISHED_CATALOG_ROUTING_ENABLED`
 * feature flag is on. The flag is read through a gate the OpenCode executor registers
 * (`setPublishedCatalogRoutingGate`), because this module cannot import the server-side
 * flag resolver. No gate registered, or a gate that throws, reads as "off": the registry
 * decides exactly as before and no catalog request is ever made.
 *
 * When on, the maps are filled from one coalesced in-memory read of
 * `models.opencode.ai/api.json` (6 h TTL, 30 s floor between attempts, 5 s timeout, never
 * throws) and rewritten as a block on every successful read: one entry per published model,
 * no per-request growth, and a model the catalog moves to another SDK shows its new surface
 * on the next refresh. The same read also records the base URL each catalog section
 * publishes (`api`), so a key-based Zen/Go request follows the publisher's endpoint on the
 * next refresh instead of waiting for a release. The first request after a cold start sees
 * empty maps and keeps the registry values while the read runs in the background.
 */

const CATALOG_URL = "https://models.opencode.ai/api.json";
const FETCH_TIMEOUT_MS = 5_000;
/** Same rhythm as `opencodeCliVersion.ts`. */
export const OPENCODE_PUBLISHED_CATALOG_TTL_MS = 6 * 60 * 60 * 1000;
/** Floor between two attempts, so a down catalog is not re-read on every request. */
const REFRESH_FLOOR_MS = 30_000;

/**
 * Catalog sections read for the model surface and the base URL, by provider id (= public
 * alias for both). The catalog's `opencode` section is OpenCode Zen; the keyless OpenCode
 * Free provider (`opencode` / `oc`) was removed in #16310, so no other id maps here.
 */
const CATALOG_SECTION_BY_PROVIDER: Record<string, string> = {
  "opencode-zen": "opencode",
  "opencode-go": "opencode-go",
};

const OPENCODE_MODEL_PREFIXES = ["opencode/", "opencode-zen/", "opencode-go/"] as const;

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/** Raw `provider.npm` by `${catalogKey} ${modelId}`; rewritten as a block per catalog read. */
const npmByModel = new Map<string, string>();
/** Validated `api` by catalog section key; rewritten as a block per catalog read. */
const apiBySection = new Map<string, string>();
let fetchedAt = 0;
let lastAttemptAt = 0;
let inFlight: Promise<void> | null = null;
let testFetch: FetchLike | null = null;
let catalogFetch: FetchLike | null = null;

/**
 * The gate lives on `globalThis` so duplicated module instances (route bundles vs.
 * instrumentation) see the registration made by whichever copy of the executor loaded.
 */
const GATE_KEY = Symbol.for("omniroute.opencodePublishedCatalogRoutingGate");
type GateStore = { [GATE_KEY]?: (() => boolean) | null };

/**
 * Register (or clear, with `null`) the predicate that says whether catalog routing is on.
 * Called once by `open-sse/executors/opencode.ts` with the feature-flag reader.
 */
export function setPublishedCatalogRoutingGate(gate: (() => boolean) | null): void {
  (globalThis as GateStore)[GATE_KEY] = gate;
}

/** Fail closed: no gate, a throwing gate, or a non-true answer all read as "off". */
export function isPublishedCatalogRoutingEnabled(): boolean {
  const gate = (globalThis as GateStore)[GATE_KEY];
  if (typeof gate !== "function") return false;
  try {
    return gate() === true;
  } catch {
    return false;
  }
}

/**
 * Register (or clear, with `null`) the transport the catalog read goes through. Called once
 * by `open-sse/executors/opencode.ts` with the proxy-aware `proxyFetch`, because this module
 * cannot import it (it is reachable from the client bundle). Test runners keep using their
 * own injected fetch, which wins over this registration.
 */
export function setPublishedCatalogFetch(fetchImpl: FetchLike | null): void {
  catalogFetch = fetchImpl;
}

/** Raw `provider.npm` values by `${catalogKey} ${modelId}`, from one catalog read. */
export function readPublishedNpmByModel(catalog: unknown): Map<string, string> {
  const map = new Map<string, string>();
  if (!catalog || typeof catalog !== "object") return map;
  const sections = catalog as Record<string, { models?: Record<string, unknown> } | undefined>;
  for (const sectionKey of new Set(Object.values(CATALOG_SECTION_BY_PROVIDER))) {
    const models = sections[sectionKey]?.models;
    if (!models || typeof models !== "object") continue;
    for (const [modelId, entry] of Object.entries(models)) {
      const npm = (entry as { provider?: { npm?: unknown } } | null | undefined)?.provider?.npm;
      if (typeof npm === "string" && npm.trim()) map.set(`${sectionKey} ${modelId}`, npm);
    }
  }
  return map;
}

/** Replace every entry with one catalog read's result. */
export function replacePublishedCatalogNpm(next: Map<string, string>): void {
  npmByModel.clear();
  for (const [key, npm] of next) npmByModel.set(key, npm);
}

/**
 * The base URL each catalog section publishes in `api`, from one catalog read. A value that
 * fails `normalizePublishedApi` is dropped, so an unreachable or malformed endpoint never
 * replaces the registry base.
 */
export function readPublishedApiBySection(catalog: unknown): Map<string, string> {
  const map = new Map<string, string>();
  if (!catalog || typeof catalog !== "object") return map;
  const sections = catalog as Record<string, { api?: unknown } | undefined>;
  for (const sectionKey of new Set(Object.values(CATALOG_SECTION_BY_PROVIDER))) {
    const api = normalizePublishedApi(sections[sectionKey]?.api);
    if (api) map.set(sectionKey, api);
  }
  return map;
}

/** Replace every entry with one catalog read's result. */
export function replacePublishedApiBySection(next: Map<string, string>): void {
  apiBySection.clear();
  for (const [key, api] of next) apiBySection.set(key, api);
}

/**
 * Test runners stub `globalThis.fetch` and count dispatches; a background catalog read
 * would be counted as one. Under a runner only an injected fetch is ever used.
 */
function underTestRunner(): boolean {
  return (
    Boolean(process.env.NODE_TEST_CONTEXT || process.env.VITEST) || process.env.NODE_ENV === "test"
  );
}

function isFresh(): boolean {
  return fetchedAt > 0 && Date.now() - fetchedAt < OPENCODE_PUBLISHED_CATALOG_TTL_MS;
}

/**
 * Re-read the catalog (coalesced: concurrent callers share one fetch; never rejects).
 * A failed or empty read keeps the previous maps.
 */
export function refreshPublishedCatalog(): Promise<void> {
  if (inFlight) return inFlight;
  const fetchImpl: FetchLike | null =
    testFetch ?? catalogFetch ?? (underTestRunner() ? null : globalThis.fetch);
  if (!fetchImpl) return Promise.resolve();
  lastAttemptAt = Date.now();
  inFlight = (async () => {
    try {
      const response = await fetchImpl(CATALOG_URL, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!response.ok) {
        await response.body?.cancel().catch(() => {});
        return;
      }
      const catalog = await response.json();
      const next = readPublishedNpmByModel(catalog);
      if (next.size > 0) {
        replacePublishedCatalogNpm(next);
        replacePublishedApiBySection(readPublishedApiBySection(catalog));
        fetchedAt = Date.now();
      }
    } catch {
      // Catalog unreachable or not JSON: the previous maps (or the registry) stay in place.
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

function requestRefreshIfStale(): void {
  if (isFresh() || inFlight) return;
  if (Date.now() - lastAttemptAt < REFRESH_FLOOR_MS) return;
  void refreshPublishedCatalog();
}

/**
 * Sync hot path: the raw `provider.npm` the catalog publishes for this model, or
 * `undefined` when routing is off or the catalog is silent. Never awaits the network: a
 * stale or cold map starts one coalesced background read. Off → no read is ever started.
 */
export function getPublishedModelNpm(
  providerId: string | null | undefined,
  modelId: string | null | undefined
): string | undefined {
  const catalogKey = normalizeCatalogKey(providerId);
  const bareModel = stripCatalogModelPrefix(modelId);
  if (!catalogKey || !bareModel) return undefined;
  if (!isPublishedCatalogRoutingEnabled()) return undefined;
  requestRefreshIfStale();
  return (
    npmByModel.get(`${catalogKey} ${bareModel}`) ??
    npmByModel.get(`${catalogKey} ${stripEffortSuffix(bareModel)}`)
  );
}

/**
 * Sync hot path: the base URL the catalog publishes for this key-based Zen/Go provider, or
 * `undefined` when routing is off, the provider is outside Zen/Go, or the published value
 * was missing or invalid. Same contract as `getPublishedModelNpm`: a stale or cold map
 * starts one coalesced background read, and off starts no read at all.
 */
export function getPublishedBaseUrl(providerId: string | null | undefined): string | undefined {
  const catalogKey = normalizeCatalogKey(providerId);
  if (!catalogKey) return undefined;
  if (!isPublishedCatalogRoutingEnabled()) return undefined;
  requestRefreshIfStale();
  return apiBySection.get(catalogKey);
}

/**
 * The target format a published SDK rides, or `null` when the catalog decides nothing.
 * Only the measured SDKs map: everything else falls back to the registry heuristics.
 */
export function surfaceTargetFormatForNpm(npm: string | null | undefined): string | null {
  if (npm === "@ai-sdk/openai") return "openai-responses";
  if (npm === "@ai-sdk/anthropic") return "claude";
  return null;
}

/**
 * Test seam. Seeds both maps from a catalog-shaped object, without networking:
 * `catalog[section].models[modelId].provider.npm` (non-empty strings kept) and
 * `catalog[section].api` (validated). A seeded map counts as fresh, so no background read
 * starts.
 */
export function configurePublishedCatalogForTests(
  catalog: unknown,
  options: { fetchImpl?: FetchLike } = {}
): void {
  replacePublishedCatalogNpm(readPublishedNpmByModel(catalog));
  replacePublishedApiBySection(readPublishedApiBySection(catalog));
  fetchedAt = catalog ? Date.now() : 0;
  if (options.fetchImpl) testFetch = options.fetchImpl;
}

/**
 * Test seam: drop both maps, the timers' bookkeeping and any injected fetch. The
 * production transport registered through `setPublishedCatalogFetch` is wiring, not state,
 * so it survives (see the executor's registration).
 */
export function resetPublishedCatalogForTests(): void {
  npmByModel.clear();
  apiBySection.clear();
  fetchedAt = 0;
  lastAttemptAt = 0;
  inFlight = null;
  testFetch = null;
}

/** Provider id (alias or raw id — identical for Zen and Go) → catalog section key. */
function normalizeCatalogKey(providerId: string | null | undefined): string | undefined {
  if (typeof providerId !== "string" || !providerId) return undefined;
  return CATALOG_SECTION_BY_PROVIDER[providerId];
}

/**
 * The publisher's `api` value, or `undefined` when it must not replace the registry base.
 * https only, the publisher's own host (exact match, so `opencode.ai.evil.test` never
 * passes), no port, no credentials, no query or hash; the origin plus path, trailing slash
 * removed.
 */
function normalizePublishedApi(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:") return undefined;
  if (url.hostname !== "opencode.ai") return undefined;
  if (url.port !== "") return undefined;
  if (url.username !== "" || url.password !== "") return undefined;
  if (url.search !== "" || url.hash !== "") return undefined;
  return `${url.origin}${url.pathname}`.replace(/\/$/, "");
}

function stripCatalogModelPrefix(modelId: string | null | undefined): string | undefined {
  if (typeof modelId !== "string" || !modelId) return undefined;
  for (const prefix of OPENCODE_MODEL_PREFIXES) {
    if (modelId.startsWith(prefix)) return modelId.slice(prefix.length);
  }
  return modelId;
}

function stripEffortSuffix(modelId: string): string {
  return modelId.replace(/-(?:ultra|max|xhigh|high|medium|low|none)$/i, "");
}
