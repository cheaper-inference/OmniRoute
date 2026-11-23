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
 * When on, the map is filled from one coalesced in-memory read of
 * `models.opencode.ai/api.json` (6 h TTL, 30 s floor between attempts, 5 s timeout, never
 * throws) and rewritten as a block on every successful read: one entry per published model,
 * no per-request growth, and a model the catalog moves to another SDK shows its new surface
 * on the next refresh. The first request after a cold start sees an empty map and keeps the
 * registry format while the read runs in the background.
 */

const CATALOG_URL = "https://models.opencode.ai/api.json";
const FETCH_TIMEOUT_MS = 5_000;
/** Same rhythm as `opencodeCliVersion.ts`. */
export const OPENCODE_PUBLISHED_CATALOG_TTL_MS = 6 * 60 * 60 * 1000;
/** Floor between two attempts, so a down catalog is not re-read on every request. */
const REFRESH_FLOOR_MS = 30_000;

/**
 * Catalog sections read for the model surface, by provider id (= public alias for both).
 * The catalog's `opencode` section is OpenCode Zen; the keyless OpenCode Free provider
 * (`opencode` / `oc`) was removed in #16310, so no other id maps here.
 */
const NPM_CATALOG_KEY_BY_PROVIDER: Record<string, string> = {
  "opencode-zen": "opencode",
  "opencode-go": "opencode-go",
};

const OPENCODE_MODEL_PREFIXES = ["opencode/", "opencode-zen/", "opencode-go/"] as const;

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/** Raw `provider.npm` by `${catalogKey} ${modelId}`; rewritten as a block per catalog read. */
const npmByModel = new Map<string, string>();
let fetchedAt = 0;
let lastAttemptAt = 0;
let inFlight: Promise<void> | null = null;
let testFetch: FetchLike | null = null;

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

/** Raw `provider.npm` values by `${catalogKey} ${modelId}`, from one catalog read. */
export function readPublishedNpmByModel(catalog: unknown): Map<string, string> {
  const map = new Map<string, string>();
  if (!catalog || typeof catalog !== "object") return map;
  const sections = catalog as Record<string, { models?: Record<string, unknown> } | undefined>;
  for (const sectionKey of new Set(Object.values(NPM_CATALOG_KEY_BY_PROVIDER))) {
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
 * A failed or empty read keeps the previous map.
 */
export function refreshPublishedCatalog(): Promise<void> {
  if (inFlight) return inFlight;
  if (!testFetch && underTestRunner()) return Promise.resolve();
  lastAttemptAt = Date.now();
  const fetchImpl: FetchLike = testFetch ?? globalThis.fetch;
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
      const next = readPublishedNpmByModel(await response.json());
      if (next.size > 0) {
        replacePublishedCatalogNpm(next);
        fetchedAt = Date.now();
      }
    } catch {
      // Catalog unreachable or not JSON: the previous map (or the registry) stays in place.
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
 * The target format a published SDK rides, or `null` when the catalog decides nothing.
 * Only the measured SDKs map: everything else falls back to the registry heuristics.
 */
export function surfaceTargetFormatForNpm(npm: string | null | undefined): string | null {
  if (npm === "@ai-sdk/openai") return "openai-responses";
  if (npm === "@ai-sdk/anthropic") return "claude";
  return null;
}

/**
 * Test seam. Seeds the surface map from a catalog-shaped object, without networking:
 * `catalog[section].models[modelId].provider.npm` (non-empty strings kept). A seeded map
 * counts as fresh, so no background read starts.
 */
export function configurePublishedCatalogForTests(
  catalog: unknown,
  options: { fetchImpl?: FetchLike } = {}
): void {
  replacePublishedCatalogNpm(readPublishedNpmByModel(catalog));
  fetchedAt = catalog ? Date.now() : 0;
  if (options.fetchImpl) testFetch = options.fetchImpl;
}

/** Test seam: drop the map, the timers' bookkeeping and any injected fetch. */
export function resetPublishedCatalogForTests(): void {
  npmByModel.clear();
  fetchedAt = 0;
  lastAttemptAt = 0;
  inFlight = null;
  testFetch = null;
}

/** Provider id (alias or raw id — identical for Zen and Go) → catalog section key. */
function normalizeCatalogKey(providerId: string | null | undefined): string | undefined {
  if (typeof providerId !== "string" || !providerId) return undefined;
  return NPM_CATALOG_KEY_BY_PROVIDER[providerId];
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
