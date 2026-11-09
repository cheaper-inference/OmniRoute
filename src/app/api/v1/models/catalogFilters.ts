/**
 * catalogFilters.ts — opt-in discovery filters for the model catalog.
 *
 * `GET /v1/models?capability=&min_context=&kind=&q=` narrows the catalog the caller
 * already sees, and `POST /v1/models/query` adds `max_output`, `owned_by`, `exclude`
 * and a bounded shortlist on top of the same predicates. Both run AFTER the catalog
 * is built and key-filtered, so a filter can only remove rows, never reveal one.
 *
 * Pure module: Zod schemas plus a filter over already-enriched catalog rows.
 */

import { z } from "zod";

/**
 * Boolean keys the catalog enricher writes under `capabilities`
 * (`enrichCatalogModelEntry` in src/lib/modelMetadataRegistry.ts). Non-boolean
 * keys such as `effort_tiers` are excluded: `=== true` can never match them.
 */
export const CATALOG_CAPABILITY_FILTERS = [
  "attachment",
  "reasoning",
  "structured_output",
  "temperature",
  "thinking",
  "tool_calling",
  "vision",
] as const;

/**
 * Catalog `type` surfaces. Rows without a `type` are chat models, so `kind=chat`
 * matches them; the rest mirror NON_CHAT_SURFACE_TYPES in src/lib/modelCapabilities.ts.
 */
export const CATALOG_KIND_FILTERS = [
  "chat",
  "audio",
  "embedding",
  "image",
  "moderation",
  "music",
  "rerank",
  "video",
] as const;

/** Query params that switch GET /v1/models into the filtered path. */
export const CATALOG_DISCOVERY_PARAMS = ["capability", "min_context", "kind", "q"] as const;

export const CATALOG_QUERY_DEFAULT_LIMIT = 20;
export const CATALOG_QUERY_MAX_LIMIT = 100;
const MAX_QUERY_TEXT = 200;
const MAX_LIST_ENTRIES = 200;

export type CatalogCapabilityFilter = (typeof CATALOG_CAPABILITY_FILTERS)[number];
export type CatalogKindFilter = (typeof CATALOG_KIND_FILTERS)[number];

export type CatalogDiscoveryFilters = {
  capabilities: CatalogCapabilityFilter[];
  minContext: number | null;
  maxOutput: number | null;
  kind: CatalogKindFilter | null;
  q: string | null;
  ownedBy: string | null;
  exclude: string[];
};

export type CatalogFilterParseResult<T> = { ok: true; value: T } | { ok: false; message: string };

const capabilityList = CATALOG_CAPABILITY_FILTERS.join(", ");
const kindList = CATALOG_KIND_FILTERS.join(", ");

const capabilitySchema = z.enum(CATALOG_CAPABILITY_FILTERS, {
  error: () => `Unknown capability. Valid: ${capabilityList}`,
});
const kindSchema = z.enum(CATALOG_KIND_FILTERS, {
  error: () => `Unknown kind. Valid: ${kindList}`,
});
const nonNegativeIntegerSchema = (name: string) =>
  z
    .number({ error: () => `${name} must be a non-negative integer` })
    .int({ error: () => `${name} must be a non-negative integer` })
    .nonnegative({ error: () => `${name} must be a non-negative integer` })
    .max(Number.MAX_SAFE_INTEGER, { error: () => `${name} must be a non-negative integer` });
const queryTextSchema = z
  .string()
  .trim()
  .min(1, { error: () => "q must not be empty" })
  .max(MAX_QUERY_TEXT, { error: () => `q must be at most ${MAX_QUERY_TEXT} characters` });

/** Accepts `["a","b"]`, `"a,b"` or `"a"`; splits on commas and drops blanks. */
function splitList(value: unknown): unknown {
  if (value === undefined || value === null) return [];
  const raw = Array.isArray(value) ? value : [value];
  if (raw.some((entry) => typeof entry !== "string")) return value;
  return (raw as string[])
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/** Query-string integers: `Number()` rather than parseInt so `1.5`/`10abc` are rejected. */
function toIntegerInput(value: string | null): unknown {
  if (value === null) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? Number.NaN : Number(trimmed);
}

const getQuerySchema = z.object({
  capabilities: z.array(capabilitySchema).max(MAX_LIST_ENTRIES),
  min_context: nonNegativeIntegerSchema("min_context").optional(),
  kind: kindSchema.optional(),
  q: queryTextSchema.optional(),
});

export const catalogQueryBodySchema = z
  .object({
    capabilities: z.preprocess(splitList, z.array(capabilitySchema).max(MAX_LIST_ENTRIES)),
    min_context: nonNegativeIntegerSchema("min_context").nullish(),
    max_output: nonNegativeIntegerSchema("max_output").nullish(),
    kind: kindSchema.nullish(),
    q: queryTextSchema.nullish(),
    owned_by: z.string().trim().min(1).max(MAX_QUERY_TEXT).nullish(),
    exclude: z.preprocess(
      splitList,
      z.array(z.string().max(MAX_QUERY_TEXT * 2)).max(MAX_LIST_ENTRIES * 5)
    ),
    limit: z
      .number({ error: () => "limit must be a positive integer" })
      .int({ error: () => "limit must be a positive integer" })
      .positive({ error: () => "limit must be a positive integer" })
      .max(Number.MAX_SAFE_INTEGER, { error: () => "limit must be a positive integer" })
      .nullish(),
  })
  .strict();

/** One client-facing message for a failed parse (no stack, no internals). */
export function describeCatalogFilterIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid request";
  if (issue.path.length === 0 && issue.code === "invalid_type") {
    return "Request body must be a JSON object";
  }
  if (issue.code === "unrecognized_keys") {
    return `Unknown field(s): ${issue.keys.join(", ")}`;
  }
  const field = issue.path.length > 0 ? String(issue.path[0]) : "";
  if (issue.message.startsWith("Invalid input") && field) {
    return `Invalid value for ${field}`;
  }
  return issue.message;
}

