/**
 * Newest-generation ranking within tier-scoped model families.
 *
 * Built-in `auto` / `auto/*` routes already pick up newly synced model releases,
 * but historical telemetry, latency and score ties still let an OLDER generation
 * outrank a newer one (`gpt-6-sol` beating `gpt-6.2-sol`). A linear scoring
 * weight cannot fix that without distorting cross-family weights, so this module
 * supplies the pure comparison primitives a slot-preserving promotion pass needs:
 *
 *   - `parseModelGeneration` — one canonical parser for the model id's numeric
 *     version tuple, its stability channel (GA vs preview/beta/…/dated snapshot)
 *     and its TIER-SCOPED family key (`gpt-sol` never compares against
 *     `gpt-astra`, `claude-fable` never against `claude-opus`).
 *   - `compareGenerationVersions` — numeric tuple ordering (`6.10 > 6.2`), with
 *     stability as the tie-breaker at an equal base version.
 *   - `promoteNewestGenerationsInOrder` — moves the newest eligible generation of
 *     each `(bucket, tierFamilyKey)` group into that group's first slot, leaving
 *     every other slot (other families, other rungs, penalised candidates) exactly
 *     where it was.
 *
 * Deliberately dependency-free and pure: `modelFamily.ts` imports the prefix table
 * below as the single source of truth for `auto/<family>` detection, so the two
 * modules can never drift apart. Nothing here reads settings, the DB or the clock.
 */

/** Release channel of a model id. Higher rank = more generally available. */
export type GenerationStability = "ga" | "rc" | "beta" | "preview" | "alpha" | "exp" | "snapshot";

/**
 * Stability ranks, highest first. A GA release outranks a pre-release of the SAME
 * base version; a dated snapshot (`claude-haiku-4-5-20251001`) is the weakest
 * channel because it pins one frozen build rather than the moving release.
 */
export const STABILITY_RANK: Readonly<Record<GenerationStability, number>> = {
  ga: 6,
  rc: 5,
  beta: 4,
  preview: 3,
  alpha: 2,
  exp: 1,
  snapshot: 0,
};

/** Token → stability channel. Matched against lower-cased id tokens. */
const STABILITY_TOKENS: ReadonlyArray<{ stability: GenerationStability; token: string }> = [
  { stability: "rc", token: "rc" },
  { stability: "beta", token: "beta" },
  { stability: "preview", token: "preview" },
  { stability: "alpha", token: "alpha" },
  { stability: "exp", token: "exp" },
  { stability: "exp", token: "experimental" },
  { stability: "snapshot", token: "snapshot" },
];

/** `20241022` / `2024-10-22` / `1017` / `002` — dated or zero-padded revision snapshot. */
const DATED_SNAPSHOT = /^(?:\d{8}|\d{4}[-_]\d{2}[-_]\d{2}|\d{4}|0\d{2})$/;
const INLINE_DATE_SNAPSHOT = /(?:^|[-_])\d{4}[-_]\d{2}[-_]\d{2}(?=$|[-_])/g;

/**
 * Canonical model-id prefix → base family. `modelFamily.ts` re-exports this as
 * `FAMILY_ID_PATTERNS`, so `auto/<family>` detection and generation parsing share
 * one table instead of two that can drift.
 */
export const MODEL_FAMILY_PREFIXES: ReadonlyArray<{ family: string; pattern: RegExp }> = [
  { family: "glm", pattern: /^glm-/i },
  { family: "minimax", pattern: /^minimax-/i },
  { family: "mimo", pattern: /^mimo-/i },
  { family: "gemma", pattern: /^gemma-/i },
  { family: "llama", pattern: /^llama-/i },
  { family: "gemini", pattern: /^gemini-/i },
  { family: "kimi", pattern: /^kimi-/i },
  { family: "qwen", pattern: /^qwen/i },
  { family: "deepseek", pattern: /^deepseek-/i },
  { family: "gpt", pattern: /^gpt-/i },
  // Claude tiers. Matches `claude-opus-4-8`, `claude-4.6-opus-high` and
  // Bedrock-style `us.anthropic.claude-opus-4-v1:0` (the `.`-separated prefix).
  // `fable` is its own tier: it must never be routable through
  // `auto/claude-opus` / `-sonnet` / `-haiku`.
  { family: "claude-fable", pattern: /(?:^|\.)claude-(?:\d[\d.-]*-)?fable/i },
  { family: "claude-opus", pattern: /(?:^|\.)claude-(?:\d[\d.-]*-)?opus/i },
  { family: "claude-sonnet", pattern: /(?:^|\.)claude-(?:\d[\d.-]*-)?sonnet/i },
  { family: "claude-haiku", pattern: /(?:^|\.)claude-(?:\d[\d.-]*-)?haiku/i },
];

