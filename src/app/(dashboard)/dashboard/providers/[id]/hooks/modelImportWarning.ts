/**
 * modelImportWarning — pure helper (no React/store deps) so it is unit-testable in isolation.
 *
 * The server's own degraded-discovery rule is reused verbatim (see `classifyModelImport`)
 * so the dashboard cannot invent a second, inevitably divergent definition of
 * "discovery failed". That module is a dependency-free leaf by design, so importing it
 * here pulls nothing server-only into the client bundle.
 */
import { isDegradedDiscovery } from "@/app/api/providers/[id]/sync-models/degradedLocalCatalog";

/**
 * The model-import route (`/api/providers/[id]/models`) returns a `warning` field when it falls
 * back to the cached/local catalog (e.g. the provider's `/models` endpoint was unreachable —
 * "API unavailable — using local catalog"). The import hook previously read only `models`/`error`,
 * so the fallback was silent: the user saw imported models with no indication they came from the
 * local catalog instead of the live API (#5428, #5429, #5431). Returns the warning string to
 * surface as a log line, or null when the response carries no usable warning.
 */
export function extractImportWarning(data: unknown): string | null {
  if (data && typeof data === "object" && "warning" in data) {
    const warning = (data as { warning?: unknown }).warning;
    if (typeof warning === "string" && warning.trim()) return warning;
  }
  return null;
}

/**
 * The reason of the degraded discovery, as the server published it.
 *
 * The server sends a closed vocabulary (a code or an HTTP status), never the
 * upstream message, so the screen can show it as a technical value without
 * leaking anything the provider sent.
 */
export function extractImportCause(data: unknown): string | null {
  if (data && typeof data === "object" && "error" in data) {
    const cause = (data as { error?: unknown }).error;
    if (typeof cause === "string" && cause.trim()) return cause.trim();
  }
  return null;
}

/**
 * #15069 — pure phase resolver for the zero-new-models branch in handleImportModels.
 *
 * When all fetched models are already registered, what the user sees depends on
 * whether the fetch came from the live upstream API or fell back to a local
 * catalog:
 *
 *  - the discovery degraded → phase "warning" (the live list was never read;
 *    a success indicator would be misleading).
 *  - the discovery did not degrade → phase "done" (a genuine success, even
 *    when the server sent a warning with a catalog the operator asked for).
 *
 * Called with one argument, the warning text decides (the historical rule).
 * Called with two, the degraded character decides: a catalog the operator
 * asked for is not a fallback, and it must not be announced as one.
 *
 * Extracted as a pure function so unit tests can cover this branch without a React renderer.
 */
export function resolveNoNewModelsPhase(
  importWarning: string | null,
  degraded?: boolean
): "warning" | "done" {
  if (degraded === undefined) return importWarning ? "warning" : "done";
  return degraded ? "warning" : "done";
}

/**
 * B-03 (#15159): decide what the Import button should SAY, given the raw
 * `/api/providers/[id]/models?refresh=true` payload.
 *
 * The bug: `extractImportWarning` above surfaces the fallback warning as a log
 * line, but the modal's headline `status` stayed `allModelsAlreadyImported` (or
 * `noModelsFound`). Both read as authoritative answers while remote discovery had
 * in fact failed and the response came from the local catalog — so an operator
 * concluded there was nothing to import and the missing models stayed missing.
 *
 * `degraded` is computed with the SERVER's own rule
 * (`isDegradedDiscovery`, the dependency-free leaf at
 * `src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts`) rather than a
 * second local copy, so the dashboard and the API cannot drift apart. That module
 * is a pure leaf by design, so importing it here pulls nothing server-only into the
 * client bundle.
 *
 * Note `intentional: true` — for reka / voyage-ai / t3-web the local catalog IS
 * the intended and only discovery source (#5460, #5465), so that case must stay
 * non-degraded or Import would report a false failure for them.
 */
export type ClassifyModelImportInput = {
  /** The parsed `/models` response — read for `source`, `intentional`, `warning`. */
  modelsData: unknown;
  /** `data.models`, the list discovery returned. */
  fetchedModels: unknown[];
  /** True when the model id is already imported. */
  isKnownModel: (id: string) => boolean;
};

export type ModelImportOutcome = "no-models" | "nothing-new" | "import";

/**
 * A model entry as discovery returns it; the id may be under any of these keys. The rest of the
 * entry (apiFormat, dimensions, inputTokenLimit, …) is forwarded to the import call as-is.
 */
export type DiscoveredModel = {
  id?: unknown;
  name?: unknown;
  model?: unknown;
  [field: string]: unknown;
};

