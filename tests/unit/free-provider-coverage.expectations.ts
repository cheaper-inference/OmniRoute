import type { FreeQuotaUnit } from "@omniroute/open-sse/config/freeModelCatalog.ts";

import type { ProviderExpectation, WaveRowExpectation } from "./_helpers/freeProviderWave.ts";

function daily(
  monthlyTokens: number,
  unit: FreeQuotaUnit,
  poolKey: string,
  models: string[],
  tos: WaveRowExpectation["tos"] | ((modelId: string) => WaveRowExpectation["tos"]),
  freeNote: RegExp,
  options: {
    trains?: string[];
    boost?: number;
    gates?: WaveRowExpectation["gates"];
    trainsOnPrompts?: boolean;
    hardStopGuaranteed?: boolean;
    lastWave?: string;
  } = {}
): ProviderExpectation {
  return {
    live: models.map((modelId) => ({
      modelId,
      monthlyTokens,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey,
      tos: typeof tos === "function" ? tos(modelId) : tos,
      gates: options.gates,
      trainsOnPrompts: options.trains?.includes(modelId) ? true : options.trainsOnPrompts,
      hardStopGuaranteed: options.hardStopGuaranteed,
    })),
    unit,
    hasFree: true,
    freeNote,
    contribution: {
      real: options.gates ? 0 : monthlyTokens,
      firstMonth: options.gates ? 0 : monthlyTokens,
      gated: options.gates ? monthlyTokens : 0,
      socialGated: 0,
      boost: options.boost ?? 0,
      rowSumLive: unit === "tokens" ? monthlyTokens * models.length : 0,
      publishedPools: options.gates ? 0 : 1,
    },
    lastWave: options.lastWave ?? "E1a",
  };
}

function signup(
  poolKey: string,
  modelIds: string[],
  tos: WaveRowExpectation["tos"],
  creditTokens: number,
  gates: WaveRowExpectation["gates"]
): WaveRowExpectation[] {
  return modelIds.map((modelId) => ({
    modelId,
    monthlyTokens: 0,
    creditTokens,
    freeType: "one-time-initial",
    poolKey,
    tos,
    gates,
  }));
}

function e2(
  expectation: Omit<ProviderExpectation, "contribution" | "lastWave">
): ProviderExpectation {
  return {
    ...expectation,
    contribution: {
      real: 0,
      firstMonth: 0,
      gated: 0,
      socialGated: 0,
      boost: 0,
      rowSumLive: 0,
      publishedPools: 0,
    },
    lastWave: "E2",
  };
}

const requestyTraining = [
  "nvidia/nemotron-3.5-lightning-30b-a3b",
  "nvidia/muse-glimmer-30b",
  "nvidia/nemotron-3-ultra-550b-a55b",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
];

const requesty = daily(
  4_800_000,
  "requests",
  "requesty-free",
  [...requestyTraining, "google/gemma-4-31b-it"],
  (modelId) => (modelId.startsWith("nvidia/") ? "caution" : "ok"),
  /200 requests a day.*new organizations/i,
  { trains: requestyTraining }
);