/**
 * GPT capability tiers, most specific first. `gpt-5.6-codex-mini` must resolve to
 * `gpt-codex-mini` (not `gpt-codex`, not `gpt-mini`), so the compound keyword is
 * matched before its parts.
 */
export const GPT_TIER_KEYWORDS: ReadonlyArray<{ key: string; keyword: string }> = [
  { key: "gpt-codex-mini", keyword: "codex-mini" },
  { key: "gpt-codex", keyword: "codex" },
  { key: "gpt-mini", keyword: "mini" },
  { key: "gpt-nano", keyword: "nano" },
  { key: "gpt-astra", keyword: "astra" },
  { key: "gpt-sol", keyword: "sol" },
  { key: "gpt-terra", keyword: "terra" },
  { key: "gpt-luna", keyword: "luna" },
];

/** Gemini capability tiers, most specific first (`flash-lite` before `flash`). */
export const GEMINI_TIER_KEYWORDS: ReadonlyArray<{ key: string; keyword: string }> = [
  { key: "gemini-flash-lite", keyword: "flash-lite" },
  { key: "gemini-flash", keyword: "flash" },
  { key: "gemini-pro", keyword: "pro" },
  { key: "gemini-hydrogen", keyword: "hydrogen" },
];

/**
 * Families whose tier is already encoded in the base family name (Claude tiers are
 * separate `auto/<family>` ids), so no keyword lookup is needed.
 */
const TIER_IS_BASE_FAMILY: ReadonlySet<string> = new Set([
  "claude-fable",
  "claude-opus",
  "claude-sonnet",
  "claude-haiku",
]);

/**
 * Version tuples are capped at two components (major.minor). A third numeric run
 * in a model id is almost always a parameter count (`llama-3.3-70b`,
 * `gemma-3-27b`) or a date, and folding it into the tuple would rank a bigger
 * build as a newer generation.
 */
const MAX_VERSION_COMPONENTS = 2;

/** `6.2`, `6`, `2.5` — a fully numeric token. */
const NUMERIC_TOKEN = /^\d+(?:\.\d+)*$/;
/** `qwen3`, `k3`, `m2`, `v4` — a letter prefix glued to the version. */
const PREFIXED_VERSION_TOKEN = /^[a-z]+(\d+(?:\.\d+)*)$/;
/** `4o`, `70b` — a version glued to a size/suffix letter. */
const SUFFIXED_VERSION_TOKEN = /^(\d+(?:\.\d+)*)[a-z]+$/;
/**
 * `70b`, `27b`, `32k`, `1m`, `128e` — parameter, context, or MoE expert counts,
 * NOT generation versions. Without this exclusion `gemma-3-27b` reads as `3.27`
 * and `llama-4-maverick-17b-128e` reads as `4.128`.
 */
const SIZE_COUNT_TOKEN = /^\d+(?:\.\d+)?[bkme]$/;

export interface ParsedModelGeneration {
  /** Tier-scoped family key, e.g. `gpt-sol`, `claude-opus`, `gemini-flash`. */
  tierFamilyKey: string;
  /** Numeric version tuple, e.g. `[6, 2]`. Never empty. */
  version: number[];
  stability: GenerationStability;
  stabilityRank: number;
}

/** Strip a provider prefix (`openai/gpt-6.2-sol` → `gpt-6.2-sol`). */
function bareModelId(modelId: string): string {
  return modelId.includes("/") ? modelId.slice(modelId.lastIndexOf("/") + 1) : modelId;
}

