// Last quota of free rows retired from FREE_MODEL_BUDGETS since RETIRED_LEDGER_SINCE.
// Read only by computeRowSumMirror (the row-sum reading, ended offers included). Never routes,
// never counts in the real figure. Rows older than 12 months drop out of the sum by themselves.
// A provider listed in docs/reference/REMOVED_PROVIDERS.md never appears here.
// The catalog row of a retired offer stays in FREE_MODEL_BUDGETS as `discontinued` with
// `monthlyTokens: 0` and `creditTokens: 0` for at least one release cycle; its last quota lives
// only here. Invariants: tests/unit/free-catalog-retired-ledger.test.ts.

export interface RetiredFreeRow {
  provider: string;
  modelId: string;
  poolKey: string | null;
  /** The last monthly quota the catalog listed for this row, in its published unit. */
  lastListedMonthlyTokens: number;
  /** ISO date (YYYY-MM-DD) the row left the live catalog. */
  retiredAt: string;
  reason: "ended" | "no-models" | "paid-only" | "id-retired" | "unverifiable";
  /** Where the end of the offer was seen (URL or evidence class), reopened on the retirement day. */
  evidence: string;
}

export const RETIRED_LEDGER_SINCE = "2026-11-18";

/** Day the November 2026 re-audit reopened the sources and retired these rows. */
const NOV_2026_REAUDIT = "2026-11-23";

// One block per retired offer: every model id of the block shares the pool, the last listed
// quota, the reason and the evidence.
function block(
  provider: string,
  poolKey: string | null,
  modelIds: string[],
  lastListedMonthlyTokens: number,
  reason: RetiredFreeRow["reason"],
  evidence: string
): RetiredFreeRow[] {
  return modelIds.map((modelId) => ({
    provider,
    modelId,
    poolKey,
    lastListedMonthlyTokens,
    retiredAt: NOV_2026_REAUDIT,
    reason,
    evidence,
  }));
}

export const RETIRED_FREE_ROWS: RetiredFreeRow[] = [
  ...block(
    "mistral",
    "mistral",
    [
      "mistral-large-latest",
      "mistral-medium-3-5",
      "mistral-small-latest",
      "devstral-latest",
      "codestral-latest",
    ],
    1_000_000_000,
    "ended",
    'public-page https://docs.mistral.ai/admin/billing-usage/usage-limits (2026-11-23) — "Free mode includes a monthly usage budget for trying Vibe and Studio. It doesn\'t include API access."'
  ),
  ...block(
    "nara",
    "nara-free",
    [
      "agnes-2.0-flash",
      "agnes-2.5-flash",
      "laguna-s-2.1",
      "minimax-m3-free",
      "mistral-large",
      "mistral-medium-3-5",
      "qwen3.8-27b",
      "stepfun-3.7-flash",
    ],
    210_000_000,
    "no-models",
    'api-public https://router.bynara.id/api/plans (2026-11-23) — plan "free": "token_cap_daily":7000000 … "models":[]'
  ),
  ...block(
    "navy",
    "navy-free",
    ["shared-pool"],
    4_500_000,
    "unverifiable",
    "https://api.navy/ (2026-11-23) — HTTP 403 (Cloudflare challenge) to get.mjs, curl and WebFetch; https://api.navy/v1/models publishes no free quota"
  ),
  ...block(
    "bluesminds",
    "bluesminds",
    [
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4.1",
      "gpt-4.1-mini",
      "gpt-4.1-nano",
      "claude-sonnet-4-5",
      "claude-haiku-4-5",
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "deepseek-reasoner",
      "deepseek-chat",
      "qwen-plus",
      "qwen-turbo",
      "kimi-k2",
      "kimi-k2-thinking",
      "glm-4.7",
      "glm-4-flash",
      "minimax-m2.5",
      "claude-opus-4-5",
      "gemini-2.5-pro",
      "grok-3",
      "qwen-max",
    ],
    7_200_000,
    "ended",
    'api-public https://api.bluesminds.com/api/status (2026-11-23) — "contact for buying credit"; /api/pricing lists no zero-priced model'
  ),
  ...block(
    "arcee-ai",
    "arcee-free",
    ["arcee-ai/trinity-large-preview:free"],
    4_800_000,
    "paid-only",
    "public-page https://docs.arcee.ai/get-started/pricing (2026-11-23) — paid prices only; no free, trial or credit"
  ),
  ...block(
    "huggingface",
    "huggingface",
    [
      "meta-llama/llama-3.1-8b-instruct",
      "meta-llama/llama-3.2-11b-instruct",
      "mistralai/mistral-7b-instruct",
      "google/gemma-2-9b-it",
      "Qwen/Qwen2.5-7B-Instruct",
      "deepseek-ai/DeepSeek-V3",
    ],
    200_000,
    "paid-only",
    'public-page https://huggingface.co/docs/inference-providers/pricing (2026-11-23) — "Free Users None - yes (credits purchase required)"'
  ),
  ...block(
    "huggingchat",
    "huggingchat",
    [
      "baidu/ERNIE-4.5-VL-424B-A47B-Base-PT",
      "CohereLabs/c4ai-command-r7b-12-2024",
      "CohereLabs/command-a-reasoning-08-2025",
      "CohereLabs/command-a-vision-07-2025",
      "deepseek-ai/DeepSeek-V4-Pro",
      "deepseek-ai/DeepSeek-V4-Flash",
      "google/gemma-4-31B-it",
      "google/gemma-4-26B-A4B-it",
      "inclusionAI/Ling-2.6-1T",
      "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      "MiniMaxAI/MiniMax-M3",
      "moonshotai/Kimi-K2.7-Code",
      "moonshotai/Kimi-K2.6",
      "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "Qwen/Qwen3.5-122B-A10B",
      "Qwen/Qwen3.5-397B-A17B",
      "Qwen/Qwen3.6-27B",
      "Qwen/Qwen3.6-35B-A3B",
      "stepfun-ai/Step-3.7-Flash",
      "XiaomiMiMo/MiMo-V2.5-Pro",
      "zai-org/GLM-5.2",
    ],
    500_000,
    "paid-only",
    'public-page https://huggingface.co/docs/inference-providers/pricing (2026-11-23) — "Free Users None - yes (credits purchase required)"'
  ),
];
