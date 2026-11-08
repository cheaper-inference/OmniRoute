import type { RegistryEntry } from "../../shared.ts";
import { M365_DOCUMENTED_MODELS } from "../../../../executors/m365Protocol/profile.ts";

const MODEL_DISPLAY_NAMES: Readonly<Record<string, string>> = {
  "m365-copilot": "Auto (Default)",
  auto: "Auto",
  quick: "Quick",
  "think-deeper": "Think Deeper",
  claude: "Claude (Alias)",
  "claude-sonnet": "Claude Sonnet",
  "claude-sonnet-4.5": "Claude Sonnet 4.5 (Alias)",
  "claude-sonnet-4.6": "Claude Sonnet 4.6",
  "claude-sonnet-5.5": "Claude Sonnet 5.5",
  "claude-sonnet-5": "Claude Sonnet 5",
  "claude-sonnet-think-deeper": "Claude Sonnet Think Deeper",
  "claude-opus": "Claude Opus",
  "claude-opus-5": "Claude Opus 5 (Alias)",
  "claude-opus-5.5": "Claude Opus 5.5",
  "claude-opus-4.8": "Claude Opus 4.8",
  "claude-opus-4.5": "Claude Opus 4.5 (Alias)",
  "gpt-5.5": "GPT 5.5",
  "gpt-5.5-quick": "GPT 5.5 Quick",
  "gpt-5.5-think-deeper": "GPT 5.5 Think Deeper",
  "gpt-5.6": "GPT 5.6",
  "gpt-5.6-quick": "GPT 5.6 Quick",
  "gpt-5.6-think-deeper": "GPT 5.6 Think Deeper",
  "gpt-6-think-deeper": "GPT 6 Think Deeper",
  "gpt-6-sol": "GPT 6 Sol",
  "gpt-6.1-sol": "GPT 6.1 Sol",
  "gpt-5.4": "GPT 5.4",
  "gpt-5.4-think-deeper": "GPT 5.4 Think Deeper",
  "gpt-5.4-quick": "GPT 5.4 Quick",
  "gpt-5.3": "GPT 5.3",
  "gpt-5.3-quick": "GPT 5.3 Quick",
  "gpt-5.3-think-deeper": "GPT 5.3 Think Deeper",
  "gpt-5.2": "GPT 5.2",
  "gpt-5.2-quick": "GPT 5.2 Quick",
  "gpt-5.2-think-deeper": "GPT 5.2 Think Deeper",
};

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
    { id: "copilot-m365", name: "Auto (Legacy)", toolCalling: true, supportsVision: true },
    {
      id: "copilot-m365-claude-opus",
      name: "Claude Opus (Legacy)",
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "copilot-m365-gpt-5-6-reasoning",
      name: "GPT 5.6 Reasoning (Legacy)",
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "copilot-m365-gpt-5-5-chat",
      name: "GPT 5.5 Chat (Legacy)",
      toolCalling: true,
      supportsVision: true,
    },
    // Static documented routes, available to list for every account. Microsoft decides entitlement.
    // Ids like `quick` or `claude-opus` are route labels here, so they must not capture bare
    // requests meant for other providers.
    ...Object.keys(M365_DOCUMENTED_MODELS).map((id) => ({
      id,
      name: MODEL_DISPLAY_NAMES[id],
      requiresProviderPrefix: true,
      toolCalling: true,
      supportsVision: true,
    })),
  ],
};