/** Base family for a bare model id, or `null` when no prefix rule matches. */
export function detectBaseFamily(modelId: string | null | undefined): string | null {
  if (typeof modelId !== "string" || modelId.trim().length === 0) return null;
  const bare = bareModelId(modelId);
  for (const { family, pattern } of MODEL_FAMILY_PREFIXES) {
    if (pattern.test(bare)) return family;
  }
  return null;
}

function versionFromToken(token: string): number[] | null {
  if (NUMERIC_TOKEN.test(token)) return token.split(".").map(Number);
  const prefixed = PREFIXED_VERSION_TOKEN.exec(token);
  if (prefixed) return prefixed[1].split(".").map(Number);
  const suffixed = SUFFIXED_VERSION_TOKEN.exec(token);
  if (suffixed) return suffixed[1].split(".").map(Number);
  return null;
}

function stabilityFromToken(token: string): GenerationStability | null {
  if (DATED_SNAPSHOT.test(token)) return "snapshot";
  const match = STABILITY_TOKENS.find((entry) => entry.token === token);
  return match ? match.stability : null;
}

function tierFamilyKeyFor(
  baseFamily: string,
  nonVersionTokens: string[],
  rawTokens: string[]
): string {
  if (TIER_IS_BASE_FAMILY.has(baseFamily)) return baseFamily;
  if (baseFamily === "deepseek") {
    // `deepseek-r1` (reasoning) is a distinct series from `deepseek-v3` / `deepseek-v4`.
    if (rawTokens.some((token) => /^r\d+(?:\.\d+)*$/.test(token))) return "deepseek-r";
    return "deepseek";
  }
  const padded = `-${nonVersionTokens.join("-")}-`;
  const table =
    baseFamily === "gpt"
      ? GPT_TIER_KEYWORDS
      : baseFamily === "gemini"
        ? GEMINI_TIER_KEYWORDS
        : null;
  if (!table) return baseFamily;
  for (const { key, keyword } of table) {
    if (padded.includes(`-${keyword}-`)) return key;
  }
  return baseFamily;
}

/**
 * Parse a model id into its tier-scoped family, numeric version tuple and
 * stability channel. Returns `null` for anything unrecognized (unknown family,
 * no version token) so callers can leave those candidates in score order.
 */
export function parseModelGeneration(
  modelId: string | null | undefined
): ParsedModelGeneration | null {
  if (typeof modelId !== "string" || modelId.trim().length === 0) return null;
  const baseFamily = detectBaseFamily(modelId);
  if (!baseFamily) return null;

  // Strip Bedrock/router `:0` invocation suffix before tokenizing (`claude-sonnet-4-v1:0`).
  let bare = bareModelId(modelId).toLowerCase().replace(/:\d+$/, "");
  let stability: GenerationStability = "ga";

  // Match hyphenated/underscored YYYY-MM-DD snapshots BEFORE splitting on [-_],
  // otherwise `gpt-4o-2024-08-06` splits into `2024`, `08`, `06` and reads `2024`
  // as a minor version.
  const stripped = bare.replace(INLINE_DATE_SNAPSHOT, () => {
    stability = "snapshot";
    return "";
  });
  bare = stripped;

  const tokens = bare.split(/[-_]/).filter((token) => token.length > 0);

  const version: number[] = [];
  const nonVersionTokens: string[] = [];

  for (const token of tokens) {
    const tokenStability = stabilityFromToken(token);
    if (tokenStability) {
      // Weakest channel wins: `-preview-20250101` is a dated snapshot, not a preview.
      if (STABILITY_RANK[tokenStability] < STABILITY_RANK[stability]) stability = tokenStability;
      continue;
    }
    // Bedrock `-v1` suffix after an already-parsed version (`claude-sonnet-4-v1:0`)
    // is a deployment revision, not minor version `.1`.
    if (/^v\d+$/.test(token) && version.length > 0) {
      nonVersionTokens.push(token);
      continue;
    }
    const tokenVersion = versionFromToken(token);
    if (tokenVersion && !SIZE_COUNT_TOKEN.test(token)) {
      for (const part of tokenVersion) {
        if (version.length >= MAX_VERSION_COMPONENTS) break;
        version.push(part);
      }
      continue;
    }
    nonVersionTokens.push(token);
  }

  if (version.length === 0) return null;

  return {
    tierFamilyKey: tierFamilyKeyFor(baseFamily, nonVersionTokens, tokens),
    version,
    stability,
    stabilityRank: STABILITY_RANK[stability],
  };
}

