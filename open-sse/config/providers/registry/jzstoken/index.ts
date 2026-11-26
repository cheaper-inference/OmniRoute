import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * JZS Token (https://jzstoken.com) — OpenAI-compatible API-key gateway.
 *
 * Public docs checked 2026-11-07 (homepage, /tutorials/quick-start,
 * /tutorials/api-endpoints): the OpenAI client base is
 * https://jzstoken.com/api/v1 and the client appends /chat/completions,
 * /models, and /responses. The same host also answers /v1/*. Unauthenticated
 * probes that day: GET /api/v1/models and POST /api/v1/chat/completions return
 * 401 JSON ("Missing API Key"); POST /api/v1/embeddings returns 404 HTML, so
 * embeddings are not declared. POST /messages, /responses, and
 * /images/generations also stop at 401, but those protocols were not called
 * with a key and are not wired here.
 *
 * GET /models is key-scoped. A Standard key lists the catalog except
 * jzs-max-3.0; a Dedicated key lists only jzs-max-3.0. Nothing is seeded:
 * context, prices, and aliases stay on the live list for the key the operator
 * stored. The connection-test selector uses only that key's synced cache; an
 * empty cache with auto-fetch disabled stays empty. No referral query params.
 */
export const jzstokenProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "jzstoken",
  alias: "jzstoken",
  baseUrl: "https://jzstoken.com/api/v1/chat/completions",
  modelsUrl: "https://jzstoken.com/api/v1/models",
  models: [],
  passthroughModels: true,
});
