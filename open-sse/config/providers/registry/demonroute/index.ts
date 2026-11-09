import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Demon Route (https://demonroute.com/docs) — OpenAI-compatible API-key
 * gateway for hosted open-weight models. Model channel IDs are exact,
 * case-sensitive vendor/model strings, not the catalog's display slugs.
 *
 * The account-scoped /v1/models endpoint requires a Bearer key. These seeds
 * are only a useful offline starting point: operators should import the
 * live catalog for their own account. Do NOT hardcode prices or availability:
 * both vary by model and the provider can retire an ID.
 *
 * Chat Completions use its OpenAI-compatible /v1 endpoint. Embeddings are not
 * declared (serviceKinds is chat-only) until an embedding model is verified;
 * do not put unverified embedding models in the static chat seed list.
 *
 * Source: https://demonroute.com/docs and issue #16979.
 */
export const demonrouteProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "demonroute",
  alias: "demonroute",
  baseUrl: "https://api.demonroute.com/v1/chat/completions",
  modelsUrl: "https://api.demonroute.com/v1/models",
  // The provider recommends at least 120s; allow a slow reasoning model to
  // send its first streaming byte before the usual 110s ceiling (#11526).
  timeoutMs: 120_000,
  fetchStartTimeoutCapMs: 120_000,
  models: [
    { id: "dphn/Dolphin3.0-Llama3.1-8B", name: "Dolphin 3.0 Llama 3.1 8B" },
    { id: "dphn/Dolphin-Mistral-24B-Venice-Edition", name: "Dolphin Mistral 24B Venice" },
    { id: "TheDrummer/Artemis-31B-v1.2", name: "Artemis 31B v1.2" },
    { id: "TheDrummer/Cydonia-24B-v4.3", name: "Cydonia 24B v4.3" },
    {
      id: "huihui-ai/Huihui-Qwen3.6-35B-A3B-abliterated",
      name: "Huihui Qwen 3.6 35B A3B Abliterated",
    },
    {
      id: "huihui-ai/Huihui-gemma-4-31B-it-abliterated-v2",
      name: "Huihui Gemma 4 31B Abliterated v2",
    },
    {
      id: "dphn/dolphin-2.9.3-mistral-nemo-12b",
      name: "Dolphin 2.9.3 Mistral Nemo 12B",
    },
  ],
  passthroughModels: true,
});
