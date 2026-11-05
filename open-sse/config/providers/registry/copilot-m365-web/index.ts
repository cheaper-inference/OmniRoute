import type { RegistryEntry } from "../../shared.ts";
import { M365_DOCUMENTED_MODELS } from "../../../../executors/m365Protocol/profile.ts";

export const copilot_m365_webProvider: RegistryEntry = {
  id: "copilot-m365-web",
  alias: "m365copilot",
  format: "openai",
  executor: "copilot-m365-web",
  baseUrl: "wss://substrate.office.com/m365Copilot/Chathub",
  authType: "apikey",
  authHeader: "cookie",
  toolCalling: "emulated",
  models: [
    { id: "copilot-m365", name: "Microsoft 365 Copilot", toolCalling: true, supportsVision: false },
    {
      id: "copilot-m365-claude-opus",
      name: "Microsoft 365 Copilot — Claude Opus",
      toolCalling: true,
      supportsVision: false,
    },
    {
      id: "copilot-m365-gpt-5-6-reasoning",
      name: "Microsoft 365 Copilot — GPT 5.6 Reasoning",
      toolCalling: true,
      supportsVision: false,
    },
    {
      id: "copilot-m365-gpt-5-5-chat",
      name: "Microsoft 365 Copilot — GPT 5.5 Chat",
      toolCalling: true,
      supportsVision: false,
    },
    // Static documented routes, available to list for every account. Microsoft decides entitlement.
    ...Object.keys(M365_DOCUMENTED_MODELS).map((id) => ({
      id,
      name: `Microsoft 365 Copilot — ${id} (availability depends on account)`,
      toolCalling: true,
      supportsVision: false,
    })),
  ],
};
