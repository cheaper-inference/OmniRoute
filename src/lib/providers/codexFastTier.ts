import { CODEX_ULTRAFAST_SUPPORTED_MODELS, isCodexUltrafastModel } from "./codexServiceTierModels";
import {
  getCodexRequestDefaults,
  normalizeCodexServiceTier,
  type CodexServiceTier,
} from "./requestDefaults";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export type CodexFastTierValue = CodexServiceTier;
export type CodexGlobalServiceMode = "none" | CodexServiceTier;

export const CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS: readonly string[] = [
  "gpt-6.1-sol",
  "gpt-6-astra",
  "gpt-6-sol",
  "gpt-6-luna",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.5",
];

export interface CodexGlobalFastServiceTierResolved {
  enabled: boolean;
  tier: CodexFastTierValue;
  supportedModels: readonly string[];
}

function resolveConfiguredTier(value: unknown): CodexFastTierValue {
  if (typeof value !== "string") return "priority";
  const tier = value.trim().toLowerCase();
  if (tier === "default" || tier === "priority" || tier === "flex" || tier === "ultrafast") {
    return tier;
  }
  return "priority";
}

function resolveSupportedModels(value: unknown, tier: CodexFastTierValue): readonly string[] {
  const defaults =
    tier === "ultrafast"
      ? CODEX_ULTRAFAST_SUPPORTED_MODELS
      : CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS;
  if (!Array.isArray(value)) return defaults;
  const models = value
    .filter((model): model is string => typeof model === "string")
    .map((model) => model.trim())
    .filter((model) => model.length > 0);
  return models.length > 0 || tier === "ultrafast" ? models : defaults;
}

/**
 * Resolve the global Codex Fast Tier settings. Handles three legacy shapes:
 *  - { codexServiceTier: true }                      (oldest boolean)
 *  - { codexServiceTier: { enabled: true } }         (PR #2440 shape)
 *  - { codexServiceTier: { enabled, tier, supportedModels } } (this follow-up)
 *  - { codexFastServiceTier: true }                  (very early flag)
 *
 * Defaults when fields are absent on an enabled config:
 *  - tier            = "priority"  (back-compat: PR #2440 only injected priority)
 *  - supportedModels = CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS
 *    (OpenAI Fast-eligible per models_cache.json)
 */
export function resolveCodexGlobalFastServiceTier(
  settings: unknown
): CodexGlobalFastServiceTierResolved {
  const record = asRecord(settings);
  const raw = record.codexServiceTier;

  let enabled = false;
  let tier: CodexFastTierValue = "priority";
  let supportedModels: readonly string[] = CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS;

  if (typeof raw === "boolean") {
    enabled = raw;
  } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as JsonRecord;
    if (obj.enabled === true) enabled = true;

    tier = resolveConfiguredTier(obj.tier);
    supportedModels = resolveSupportedModels(obj.supportedModels, tier);
  } else if (record.codexFastServiceTier === true) {
    enabled = true;
  }

  return { enabled, tier, supportedModels };
}

export function isCodexGlobalFastServiceTierEnabled(settings: unknown): boolean {
  const resolved = resolveCodexGlobalFastServiceTier(settings);
  return resolved.enabled && resolved.tier !== "default";
}

export function getCodexGlobalServiceMode(settings: unknown): CodexGlobalServiceMode {
  const resolved = resolveCodexGlobalFastServiceTier(settings);
  return resolved.enabled ? resolved.tier : "none";
}

export function getCodexConnectionServiceTier(providerSpecificData: unknown): CodexServiceTier {
  return getCodexRequestDefaults(providerSpecificData).serviceTier ?? "default";
}

export function getCodexEffectiveServiceTier(
  providerSpecificData: unknown,
  globalServiceMode: CodexGlobalServiceMode | boolean
): CodexServiceTier {
  // Dashboard global modes are explicit overrides; use "none" to preserve the
  // per-connection requestDefaults.serviceTier value.
  if (globalServiceMode === true) return "priority";
  if (globalServiceMode && globalServiceMode !== "none") {
    return globalServiceMode;
  }
  return getCodexConnectionServiceTier(providerSpecificData);
}

