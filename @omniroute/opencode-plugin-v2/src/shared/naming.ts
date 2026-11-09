/**
 * Compact model naming for the plugin picker.
 *
 * Published rule:
 *   [🆓 ]Provider - Model[ (Editor)][ · budget][ (route)]
 *
 * The provider (the route that serves the model) is shown whenever one is
 * known: it comes from the enrichment `providerDisplayName`, else from a
 * `Provider - ` prefix on the enrichment name, else from the first segment of
 * the raw id (a slash-less id renders without a prefix). The editor comes only
 * from an explicit `Editor: Model` name. A free entry with a known `freeType`
 * keeps its budget suffix (`· 1M tokens/month`).
 * Free entries carry the `🆓 ` prefix (combos never do); combos render as
 * `combo - <slug>` with no free icon; `auto/*` strategies keep their slug.
 * A route suffix appears only when two published entries share the name.
 */

// ── Constants ────────────────────────────────────────────────────────────

/** Separator between provider label and model display name. */
export const PROVIDER_TAG_SEPARATOR = " - ";

/** Threshold beyond which providerDisplayName is abbreviated. */
const PROVIDER_LABEL_MAX_CHARS = 12;

/** Aliases longer than this get title-case instead of UPPER. */
const ALIAS_UPPER_MAX_CHARS = 5;

// ── Auto Combo Types ─────────────────────────────────────────────────────

export type AutoVariant = "coding" | "fast" | "cheap" | "offline" | "smart" | "lkgp";

export const AUTO_VARIANTS: AutoVariant[] = ["coding", "fast", "cheap", "offline", "smart", "lkgp"];

export const AUTO_VARIANT_DESCRIPTIONS: Record<AutoVariant | "default", string> = {
  default: "Best provider via scoring",
  coding: "Quality-first for code tasks",
  fast: "Latency-optimized routing",
  cheap: "Cost-optimized routing",
  offline: "Offline-friendly providers",
  smart: "Quality-first with exploration",
  lkgp: "Last-Known-Good-Provider routing",
};

// ── Free Model Types ─────────────────────────────────────────────────────

export type FreeModelFreeType =
  | "recurring-daily"
  | "recurring-monthly"
  | "recurring-credit"
  | "recurring-uncapped"
  | "one-time-initial"
  | "keyless"
  | "discontinued";

/**
 * Free types the `freeOnly` preset admits. Single-use credits and
 * retired models stay visible without the preset but never pass it;
 * an unrecognised gateway value stays unpublished under the preset
 * until it is classified here.
 */
const FREE_ONLY_FREE_TYPES: ReadonlySet<string> = new Set([
  "recurring-daily",
  "recurring-monthly",
  "recurring-credit",
  "recurring-uncapped",
  "keyless",
]);

/** Whether a free-tier entry counts as free under the `freeOnly` preset. */
export function isFreeOnlyFreeType(freeType: unknown): boolean {
  return typeof freeType === "string" && FREE_ONLY_FREE_TYPES.has(freeType);
}

// ── Provider Label ────────────────────────────────────────────────────────

/**
 * Title-case a long, lowercase-looking alias.
 * `antigravity` → `Antigravity`
 */
function titleCaseAlias(alias: string): string {
  if (alias.length === 0) return alias;
  return alias.charAt(0).toUpperCase() + alias.slice(1).toLowerCase();
}

/**
 * Pick the short label for an upstream provider.
 *
 * Rules:
 *   1. Trim `providerDisplayName`. If ≤12 chars → use verbatim.
 *   2. Alias ≤5 chars → UPPER(alias). Alias >5 → titleCase.
 *   3. Neither → undefined.
 */
export function shortProviderLabel(
  enrichment: { providerDisplayName?: string; providerAlias?: string } | undefined
): string | undefined {
  if (!enrichment) return undefined;
  const raw =
    typeof enrichment.providerDisplayName === "string" ? enrichment.providerDisplayName.trim() : "";
  if (raw.length > 0 && raw.length <= PROVIDER_LABEL_MAX_CHARS) return raw;
  const alias = typeof enrichment.providerAlias === "string" ? enrichment.providerAlias.trim() : "";
  if (alias.length > 0) {
    return alias.length <= ALIAS_UPPER_MAX_CHARS ? alias.toUpperCase() : titleCaseAlias(alias);
  }
  // Long displayName with no alias to fall back on: keep the long label
  // rather than dropping the provider prefix entirely.
  return raw.length > 0 ? raw : undefined;
}

