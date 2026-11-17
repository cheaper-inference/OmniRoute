import type { RegistryEntry } from "../../shared.ts";

/**
 * Grok Bot (Cursor desktop agent). Auth is an OAuth credential pair stored in
 * providerSpecificData (accessToken + refreshToken). The executor speaks the
 * aiserver.v1.GrokBotService Connect-RPC surface directly; the model choice is
 * server-side, so the catalog exposes a single conversational model id.
 */
export const grokBotProvider: RegistryEntry = {
  id: "grok-bot",
  format: "openai",
  executor: "grok-bot",
  baseUrl: "https://api2.cursor.sh",
  authType: "oauth",
  authHeader: "bearer",
  models: [{ id: "grok-bot", name: "Grok Bot" }],
};
