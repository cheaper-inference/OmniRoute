/**
 * Allow-listed `provider_options.<provider>` passthrough for Exa and Tavily.
 *
 * The generic `/v1/search` contract only expresses what every provider has in
 * common, so provider-specific request fields reach the upstream through a
 * namespaced bag: `provider_options.exa` / `provider_options["exa-search"]` and
 * `provider_options.tavily` / `provider_options["tavily-search"]`.
 *
 * The bag is never spread raw into the upstream body. Each forwarded key has its
 * own Zod schema; a key that is not listed, or whose value fails its schema, is
 * dropped. Nested objects are rebuilt from their own allow-list (unknown nested
 * keys are stripped). Auth, base URL, query, result count, domains, country and
 * topic are never read from the bag — the generic contract owns them.
 */

import { z } from "zod";

type Bag = Record<string, unknown>;
type FieldSchemas = Record<string, z.ZodType>;

/** Returns the first plain-object bag found under any of `ids`, or `{}`. */
export function getProviderOptionsBag(
  providerOptions: Record<string, unknown> | undefined,
  ids: readonly string[]
): Bag {
  for (const id of ids) {
    const bag = providerOptions?.[id];
    if (bag && typeof bag === "object" && !Array.isArray(bag)) return bag as Bag;
  }
  return {};
}

/** Copies each allow-listed key whose value passes its schema; everything else is dropped. */
export function pickAllowedFields(source: Bag, schemas: FieldSchemas): Bag {
  const out: Bag = {};
  for (const [key, schema] of Object.entries(schemas)) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const parsed = schema.safeParse(source[key]);
    if (parsed.success && parsed.data !== undefined) out[key] = parsed.data;
  }
  return out;
}

/** Start of the generic `time_range` window, or null for `any`/unknown values. */
export function timeRangeStart(timeRange: string | undefined, now = new Date()): Date | null {
  const from = new Date(now.getTime());
  switch (timeRange) {
    case "hour":
      from.setTime(from.getTime() - 3_600_000);
      return from;
    case "day":
      from.setUTCDate(from.getUTCDate() - 1);
      return from;
    case "week":
      from.setUTCDate(from.getUTCDate() - 7);
      return from;
    case "month":
      from.setUTCMonth(from.getUTCMonth() - 1);
      return from;
    case "year":
      from.setUTCFullYear(from.getUTCFullYear() - 1);
      return from;
    default:
      return null;
  }
}

/** Drops undefined values; returns null when nothing is left. */
export function compactProviderRaw(raw: Bag): Bag | null {
  const out: Bag = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value !== undefined && value !== null) out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : null;
}

// ── Shared field schemas ────────────────────────────────────────────────

const text = (max: number) => z.string().trim().min(1).max(max);
const int = (min: number, max: number) => z.number().int().min(min).max(max);
const isoDateTime = z
  .string()
  .trim()
  .min(4)
  .max(40)
  .refine((value) => !Number.isNaN(Date.parse(value)), "invalid date");
const ymdDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
/** Shallow record of primitives only (no nested objects), at most 20 keys. */
const primitiveRecord = z
  .record(z.string().max(64), z.union([z.boolean(), z.number().finite(), z.string().max(200)]))
  .refine((record) => Object.keys(record).length <= 20, "too many keys");

// ── Exa ─────────────────────────────────────────────────────────────────

// `stream` and `outputSchema` are deliberately absent: both turn the response
// into synthesized SSE output that the JSON search contract cannot carry.
const EXA_FIELDS: FieldSchemas = {
  type: text(32),
  category: text(64),
  userLocation: z.string().regex(/^[A-Za-z]{2}$/),
  moderation: z.boolean(),
  additionalQueries: z.array(text(500)).max(10),
  objective: text(2000),
  systemPrompt: text(4000),
  compliance: primitiveRecord,
  startPublishedDate: isoDateTime,
  endPublishedDate: isoDateTime,
};