// ── Free Label ────────────────────────────────────────────────────────────

/** A routing strategy id: `auto` or `auto/...`, named by its slug. */
function isAutoStrategyId(id: string): boolean {
  return id === "auto" || id.startsWith("auto/");
}

// ── Free Budget Formatting ────────────────────────────────────────────────

/** Scales, largest first, so the unit is chosen by descending magnitude. */
const TOKEN_UNITS = [
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "K"],
] as const;

/**
 * Format a token count as a short magnitude string: `25M`, `1.5K`, `999`.
 *
 * The unit has to be picked from the value that will actually be *printed*,
 * not from the raw input. `toFixed(1)` rounds to the nearest tenth, so at the
 * K scale 999_950 and above render as `1000.0` — and by then the M branch has
 * already been skipped, producing `1000K` for a number that is `1M`. The same
 * carry turns just under a billion into `1000M`. When the rounded value reaches
 * the next scale, re-render at that scale instead.
 */
function fmtTokens(n: number): string {
  for (let i = 0; i < TOKEN_UNITS.length; i++) {
    const [scale, suffix] = TOKEN_UNITS[i]!;
    if (n < scale) continue;
    const value = Number((n / scale).toFixed(1));
    // `Number()` also drops a trailing `.0`, which the previous regex did.
    if (value < 1000 || i === 0) return `${value}${suffix}`;
    const [nextScale, nextSuffix] = TOKEN_UNITS[i - 1]!;
    return `${Number((n / nextScale).toFixed(1))}${nextSuffix}`;
  }
  return String(n);
}

/**
 * Format a free model budget into a short human-readable suffix.
 *
 * recurring-daily     → "25M tokens/day"
 * recurring-monthly   → "25M tokens/month"
 * recurring-credit    → "10M credits"
 * recurring-uncapped  → "(uncapped)"
 * one-time-initial    → "1M credits (one-time)"
 * keyless             → "(keyless)"
 * discontinued        → "(discontinued)"
 * unknown future type → "(<type>)", never empty
 *
 * The uncapped label reuses the dashboard wording ("uncapped" in
 * `FreeBudgetCard.tsx:133`), parenthesised like the other cap-less labels.
 */
export function formatFreeBudget(params: {
  freeType: FreeModelFreeType;
  monthlyTokens?: number;
  creditTokens?: number;
}): string {
  const { freeType, monthlyTokens = 0, creditTokens = 0 } = params;

  switch (freeType) {
    case "recurring-daily":
      return `${fmtTokens(monthlyTokens)} tokens/day`;
    case "recurring-monthly":
      return `${fmtTokens(monthlyTokens)} tokens/month`;
    case "recurring-credit":
      return `${fmtTokens(creditTokens)} credits`;
    case "recurring-uncapped":
      return "(uncapped)";
    case "one-time-initial":
      return `${fmtTokens(creditTokens)} credits (one-time)`;
    case "keyless":
      return "(keyless)";
    case "discontinued":
      return "(discontinued)";
    default:
      return `(${String(freeType)})`;
  }
}

// ── Auto Combo Naming ─────────────────────────────────────────────────────

/**
 * Format auto combo display name.
 *
 * "Auto: Coding (4p)"
 * "Auto: Default (6p)"
 * "Auto" (no candidate count when unknown)
 */
export function formatAutoComboName(
  variant: AutoVariant | undefined,
  candidateCount?: number
): string {
  const label = variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : "Default";
  const count =
    typeof candidateCount === "number" && candidateCount > 0 ? ` (${candidateCount}p)` : "";
  return `Auto: ${label}${count}`;
}

/**
 * Build the model ID for an auto combo entry.
 * "auto/coding", "auto/fast", "auto" (default).
 */
export function autoComboModelId(variant: AutoVariant | undefined): string {
  return variant ? `auto/${variant}` : "auto";
}

// ── Universal Display Name Builder ────────────────────────────────────────

