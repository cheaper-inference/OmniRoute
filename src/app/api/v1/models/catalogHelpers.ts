// Pure, dependency-free helpers + shared types for the unified model catalog
// (`getUnifiedModelsResponse` in ./catalog.ts). Extracted as a cohesive leaf so the
// catalog host shrinks toward the file-size cap without changing behavior — every
// function body here is byte-identical to its previous in-catalog definition.

import {
  CANONICAL_EFFORT_VALUES,
  extendCodexGpt56EffortValues,
  extendDeepSeekEffortValues,
} from "@/shared/reasoning/effortStandardization";
import { knownReasoningEffortTiers } from "@/lib/modelsDevSync/transform";
import { resolveModelDisplayName } from "@/shared/utils/modelDisplayName";

export interface CustomModelEntry {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  endpointCapabilitySource?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  isHidden?: boolean;
  // User-set "vision-capable" flag (persisted by addCustomModel / replaceCustomModels
  // in src/lib/db/models.ts). Surfaced into `/v1/models` via
  // getCustomVisionCapabilityFields so user-added vision models appear with
  // `capabilities.vision: true` even when their id does not match the
  // conservative isVisionModelId heuristic.
  supportsVision?: boolean;
  isFree?: boolean;
}

export type ComboCatalogTarget = {
  modelStr?: string;
  provider?: string | null;
  providerId?: string | null;
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
};

type ConnectionScopedReasoningModel = {
  id: string;
  supportsThinking?: boolean;
  supportedThinkingEfforts?: string[];
};

export type ConnectionScopedReasoningCatalog = Record<
  string,
  readonly ConnectionScopedReasoningModel[]
>;

export type ComboTargetCatalogMetadata = {
  contextLength?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  inputModalities?: string[];
  outputModalities?: string[];
  capabilities: Record<string, boolean | string[]>;
  // false when the target's provider has no active connection it can be routed to.
  routable?: boolean;
};

/** True when a combo target has an active connection it may use (all `connections` are active). */
export function hasRoutableComboConnection(
  target: ComboCatalogTarget,
  connections: ReadonlyArray<{ id?: unknown }>
): boolean {
  const ids = new Set(connections.map((connection) => connection?.id));
  if (target.connectionId) return ids.has(target.connectionId);
  if (target.allowedConnectionIds?.length) {
    return target.allowedConnectionIds.some((id) => ids.has(id));
  }
  return ids.size > 0;
}

/**
 * Seats that bound a combo's advertised limits: a seat whose provider has no active connection
 * is never routed to, so it must not shrink the window. Falls back to every seat when none is
 * routable, so a fully disabled combo still advertises its conservative minimum.
 */
export function selectComboLimitPool(
  metadata: ComboTargetCatalogMetadata[]
): ComboTargetCatalogMetadata[] {
  const routable = metadata.filter((entry) => entry.routable !== false);
  return routable.length > 0 ? routable : metadata;
}

export function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function parseJsonStringArray(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
      : [];
  } catch {
    return [];
  }
}

export function maybeOmitCatalogModelName<T extends Record<string, unknown>>(
  model: T,
  includeNames: boolean
): T | Omit<T, "name"> {
  if (includeNames || !Object.prototype.hasOwnProperty.call(model, "name")) return model;

  const { name: omittedName, ...nextModel } = model;
  void omittedName;
  return nextModel;
}

/**
 * Give a catalog row a human-readable `name` when it has none, or when the only
 * name it got is its own id (`enrichCatalogModelEntry` falls back to the raw model
 * id when the registry has no name). A real name is returned untouched, and no
 * field other than `name` is ever written.
 */
export function withCatalogDisplayName<T extends Record<string, unknown>>(model: T): T {
  const id = typeof model.id === "string" ? model.id : "";
  const root = typeof model.root === "string" && model.root ? model.root : id;
  const name = typeof model.name === "string" ? model.name.trim() : "";
  const leaf = root.slice(root.lastIndexOf("/") + 1);
  if (name && name !== id && name !== root && name !== leaf) return model;
  const derived = resolveModelDisplayName(root);
  return derived && derived !== name ? { ...model, name: derived } : model;
}

// `-max` is also a plain model-name word (qwen3-max), so it counts only beside a listed stem.
const FIXED_EFFORT_SUFFIX_RE = /-(minimal|xhigh|high|medium|low|max)$/;
const TRAILING_EFFORT_LABEL_RE = /\s*\(?\s*(?:minimal|xhigh|high|medium|low|max)\s*\)?$/i;

type CatalogRow = Record<string, unknown>;
type PinnedEffortVariant = { effort: string; stem: string };

