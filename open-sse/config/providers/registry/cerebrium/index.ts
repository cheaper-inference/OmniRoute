import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

// Cerebrium has no shared endpoint: every deployment gets its own URL
// (https://api.cerebrium.ai/v4/<project-id>/<app-name>/run), so the connection's
// Base URL must be set. The URL below is only the host prefix used as a fallback.
export const cerebriumProvider: RegistryEntry = {
  id: "cerebrium",
  alias: "cerebrium",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.cerebrium.ai/v4",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.cerebrium,
};
