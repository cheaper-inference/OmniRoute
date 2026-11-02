import {
  fetchCodeBuddyCatalog,
  clearCodeBuddyCatalogCache,
} from "../executors/codebuddy-intl/catalogFetch.ts";
import { mergeCatalogWithCurated } from "../executors/codebuddy-intl/catalog.ts";

/**
 * Route-facing boundary for the CodeBuddy International model catalog.
 *
 * `src/app/**` is forbidden from importing `open-sse/executors/**` directly
 * (eslint `no-restricted-imports`: executor implementations must stay behind an
 * open-sse handler or service boundary). This module is that boundary: it owns
 * the translation from the catalog's native model shape to the shape the
 * `/api/providers/[id]/models` route persists and returns, so the route never
 * has to know how the catalog is fetched.
 *
 * Fetch semantics (cache, TTL, timeout, never-throws) live in `catalogFetch.ts`;
 * this layer adds the MERGE with the curated registry list, because that is the
 * only place that knows both sides:
 *
 *  - `/v3/config` is authoritative for which models EXIST.
 *  - The curated registry is authoritative for hand-written metadata (context
 *    windows, output caps, vision/reasoning flags) that the gateway does not
 *    publish.
 *
 * Without the merge, the first successful fetch replaced the curated rows with
 * gateway-only rows and silently dropped that metadata for every model.
 */

export interface CodeBuddyCatalogModel {
  id: string;
  name: string;
  contextLength?: number;
  maxOutputTokens?: number;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
  /**
   * The same reasoning capability under the key the discovery normalizer reads
   * (`normalizeDiscoveredModels` → `supportsThinking`). Emitted alongside
   * `supportsReasoning` so the flag survives persistence into the synced store.
   */
  supportsThinking?: boolean;
}

/** A curated registry row: the offline fallback AND the metadata source. */
export interface CodeBuddyCuratedModel {
  id: string;
  name?: string;
  contextLength?: number;
  maxOutputTokens?: number;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
}

export interface CodeBuddyCatalogResult {
  ok: boolean;
  cached: boolean;
  models: CodeBuddyCatalogModel[];
  /** Gateway ids the curated list did not have (surfaced, never dropped). */
  added?: string[];
  /** Curated ids the gateway no longer lists (kept, never silently removed). */
  stale?: string[];
  status?: number;
  error?: string;
}

export interface DiscoverCodeBuddyModelsOptions {
  accessToken: string;
  accountKey?: string;
  /**
   * The curated registry list for this provider. When present, gateway models
   * are merged INTO it: curated metadata wins for ids both sides know, curated
   * ids the gateway omits are kept, and gateway-only ids are added.
   */
  curatedModels?: readonly CodeBuddyCuratedModel[];
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  ttlMs?: number;
  now?: number;
}

/** Project one merged entry onto the route model shape, curated metadata intact. */
function toRouteModel(model: {
  id: string;
  name?: string;
  contextLength?: number;
  maxOutputTokens?: number;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
}): CodeBuddyCatalogModel {
  return {
    id: model.id,
    name: model.name || model.id,
    ...(model.contextLength ? { contextLength: model.contextLength } : {}),
    ...(model.maxOutputTokens ? { maxOutputTokens: model.maxOutputTokens } : {}),
    ...(model.supportsVision === true ? { supportsVision: true } : {}),
    ...(model.supportsReasoning === true
      ? { supportsReasoning: true, supportsThinking: true }
      : {}),
  };
}

/**
 * Discover the account's model list. Never throws: a failed catalog fetch
 * returns `ok: false` with an empty list so the caller keeps its curated
 * fallback instead of showing an empty picker.
 */
export async function discoverCodeBuddyIntlModels(
  options: DiscoverCodeBuddyModelsOptions
): Promise<CodeBuddyCatalogResult> {
  const result = await fetchCodeBuddyCatalog({
    accessToken: options.accessToken,
    accountKey: options.accountKey,
    fetchImpl: options.fetchImpl,
    timeoutMs: options.timeoutMs,
    ttlMs: options.ttlMs,
    now: options.now,
  });

  if (!result.ok || result.models.length === 0) {
    return {
      ok: result.ok,
      cached: result.cached,
      models: [],
      ...(result.status !== undefined ? { status: result.status } : {}),
      ...(result.error !== undefined ? { error: result.error } : {}),
    };
  }

  const curated = options.curatedModels ?? [];
  if (curated.length === 0) {
    // No curated list supplied: report exactly what the gateway serves.
    return {
      ok: true,
      cached: result.cached,
      models: result.models.map((model) => ({
        id: model.id,
        name: model.name,
        ...(model.contextWindow ? { contextLength: model.contextWindow } : {}),
        ...(model.maxTokens ? { maxOutputTokens: model.maxTokens } : {}),
        ...(model.vision ? { supportsVision: true } : {}),
        ...(model.reasoning ? { supportsReasoning: true, supportsThinking: true } : {}),
      })),
    };
  }

  // Curated metadata wins for ids both sides know; gateway-only ids are added;
  // curated ids the gateway omits are kept (dropping them would break routing
  // for a model the user already configured).
  const merged = mergeCatalogWithCurated(result.models, [...curated]);
  const models = merged.models.map((model) =>
    toRouteModel({
      id: model.id,
      name: model.name,
      // The gateway's live limits are the freshest numbers; the curated value is
      // the fallback when the gateway publishes none.
      contextLength: model.contextWindow ?? model.contextLength,
      maxOutputTokens: model.maxTokens ?? model.maxOutputTokens,
      supportsVision: model.vision ?? model.supportsVision,
      supportsReasoning: model.reasoning ?? model.supportsReasoning,
    })
  );

  return {
    ok: true,
    cached: result.cached,
    models,
    added: merged.added,
    stale: merged.stale,
  };
}

/** Drop the cached catalog (tests and account removal). */
export function clearCodeBuddyIntlModelCache(): void {
  clearCodeBuddyCatalogCache();
}