function catalogStringField(model: CatalogRow, key: "id" | "name"): string {
  const value = model[key];
  return typeof value === "string" ? value : "";
}

function catalogObjectField(model: CatalogRow, key: "capabilities" | "metadata"): CatalogRow {
  const value = model[key];
  return value && typeof value === "object" ? (value as CatalogRow) : {};
}

function cleanCatalogName(model: CatalogRow): string | undefined {
  const id = catalogStringField(model, "id");
  const name = catalogStringField(model, "name").trim();
  const prefix = id.slice(0, id.indexOf("/") + 1);
  return (prefix && name.startsWith(prefix) ? name.slice(prefix.length) : name) || undefined;
}

function findPinnedEffortVariant(
  id: string,
  capabilities: CatalogRow,
  namesById: Map<unknown, string | undefined>
): PinnedEffortVariant | null {
  const effort = FIXED_EFFORT_SUFFIX_RE.exec(id)?.[1];
  if (!effort || capabilities.supportsThinking !== true) return null;
  const stem = id.slice(0, -effort.length - 1);
  return effort !== "max" || namesById.has(stem) ? { effort, stem } : null;
}

function pinnedEffortMetadata(
  { effort, stem }: PinnedEffortVariant,
  name: string | undefined,
  namesById: Map<unknown, string | undefined>
): CatalogRow {
  const baseName = namesById.get(stem) ?? name?.replace(TRAILING_EFFORT_LABEL_RE, "");
  const label = effort === "xhigh" ? "XHigh" : effort[0].toUpperCase() + effort.slice(1);
  return {
    ...(baseName ? { display_name: `${baseName} ${label}` } : {}),
    supported_reasoning_levels: [effort],
    default_reasoning_level: effort,
    reasoning_required: true,
  };
}

function selectableReasoningMetadata(capabilities: CatalogRow): CatalogRow {
  if (capabilities.supportsThinking === false) return { reasoning: false };
  const tiers = capabilities.effort_tiers;
  if (capabilities.supportsThinking !== true) return {};
  if (!Array.isArray(tiers) || tiers.length === 0) return {};
  return {
    supported_reasoning_levels: tiers,
    ...(tiers.includes("medium") ? { default_reasoning_level: "medium" } : {}),
  };
}

/**
 * Add codex-registry style `metadata` (`display_name`, `supported_reasoning_levels`,
 * `default_reasoning_level`, `reasoning_required`, `reasoning`) — the fields catalog
 * clients such as oh-my-pi read instead of `capabilities.effort_tiers`. A `-{effort}` id
 * is a fixed-effort route: its name carries the tier and its ladder is that one tier, so
 * clients offer no effort picker. A bare reasoning model keeps its selectable tiers.
 * `display_name` never carries the `disambiguateCatalogModelNames` provider prefix, and a
 * row without a `name` (MODEL_CATALOG_INCLUDE_NAMES=false) gets no `display_name` either.
 */
export function withClientReasoningMetadata<T extends CatalogRow>(models: T[]): T[] {
  const namesById = new Map<unknown, string | undefined>(
    models.map((model) => [model.id, cleanCatalogName(model)])
  );
  return models.map((model) => {
    const id = catalogStringField(model, "id");
    const capabilities = catalogObjectField(model, "capabilities");
    const name = namesById.get(id);
    const pinned = findPinnedEffortVariant(id, capabilities, namesById);
    const metadata = pinned
      ? pinnedEffortMetadata(pinned, name, namesById)
      : { ...(name ? { display_name: name } : {}), ...selectableReasoningMetadata(capabilities) };
    if (Object.keys(metadata).length === 0) return model;
    return { ...model, metadata: { ...catalogObjectField(model, "metadata"), ...metadata } };
  });
}

/**
 * The name a synced row should carry: its own published name, unless the static
 * registry already names the model (the registry name keeps winning, as before).
 */
export function pickSyncedCatalogName(
  syncedModel: { id?: unknown; name?: unknown },
  registryModelLists: Array<Array<{ id?: unknown; name?: unknown }> | undefined>
): string | undefined {
  const id = typeof syncedModel.id === "string" ? syncedModel.id : "";
  const name = typeof syncedModel.name === "string" ? syncedModel.name.trim() : "";
  if (!id || !name || name === id) return undefined;
  const registryNamed = registryModelLists.some((list) =>
    (list || []).some((entry) => entry?.id === id && typeof entry.name === "string" && entry.name)
  );
  return registryNamed ? undefined : name;
}

export function intersectStringArrays(arrays: string[][]): string[] {
  if (arrays.length === 0 || arrays.some((values) => values.length === 0)) return [];
  const [first, ...rest] = arrays;
  return first.filter((value, index) => {
    if (first.indexOf(value) !== index) return false;
    return rest.every((values) => values.includes(value));
  });
}

