import { decisionHeaders, readDecisionJson } from "./decisionTransport.ts";
import {
  DecisionError,
  record,
  type DecisionBackend,
  type DecisionCredentials,
  type DecisionFetch,
  type DecisionModel,
} from "./decisionTypes.ts";

export async function discoverDecisionModels(
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  fetcher: DecisionFetch,
  signal: AbortSignal
): Promise<DecisionModel[]> {
  const asModel = (id: string, vision?: boolean): DecisionModel => ({
    id: `${backend.provider}/${id}`,
    object: "model",
    owned_by: backend.provider,
    type: "decisions",
    supported_endpoints: [backend.format],
    capabilities: { decision: true, ...(vision ? { vision } : {}) },
    pricing: null,
  });
  // Explicit lists are for operator-managed servers (e.g. Julia); Ollama ALWAYS proves capability.
  if (backend.models && backend.discovery !== "ollama" && backend.discovery !== "openai") {
    return backend.models.map((id) => asModel(id));
  }
  const response = await fetcher(backend.modelsUrl, credentials, {
    headers: decisionHeaders(credentials),
    signal,
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new DecisionError(response.status, "model_discovery_failed");
  }
  const payload = record(await readDecisionJson(response, 502, signal));
  const rows = payload.data ?? payload.models;
  if (!Array.isArray(rows) || rows.length > 2048)
    throw new DecisionError(502, "invalid_model_catalog");
  const models: DecisionModel[] = [];
  for (const item of rows) {
    const row = record(item);
    const id = row.id ?? row.name ?? row.model;
    if (typeof id !== "string" || !id || id.length > 512) continue;
    if (backend.discovery === "openai") {
      // Official Decisions API currently supports this model only; ordinary OpenAI models stay chat.
      if (id === "gpt-6-luna") models.push(asModel(id));
    } else if (backend.discovery === "ollama") {
      const showUrl = new URL("/api/show", backend.modelsUrl).href;
      const show = await fetcher(showUrl, credentials, {
        method: "POST",
        headers: decisionHeaders(credentials),
        body: JSON.stringify({ model: id }),
        signal,
      });
      if (!show.ok) {
        await show.body?.cancel();
        continue;
      }
      const metadata = record(await readDecisionJson(show, 502, signal));
      const capabilities = metadata.capabilities;
      if (Array.isArray(capabilities) && capabilities.includes("decision")) {
        models.push(asModel(id, capabilities.includes("vision")));
      }
    } else {
      // The configured server is explicitly a System One backend, not a chat provider.
      models.push(asModel(id));
    }
  }
  return models;
}
