/** Text/JSON subset of documented hosted native decision APIs, reviewed 2026-10-27.
 * Catalog presence and model spelling do not establish account entitlement.
 * Recognized framed media parts are locally rejected; vendor image/extract support
 * remains deferred, and arbitrary JSON interpretation by vendors is not proven.
 */
import type { SystemOneBackend } from "./systemOneRegistry.ts";

// Explicit local guards where vendor ceilings are not documented. These are
// conservative application policy, not claims about a model's total capacity.
const localLimits = {
  maxQuestions: 64,
  minCriteria: 1,
  maxChoiceCriteria: 255,
  minScoreLevels: 2,
  maxScoreLevels: 10,
  maxBodyBytes: 1_048_576,
};
export const HOSTED_SYSTEMONE_BACKENDS = {
  liquid: {
    provider: "liquid",
    label: "Liquid AI",
    decisionUrl: "https://api.liquid.ai/decisions/v1/systemone",
    modelsUrl: null,
    allowedHosts: ["api.liquid.ai"],
    rejectRecognizedMediaParts: true,
    allowGenericTokenPricing: false,
    requiresKey: true,
    timeoutMs: 30_000,
    limits: localLimits,
    supportedModels: ["d1.1", "d1-ultra"],
    decisionModelPattern: /^(?:d1\.1|d1-ultra)$/,
    requestLimitNotes: {
      "*": "Local text-only guard: 64 questions, 1 MiB body and two score levels minimum; vendor ceilings unverified. https://docs.liquid.ai/lfm/models/d1",
    },
  },
  perplexity: {
    provider: "perplexity",
    label: "Perplexity Decisions",
    decisionUrl: "https://api.perplexity.ai/v1/decisions",
    modelsUrl: null,
    allowedHosts: ["api.perplexity.ai"],
    rejectRecognizedMediaParts: true,
    allowGenericTokenPricing: false,
    requiresKey: true,
    timeoutMs: 30_000,
    limits: { ...localLimits, maxQuestions: 128, minScoreLevels: 1 },
    supportedModels: [
      "pplx-decider-v1.2",
      "pplx-decider-flash-v1.2",
      "pplx-decider-latest",
      "pplx-decider-flash-latest",
    ],
    decisionModelPattern: /^pplx-decider(?:-flash)?-(?:v1\.2|latest)$/,
    requestLimitNotes: {
      "*": "Vendor: 128 questions, Choice 1–255, Score 1–10. Local text-body guard 1 MiB is below vendor 32 MiB. https://docs.perplexity.ai/docs/decisions/quickstart",
    },
  },
  inception: {
    provider: "inception",
    label: "Inception Decisions",
    decisionUrl: "https://api.inceptionlabs.ai/v1/decisions",
    modelsUrl: "https://api.inceptionlabs.ai/v1/models",
    allowedHosts: ["api.inceptionlabs.ai"],
    rejectRecognizedMediaParts: true,
    allowGenericTokenPricing: false,
    requiresKey: true,
    timeoutMs: 30_000,
    limits: { ...localLimits, minScoreLevels: 1 },
    supportedModels: ["mercury-decide"],
    decisionModelPattern: /^mercury-decide$/,
    requestLimitNotes: {
      "*": "Vendor Choice 1–255, Score 1–10; local text-only 64-question/1 MiB guard. Images and extract are deferred. https://docs.inceptionlabs.ai/capabilities/decisions",
    },
  },
  baseten: {
    provider: "baseten",
    label: "Baseten Decisions",
    decisionUrl: "https://inference.baseten.co/v1/systemone",
    modelsUrl: "https://inference.baseten.co/v1/models",
    allowedHosts: ["inference.baseten.co"],
    rejectRecognizedMediaParts: true,
    allowGenericTokenPricing: false,
    requiresKey: true,
    timeoutMs: 30_000,
    // Performance-client reference documents Api-Key; native cURL also documents Bearer.
    // Use this one documented scheme, never retry with another authentication identity.
    authorizationScheme: "Api-Key",
    limits: { ...localLimits, maxQuestions: 512, minScoreLevels: 1 },
    maxTotalOptions: 512,
    maxStateChars: 50_000,
    supportedModels: [
      "decision-models/baseten-elephant-9b-latest",
      "decision-models/baseten-mammoth-27b-latest",
    ],
    decisionModelPattern: /^decision-models\/baseten-(?:elephant-9b|mammoth-27b)-latest$/,
    requestLimitNotes: {
      "*": "512 total options including two per noul; state 50,000 characters; local 1 MiB body guard. https://docs.baseten.co/inference/model-apis/decision-models",
    },
  },
  fireworks: {
    provider: "fireworks",
    label: "Fireworks System One",
    decisionUrl: "https://api.fireworks.ai/inference/v1/systemone",
    // Model-management listing requires an account id; do not guess one from a key.
    modelsUrl: null,
    allowedHosts: ["api.fireworks.ai"],
    rejectRecognizedMediaParts: true,
    allowGenericTokenPricing: false,
    requiresKey: true,
    timeoutMs: 30_000,
    limits: { ...localLimits, maxQuestions: 256, maxChoiceCriteria: 208 },
    strictQuestionShape: true,
    plainInstructions: true,
    stringOrObjectState: true,
    maxStateBytes: 4_194_304,
    supportedModelPattern: /^accounts\/[A-Za-z0-9_-]+\/models\/[A-Za-z0-9_.-]+$/,
    decisionModelPattern: /^accounts\/[^/]+\/models\/[^/]+$/,
    requestLimitNotes: {
      "*": "Vendor 256 questions, Choice up to 208, Score 2–10; local 1 MiB/30s below vendor 8 MiB/5 minutes. Text-only; reasoning options and images deferred. Account model must support System One. https://docs.fireworks.ai/api-reference/post-systemone",
    },
  },
} as const satisfies Record<string, SystemOneBackend>;