/** LCD over known arrays only. Empty/unknown entries degrade instead of wiping. */
export function intersectKnownStringArrays(arrays: string[][]): string[] {
  return intersectStringArrays(arrays.filter((values) => values.length > 0));
}

export function minKnownNumber(values: Array<number | undefined>): number | undefined {
  const knownValues = values.filter(isPositiveFiniteNumber);
  if (knownValues.length === 0) return undefined;
  return Math.min(...knownValues);
}

/**
 * Resolve the adjustable reasoning efforts shared by every connection a combo target can select.
 * `undefined` means there is no connection-scoped evidence, so authoritative static metadata may
 * still apply. An empty array means at least one selectable connection advertised this model but
 * the complete selectable set did not prove any common adjustable tier, so callers must fail
 * closed instead of falling back to broader model-family metadata.
 */
export function getConnectionScopedEffortTiers(
  modelId: string,
  target: Pick<ComboCatalogTarget, "connectionId" | "allowedConnectionIds">,
  eligibleConnectionIds: readonly string[] | undefined,
  modelsByConnection: ConnectionScopedReasoningCatalog,
  explicitThinkingEfforts?: readonly string[],
  fallbackThinkingEfforts?: readonly string[],
  /** MODELS_DEV_EFFORT_TIERS_ENABLED: a declared empty list means "no tiers", not "unknown". */
  emptyListMeansNoTiers = false
): string[] | undefined {
  const eligible = eligibleConnectionIds ? new Set(eligibleConnectionIds) : undefined;
  if (target.connectionId && eligible && !eligible.has(target.connectionId)) return [];
  if (
    target.allowedConnectionIds?.length &&
    eligible &&
    !target.allowedConnectionIds.some((id) => eligible.has(id))
  ) {
    return [];
  }
  if (!target.connectionId && !target.allowedConnectionIds?.length && eligible?.size === 0) {
    return [];
  }

  const catalogConnectionIds = Object.keys(modelsByConnection);
  if (catalogConnectionIds.length === 0) return undefined;

  let connectionIds: string[];
  if (target.connectionId) {
    connectionIds = !eligible || eligible.has(target.connectionId) ? [target.connectionId] : [];
  } else if (target.allowedConnectionIds?.length) {
    connectionIds = target.allowedConnectionIds.filter((id) => !eligible || eligible.has(id));
  } else {
    connectionIds = eligible ? [...eligible] : Object.keys(modelsByConnection);
  }
  if (connectionIds.length === 0) return [];

  const matching = connectionIds.map((connectionId) =>
    (modelsByConnection[connectionId] || []).find((model) => model.id === modelId)
  );
  if (matching.some((model) => model === undefined)) return [];

  const efforts = matching.map((model) => {
    const declared = model?.supportedThinkingEfforts;
    const hasDeclaredList = emptyListMeansNoTiers ? Array.isArray(declared) : !!declared?.length;
    const resolved = hasDeclaredList
      ? [...declared!]
      : model?.supportsThinking === true && fallbackThinkingEfforts
        ? [...fallbackThinkingEfforts]
        : [];
    return explicitThinkingEfforts
      ? explicitThinkingEfforts.filter((effort) => resolved.includes(effort))
      : resolved;
  });
  return intersectStringArrays(efforts);
}

export function getThinkingCapabilityFields(
  providerId: string,
  modelId: string,
  resolvedThinking?: boolean | null,
  supportedThinkingEfforts?: readonly string[],
  /** When true, skip the canonical effort-tier fallback — used for static registry
   * models that declare `supportsReasoning` but no explicit tier list, so the
   * catalog does not synthesize unresolvable `<prefix>/<model>-{tier}` ids. */
  skipCanonicalEffortFallback = false,
  /** Already-loaded synced tiers. This helper must not open SQLite to fetch them. */
  syncedReasoningEfforts?: readonly string[] | null,
  /**
   * MODELS_DEV_EFFORT_TIERS_ENABLED (default off): a declared empty list is a declaration of
   * no tiers (GLM, ZCode) and suppresses `effort_tiers`, and synced tiers are narrowed to the
   * known effort vocabulary. Off keeps the previous behavior, where an empty list falls
   * through to the synced tiers.
   */
  modelsDevEffortTiers = false
): Record<string, boolean | string[]> {
  const supportsThinking = resolvedThinking;
  if (typeof supportsThinking !== "boolean") return {};
  const declaredNone =
    modelsDevEffortTiers &&
    Array.isArray(supportedThinkingEfforts) &&
    supportedThinkingEfforts.length === 0;
  const hasDeclaredTiers = supportedThinkingEfforts && supportedThinkingEfforts.length > 0;
  const syncedCandidates = modelsDevEffortTiers
    ? knownReasoningEffortTiers(syncedReasoningEfforts)
    : syncedReasoningEfforts;
  const syncedEfforts =
    !hasDeclaredTiers && !declaredNone && syncedCandidates && syncedCandidates.length > 0
      ? [...syncedCandidates]
      : null;
  const tiers = hasDeclaredTiers
    ? [...supportedThinkingEfforts!]
    : syncedEfforts
      ? syncedEfforts
      : extendDeepSeekEffortValues(
          providerId,
          modelId,
          extendCodexGpt56EffortValues(providerId, modelId, CANONICAL_EFFORT_VALUES)
        );
  const advertiseTiers =
    supportsThinking &&
    !declaredNone &&
    (hasDeclaredTiers || syncedEfforts || !skipCanonicalEffortFallback);
  return {
    thinking: supportsThinking,
    supportsThinking,
    ...(advertiseTiers ? { effort_tiers: tiers } : {}),
  };
}

