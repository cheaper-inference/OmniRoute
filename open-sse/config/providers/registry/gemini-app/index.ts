import { resolvePublicCred, type RegistryEntry, type RegistryModel } from "../../shared.ts";

/** Robin native backend (public upstream origin, not a credential). */
export const GEMINI_APP_BASE_URL = "https://robinfrontend-pa.googleapis.com";

const NATIVE_THINKING_EFFORTS = ["none", "minimal", "low", "medium", "high", "xhigh"] as const;

const NEON: RegistryModel = {
  id: "gemini-neon",
  name: "Gemini App Neon (Pro)",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportedThinkingEfforts: [...NATIVE_THINKING_EFFORTS],
  contextLength: 512_000,
  maxOutputTokens: 65_536,
};

const HYDROGEN: RegistryModel = {
  id: "gemini-hydrogen",
  name: "Gemini App Hydrogen (Fast)",
  toolCalling: true,
  supportsReasoning: true,
  supportsVision: true,
  supportedThinkingEfforts: [...NATIVE_THINKING_EFFORTS],
  contextLength: 512_000,
  maxOutputTokens: 65_536,
};

const FLASH_LITE: RegistryModel = {
  id: "gemini-flash-lite",
  name: "Gemini App Flash Lite",
  toolCalling: true,
  supportsVision: true,
  contextLength: 512_000,
  maxOutputTokens: 32_768,
};

export const gemini_appProvider: RegistryEntry = {
  id: "gemini-app",
  alias: "gapp",
  format: "openai",
  executor: "gemini-app",
  authType: "oauth",
  authHeader: "bearer",
  baseUrl: GEMINI_APP_BASE_URL,
  passthroughModels: true,
  oauth: {
    clientIdEnv: "GEMINI_APP_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("gemini_app_id"),
    clientSecretEnv: "GEMINI_APP_OAUTH_CLIENT_SECRET",
    clientSecretDefault: resolvePublicCred("gemini_app_alt"),
    tokenUrl: "https://oauth2.googleapis.com/token",
  },
  models: [NEON, HYDROGEN, FLASH_LITE],
};