export interface ModelDisplayNameParams {
  /** Raw model ID (e.g. "cc/claude-sonnet-4-6"). */
  rawId: string;
  /** Enrichment display name (e.g. "Claude Sonnet 4.6"). */
  enrichmentName?: string;
  /** Upstream provider label enrichment. */
  providerAlias?: string;
  /** Human-readable upstream provider label. */
  providerDisplayName?: string;
  /** Whether to render the editor in a trailing parenthesis (default true). */
  providerTag?: boolean;
  /** Whether model is free tier. */
  isFree?: boolean;
  /** Free model budget info. */
  freeType?: FreeModelFreeType;
  /** Monthly token budget for recurring free models. */
  monthlyTokens?: number;
  /** Credit token budget for credit-based free models. */
  creditTokens?: number;
  /** Whether this is a combo entry (`combo - <slug>`, no free icon). */
  isCombo?: boolean;
  /** Whether this is an auto combo entry. */
  isAutoCombo?: boolean;
  /** Auto combo variant. */
  autoVariant?: AutoVariant;
  /** Auto combo candidate count. */
  autoCandidateCount?: number;
}

/**
 * Strip every known free marker form from a display text. Returns the cleaned
 * text and whether any marker was found.
 */
function stripFreeMarkers(text: string): { text: string; wasFree: boolean } {
  let cleaned = text.trim();
  let wasFree = false;
  const withoutPrefix = cleaned.replace(/^\[free\]\s{0,8}/i, "");
  if (withoutPrefix.length !== cleaned.length) {
    wasFree = true;
    cleaned = withoutPrefix.trim();
  }
  for (const pattern of [
    /\s{0,8}\(free\)\s{0,8}$/i,
    /[\s-]{1,8}free\s{0,8}$/i,
    /\s{1,8}\[F\]\s{0,8}$/,
  ]) {
    const next = cleaned.replace(pattern, "").trim();
    if (next.length !== cleaned.length) {
      wasFree = true;
      cleaned = next;
    }
  }
  return { text: cleaned.length > 0 ? cleaned : text.trim(), wasFree };
}

/**
 * Build the display name for one entry.
 *
 * Format: `[🆓 ]<Provider> - <Model>[ (<Editor>)][ · <budget>][ (<route>)]`
 *   - free models carry the `🆓 ` prefix (except combos);
 *   - combos render as `combo - <slug>` with no free icon;
 *   - auto strategies keep their slug;
 *   - auto combos keep `Auto: <variant> (<N>p)`.
 */
export function buildModelDisplayName(params: ModelDisplayNameParams): string {
  // Auto combos
  if (params.isAutoCombo) {
    return formatAutoComboName(params.autoVariant, params.autoCandidateCount);
  }

  // A routing strategy is named by its slug, never by an enrichment name.
  if (isAutoStrategyId(params.rawId)) {
    return params.rawId;
  }

  // Combos: `combo - <slug>`, no free icon.
  if (params.isCombo) {
    const slugSource =
      params.enrichmentName && params.enrichmentName.trim().length > 0
        ? params.enrichmentName
        : params.rawId;
    const { text: slug } = stripFreeMarkers(slugSource);
    return `combo - ${slug}`;
  }

  // Provider: upstream label, else enrichment-name prefix, else first id segment.
  let provider = "";
  if (
    typeof params.providerDisplayName === "string" &&
    params.providerDisplayName.trim().length > 0
  ) {
    provider = params.providerDisplayName.trim();
  }

  const rawBase =
    params.enrichmentName && params.enrichmentName.trim().length > 0
      ? params.enrichmentName
      : params.rawId;

  // Split off a leading provider prefix (`Provider - rest`) when present.
  let work = rawBase.trim();
  const dashMatch = work.match(/^(.+?)\s+-\s+(.+)$/);
  if (dashMatch) {
    if (!provider) provider = dashMatch[1]!.trim();
    // Remove a leading [Free] from provider if present.
    const pm = stripFreeMarkers(provider);
    provider = pm.text;
    work = dashMatch[2]!.trim();
  }

  // Derive provider from the raw id's first segment when still missing. A
  // slash-less id has no route segment: it renders without a prefix rather
  // than repeating itself (`gpt-4o - gpt-4o`).
  if (!provider && params.rawId.includes("/")) {
    provider = params.rawId.slice(0, params.rawId.indexOf("/"));
  }

  // Editor: only the explicit `Editor: Model` form (colon then whitespace, no
  // slash in the editor). Guessing an editor from capitalisation cuts real
  // names (`Deepseek chat`), and a bare colon is a tag inside an id
  // (`qwen3:8b`, `...:free`), not an editor.
  let editor = "";
  const colonMatch = work.match(/^([^:/]+?):\s+(.+)$/);
  if (colonMatch) {
    editor = colonMatch[1]!.trim();
    work = colonMatch[2]!.trim();
  }

  // Free markers.
  const { text: cleanedModel, wasFree } = stripFreeMarkers(work);
  const model = cleanedModel.length > 0 ? cleanedModel : work;
  const isFree = !!params.isFree || wasFree;

  if (
    editor &&
    (editor.toLowerCase() === provider.toLowerCase() ||
      editor.toLowerCase() === model.toLowerCase())
  )
    editor = "";

  const freePrefix = isFree ? "🆓 " : "";
  const head = provider.length > 0 ? `${provider}${PROVIDER_TAG_SEPARATOR}` : "";
  let name = `${freePrefix}${head}${model}`;
  if (editor && params.providerTag !== false) name = `${name} (${editor})`;
  if (isFree && params.freeType) {
    const budget = formatFreeBudget({
      freeType: params.freeType,
      monthlyTokens: params.monthlyTokens,
      creditTokens: params.creditTokens,
    });
    if (budget) name = `${name} · ${budget}`;
  }
  return name;
}