export function mergeComboCapabilities(
  metadata: ComboTargetCatalogMetadata[]
): Record<string, boolean | string[]> {
  const capabilities: Record<string, boolean | string[]> = {};
  for (const key of [
    "tool_calling",
    "reasoning",
    "vision",
    "attachment",
    "structured_output",
    "temperature",
    "thinking",
    "supportsThinking",
  ]) {
    const values = metadata.map((entry) => entry.capabilities[key]);
    if (values.every((value): value is boolean => typeof value === "boolean")) {
      const [first] = values;
      if (values.every((value) => value === first)) capabilities[key] = first;
    }
  }
  const effortTiers = metadata.map((entry) => entry.capabilities.effort_tiers);
  if (
    effortTiers.every(
      (value): value is string[] =>
        Array.isArray(value) && value.every((entry) => typeof entry === "string")
    )
  ) {
    capabilities.effort_tiers = intersectStringArrays(effortTiers);
  }
  return capabilities;
}

/**
 * #12798: a combo can advertise `capabilities.vision: true` while emitting no
 * `input_modalities` / `output_modalities`. The merged vision verdict flows
 * from the targets canonical capabilities - which honour the #9195 operator
 * "Vision capable" override - while the combo-level modality intersection in
 * buildComboCatalogMetadata only fills when EVERY known target carries synced
 * modality data. An operator-flagged vision head with no synced modalities
 * therefore listed `vision: true` next to an empty modality set, so
 * models.dev-shaped clients that key off `input_modalities` (not the boolean)
 * still saw a text-only entry. Derives the modalities from the already
 * advertised vision verdict: mergeComboCapabilities only emits `vision: true`
 * when every known target is vision-capable, so this makes no new claim.
 * Synced intersections keep precedence; nothing is derived for unknown or
 * text-only verdicts.
 */
export function visionDerivedModalities(
  capabilities: Record<string, boolean | string[]>,
  syncedInput: string[],
  syncedOutput: string[]
): { input_modalities?: string[]; output_modalities?: string[] } {
  return {
    ...(syncedInput.length > 0
      ? { input_modalities: syncedInput }
      : capabilities.vision === true
        ? { input_modalities: ["text", "image"] }
        : {}),
    ...(syncedOutput.length > 0
      ? { output_modalities: syncedOutput }
      : capabilities.vision === true
        ? { output_modalities: ["text"] }
        : {}),
  };
}

/**
 * Memoize per-target catalog metadata for one catalog build, yielding between misses.
 * #12046 resolves metadata for every target of every built-in `auto/*` combo, and those
 * ~40 combos draw on the same candidate pool: unmemoized, the build repeated the same
 * lookups tens of thousands of times without yielding (#9147 — 720 synced models took the
 * cold build from ~4s to ~18s, past the 8s cold-build bound). Metadata depends only on
 * the target fields in the key, so each distinct target is resolved once per build.
 */
export function memoizeTargetMetadata<T>(
  resolve: (target: ComboCatalogTarget) => T | null,
  afterMiss: () => Promise<void>
): (targets: ComboCatalogTarget[]) => Promise<Array<T | null>> {
  const byKey = new Map<string, T | null>();
  return async (targets) => {
    const resolved: Array<T | null> = [];
    for (const target of targets) {
      const key = JSON.stringify([
        target.providerId ?? null,
        target.provider ?? null,
        target.modelStr ?? null,
        target.connectionId ?? null,
        target.allowedConnectionIds ?? null,
      ]);
      if (!byKey.has(key)) {
        byKey.set(key, resolve(target));
        await afterMiss();
      }
      resolved.push(byKey.get(key) ?? null);
    }
    return resolved;
  };
}
