/** Pure request profiles. Protocol mappings are documented upstream, NOT tenant availability claims. */
import {
  M365_MODEL_TONE_MAP,
  resolveChatInvocationOverrides,
  resolveToneForModel,
} from "../copilot-m365-frames.ts";

export interface M365ModelProfile {
  tone: string;
  scenario: string;
  licenseType: string;
  availability: "unverified";
}
const included = (tone: string): M365ModelProfile => ({
  tone,
  scenario: "OfficeWebIncludedCopilot",
  licenseType: "Starter",
  availability: "unverified",
});
const paid = (tone: string): M365ModelProfile => ({
  tone,
  scenario: "OfficeWebPaidCopilot",
  licenseType: "Premium",
  availability: "unverified",
});

/** Full documented standalone catalog. Registration does not assert account entitlement. */
export const M365_DOCUMENTED_MODELS: Readonly<Record<string, M365ModelProfile>> = Object.freeze({
  // The protocol tone literal is capitalized; lowercase "magic" is the stale shape (#11069).
  "m365-copilot": included("Magic"),
  auto: included("Magic"),
  quick: included("Gpt_5_5_Chat"),
  "think-deeper": included("Gpt_5_5_Reasoning"),
  claude: included("Claude_Sonnet"),
  "claude-sonnet": included("Claude_Sonnet"),
  "claude-sonnet-4.5": included("Claude_Sonnet"),
  "claude-sonnet-4.6": included("Claude_Sonnet"),
  "claude-sonnet-5.5": paid("Claude_Sonnet"),
  "claude-sonnet-5": paid("Claude_Sonnet_5"),
  "claude-sonnet-think-deeper": included("Claude_Sonnet_Reasoning"),
  "claude-opus": paid("Claude_Opus"),
  "claude-opus-5": paid("Claude_Opus"),
  "claude-opus-5.5": paid("Claude_Opus"),
  "claude-opus-4.8": included("Claude_Opus"),
  "claude-opus-4.5": included("Claude_Opus"),
  "gpt-5.5": included("Gpt_5_5_Chat"),
  "gpt-5.5-quick": included("Gpt_5_5_Chat"),
  "gpt-5.5-think-deeper": included("Gpt_5_5_Reasoning"),
  "gpt-5.6": included("Gpt_5_6_Chat"),
  "gpt-5.6-quick": included("Gpt_5_6_Chat"),
  "gpt-5.6-think-deeper": included("Gpt_5_6_Reasoning"),
  "gpt-6-think-deeper": paid("Gpt_6_Reasoning"),
  "gpt-6-sol": included("Gpt_6_Sol_Reasoning"),
  "gpt-6.1-sol": included("Gpt_61_Sol_Reasoning"),
  "gpt-5.4": included("Gpt_5_4_Reasoning"),
  "gpt-5.4-think-deeper": included("Gpt_5_4_Reasoning"),
  "gpt-5.4-quick": included("Gpt_5_4_Chat"),
  "gpt-5.3": included("Gpt_5_3_Chat"),
  "gpt-5.3-quick": included("Gpt_5_3_Chat"),
  "gpt-5.3-think-deeper": included("Gpt_5_3_Reasoning"),
  "gpt-5.2": included("Gpt_5_2_Chat"),
  "gpt-5.2-quick": included("Gpt_5_2_Chat"),
  "gpt-5.2-think-deeper": included("Gpt_5_2_Reasoning"),
});

/**
 * The tones whose turns share one per-account cap (`ReasoningTurnExhausted`), reported live on a
 * work tenant (2026-11-07). A consumer observation, not a protocol guarantee: other reasoning
 * tones are not known to share it and are deliberately absent.
 */
const REASONING_CAP_TONES: ReadonlySet<string> = new Set([
  "Gpt_5_5_Reasoning",
  "Gpt_5_6_Reasoning",
]);
/** Every documented model id whose turns draw on that shared cap. */
export function m365ReasoningCapModels(): string[] {
  return Object.entries(M365_DOCUMENTED_MODELS)
    .filter(([, profile]) => REASONING_CAP_TONES.has(profile.tone))
    .map(([id]) => id);
}

export interface M365ProfileOptions {
  model?: string;
  tier?: string;
  tone?: string;
  scenario?: string;
  licenseType?: string;
  agent?: string;
}
export interface M365ResolvedProfile extends M365ModelProfile {
  agent: string;
  optionsSets: string[];
  allowedMessageTypes: readonly string[];
  disconnectBehavior: string | undefined;
}
function tierRoute(tier?: string): { scenario: string; licenseType: string; agent: string } {
  if (tier === "enterprise")
    return { scenario: "officeweb", licenseType: "Premium", agent: "work" };
  return {
    scenario: tier === "edu" ? "OfficeWebIncludedCopilot" : "OfficeWebPaidConsumerCopilot",
    licenseType: "Starter",
    agent: "web",
  };
}
function modelTone(model?: string): string | undefined {
  return model && Object.hasOwn(M365_MODEL_TONE_MAP, model)
    ? resolveToneForModel(model)
    : undefined;
}
function documentedProfile(model?: string): M365ModelProfile | undefined {
  return model && Object.hasOwn(M365_DOCUMENTED_MODELS, model)
    ? M365_DOCUMENTED_MODELS[model]
    : undefined;
}
/** Precedence per field: explicit override > exact documented/compatibility profile > legacy tier default.
 * Legacy model IDs select only tone, never scenario/license. Unknown IDs retain tier defaults.
 * Explicit scenario/license overrides are independent: no entitlement is inferred or granted.
 */
export function resolveM365Profile(options: M365ProfileOptions = {}): M365ResolvedProfile {
  const tier = options.tier === "work" ? "enterprise" : options.tier;
  const route = tierRoute(tier);
  const model = documentedProfile(options.model);
  const legacyTone = modelTone(options.model);
  const invocation = resolveChatInvocationOverrides(tier);
  return {
    ...invocation,
    tone: options.tone ?? model?.tone ?? legacyTone ?? invocation.tone,
    scenario: options.scenario ?? model?.scenario ?? route.scenario,
    licenseType: options.licenseType ?? model?.licenseType ?? route.licenseType,
    agent: options.agent ?? route.agent,
    availability: "unverified",
  };
}