export const PROVIDER_EXPECTATIONS: Record<string, ProviderExpectation> = {
  // https://ai.byteplus.com/ark/region:ap-southeast-1/docs/free-tokens-only-mode (2026-11-27)
  byteplus: {
    live: signup(
      "byteplus",
      [
        "dola-seed-2-1-turbo-260628",
        "seed-2-0-lite-260428",
        "seed-2-0-mini-260428",
        "seed-2-0-code-preview-260328",
        "seed-2-0-pro-260328",
        "deepseek-v4-1-flash-economy-261017",
        "deepseek-v4-1-flash-261017",
        "deepseek-v4-1-flash-260910",
        "deepseek-v4-pro-ga-260813",
        "deepseek-v4-flash-ga-260731",
        "deepseek-v4-flash-260425",
        "deepseek-v4-pro-260425",
        "glm-5-3-flash-260828",
        "glm-5-2-260617",
      ],
      "caution",
      500_000,
      ["kyc", "new-accounts-only"]
    ),
    unit: "tokens",
    hasFree: true,
    freeNote: /500,000 tokens per model.*identity verification/i,
    contribution: {
      real: 0,
      firstMonth: 0,
      gated: 0,
      socialGated: 0,
      boost: 0,
      rowSumLive: 0,
      publishedPools: 0,
    },
    lastWave: "E1c",
  },
  // https://router.bynara.id/api/plans and https://router.bynara.id/docs (2026-11-27)
  nara: {
    live: [
      {
        modelId: "agnes-2.5-flash",
        freeType: "recurring-daily",
        monthlyTokens: 210_000_000,
        creditTokens: 0,
        poolKey: "nara-free",
        tos: "caution",
        gates: ["telegram"],
      },
    ],
    discontinued: [
      "agnes-2.0-flash",
      "laguna-s-2.1",
      "minimax-m3-free",
      "mistral-large",
      "mistral-medium-3-5",
      "qwen3.8-27b",
      "stepfun-3.7-flash",
    ],
    unit: "tokens",
    hasFree: true,
    freeNote: /7 million tokens a day.*Telegram/i,
    contribution: {
      real: 0,
      firstMonth: 0,
      gated: 0,
      socialGated: 210_000_000,
      boost: 0,
      rowSumLive: 210_000_000,
      publishedPools: 0,
    },
    lastWave: "E1c",
  },
  // https://openrouter.ai/api/v1/models and https://openrouter.ai/docs/api_reference/limits (2026-11-27)
  openrouter: {
    ...daily(
      1_200_000,
      "requests",
      "openrouter-free",
      [
        "baidu/ernie-5.5-flash-preview:free",
        "google/gemma-4-26b-a4b-it:free",
        "google/gemma-4-31b-it:free",
        "liquid/lfm-3-1.7b:free",
        "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        "nvidia/nemotron-3-ultra-550b-a55b:free",
        "nvidia/nemotron-3.5-lightning:free",
        "nvidia/nemotron-3.5-super-vl:free",
        "particle-ai/particle-1:free",
        "recursive/flint-v1.0:free",
      ],
      "caution",
      /50 requests per day.*1,000/i,
      { boost: 24_000_000, lastWave: "E1c" }
    ),
    discontinued: ["auto", "liquid/lfm-2.5-2.6b:free", "stealth/ox-alpha"],
  },
  // https://api.xkiro.com/v1/models and https://xkiro.com/ (2026-11-27)
  xkiro: {
    ...daily(
      15_000_000,
      "tokens",
      "xkiro-free",
      [
        "cohere/aya-expanse-32b",
        "cohere/aya-vision-32b",
        "cohere/command-a",
        "cohere/command-a-plus",
        "cohere/command-a-reasoning",
        "cohere/command-a-translate",
        "cohere/command-a-vision",
        "cohere/command-r-08-2024",
        "cohere/command-r-plus-08-2024",
        "cohere/command-r7b-12-2024",
        "cohere/north-mini-code",
        "cohere/north-small-translate",
        "cohere/tiny-aya-earth",
        "cohere/tiny-aya-fire",
        "cohere/tiny-aya-global",
        "cohere/tiny-aya-water",
        "qwen/qwen-plus-2025-07-28:free",
        "qwen/qwen3-coder-plus:free",
        "qwen/qwen3-max:free",
        "qwen/qwen3-omni-flash:free",
        "qwen/qwen3-vl-plus:free",
        "qwen/qwen3.5-397b-a17b:free",
        "qwen/qwen3.5-flash:free",
        "qwen/qwen3.5-omni-flash:free",
        "qwen/qwen3.5-omni-plus:free",
        "qwen/qwen3.5-plus:free",
        "qwen/qwen3.6-27b:free",
        "qwen/qwen3.6-35b-a3b:free",
        "qwen/qwen3.6-max-preview:free",
        "qwen/qwen3.6-plus:free",
        "qwen/qwen3.7-flash:free",
        "qwen/qwen3.7-max:free",
        "qwen/qwen3.7-plus:free",
        "qwen/qwen3.8-max-preview:free",
        "qwen/qwen3.8-max:free",
        "qwen/qwen3.8-omni-flash:free",
        "sensenova/sensenova-6.8-flash-lite",
        "stealth/big-pickle",
      ],
      "caution",
      /500,000 tokens a day.*Telegram/i,
      { hardStopGuaranteed: true, lastWave: "E1c" }
    ),
    contribution: {
      real: 15_000_000,
      firstMonth: 15_000_000,
      gated: 0,
      socialGated: 15_000_000,
      boost: 0,
      rowSumLive: 570_000_000,
      publishedPools: 1,
    },
    discontinued: [
      "deepseek/deepseek-chat-v3.1",
      "deepseek/deepseek-v3.2",
      "deepseek/deepseek-v4-flash",
      "deepseek/deepseek-v4-pro",
      "minimax/minimax-m2.1-highspeed:free",
      "minimax/minimax-m2.1:free",
      "minimax/minimax-m2.5-highspeed:free",
      "minimax/minimax-m2.5:free",
      "minimax/minimax-m2.7-highspeed:free",
      "minimax/minimax-m2.7:free",
      "minimax/minimax-m2:free",
      "minimax/minimax-m3:free",
      "mistralai/codestral-2508",
      "mistralai/devstral-medium",
      "mistralai/ministral-14b",
      "mistralai/ministral-3b",
      "mistralai/ministral-8b",
      "mistralai/mistral-large-2512",
      "mistralai/mistral-medium-3.5",
      "mistralai/mistral-small-2603",
      "sensenova/sensenova-6.7-flash-lite",
    ],
    retired: [
      "mistralai/codestral-2508",
      "mistralai/devstral-medium",
      "mistralai/ministral-14b",
      "mistralai/ministral-3b",
      "mistralai/ministral-8b",
      "mistralai/mistral-large-2512",
      "mistralai/mistral-medium-3.5",
      "mistralai/mistral-small-2603",
    ].map((modelId) => ({
      modelId,
      lastListedMonthlyTokens: 15_000_000,
      reason: "id-retired",
    })),
  },
  // https://zyloai.net/pricing and https://api.zyloai.net/v1/models (2026-11-27)
  "zylo-api": daily(
    6_000_000,
    "tokens",
    "zylo-basic",
    [
      "nemotron-3.5-lightning",
      "nemotron-3-omni",
      "laguna-xs-2.1",
      "nemotron-3.5-bolt",
      "nemotron-3.5-super-vl",
      "step-5-preview",
      "nemotron-3-ultra",
      "glm-5.3-flash",
      "minimax-m3.1-flash",
      "kimi-k3.1-pro",
    ],
    "caution",
    /200,000 tokens a day.*Basic and Mini/i
  ),
  // https://docs.requesty.ai/features/free-models.md and https://router.requesty.ai/v1/models (2026-11-27)
  requesty: {
    ...requesty,
    discontinued: [
      "openai/gpt-oss-120b",
      "mistral/leanstral-1-5",
      "nvidia/nemotron-3-nano-30b-a3b",
    ],
  },
  // https://docs.routeway.ai/getting-started/rate-limits.md and https://api.routeway.ai/v1/models (2026-11-27)
  routeway: {
    ...daily(
      4_800_000,
      "requests",
      "routeway-free",
      [
        "gemma-4-26b-a4b-it-chimerax:free",
        "gemma-4-26b-a4b-it-darksoul:free",
        "gemma-4-26b-a4b-it-luminous:free",
        "gemma-4-26b-a4b-it-moonlight:free",
        "gemma-4-26b-a4b-it-musica:free",
        "minimax-m3.1-flash:free",
        "gemma-4-26b-a4b-it-meromero:free",
      ],
      "caution",
      /200 requests a day.*testing/i
    ),
    discontinued: [
      "llama-3.3-70b-instruct:free",
      "nemotron-3-nano-30b-a3b:free",
      "nemotron-nano-9b-v2:free",
      "step-3.7-flash:free",
      "step-3.5-flash:free",
      "laguna-m.1:free",
      "laguna-xs.2:free",
      "llama-3.2-3b-instruct:free",
    ],
  },
  // https://twigpine.com/opengateway/docs (2026-11-27)
  gitlawb: daily(
    3_600_000,
    "requests",
    "twigpine-mimo-allowance",
    ["xiaomi/mimo-v2.6-pro"],
    "ok",
    /zero balance.*shared daily budget/i
  ),
  // https://onomeo.com/models and https://onomeo.com/api/info (2026-11-27), owner answer to Q22.
  onomeo: {
    ...daily(
      3_456_000,
      "requests",
      "onomeo",
      ["auto", "gemma-4-31b", "llama-4-scout", "mistral-small-3.1", "glm-4.7-flash", "glm-5.3"],
      "caution",
      /site-wide pool/i,
      { trains: ["glm-4.7-flash", "glm-5.3"] }
    ),
    absent: ["deepseek-v4.1-flash", "gpt-6-luna"],
    discontinued: [
      "deepseek-v4-flash",
      "glm-5.2",
      "gemini-3.1-flash-lite",
      "gpt-oss-20b",
      "muse-glimmer-30b",
      "glm-5.3-flash",
      "codestral-latest",
      "ministral-14b-latest",
      "hy4-preview",
      "glm-4.5-flash",
      "glm-4.6v-flash",
    ],
  },
  // https://docs.dgrid.ai/ai-gateway/free-models-router.md (2026-11-27), owner answer to Q4.
  dgrid: daily(
    2_400_000,
    "requests",
    "dgrid",
    ["dgridai/free"],
    "caution",
    /100 requests a day.*\$5.*1,000/i,
    { boost: 24_000_000 }
  ),
  // https://docs.naga.ac/build/rate-limits.md, https://api.naga.ac/v1/models and https://naga.ac/security (2026-11-27)
  "naga-ac": daily(
    2_400_000,
    "requests",
    "naga-free",
    [
      "inclusionai/ling-3.2-flash:free",
      "baidu/ernie-5.5-flash-preview:free",
      "liquid/lfm-3-1.7b:free",
      "particle-ai/particle-1:free",
      "recursive/flint-v1.0:free",
      "nvidia/nemotron-3.5-super-vl:free",
      "dots-studio/dots-3-note-preview:free",
      "nvidia/nemotron-3.5-lightning:free",
      "nvidia/nemotron-3-ultra-550b-a55b:free",
      "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
      "google/gemma-4-26b-a4b-it:free",
      "google/gemma-4-31b-it:free",
      "google/gemini-2.5-flash:free",
    ],
    "caution",
    /100 requests a day.*may retain/i
  ),
  // https://docs.meganova.ai/tiers/tier-1.md and https://api.meganova.ai/v1/models (2026-11-27)
  "meganova-ai": daily(
    1_200_000,
    "requests",
    "meganova-free",
    [
      "mistralai/Mistral-Small-3.2-24B-Instruct-2506",
      "meganova-ai/manta-mini-1.0",
      "meganova-ai/manta-flash-1.0",
      "Steelskull/L3.3-MS-Nevoria-70b",
      "Sao10K/L3-70B-Euryale-v2.1",
      "Sao10K/L3-8B-Stheno-v3.2",
      "BruhzWater/Sapphira-L3.3-70b-0.1",
      "FallenMerick/MN-Violet-Lotus-12B",
    ],
    "caution",
    /per-model quotas of 50 requests a day.*paid overage/i,
    { lastWave: "E1b" }
  ),
  // https://free.ai/api/ and https://api.free.ai/v1/models (2026-11-27)
  "free-ai": daily(
    800_000,
    "requests",
    "free-ai",
    [
      "qwen7b",
      "qwen-coder",
      "qwen3-coder",
      "deepseek-r1",
      "mistral",
      "qwen3-8b",
      "deepseek-r1-7b",
      "qwen-vl",
      "qwen25-vl",
      "moondream2",
    ],
    "ok",
    /30,000 tokens\/day.*1,000 API requests\/month/i,
    { trainsOnPrompts: false, lastWave: "E1b" }
  ),
  // https://www.aionlabs.ai/docs/rate-limits/ and https://api.aionlabs.ai/v1/models (2026-11-27)
  aion: {
    ...daily(
      600_000,
      "tokens",
      "aion-free",
      [
        "aion-labs/aion-2.0",
        "aion-labs/aion-3.0",
        "aion-labs/aion-3.0-mini",
        "aion-labs/aion-3.5",
        "aion-labs/aion-3.5-mini",
        "aion-labs/aion-rp-llama-3.1-8b",
      ],
      "ok",
      /20,000 tokens\/day.*payment card/i,
      { gates: ["card"], trainsOnPrompts: false, lastWave: "E1b" }
    ),
    discontinued: ["aion-labs/aion-2.5"],
  },
  // https://kenari.id/api/public/pricing and https://kenari.id/v1/models (2026-11-27)
  kenari: daily(
    1_200_000,
    "requests",
    "kenari-free",
    [
      "beam-1-0:free",
      "ernie-5-5-flash-preview:free",
      "flint-v1-0:free",
      "glm-4-6v-flash:free",
      "glm-4-7-flash:free",
      "hy4-flash:free",
      "laguna-xs-2-1:free",
      "lfm-3-1-7b:free",
      "longcat-2-5:free",
      "nemotron-3-5-lightning:free",
      "nemotron-3-5-super-vl:free",
      "nemotron-3-nano-omni-30b-a3b-reasoning:free",
      "nemotron-3-ultra-550b-a55b:free",
      "particle-1:free",
      "solar-mini4:free",
    ],
    "caution",
    /50 requests a day.*5 per minute.*third-party gateway/i,
    { hardStopGuaranteed: true, lastWave: "E1b" }
  ),

  // https://docs.bigmodel.cn/cn/coding-plan/overview.md (2026-11-27)
  "glm-cn": e2({
    live: [],
    discontinued: ["glm-4-flash", "glm-4.7-flash"],
    absent: ["glm-signup-bonus", "glm-4.5-flash"],
    hasFree: false,
    freeNote: /Coding Plan.*standard BigModel API/i,
  }),
  // https://docs.volcengine.com/docs/ark/free-inference-quota?lang=zh (2026-11-27)
  doubao: e2({
    live: signup(
      "doubao",
      ["doubao-seed-2-1-pro-260915", "doubao-seed-2-1-lite-260915", "doubao-seed-2-1-turbo-260628"],
      "ambiguous",
      0,
      ["region"]
    ),
    absent: ["doubao-pro-32k"],
    hasFree: true,
    freeNote: /per model.*console.*real-name/i,
  }),
  // https://longcat.chat/platform/docs/change-log (2026-11-27)
  longcat: e2({
    live: [],
    discontinued: ["LongCat-2.0"],
    hasFree: false,
    freeNote: /prepaid token packs.*2026-11-27/i,
  }),
  // https://www.hyperbolic.ai/docs/inference/overview (2026-11-27)
  hyperbolic: e2({
    live: [],
    discontinued: [
      "Qwen/QwQ-32B",
      "deepseek-ai/DeepSeek-R1",
      "deepseek-ai/DeepSeek-V3",
      "meta-llama/Llama-3.3-70B-Instruct",
      "meta-llama/Llama-3.2-3B-Instruct",
      "Qwen/Qwen2.5-72B-Instruct",
      "Qwen/Qwen2.5-Coder-32B-Instruct",
      "NousResearch/Hermes-3-Llama-3.1-70B",
    ],
    hasFree: false,
    freeNote: /\$5 deposit.*\$1.*phone verification/i,
  }),
  // https://docs.nscale.com/docs/manage/credit.md (2026-11-27)
  nscale: e2({
    live: [],
    discontinued: [
      "moonshotai/Kimi-K2.5",
      "Qwen/Qwen3-235B-A22B-Instruct-2507",
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      "meta-llama/Llama-3.3-70B-Instruct",
    ],
    hasFree: false,
    freeNote: /prepaid credits.*2026-11-27/i,
  }),
  // https://api-docs.deepseek.com/quick_start/pricing/ (2026-11-27)
  deepseek: e2({
    live: [],
    discontinued: ["deepseek-v4-pro", "deepseek-flash"],
    absent: ["deepseek-v4-flash"],
    hasFree: false,
    freeNote: /no published signup grant.*2026-11-27/i,
  }),
  // https://deepinfra.com/pricing (2026-11-27)
  deepinfra: e2({
    live: [],
    discontinued: [
      "anthropic/claude-4-opus",
      "anthropic/claude-4-sonnet",
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "google/gemma-4-31B-it",
      "google/gemma-4-26B-A4B-it",
      "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B",
      "nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning",
      "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      "meta-llama/Llama-4-Scout-17B-16E-Instruct",
      "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      "NousResearch/Hermes-3-Llama-3.1-405B",
      "deepseek-ai/DeepSeek-V4-Pro",
      "deepseek-ai/DeepSeek-V4-Flash",
      "zai-org/GLM-5.1",
      "moonshotai/Kimi-K2.6",
      "MiniMaxAI/MiniMax-M2.5",
      "Qwen/Qwen3.6-35B-A3B",
      "Qwen/Qwen3.5-397B-A17B",
      "Qwen/Qwen3.5-122B-A10B",
      "XiaomiMiMo/MiMo-V2.5-Pro",
      "XiaomiMiMo/MiMo-V2.5",
    ],
    hasFree: false,
    freeNote: /payment card or prepayment.*2026-11-27/i,
  }),
  // https://www.scaleway.com/en/generative-apis-signup/ (2026-11-27)
  scaleway: e2({
    live: signup(
      "scaleway",
      ["qwen3-235b-a22b-instruct-2507", "mistral-small-3.2-24b-instruct-2506", "gpt-oss-120b"],
      "ok",
      1_000_000,
      ["card"]
    ),
    absent: ["llama-3.1-70b-instruct", "llama-3.1-8b-instruct", "deepseek-v3-0324"],
    unit: "tokens",
    hasFree: true,
    freeNote: /1 million.*payment method.*billed/i,
  }),
  // https://docs.qoder.com/account/pricing.md (2026-11-27)
  qoder: e2({
    live: signup("qoder", ["deepseek-v4-pro"], "caution", 0, ["new-accounts-only"]),
    absent: [
      "qwen3.8-max-preview",
      "qwen3.7-max",
      "qwen3.7-plus",
      "kimi-k3",
      "kimi-k2.7-code",
      "glm-5.2",
      "deepseek-v4-flash",
      "minimax-m3",
    ],
    hasFree: true,
    freeNote: /300 tool credits.*14 days/i,
  }),
  // https://novita.ai/referral (2026-11-27)
  novita: e2({
    live: [],
    absent: ["ai-ai/llama-3.1-8b-instruct"],
    hasFree: true,
    freeNote: /\$10.*successful referral/i,
  }),
  // https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview (2026-11-27)
  vertex: e2({
    live: signup(
      "vertex",
      [
        "gemini-3.1-pro-preview",
        "gemini-3-flash-preview",
        "gemini-2.5-pro",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
      ],
      "caution",
      0,
      ["new-accounts-only"]
    ),
    discontinued: [
      "gemini-3.1-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "deepseek-ai/deepseek-v3.2-maas",
      "deepseek-ai/deepseek-v3.1-maas",
      "qwen/qwen3-next-80b-a3b-instruct-maas",
      "zai-org/glm-5-maas",
      "claude-opus-4-7",
      "claude-sonnet-4-6",
    ],
    hasFree: true,
    freeNote: /90 days.*no billing information/i,
  }),
  // https://www.ai21.com/pricing/ (2026-11-27)
  ai21: e2({
    live: signup("ai21", ["jamba-large-1.7", "jamba-mini-2"], "avoid", 0, ["new-accounts-only"]),
    hasFree: true,
    freeNote: /\$10.*7 days.*no credit card/i,
  }),
  // https://docs.fireworks.ai/faq-new/billing-pricing/how-does-billing-and-credit-usage-work (2026-11-27)
  fireworks: e2({
    live: [],
    discontinued: [
      "deepseek-v4-flash",
      "deepseek-v4-pro",
      "glm-5p1",
      "gpt-oss-120b",
      "gpt-oss-20b",
      "kimi-k2p5",
      "kimi-k2p6",
      "minimax-m2p5",
      "minimax-m2p7",
      "qwen3p6-plus",
    ],
    hasFree: false,
    freeNote: /prepaid credits.*2026-11-27/i,
  }),
  // https://docs.tokenfactory.nebius.com/other-capabilities/billing-new.md (2026-11-27)
  nebius: e2({
    live: [],
    discontinued: ["meta-llama/Llama-3.3-70B-Instruct"],
    hasFree: false,
    freeNote: /bank card.*Builder Program/i,
  }),
};