export type ModelImportClassification = {
  outcome: ModelImportOutcome;
  /** Discovery fell back to a local/cache catalog — the headline must say so. */
  degraded: boolean;
  /** The server's warning text, when there is one. */
  warning: string | null;
  /** The reason of the fallback, when the server published one. */
  cause: string | null;
  newCount: number;
  /** How many models discovery returned in total. */
  total: number;
  /** The not-yet-imported models themselves, for the caller to iterate. */
  newModels: DiscoveredModel[];
};

function modelId(entry: unknown): string {
  if (!entry || typeof entry !== "object") return "";
  const record = entry as { id?: unknown; name?: unknown; model?: unknown };
  const candidate = record.id ?? record.name ?? record.model;
  return typeof candidate === "string" ? candidate : String(candidate ?? "");
}

export function classifyModelImport({
  modelsData,
  fetchedModels,
  isKnownModel,
}: ClassifyModelImportInput): ModelImportClassification {
  const warning = extractImportWarning(modelsData);
  const cause = extractImportCause(modelsData);
  const degraded = isDegradedDiscovery(
    (modelsData ?? {}) as { source?: unknown; intentional?: unknown; warning?: unknown }
  );

  if (fetchedModels.length === 0) {
    return {
      outcome: "no-models",
      degraded,
      warning,
      cause,
      newCount: 0,
      total: 0,
      newModels: [],
    };
  }

  const newModels = fetchedModels.filter(
    (entry) => !isKnownModel(modelId(entry))
  ) as DiscoveredModel[];

  return {
    outcome: newModels.length === 0 ? "nothing-new" : "import",
    degraded,
    warning,
    cause,
    newCount: newModels.length,
    total: fetchedModels.length,
    newModels,
  };
}

/**
 * What one model import (`POST /api/providers/[id]/sync-models?mode=import`)
 * did, as the import dialog must report it. Pure, so the contracts below are
 * unit-testable without a React renderer.
 *
 * - `degraded` (#15069, B-03 / #15159): remote discovery failed and only a
 *   fallback catalog answered. The sync refuses to store a fallback (502), and
 *   the dialog must never read that as success or as "nothing new". The rule is
 *   the server's own `isDegradedDiscovery`, so the two cannot drift.
 * - `no-listing` (#5460/#5465): the provider publishes no model list; its
 *   built-in catalog is the intended source, not a failure.
 * - `free-filter-empty`: a free-only connection whose provider lists no free model.
 * - `synced`: a live listing, with the model ids the import added and the ids
 *   the provider no longer lists.
 */
export type ModelSyncOutcome =
  | { kind: "degraded"; warning: string | null; cause: string | null }
  | { kind: "failed"; error: string }
  | { kind: "free-filter-empty" }
  | { kind: "no-listing"; warning: string | null; addedModelIds: string[] }
  | { kind: "synced"; addedModelIds: string[]; removedModelIds: string[] };

function record(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" && !Array.isArray(data)
    ? (data as Record<string, unknown>)
    : {};
}

function idList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((id): id is string => typeof id === "string" && id.length > 0)
    : [];
}

function failureMessage(data: Record<string, unknown>, status: number): string {
  const error = data.error;
  if (typeof error === "string" && error.trim()) return error.trim();
  const nested = record(error).message;
  if (typeof nested === "string" && nested.trim()) return nested.trim();
  return `HTTP ${status}`;
}

export function classifyModelSync(ok: boolean, status: number, data: unknown): ModelSyncOutcome {
  const body = record(data);
  if (!ok) {
    if (typeof body.source === "string" && isDegradedDiscovery(body)) {
      return {
        kind: "degraded",
        warning: extractImportWarning(body),
        cause: extractImportCause(body),
      };
    }
    return { kind: "failed", error: failureMessage(body, status) };
  }
  if (body.freeFilterEmpty === true) return { kind: "free-filter-empty" };
  if (body.intentional === true || typeof body.skipped === "string") {
    return {
      kind: "no-listing",
      warning: extractImportWarning(body),
      addedModelIds: idList(body.addedModelIds),
    };
  }
  return {
    kind: "synced",
    addedModelIds: idList(body.addedModelIds),
    removedModelIds: idList(body.removedModelIds),
  };
}

/**
 * #15069: the dialog phase of an import. A degraded discovery ends in
 * "warning" — never "done": the live list was never read, so a success
 * indicator would be a false answer.
 */
export function phaseOfModelSync(outcome: ModelSyncOutcome): "done" | "warning" | "error" {
  if (outcome.kind === "degraded") return "warning";
  if (outcome.kind === "failed") return "error";
  return "done";
}
