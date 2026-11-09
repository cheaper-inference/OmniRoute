import type { RegistryEntry, RegistryModel } from "../../../shared.ts";

/**
 * Opt-in switch for `gweb/gemini-4-argon` (#16573). Its mode-selection
 * selectors (open-sse/executors/gemini-web/modeSelection.ts) have not been
 * checked against a live Gemini Web account yet, so the model stays out of the
 * catalog and the executor treats it as an unknown model unless the operator
 * sets OMNIROUTE_GEMINI_WEB_ARGON_ENABLED=1 (or true/yes). The catalog reads it
 * when this module loads, so a change needs a restart.
 */
export const GEMINI_WEB_ARGON_ENV = "OMNIROUTE_GEMINI_WEB_ARGON_ENABLED";

export function isGeminiWebArgonEnabled(): boolean {
  const raw = typeof process === "undefined" ? undefined : process.env?.[GEMINI_WEB_ARGON_ENV];
  const value = raw?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export const GEMINI_WEB_ARGON_MODEL: RegistryModel = {
  id: "gemini-4-argon",
  name: "Gemini 4 Argon",
  toolCalling: false,
  supportsReasoning: false,
};

export const gemini_webProvider: RegistryEntry = {
  id: "gemini-web",
  alias: "gweb",
  format: "openai",
  executor: "gemini-web",
  baseUrl: "https://gemini.google.com/app",
  authType: "apikey",
  authHeader: "cookie",
  // #9356: `supportsReasoning: false` is a live-behavior statement, not a guess
  // about the underlying Gemini model. The executor drives the gemini.google.com
  // web UI by typing a prompt, so it has no thinking-budget control to set and
  // never surfaces `reasoning_content` — agent routers reading /v1/models must
  // not select these for reasoning work. `toolCalling: false` is the matching
  // statement for native function calling; the prompt-emulation shim (#7286)
  // stays available and is advertised separately as `toolCalling: "emulated"`
  // on the provider constant (src/shared/constants/providers/web-cookie.ts).
  models: [
    {
      id: "gemini-3.1-pro",
      name: "Gemini 3.1 Pro",
      toolCalling: false,
      supportsReasoning: false,
    },
    ...(isGeminiWebArgonEnabled() ? [GEMINI_WEB_ARGON_MODEL] : []),
    {
      id: "gemini-3.7-flash",
      name: "Gemini 3.7 Flash",
      toolCalling: false,
      supportsReasoning: false,
    },
    {
      id: "gemini-3.1-flash-lite",
      name: "Gemini 3.1 Flash-Lite",
      toolCalling: false,
      supportsReasoning: false,
    },
  ],
};
