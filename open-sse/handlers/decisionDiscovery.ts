import { OPENAI_DECISION_MODEL_IDS } from "../config/decisionCapabilities.ts";
import { decisionHeaders, readDecisionJson } from "./decisionTransport.ts";
import {
  DecisionError,
  record,
  type DecisionBackend,
  type DecisionCredentials,
  type DecisionFetch,
  type DecisionModel,
} from "./decisionTypes.ts";

async function ollamaDecisionCapabilities(
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  fetcher: DecisionFetch,
  signal: AbortSignal,
  id: string
): Promise<string[]> {
  const showUrl = new URL("/api/show", backend.modelsUrl).href;
  const show = await fetcher(showUrl, credentials, {
    method: "POST",
    headers: decisionHeaders(credentials),
    body: JSON.stringify({ model: id }),
    signal,
  });
  if (!show.ok) {
    await show.body?.cancel();
    throw new DecisionError(show.status, "model_capabilities_failed");
  }
  const metadata = record(await readDecisionJson(show, 502, signal));
  const capabilities = metadata.capabilities;
  return Array.isArray(capabilities) ? capabilities : [];
}

async function fetchDecisionCatalog(
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  fetcher: DecisionFetch,
  signal: AbortSignal
): Promise<unknown[]> {
  const response = await fetcher(backend.modelsUrl, credentials, {
    headers: decisionHeaders(credentials),
    signal,
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new DecisionError(response.status, "model_discovery_failed");
  }
  const payload = record(await readDecisionJson(response, 502, signal));
  const rows = payload.data ?? payload.models ?? payload.result;
  if (!Array.isArray(rows) || rows.length > 2048)
    throw new DecisionError(502, "invalid_model_catalog");
  return rows;
}

function decisionRowId(
  item: unknown,
  discovery: DecisionBackend["discovery"],
  requestedModel?: string
): string | null {
  const row = record(item);
  const id = discovery === "cloudflare" ? row.name : (row.id ?? row.name ?? row.model);
  if (requestedModel && requestedModel !== id) return null;
  return typeof id === "string" && id.length > 0 && id.length <= 512 ? id : null;
}

export async function discoverDecisionModels(
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  fetcher: DecisionFetch,
  signal: AbortSignal,
  options: { model?: string; onIncomplete?: () => void } = {}
): Promise<DecisionModel[]> {
  const asModel = (id: string, vision?: boolean): DecisionModel => ({
    id: `${backend.provider}/${id}`,
    object: "model",
    owned_by: backend.provider,
    type: "decisions",
    api_format: backend.format,
    supported_endpoints: [backend.format],
    capabilities: { decision: true, ...(vision ? { vision } : {}) },
    pricing: null,
  });
  // Explicit lists are for operator-managed servers (e.g. Julia); Ollama ALWAYS proves capability.
  if (backend.models && backend.discovery !== "ollama" && backend.discovery !== "openai") {
    return backend.models
      .filter((id) => !options.model || options.model === id)
      .map((id) => asModel(id));
  }
  const rows = await fetchDecisionCatalog(backend, credentials, fetcher, signal);
  const models: DecisionModel[] = [];
  for (const item of rows) {
    const id = decisionRowId(item, backend.discovery, options.model);
    if (!id) continue;
    try {
      const found = await discoverDecisionRow(backend, credentials, fetcher, signal, id, asModel);
      models.push(...found);
    } catch (error) {
      // Inference verifies only its target and must fail closed if that lookup fails.
      if (options.model) throw error;
      // Enumeration retains already verified rows and reports its incompleteness.
      options.onIncomplete?.();
      if (signal.aborted) break;
    }
  }
  return models;
}

async function discoverDecisionRow(
  backend: DecisionBackend,
  credentials: DecisionCredentials,
  fetcher: DecisionFetch,
  signal: AbortSignal,
  id: string,
  asModel: (id: string, vision?: boolean) => DecisionModel
): Promise<DecisionModel[]> {
  if (backend.discovery === "cloudflare") {
    // Workers AI does not expose a decision task: these documented native models
    // share System One. Other task models must never enter this catalog.
    if (["@cf/cloudflare/clef", "@cf/cloudflare/clef-flash"].includes(id))
      return [asModel(id, true)];
  } else if (backend.discovery === "openai") {
    // Official Decisions API currently supports this model only; ordinary OpenAI models stay chat.
    if (OPENAI_DECISION_MODEL_IDS.has(id)) return [asModel(id)];
  } else if (backend.discovery === "ollama") {
    const capabilities = await ollamaDecisionCapabilities(
      backend,
      credentials,
      fetcher,
      signal,
      id
    );
    if (capabilities.includes("decision")) {
      return [asModel(id, capabilities.includes("vision"))];
    }
  } else {
    // The configured server is explicitly a System One backend, not a chat provider.
    return [asModel(id)];
  }
  return [];
}