export function getCodexEffectiveFastServiceTier(
  providerSpecificData: unknown,
  globalFastServiceTierEnabled: CodexGlobalServiceMode | boolean
): boolean {
  return (
    getCodexEffectiveServiceTier(providerSpecificData, globalFastServiceTierEnabled) !== "default"
  );
}

function modelMatchesSupportedList(
  model: string | null | undefined,
  supportedModels: readonly string[],
  exact = false
): boolean {
  if (typeof model !== "string" || model.length === 0) return false;
  const normalizedModel = model.trim().toLowerCase().split("/").pop() || "";
  if (!normalizedModel) return false;
  for (const supported of supportedModels) {
    const candidate = supported.trim().toLowerCase();
    if (!candidate) continue;
    if (normalizedModel === candidate || (!exact && normalizedModel.startsWith(candidate))) {
      return true;
    }
  }
  return false;
}

function isGlobalTierEligibleForModel(
  resolved: CodexGlobalFastServiceTierResolved,
  model: string | null | undefined
): boolean {
  if (resolved.tier === "ultrafast" && !isCodexUltrafastModel(model)) return false;
  // Default clears account overrides for every model; legacy modes allow an omitted model.
  if (resolved.tier === "default" || model === undefined) return true;
  return modelMatchesSupportedList(model, resolved.supportedModels, resolved.tier === "ultrafast");
}

function preserveExplicitBodyTier(body: Record<string, unknown> | null | undefined): boolean {
  const rawTier = body && typeof body === "object" ? body.service_tier : null;
  const tier = typeof rawTier === "string" ? normalizeCodexServiceTier(rawTier) : null;
  if (!tier) return false;
  if (body && typeof body === "object" && !Array.isArray(body)) body.service_tier = tier;
  return true;
}

function clearConnectionServiceTier(
  providerSpecificData: JsonRecord,
  requestDefaults: JsonRecord
): JsonRecord {
  const nextRequestDefaults = { ...requestDefaults };
  delete nextRequestDefaults.serviceTier;
  const nextProviderSpecificData = { ...providerSpecificData };
  if (Object.keys(nextRequestDefaults).length > 0) {
    nextProviderSpecificData.requestDefaults = nextRequestDefaults;
  } else {
    delete nextProviderSpecificData.requestDefaults;
  }
  return nextProviderSpecificData;
}

export interface ApplyCodexGlobalFastServiceTierOptions {
  /**
   * Target model for the current request. When provided, the global override is only
   * injected if the model matches the user-selected supportedModels list.
   * When omitted, the gate is skipped (back-compat with the original signature).
   */
  model?: string | null;
  /**
   * Outbound request body. A valid per-request body.service_tier is left untouched
   * when already set.
   */
  body?: Record<string, unknown> | null;
}

export function applyCodexGlobalFastServiceTier<T extends JsonRecord | null | undefined>(
  provider: string | null | undefined,
  credentials: T,
  settings: unknown,
  options: ApplyCodexGlobalFastServiceTierOptions = {}
): T {
  if (provider !== "codex") return credentials;

  const resolved = resolveCodexGlobalFastServiceTier(settings);
  if (!resolved.enabled) return credentials;

  if (!isGlobalTierEligibleForModel(resolved, options.model)) return credentials;

  if (!credentials || typeof credentials !== "object" || Array.isArray(credentials)) {
    return credentials;
  }

  const providerSpecificData = asRecord(credentials.providerSpecificData);
  const requestDefaults = asRecord(providerSpecificData.requestDefaults);

  const body = options.body;
  if (preserveExplicitBodyTier(body)) return credentials;

  if (resolved.tier === "default") {
    return {
      ...credentials,
      providerSpecificData: clearConnectionServiceTier(providerSpecificData, requestDefaults),
    } as T;
  }

  if (body && typeof body === "object" && !Array.isArray(body)) {
    // Write the wire value directly to the outbound body when possible, so combo
    // request previews and logs show the same effective tier that the executor sends.
    // The executor also accepts requestDefaults.serviceTier for downstream accounting.
    (body as JsonRecord).service_tier = resolved.tier;
  }

  // Intentional precedence: body service_tier > global mode > connection defaults.
  // Use "none" globally if each account should keep its individual service-tier setting.
  return {
    ...credentials,
    providerSpecificData: {
      ...providerSpecificData,
      requestDefaults: {
        ...requestDefaults,
        serviceTier: resolved.tier,
      },
    },
  } as T;
}
