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
};