export function disambiguateDisplayNames(
  entries: ReadonlyArray<{ id: string; name: string }>
): Map<string, string> {
  const renamed = new Map<string, string>();
  const bareId = (key: string): string => {
    const slash = key.indexOf("/");
    return slash >= 0 ? key.slice(slash + 1) : key;
  };
  const byName = new Map<string, Array<{ id: string; name: string }>>();
  for (const entry of entries) {
    const group = byName.get(entry.name);
    if (group) group.push(entry);
    else byName.set(entry.name, [entry]);
  }
  for (const group of byName.values()) {
    if (group.length < 2) continue;
    const segments = group.map((entry) => bareId(entry.id).split("/"));
    let commonCount = 0;
    const minLength = Math.min(...segments.map((parts) => parts.length));
    for (let depth = 1; depth <= minLength; depth++) {
      const tail = segments[0]!.slice(segments[0]!.length - depth).join("/");
      if (segments.every((parts) => parts.slice(parts.length - depth).join("/") === tail)) {
        commonCount = depth;
      } else {
        break;
      }
    }
    const common = commonCount > 0 ? segments[0]!.slice(-commonCount).join("/") : "";
    const routes = new Map<string, string>();
    if (common.length === 0) {
      for (let i = 0; i < group.length; i++) {
        const parts = segments[i]!;
        let route = parts.join("/");
        for (let length = 1; length <= parts.length; length++) {
          const prefix = parts.slice(0, length).join("/");
          const shared = segments.some(
            (other, j) => j !== i && other.slice(0, length).join("/") === prefix
          );
          if (!shared) {
            route = prefix;
            break;
          }
        }
        routes.set(group[i]!.id, route);
      }
    } else {
      for (let i = 0; i < group.length; i++) {
        const bare = bareId(group[i]!.id);
        if (bare === common) {
          routes.set(group[i]!.id, "");
        } else if (bare.endsWith(`/${common}`)) {
          routes.set(group[i]!.id, bare.slice(0, bare.length - common.length - 1));
        } else {
          routes.set(group[i]!.id, bare);
        }
      }
    }
    const seen = new Set<string>();
    for (const entry of group) {
      const route = routes.get(entry.id) ?? "";
      let next = entry.name;
      if (route.length > 0 && route !== entry.name) {
        next = `${entry.name} (${route})`;
      }
      if (seen.has(next)) {
        next = `${entry.name} (${entry.id})`;
      }
      seen.add(next);
      if (next !== entry.name) {
        renamed.set(entry.id, next);
      }
    }
  }
  // The route step dedups within a group only; a renamed entry may still land
  // on a name another group keeps (e.g. two routes collide, or one route
  // equals a name a single entry already carries). Walk every entry in order
  // and give any late duplicate its publication key as the suffix so the
  // published names stay unique.
  const globalSeen = new Set<string>();
  for (const entry of entries) {
    let name = renamed.get(entry.id) ?? entry.name;
    if (globalSeen.has(name)) {
      name = `${entry.name} (${entry.id})`;
      renamed.set(entry.id, name);
    }
    globalSeen.add(name);
  }
  return renamed;
}
