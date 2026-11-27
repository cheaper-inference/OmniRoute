/**
 * Which concrete model a quota-family lock should be probed with (#20343).
 *
 * A lock can be scoped two ways (see `resolveLockoutScope` in
 * `open-sse/services/accountFallback/exactModelLock.ts`):
 *
 *   - `exact`        — one provider/connection/model tuple. `model` IS the model.
 *   - `quota_family` — a whole quota bucket. `model` is the BUCKET name, never a
 *                      callable id: `codex`/`spark` for Codex and
 *                      `family:gemini|claude|argon` for Antigravity/agy.
 *
 * Probing a bucket name sends the upstream a model that does not exist, so the
 * probe answers 4xx, the verdict is "unknown", and the lock never recovers early.
 * This module turns a bucket name into a real model that draws from that same
 * bucket, so the probe asks the question the lock actually recorded.
 *
 * The answer comes from the connection's own synced catalog first (Codex refuses
 * any model its account does not advertise, and Antigravity catalogs are per
 * account), then the static provider registry. When neither lists a chat model of
 * that family the caller must skip the probe: a guess would only burn a request
 * against a model the account may not have.
 */
import { getAntigravityQuotaFamily } from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import {
  CODEX_SPARK_MODEL_ID,
  getCodexModelScope,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { getProviderModels } from "@omniroute/open-sse/config/providerModels.ts";
import { isImageOnlyModel } from "@omniroute/open-sse/config/imageRegistry";
import { resolveProviderId } from "@/shared/constants/providers";

/** Bucket names that are not callable models, plus the family they stand for. */
export type QuotaFamilyBucket = {
  /** What the lock stored: `codex`, `spark`, or `family:<name>`. */
  stored: string;
  /** The concrete family the bucket covers. */
  family: string;
};

export type QuotaProbeModelResolution =
  /** A real, callable model that draws from the locked bucket. */
  | { model: string }
  /** No concrete model could be found; the caller must not spend a request. */
  | { unavailable: string };

/** A catalog row the resolver only needs the id from. */
export type QuotaProbeCatalogEntry = { id?: string | null };

export type QuotaProbeModelResolverDeps = {
  /** The connection's synced catalog, in the connection's own id space. */
  loadSyncedModels?: (provider: string, connectionId: string) => Promise<QuotaProbeCatalogEntry[]>;
};

const ANTIGRAVITY_FAMILY_PREFIX = "family:";
const ANTIGRAVITY_PROVIDERS = new Set(["antigravity", "agy"]);

/**
 * Non-chat surfaces that still carry chat-adjacent names: the Antigravity catalog
 * lists image/TTS/tab entries, and probing one as chat fails for a reason that has
 * nothing to do with quota. Mirrors `ANTIGRAVITY_NON_CHAT_MODEL_IDS` (not exported)
 * plus `isImageOnlyModel` below.
 */
const NON_CHAT_ID_PATTERN =
  /(?:^|[-_])(image|imagen|audio|tts|embedding|embed|video|veo)(?:[-_]|$)/i;

function normalizeId(id: string | null | undefined): string {
  return String(id ?? "")
    .trim()
    .toLowerCase();
}

/**
 * The bucket a lock stored, or null when the name is not a known bucket and must
 * therefore be treated as a concrete model.
 */
export function parseQuotaFamilyBucket(
  provider: string | null | undefined,
  model: string | null | undefined
): QuotaFamilyBucket | null {
  const stored = normalizeId(model);
  if (!stored) return null;
  const canonical = resolveProviderId(String(provider ?? ""));
  if (canonical === "codex") {
    // getCodexModelScope() maps ANY model to a scope, so only the two bucket names
    // themselves are buckets here — a real model was never stored as `codex`.
    if (stored === "codex" || stored === "spark") return { stored, family: stored };
    return null;
  }
  if (!ANTIGRAVITY_PROVIDERS.has(canonical)) return null;
  if (!stored.startsWith(ANTIGRAVITY_FAMILY_PREFIX)) return null;
  const family = stored.slice(ANTIGRAVITY_FAMILY_PREFIX.length).trim();
  // "other" is never a family key (getQuotaScopedModelForProvider keeps the model
  // id in that case), so it cannot appear here.
  return family ? { stored, family } : null;
}

/** Whether `id` belongs to `bucket` on `provider` — the resolver's own sanity check. */
export function modelMatchesFamily(
  provider: string | null | undefined,
  id: string,
  bucket: QuotaFamilyBucket
): boolean {
  const canonical = resolveProviderId(String(provider ?? ""));
  if (canonical === "codex") return getCodexModelScope(id) === bucket.family;
  if (!ANTIGRAVITY_PROVIDERS.has(canonical)) return false;
  return getAntigravityQuotaFamily(id) === bucket.family;
}

function isProbeableChatModel(provider: string, id: string): boolean {
  if (!id.trim()) return false;
  if (isImageOnlyModel(`${provider}/${id}`)) return false;
  return !NON_CHAT_ID_PATTERN.test(id);
}

async function loadSyncedCatalog(
  provider: string,
  connectionId: string,
  deps: QuotaProbeModelResolverDeps
): Promise<string[]> {
  const load =
    deps.loadSyncedModels ??
    (async (syncProvider: string, syncConnectionId: string) => {
      const { getSyncedAvailableModelsForConnection } = await import("@/lib/db/models");
      return getSyncedAvailableModelsForConnection(syncProvider, syncConnectionId);
    });
  try {
    const rows = await load(provider, connectionId);
    return (Array.isArray(rows) ? rows : [])
      .map((row) => (typeof row?.id === "string" ? row.id : ""))
      .filter((id) => id.length > 0);
  } catch {
    // An unreadable catalog is not evidence about the account: fall through to the
    // static registry instead of failing the whole sweep.
    return [];
  }
}

function staticCatalogFor(provider: string, bucket: QuotaFamilyBucket): string[] {
  const ids = getProviderModels(provider).map((model) => model.id);
  if (ids.length === 0 && provider !== "antigravity" && ANTIGRAVITY_PROVIDERS.has(provider)) {
    ids.push(...getProviderModels("antigravity").map((model) => model.id));
  }
  // The Spark bucket's canonical model id is not in the static Codex catalog (the
  // live OAuth catalog advertises it), so seed it when that bucket is the target.
  if (bucket.family === "spark" && !ids.includes(CODEX_SPARK_MODEL_ID)) {
    ids.push(CODEX_SPARK_MODEL_ID);
  }
  return ids;
}

/**
 * The model to probe for `candidate`, or `{ unavailable }` when none exists.
 *
 * An `exact` lock resolves to its own model unchanged; only a family lock is
 * translated, and the translated model is re-checked against the same family so a
 * mis-mapped catalog entry can never probe a sibling bucket.
 */
export async function resolveQuotaProbeModel(
  candidate: {
    provider: string;
    connectionId: string;
    model?: string | null;
    scope?: "exact" | "quota_family";
  },
  deps: QuotaProbeModelResolverDeps = {}
): Promise<QuotaProbeModelResolution> {
  const model = String(candidate.model ?? "").trim();
  if (!model) return { unavailable: "the lock carries no model" };
  if (candidate.scope !== "quota_family") return { model };

  const bucket = parseQuotaFamilyBucket(candidate.provider, model);
  if (!bucket) return { unavailable: `"${model}" is not a known quota-family bucket` };

  const synced = await loadSyncedCatalog(candidate.provider, candidate.connectionId, deps);
  // Codex model tests validate against the account's own catalog and SYNC it when empty
  // (`prepareConnectionModelTest`), so an empty catalog is not a dead end here: the
  // request repairs it and a later sweep resolves from the live catalog. The static
  // registry is only the first guess, never a replacement for the account's own list.
  const candidates = [...synced, ...staticCatalogFor(candidate.provider, bucket)];
  for (const id of candidates) {
    if (!modelMatchesFamily(candidate.provider, id, bucket)) continue;
    if (!isProbeableChatModel(candidate.provider, id)) continue;
    return { model: id };
  }

  return { unavailable: `no chat model of the "${bucket.family}" quota family is known` };
}