/**
 * Order two generations. Positive when `a` is NEWER than `b`.
 *
 * Numeric tuples compare element-wise (`[6, 10] > [6, 2]`), a missing component
 * reads as 0 (`6.2 > 6`), and an equal base version falls back to the stability
 * channel so a GA release outranks its own preview.
 */
export function compareGenerationVersions(
  a: Pick<ParsedModelGeneration, "version" | "stabilityRank">,
  b: Pick<ParsedModelGeneration, "version" | "stabilityRank">
): number {
  const length = Math.max(a.version.length, b.version.length);
  for (let index = 0; index < length; index += 1) {
    const left = a.version[index] ?? 0;
    const right = b.version[index] ?? 0;
    if (left !== right) return left - right;
  }
  return a.stabilityRank - b.stabilityRank;
}

/** Fail-safe default: turning on `autoPreferNewestInFamily` alone never allows a
 * price jump, because the multiplier defaults to 1.0 (equal-or-cheaper only). */
export const DEFAULT_NEWEST_PRICE_MULTIPLIER = 1;

/**
 * Resolve the configured price-jump multiplier.
 *
 * Unset / non-numeric / non-positive values fall back to the fail-safe `1.0`, so
 * enabling newest-generation preference can never silently escalate spend.
 * `clampToOne` (used on `:thrifty`, whose pool is rung-ordered) forbids any
 * upward jump at all.
 */
export function resolveNewestPriceMultiplier(
  configured: unknown,
  options: { clampToOne?: boolean } = {}
): number {
  const parsed = typeof configured === "number" ? configured : Number(configured);
  const base = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_NEWEST_PRICE_MULTIPLIER;
  return options.clampToOne ? Math.min(base, 1) : base;
}

/** One candidate as the promotion pass needs to see it. */
export interface NewestGenerationCandidate {
  /**
   * Bucket identity the caller owns — ladder rung, health group and blocked
   * status. Candidates are only ever compared inside one bucket, so a newer
   * generation can never cross a rung or jump ahead of a healthy sibling.
   */
  bucket: string;
  /** Tier-scoped family key; `null` (unparseable) candidates are never promoted. */
  tierFamilyKey: string | null;
  version: number[];
  stabilityRank: number;
  /** Raw blended $/1M tokens, or `null` when the model has no pricing row. */
  rawCost: number | null;
}

export interface BlockedPromotionInfo<T> {
  baseline: T;
  blocked: T;
  reason: "null-cost" | "multiplier";
  baselineCost: number | null;
  newerCost: number | null;
}

export interface PromoteNewestOptions<T = unknown> {
  /** Price-jump ceiling; `null`/`undefined` uses the fail-safe default of 1.0. */
  maxPriceMultiplier?: number | null;
  /** Optional diagnostic hook invoked when a newer candidate is held back by the price guard. */
  onBlocked?: (info: BlockedPromotionInfo<T>) => void;
}

function bucketGroupKey(candidate: NewestGenerationCandidate): string | null {
  if (!candidate.tierFamilyKey) return null;
  return `${candidate.bucket}\u0000${candidate.tierFamilyKey}`;
}

/**
 * Fail-closed price guard: a newer generation may only jump ahead of the
 * top-ranked older candidate in its group when BOTH raw costs are known and the
 * newer one is at most `multiplier` times the older one. `$0 → $0` passes;
 * `$0 → >$0`, `null → >$0` and `anything → null` are all held back.
 */
function priceGuardAllows(
  newer: NewestGenerationCandidate,
  baseline: NewestGenerationCandidate,
  multiplier: number
): boolean {
  if (newer.rawCost === null || baseline.rawCost === null) return false;
  return newer.rawCost <= baseline.rawCost * multiplier;
}

