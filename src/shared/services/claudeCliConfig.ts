import { modelSupportsContext1mBeta } from "@omniroute/open-sse/config/context1m";
import { parseQuotaModelName } from "@/lib/quota/quotaModelNaming";

export function normalizeClaudeBaseUrl(value: string): string {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

export interface ClaudeDiscoverySnippetInput {
  /** OmniRoute root — Claude Code appends `/v1/messages` itself, so no `/v1` suffix. */
  baseUrl: string;
  /** Rendered verbatim; the caller passes a placeholder, never a real key. */
  apiKeyPlaceholder: string;
  /**
   * Optional `CLAUDE_CODE_AUTO_COMPACT_WINDOW`. Claude Code assumes a 200K window for
   * any model id it does not recognize, so a model with a different real window needs
   * this or auto-compaction fires at the wrong point. Omitted when absent/invalid.
   */
  autoCompactWindow?: number;
}

/**
 * Build the `settings.json` fragment that points Claude Code at this OmniRoute and
 * turns on gateway model discovery. Pure string builder — no key material, no I/O —
 * so the dashboard can render it and a test can assert its exact shape.
 */
export function buildClaudeDiscoverySettingsSnippet(input: ClaudeDiscoverySnippetInput): string {
  const env = buildDiscoveryEnv(input.baseUrl, input.apiKeyPlaceholder);

  const window = input.autoCompactWindow;
  if (typeof window === "number" && Number.isFinite(window) && window > 0) {
    // Claude Code reads settings env values as strings.
    env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = String(Math.floor(window));
  }

  return JSON.stringify({ env }, null, 2);
}

export function getStoredClaudeAuthValue(
  env: Record<string, unknown> | null | undefined
): string | null {
  if (!env || typeof env !== "object") return null;

  const authValue = env.ANTHROPIC_AUTH_TOKEN ?? env.ANTHROPIC_API_KEY;
  if (typeof authValue !== "string") return null;

  const trimmed = authValue.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** The three entries that point Claude Code at the gateway and turn on model discovery. */
function buildDiscoveryEnv(baseUrl: string, authToken: string): Record<string, string> {
  return {
    ANTHROPIC_BASE_URL: normalizeClaudeBaseUrl(baseUrl),
    ANTHROPIC_AUTH_TOKEN: authToken,
    CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: "1",
  };
}

type ClaudeCodeTier = "opus" | "sonnet" | "haiku" | "fable";

interface ClaudeCodeModelPlan {
  /** The provider's quota-share models, highest model first, no duplicates. */
  models: string[];
  /** Default ANTHROPIC_MODEL: the sonnet pick, else the first model. Null when there is none. */
  main: string | null;
  tiers: Record<ClaudeCodeTier, string | null>;
}

const CLAUDE_FAMILY = new Set(["claude", "anthropic"]);
const MODEL_COLLATOR = new Intl.Collator("en", { numeric: true });
const LONG_CONTEXT_SUFFIX = "[1m]";
/** Claude Code assumes 200K for a gateway model id it does not know. */
const DEFAULT_AUTO_COMPACT_WINDOW = "190000";

const TIER_ENV: ReadonlyArray<readonly [string, ClaudeCodeTier]> = [
  ["ANTHROPIC_DEFAULT_OPUS_MODEL", "opus"],
  ["ANTHROPIC_DEFAULT_SONNET_MODEL", "sonnet"],
  ["ANTHROPIC_DEFAULT_HAIKU_MODEL", "haiku"],
  ["ANTHROPIC_DEFAULT_FABLE_MODEL", "fable"],
];

function isSameProvider(idProvider: string, provider: string): boolean {
  if (idProvider === provider) return true;
  return CLAUDE_FAMILY.has(idProvider) && CLAUDE_FAMILY.has(provider);
}

function compareModelEntries(
  a: { id: string; model: string },
  b: { id: string; model: string }
): number {
  const byModel = MODEL_COLLATOR.compare(b.model, a.model);
  if (byModel !== 0) return byModel;
  if (a.id === b.id) return 0;
  return a.id < b.id ? -1 : 1;
}

function selectProviderModels(
  provider: string,
  availableIds: readonly string[]
): Array<{ id: string; model: string }> {
  const entries: Array<{ id: string; model: string }> = [];
  for (const id of new Set(availableIds)) {
    const parsed = parseQuotaModelName(id);
    if (parsed && isSameProvider(parsed.provider, provider)) {
      entries.push({ id, model: parsed.model });
    }
  }
  return entries.sort(compareModelEntries);
}

function findTier(entries: ReadonlyArray<{ id: string; model: string }>, tier: ClaudeCodeTier) {
  const hit = entries.find((entry) =>
    entry.model
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .includes(tier)
  );
  return hit ? hit.id : null;
}

/** Plan the Claude Code model settings from the quota-share models a key may call. */
export function planClaudeCodeModels(
  provider: string,
  availableIds: readonly string[]
): ClaudeCodeModelPlan {
  const entries = selectProviderModels(provider, availableIds);
  const tiers: Record<ClaudeCodeTier, string | null> = {
    opus: findTier(entries, "opus"),
    sonnet: findTier(entries, "sonnet"),
    haiku: findTier(entries, "haiku"),
    fable: findTier(entries, "fable"),
  };
  const models = entries.map((entry) => entry.id);
  return { models, main: tiers.sonnet ?? models[0] ?? null, tiers };
}

/** True for a quota-share id of the claude/anthropic family whose model the gateway serves with 1M. */
export function modelSupportsLongContext(modelId: string): boolean {
  const parsed = parseQuotaModelName(modelId);
  if (!parsed || !CLAUDE_FAMILY.has(parsed.provider)) return false;
  return modelSupportsContext1mBeta(parsed.model);
}

/**
 * Build the Claude Code `env` block for a model plan. Without a main model it is the
 * discovery fragment. With long context, every model that supports it gets the `[1m]`
 * suffix, and the compact window is left out when the main model carries the suffix.
 */
export function buildClaudeCodeEnv(input: {
  baseUrl: string;
  authToken: string;
  plan: ClaudeCodeModelPlan;
  mainModel: string | null;
  longContext: boolean;
}): Record<string, string> {
  const { plan, longContext } = input;
  if (plan.main === null) return buildDiscoveryEnv(input.baseUrl, input.authToken);

  const main =
    input.mainModel !== null && plan.models.includes(input.mainModel) ? input.mainModel : plan.main;
  const mark = (id: string) =>
    longContext && modelSupportsLongContext(id) ? `${id}${LONG_CONTEXT_SUFFIX}` : id;

  const env: Record<string, string> = {
    ANTHROPIC_BASE_URL: normalizeClaudeBaseUrl(input.baseUrl),
    ANTHROPIC_AUTH_TOKEN: input.authToken,
    ANTHROPIC_MODEL: mark(main),
  };
  for (const [name, tier] of TIER_ENV) {
    const id = plan.tiers[tier];
    if (id !== null) env[name] = mark(id);
  }
  if (env.ANTHROPIC_MODEL === main) {
    env.CLAUDE_CODE_AUTO_COMPACT_WINDOW = DEFAULT_AUTO_COMPACT_WINDOW;
  }
  return env;
}

/** The `settings.json` text for an `env` block, with two-space indentation. */
export function formatClaudeSettingsJson(env: Record<string, string>): string {
  return JSON.stringify({ env }, null, 2);
}
