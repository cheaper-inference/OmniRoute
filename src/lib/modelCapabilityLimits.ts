/**
 * Token-limit precedence chains for the capability resolver, with per-field provenance.
 *
 * `getResolvedModelCapabilities` resolves `contextWindow`, `maxInputTokens` and
 * `maxOutputTokens` from several sources (persisted overrides, the static authoritative
 * table, the models.dev sync, the provider registry, static specs). Each chain here is a
 * first-non-nullish pick — the exact `??` semantics the resolver always had — that also
 * remembers WHICH source won, so a diagnostic caller can tell why a model reports a limit.
 * Labels are only formatted on request (`describeLimitSources`), keeping the hot path cheap.
 */
import type { ModelCapabilityEntry } from "@/lib/modelsDevSync/transform";
import type { ModelSpec } from "@/shared/constants/modelSpecs";

type ModelLimitField = "contextWindow" | "maxInputTokens" | "maxOutputTokens";

/**
 * Which rule supplied each resolved limit:
 * - `override:context` / `override:max_input` / `override:max_output` — persisted override
 * - `static-authoritative:<provider>/<model>` — static authoritative context table
 * - `synced:<provider>/<model>` — models.dev synced capability row
 * - `registry:<provider>/<model>` — provider registry row
 * - `spec:<model>` — static model spec
 * - `effort-base:` prefix — the row came from the base model of an effort-suffixed variant
 * - `none` — no source declares the limit (value is null)
 */
export type ModelLimitSources = Record<ModelLimitField, string>;

type LimitSourceKind =
  | "override:context"
  | "override:max_input"
  | "override:max_output"
  | "static-authoritative"
  | "synced"
  | "registry"
  | "spec"
  | "none";

interface PickedLimit {
  value: number | null;
  kind: LimitSourceKind;
}

type LimitCandidate = readonly [value: number | null | undefined, kind: LimitSourceKind];

type SyncedLimits = Pick<ModelCapabilityEntry, "limit_context" | "limit_input" | "limit_output">;

/** The rows the resolver already looked up; the chains only read them. */
interface LimitSourceRows {
  synced: SyncedLimits | null;
  registryModel: {
    contextLength?: unknown;
    maxInputTokens?: unknown;
    maxOutputTokens?: unknown;
  } | null;
  spec: Pick<ModelSpec, "contextWindow" | "maxOutputTokens"> | undefined;
  authoritativeContextWindow: number | null;
}

function pickFirst(candidates: readonly LimitCandidate[]): PickedLimit {
  for (const [value, kind] of candidates) {
    if (value !== null && value !== undefined) return { value, kind };
  }
  return { value: null, kind: "none" };
}

function registryNumber(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

export function pickContextWindow(
  rows: LimitSourceRows,
  persistedContextWindow: number | null
): PickedLimit {
  return pickFirst([
    [persistedContextWindow, "override:context"],
    [rows.authoritativeContextWindow, "static-authoritative"],
    [rows.synced?.limit_context, "synced"],
    [registryNumber(rows.registryModel?.contextLength), "registry"],
    [rows.spec?.contextWindow, "spec"],
  ]);
}

/**
 * Input cap is input-only. An explicit `max_input_tokens` override wins; otherwise fall
 * back to the per-source input limits, then to the total window. The effective cap can
 * never exceed the total window (input + output), so it is clamped — when the clamp
 * applies, the window's own source is what supplied the value.
 */
export function pickMaxInputTokens(
  rows: LimitSourceRows,
  maxInputOverride: number | null,
  contextWindow: PickedLimit
): PickedLimit {
  const candidate = pickFirst([
    [maxInputOverride, "override:max_input"],
    [registryNumber(rows.registryModel?.maxInputTokens), "registry"],
    [rows.authoritativeContextWindow, "static-authoritative"],
    [rows.synced?.limit_input, "synced"],
    [contextWindow.value, contextWindow.kind],
  ]);
  if (candidate.value === null || contextWindow.value === null) return candidate;
  const value = Math.min(candidate.value, contextWindow.value);
  return { value, kind: value === candidate.value ? candidate.kind : contextWindow.kind };
}

export function pickMaxOutputTokens(
  rows: LimitSourceRows,
  maxTokenOverride: number | null
): PickedLimit {
  return pickFirst([
    [maxTokenOverride, "override:max_output"],
    [rows.synced?.limit_output, "synced"],
    [registryNumber(rows.registryModel?.maxOutputTokens), "registry"],
    [rows.spec?.maxOutputTokens, "spec"],
  ]);
}

interface LimitSourceIdentity {
  provider: string | null;
  model: string | null;
  rawModel: string | null;
  /** Set when the synced/registry/spec rows were taken from an effort variant's base model. */
  effortBaseModelId: string | null;
}

function formatLimitSource(kind: LimitSourceKind, identity: LimitSourceIdentity): string {
  if (kind === "none" || kind.startsWith("override:")) return kind;
  const resolvedId = identity.model ?? identity.rawModel ?? "";
  const qualify = (modelId: string) =>
    identity.provider ? `${identity.provider}/${modelId}` : modelId;
  // The authoritative table is always consulted with the variant's own id.
  if (kind === "static-authoritative") return `${kind}:${qualify(resolvedId)}`;
  const rowModelId = identity.effortBaseModelId ?? resolvedId;
  const prefix = identity.effortBaseModelId ? "effort-base:" : "";
  return kind === "spec"
    ? `${prefix}spec:${rowModelId}`
    : `${prefix}${kind}:${qualify(rowModelId)}`;
}

export function describeLimitSources(
  limits: Record<ModelLimitField, PickedLimit>,
  identity: LimitSourceIdentity
): ModelLimitSources {
  return {
    contextWindow: formatLimitSource(limits.contextWindow.kind, identity),
    maxInputTokens: formatLimitSource(limits.maxInputTokens.kind, identity),
    maxOutputTokens: formatLimitSource(limits.maxOutputTokens.kind, identity),
  };
}
