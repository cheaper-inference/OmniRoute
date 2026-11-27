import type { RegistryEntry } from "../../shared.ts";

export const GITLAWB_CHAT_URL = "https://api.twigpine.com/v1/chat/completions";
export const GITLAWB_MIMO_PRO_ID = "xiaomi/mimo-v2.6-pro";

export const gitlawbProvider: RegistryEntry = {
  id: "gitlawb",
  alias: "glb",
  format: "openai",
  executor: "default",
  baseUrl: GITLAWB_CHAT_URL,
  modelsUrl: "https://api.twigpine.com/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  // The public listing documents the MiMo V2.5 aliases for existing configurations.
  models: [
    { id: GITLAWB_MIMO_PRO_ID, name: "MiMo V2.6 Pro", contextLength: 262144, toolCalling: true },
    {
      id: "xiaomi/mimo-v2.6-flash",
      name: "MiMo V2.6 Flash",
      contextLength: 262144,
      toolCalling: true,
    },
    { id: "xiaomi/mimo-v2.5-pro", name: "MiMo V2.6 Pro (V2.5 alias)" },
    { id: "mimo-v2.5-pro", name: "MiMo V2.6 Pro (legacy alias)" },
    { id: "xiaomi/mimo-v2.5", name: "MiMo V2.6 Flash (V2.5 alias)" },
    { id: "mimo-v2.5", name: "MiMo V2.6 Flash (legacy alias)" },
  ],
};
