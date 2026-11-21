// Derives every text the tool setup card shows from the self-view, the key and the holder's
// choices. Pure and deterministic: the key reaches the output only while includeKey is on.

import {
  buildDesktopInferenceModels,
  buildShellExports,
  deriveLocalNetworkBaseUrl,
  listOnboardingModels,
} from "@/shared/services/claudeAppsOnboarding";
import {
  buildClaudeCodeEnv,
  formatClaudeSettingsJson,
  modelSupportsLongContext,
  planClaudeCodeModels,
} from "@/shared/services/claudeCliConfig";

interface OnboardingChoices {
  includeKey: boolean;
  mainModel: string | null;
  longContext: boolean;
}

export interface OnboardingState {
  /** The key (only with includeKey and a key) or the key placeholder. */
  credential: string;
  /** The published API base URL or the base URL placeholder. */
  baseUrl: string;
  baseUrlKnown: boolean;
  /** The listed models: the main model first, at most 40. */
  models: string[];
  totalModels: number;
  mainModel: string | null;
  /** Some listed model supports the 1M context window. */
  longContextAvailable: boolean;
  /** The 1M context window was chosen and is available. */
  longContext: boolean;
  settingsJson: string;
  publicExports: string;
  /** Null when no local network profile exists. */
  localExports: string | null;
  /** Null when there is no model. */
  desktopModelsJson: string | null;
}

/** The public export lines and, when the page host gives one, the local network lines. */
function buildExportProfiles(
  env: Record<string, string>,
  apiBaseUrl: string | null,
  pageHostname: string
): { publicExports: string; localExports: string | null } {
  const localBaseUrl = deriveLocalNetworkBaseUrl(apiBaseUrl, pageHostname);
  return {
    publicExports: buildShellExports(env),
    localExports:
      localBaseUrl === null
        ? null
        : buildShellExports({ ...env, ANTHROPIC_BASE_URL: localBaseUrl }),
  };
}

export function deriveOnboardingState(input: {
  provider: string;
  availableModels: readonly string[];
  apiBaseUrl: string | null;
  apiKey: string | null;
  pageHostname: string;
  choices: OnboardingChoices;
  texts: { keyPlaceholder: string; baseUrlPlaceholder: string };
}): OnboardingState {
  const { choices, texts, apiBaseUrl } = input;
  const credential = choices.includeKey && input.apiKey ? input.apiKey : texts.keyPlaceholder;
  const baseUrl = apiBaseUrl ?? texts.baseUrlPlaceholder;

  const plan = planClaudeCodeModels(input.provider, input.availableModels);
  const chosen = choices.mainModel;
  const mainModel = chosen !== null && plan.models.includes(chosen) ? chosen : plan.main;
  const models = listOnboardingModels(plan.models, mainModel);
  const longContextAvailable = models.some(modelSupportsLongContext);
  const longContext = choices.longContext && longContextAvailable;

  const env = buildClaudeCodeEnv({ baseUrl, authToken: credential, plan, mainModel, longContext });
  return {
    credential,
    baseUrl,
    baseUrlKnown: apiBaseUrl !== null,
    models,
    totalModels: plan.models.length,
    mainModel,
    longContextAvailable,
    longContext,
    settingsJson: formatClaudeSettingsJson(env),
    ...buildExportProfiles(env, apiBaseUrl, input.pageHostname),
    desktopModelsJson: models.length > 0 ? buildDesktopInferenceModels(models, longContext) : null,
  };
}

/**
 * Every generated text with the key left out, as one string. It changes exactly when a text
 * changes for a reason other than the key, so it tells when a copy status is out of date.
 */
export function onboardingTextFingerprint(
  input: Parameters<typeof deriveOnboardingState>[0]
): string {
  const keyless = deriveOnboardingState({
    ...input,
    apiKey: null,
    choices: { ...input.choices, includeKey: false },
  });
  return [keyless.settingsJson, keyless.localExports ?? "", keyless.desktopModelsJson ?? ""].join(
    "\n"
  );
}