/** True when the request carries at least one discovery filter param. */
export function hasCatalogDiscoveryParams(searchParams: URLSearchParams): boolean {
  return CATALOG_DISCOVERY_PARAMS.some((name) => searchParams.has(name));
}

/** Parse and validate the GET discovery params (`capability` may repeat or be comma-separated). */
export function parseCatalogDiscoveryQuery(
  searchParams: URLSearchParams
): CatalogFilterParseResult<CatalogDiscoveryFilters> {
  const parsed = getQuerySchema.safeParse({
    capabilities: splitList(searchParams.getAll("capability")),
    min_context: toIntegerInput(searchParams.get("min_context")),
    kind: searchParams.get("kind") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  if (!parsed.success) return { ok: false, message: describeCatalogFilterIssue(parsed.error) };
  return {
    ok: true,
    value: {
      capabilities: parsed.data.capabilities,
      minContext: parsed.data.min_context ?? null,
      maxOutput: null,
      kind: parsed.data.kind ?? null,
      q: parsed.data.q ?? null,
      ownedBy: null,
      exclude: [],
    },
  };
}

export type CatalogQueryBody = z.infer<typeof catalogQueryBodySchema>;

/** Normalize a validated POST /v1/models/query body into filters + a capped limit. */
export function normalizeCatalogQueryBody(data: CatalogQueryBody): {
  filters: CatalogDiscoveryFilters;
  limit: number;
} {
  return {
    filters: {
      capabilities: data.capabilities,
      minContext: data.min_context ?? null,
      maxOutput: data.max_output ?? null,
      kind: data.kind ?? null,
      q: data.q ?? null,
      ownedBy: data.owned_by ?? null,
      exclude: data.exclude,
    },
    limit: Math.min(data.limit ?? CATALOG_QUERY_DEFAULT_LIMIT, CATALOG_QUERY_MAX_LIMIT),
  };
}

type CatalogRow = Record<string, unknown>;

function numberField(model: CatalogRow, key: string): number {
  const value = model[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/** Apply the discovery predicates. Order-preserving; returns the input when nothing is set. */
export function filterCatalogModels<T extends CatalogRow>(
  models: T[],
  filters: CatalogDiscoveryFilters
): T[] {
  const needle = filters.q ? filters.q.toLowerCase() : null;
  const excluded = filters.exclude.length > 0 ? new Set(filters.exclude) : null;
  return models.filter((model) => {
    if (filters.capabilities.length > 0) {
      const capabilities = model.capabilities;
      if (!capabilities || typeof capabilities !== "object") return false;
      const flags = capabilities as Record<string, unknown>;
      if (!filters.capabilities.every((capability) => flags[capability] === true)) return false;
    }
    if (filters.minContext !== null && numberField(model, "context_length") < filters.minContext) {
      return false;
    }
    if (filters.maxOutput !== null && numberField(model, "max_output_tokens") < filters.maxOutput) {
      return false;
    }
    if (filters.kind !== null) {
      const type = typeof model.type === "string" && model.type ? model.type : "chat";
      if (type !== filters.kind) return false;
    }
    if (needle !== null) {
      const id = typeof model.id === "string" ? model.id.toLowerCase() : "";
      const name = typeof model.name === "string" ? model.name.toLowerCase() : "";
      if (!id.includes(needle) && !name.includes(needle)) return false;
    }
    if (filters.ownedBy !== null && model.owned_by !== filters.ownedBy) return false;
    if (excluded && typeof model.id === "string" && excluded.has(model.id)) return false;
    return true;
  });
}

function compareCodeUnits(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/** Deterministic shortlist order: owner, then id, by code unit (locale-independent). */
export function compareCatalogQueryRows(a: CatalogRow, b: CatalogRow): number {
  const ownerA = typeof a.owned_by === "string" ? a.owned_by : "";
  const ownerB = typeof b.owned_by === "string" ? b.owned_by : "";
  const idA = typeof a.id === "string" ? a.id : "";
  const idB = typeof b.id === "string" ? b.id : "";
  return compareCodeUnits(ownerA, ownerB) || compareCodeUnits(idA, idB);
}
