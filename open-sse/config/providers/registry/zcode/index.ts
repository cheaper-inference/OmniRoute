import type { RegistryEntry } from "../../shared.ts";
import { GLM_SHARED_MODELS } from "../../../glmProvider.ts";

const GLM_EXECUTOR_EFFORT_ALIASES = new Set([
  "glm-5.3-high",
  "glm-5.3-low",
  "glm-5.3-flash-high",
  "glm-5.3-flash-low",
  "glm-5.3-flash-max",
  "glm-5.2-high",
  "glm-5.2-max",
]);

export const ZCODE_MODELS = GLM_SHARED_MODELS.filter(
  (model) => !GLM_EXECUTOR_EFFORT_ALIASES.has(model.id)
).map((model) => ({
  ...model,
  supportedThinkingEfforts: [],
  supportsVision: Boolean(model.supportsVision),
}));

/** Explicit Start profile: separate provider identity for routing and quota monitoring. */
const startBase = {
  id: "zcode-start",
  alias: "zc-start",
  format: "openai" as const,
  executor: "zcode-start",
  baseUrl: "zcode://app-server/stdio",
  authType: "oauth" as const,
  authHeader: "none",
};

export const zcodeStartProvider: RegistryEntry = {
  ...startBase,
  models: ZCODE_MODELS.map((model) => ({
    ...model,
    name: `${model.name || model.id} (Z-code Start)`,
  })),
};

/** Saved OAuth accounts use Start by default; explicit aliases select each tariff. */
export const zcodeProvider: RegistryEntry = {
  ...startBase,
  id: "zcode",
  alias: "zc",
  executor: "zcode",
  authType: "none",
  models: ZCODE_MODELS,
};

/** Explicit Individual profile: separate provider identity for routing and quota monitoring. */
export const zcodeIndividualProvider: RegistryEntry = {
  ...startBase,
  id: "zcode-individual",
  alias: "zc-individual",
  executor: "zcode-individual",
  models: ZCODE_MODELS.map((model) => ({
    ...model,
    name: `${model.name || model.id} (Z-code Individual)`,
  })),
};

/** Region aliases select the Chinese account pool without changing combo configuration. */
export const zcodeCnStartProvider: RegistryEntry = {
  ...zcodeStartProvider,
  id: "zcode-cn-start",
  alias: "zc-cn-start",
  executor: "zcode-cn-start",
};
export const zcodeCnIndividualProvider: RegistryEntry = {
  ...zcodeIndividualProvider,
  id: "zcode-cn-individual",
  alias: "zc-cn-individual",
  executor: "zcode-cn-individual",
};