/**
 * Order every `(bucket, tierFamilyKey)` group newest-generation-first, filling the
 * slots that group already occupied.
 *
 * Slot-preserving by construction: a group's members occupy a fixed set of slots,
 * and only the order in which they fill those slots changes. Cross-family
 * positions, ladder-rung boundaries and penalised/blocked groups are therefore
 * invariant — the property a scoring weight could not guarantee. Candidates the
 * parser does not recognize keep their exact position.
 *
 * The price-jump guard is evaluated ONCE per group, against the group's current
 * leader: if the newly-first candidate would cost more than `multiplier` times that
 * leader (or either raw cost is unknown), the group keeps its incoming order as a
 * whole rather than being partially reordered.
 */
export function promoteNewestGenerationsInOrder<T>(
  items: readonly T[],
  describe: (item: T) => NewestGenerationCandidate | null,
  options: PromoteNewestOptions<T> = {}
): T[] {
  if (items.length < 2) return [...items];
  const multiplier = resolveNewestPriceMultiplier(options.maxPriceMultiplier);

  const described = items.map(describe);
  const groups = new Map<string, number[]>();
  for (let index = 0; index < described.length; index += 1) {
    const candidate = described[index];
    if (!candidate) continue;
    const key = bucketGroupKey(candidate);
    if (!key) continue;
    const members = groups.get(key);
    if (members) members.push(index);
    else groups.set(key, [index]);
  }

  const desired = new Map<string, number[]>();
  for (const [key, members] of groups) {
    if (members.length < 2) continue;
    // Build the promoted order one slot at a time so NO member can ever jump
    // ahead of a cheaper (or unpriced) earlier-ranked member in the group.
    const remaining = [...members];
    const chosen: number[] = [];
    const reportedBlocked = new Set<number>();
    while (remaining.length > 0) {
      const byNewest = [...remaining].sort((a, b) => {
        const left = described[a];
        const right = described[b];
        if (!left || !right) return a - b;
        const delta = compareGenerationVersions(right, left);
        return delta !== 0 ? delta : a - b;
      });
      let picked: number | undefined;
      for (const candIdx of byNewest) {
        const candPos = remaining.indexOf(candIdx);
        const cand = described[candIdx];
        if (!cand) continue;
        let blockingBaseline: number | null = null;
        for (let i = 0; i < candPos; i += 1) {
          const baseIdx = remaining[i];
          const displaced = described[baseIdx];
          if (!displaced || !priceGuardAllows(cand, displaced, multiplier)) {
            blockingBaseline = baseIdx;
            break;
          }
        }
        if (blockingBaseline === null) {
          picked = candIdx;
          break;
        }
        if (candIdx === byNewest[0] && options.onBlocked && !reportedBlocked.has(candIdx)) {
          reportedBlocked.add(candIdx);
          const baseDesc = described[blockingBaseline];
          options.onBlocked({
            baseline: items[blockingBaseline],
            blocked: items[candIdx],
            reason:
              cand.rawCost === null || (baseDesc?.rawCost ?? null) === null
                ? "null-cost"
                : "multiplier",
            baselineCost: baseDesc?.rawCost ?? null,
            newerCost: cand.rawCost,
          });
        }
      }
      const next = picked ?? remaining[0];
      chosen.push(next);
      remaining.splice(remaining.indexOf(next), 1);
    }
    if (chosen.every((index, position) => index === members[position])) continue;
    desired.set(key, chosen);
  }

  if (desired.size === 0) return [...items];

  const cursor = new Map<string, number>();
  const result: T[] = [];
  for (let slot = 0; slot < items.length; slot += 1) {
    const candidate = described[slot];
    const key = candidate ? bucketGroupKey(candidate) : null;
    const order = key ? desired.get(key) : undefined;
    if (!key || !order) {
      result.push(items[slot]);
      continue;
    }
    const position = cursor.get(key) ?? 0;
    cursor.set(key, position + 1);
    result.push(items[order[position]]);
  }
  return result;
}
