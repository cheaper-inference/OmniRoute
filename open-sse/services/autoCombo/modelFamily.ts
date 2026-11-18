/**
 * #6453 — Provider-family auto combos.
 *
 * `auto/<family>` (e.g. `auto/glm`, `auto/minimax`) is a NEW axis alongside the
 * existing task-mode (`auto/best-coding`) and category:tier (`auto/coding:fast`)
 * combos: instead of grouping by routing intent, it groups by underlying MODEL
 * FAMILY and materializes an on-demand virtual combo spanning whatever installed
 * backends currently expose that family, degrading gracefully as backends
 * rotate — same on-demand mechanism (`createVirtualAutoCombo`), a different
 * candidate filter.
 *
 * Kept as a pure, dependency-free module so `detectModelFamily` is unit-testable
 * in isolation without touching the DB/registry-backed virtual factory.
 *
 * The model-id prefix table itself lives in `modelGeneration.ts` and is imported
 * here, so `auto/<family>` detection and newest-generation parsing share ONE
 * canonical table instead of two that can drift.
 */
import { MODEL_FAMILY_PREFIXES, parseModelGeneration } from "./modelGeneration";

export type ModelFamily =
  | "glm"
  | "minimax"
  | "mimo"
  | "zai"
  | "gemma"
  | "llama"
  | "gemini"
  | "kimi"
  | "qwen"
  | "deepseek"
  | "gpt"
  // GPT capability tiers. `auto/gpt` still matches every `gpt-*` model; these two
  // ids narrow to one tier so `auto/gpt-sol` never routes an Astra/Terra model.
  | "gpt-astra"
  | "gpt-sol"
  | "claude-opus"
  | "claude-sonnet"
  | "claude-haiku"
  | "claude-fable";

export const MODEL_FAMILIES: readonly ModelFamily[] = [
  "glm",
  "minimax",
  "mimo",
  "zai",
  "gemma",
  "llama",
  "gemini",
  "kimi",
  "qwen",
  "deepseek",
  "gpt",
  "gpt-astra",
  "gpt-sol",
  "claude-opus",
  "claude-sonnet",
  "claude-haiku",
  "claude-fable",
];

const MODEL_FAMILY_SET: ReadonlySet<string> = new Set(MODEL_FAMILIES);

/** Model-id prefix → family. Matched against the bare model id (provider prefix, if
 * any, stripped) so both `glm-5.2` and `zai/glm-5.2` resolve the same way. */
const FAMILY_ID_PATTERNS = MODEL_FAMILY_PREFIXES as ReadonlyArray<{
  family: ModelFamily;
  pattern: RegExp;
}>;

/**
 * Families that are a TIER of a broader prefix family rather than a prefix of
 * their own: `gpt-6.2-sol` still detects as base family `gpt` (so `auto/gpt`
 * keeps matching every GPT model), while `auto/gpt-sol` narrows by the parsed
 * tier key. Claude tiers need no entry — their base family IS the tier.
 */
const TIER_SCOPED_FAMILIES: ReadonlySet<ModelFamily> = new Set<ModelFamily>([
  "gpt-astra",
  "gpt-sol",
]);

/**
 * `zai` is deliberately NOT a model-id prefix rule: Zhipu's z.ai hosted API serves
 * the same `glm-*` model ids as every other GLM backend (`glm` provider, custom
 * OpenAI/Anthropic-compatible connections, etc — see
 * `open-sse/config/providers/registry/zai/index.ts`). Aliasing `auto/zai` to a
 * model-name prefix would make it identical to `auto/glm`, so instead it is
 * resolved by PROVIDER id: "route to my z.ai backend specifically", distinct from
 * `auto/glm` ("route to any connected provider currently serving a GLM model,
 * z.ai included"). Documented here rather than deferred because the distinction
 * is meaningful and the rule is a one-line lookup.
 */
export const FAMILY_PROVIDER_OVERRIDE: Readonly<Partial<Record<ModelFamily, string>>> = {
  zai: "zai",
};

export function isValidModelFamily(value: string | null | undefined): value is ModelFamily {
  return typeof value === "string" && MODEL_FAMILY_SET.has(value);
}

/**
 * Detect the model family from a bare or provider-prefixed model id.
 * Returns `null` when the id doesn't match any known family prefix — including
 * `zai`, which is never detected from a model id (see `FAMILY_PROVIDER_OVERRIDE`).
 */
export function detectModelFamily(modelId: string | null | undefined): ModelFamily | null {
  if (typeof modelId !== "string" || modelId.trim().length === 0) return null;
  const bare = modelId.includes("/") ? modelId.slice(modelId.lastIndexOf("/") + 1) : modelId;
  for (const { family, pattern } of FAMILY_ID_PATTERNS) {
    if (pattern.test(bare)) return family;
  }
  return null;
}

/**
 * Tier-scoped family key for a model id (`gpt-6.2-sol` → `gpt-sol`), or `null`
 * when the id is unrecognized. Used by the tier-scoped `auto/<family>` filters
 * and by newest-generation promotion.
 */
export function detectTierFamilyKey(modelId: string | null | undefined): string | null {
  return parseModelGeneration(modelId)?.tierFamilyKey ?? null;
}

interface FamilyPoolCandidate {
  provider: string;
  model: string;
}

/**
 * Build the candidate filter for `auto/<family>`. Provider-override families
 * (currently only `zai`) filter by connection provider id; every other family
 * filters by `detectModelFamily(model) === family`, with a provider-scoped
 * exception for Kimi backends exposing bare `k3` / `k3.1-*` model ids.
 */
export function buildFamilyCandidateFilter(
  family: ModelFamily
): (candidate: FamilyPoolCandidate) => boolean {
  const providerOverride = FAMILY_PROVIDER_OVERRIDE[family];
  if (providerOverride) {
    return (candidate) => candidate.provider === providerOverride;
  }
  if (TIER_SCOPED_FAMILIES.has(family)) {
    return (candidate) => detectTierFamilyKey(candidate.model) === family;
  }
  return (candidate) => {
    if (detectModelFamily(candidate.model) === family) return true;
    // Coding OAuth/API-key and web share bare k3-family ids. Do not classify an
    // unrelated provider's k3 (or other models on these providers) as Kimi.
    const bareModel = candidate.model.slice(candidate.model.lastIndexOf("/") + 1);
    return (
      family === "kimi" &&
      ["kimi-coding", "kimi-coding-apikey", "kimi-web"].includes(candidate.provider) &&
      /^k3(?:$|[.-])/.test(bareModel.toLowerCase())
    );
  };
}

/** Advertised `auto/<family>` catalog ids (#6453), e.g. `auto/glm`, `auto/minimax`. */
export const AUTO_FAMILY_IDS: readonly string[] = MODEL_FAMILIES.map((family) => `auto/${family}`);