const EXA_CONTENTS_FIELDS: FieldSchemas = {
  text: z.union([
    z.boolean(),
    z.object({
      maxCharacters: int(1, 100_000).optional(),
      includeHtmlTags: z.boolean().optional(),
    }),
  ]),
  // Exa deprecated `numSentences` (use `maxCharacters`) and ignores `highlightsPerUrl`.
  highlights: z.union([
    z.boolean(),
    z.object({
      maxCharacters: int(1, 10_000).optional(),
      query: text(500).optional(),
    }),
  ]),
  summary: z.union([z.boolean(), z.object({ query: text(500).optional() })]),
  extras: z.object({
    links: int(0, 100).optional(),
    imageLinks: int(0, 100).optional(),
  }),
  // `subpages` / `subpageTarget` are deprecated upstream and no longer forwarded.
  livecrawlTimeout: int(0, 120_000),
  maxAgeHours: int(-1, 876_000),
};

// Exa 3.0 `type: "lite"` rejects any request that sets a field outside its list
// (https://exa.ai/docs/reference/search), so the allow-listed fields it does not
// accept are dropped for lite instead of turning the call into a 400.
const EXA_LITE_REJECTED_FIELDS = ["additionalQueries", "systemPrompt"];
const EXA_LITE_CONTENTS_FIELDS = new Set(["text", "highlights"]);

export interface ExaPassthrough {
  /** Top-level body fields (may include `startPublishedDate` mapped from `time_range`). */
  fields: Bag;
  /** Fields merged into `contents` on top of the `{ text, highlights }` defaults. */
  contents: Bag;
}

export function resolveExaPassthrough(
  providerOptions: Record<string, unknown> | undefined,
  timeRange: string | undefined
): ExaPassthrough {
  const bag = getProviderOptionsBag(providerOptions, ["exa-search", "exa"]);
  const from = timeRangeStart(timeRange);
  const fields: Bag = from ? { startPublishedDate: from.toISOString() } : {};
  // Explicit provider_options values win over the time_range mapping.
  Object.assign(fields, pickAllowedFields(bag, EXA_FIELDS));
  const rawContents = bag.contents;
  const contents =
    rawContents && typeof rawContents === "object" && !Array.isArray(rawContents)
      ? pickAllowedFields(rawContents as Bag, EXA_CONTENTS_FIELDS)
      : {};
  if (fields.type === "lite") {
    for (const key of EXA_LITE_REJECTED_FIELDS) delete fields[key];
    for (const key of Object.keys(contents)) {
      if (!EXA_LITE_CONTENTS_FIELDS.has(key)) delete contents[key];
    }
  }
  return { fields, contents };
}

// ── Tavily ──────────────────────────────────────────────────────────────

// include_domains / exclude_domains / country / topic / max_results are not
// listed: they come from the generic contract and must win.
const TAVILY_FIELDS: FieldSchemas = {
  search_depth: z.enum(["basic", "advanced", "fast", "ultra-fast"]),
  chunks_per_source: int(1, 3),
  time_range: z.enum(["day", "week", "month", "year", "d", "w", "m", "y"]),
  start_date: ymdDate,
  end_date: ymdDate,
  include_published_date: z.boolean(),
  filter_by_published_date: z.boolean(),
  include_answer: z.union([z.boolean(), z.enum(["basic", "advanced"])]),
  include_raw_content: z.union([z.boolean(), z.enum(["markdown", "text"])]),
  include_images: z.boolean(),
  include_image_descriptions: z.boolean(),
  include_favicon: z.boolean(),
  include_domains_mode: text(32),
  language: text(16),
  filter_by_language: z.boolean(),
  auto_parameters: z.boolean(),
  exact_match: z.boolean(),
  include_usage: z.boolean(),
  safe_search: z.boolean(),
};

export function resolveTavilyPassthrough(
  providerOptions: Record<string, unknown> | undefined,
  timeRange: string | undefined
): Bag {
  const bag = getProviderOptionsBag(providerOptions, ["tavily-search", "tavily"]);
  const from = timeRangeStart(timeRange);
  const fields: Bag = from ? { start_date: from.toISOString().slice(0, 10) } : {};
  Object.assign(fields, pickAllowedFields(bag, TAVILY_FIELDS));
  return fields;
}

/** Tavily `topic` from the generic `search_type`. */
export function tavilyTopic(searchType: string): "general" | "news" | "finance" {
  if (searchType === "news" || searchType === "finance") return searchType;
  return "general";
}
