import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";

/**
 * Nous Research — account login (RFC 8628 device grant).
 *
 * This is the runtime counterpart of the `nous-oauth` OAuth provider. Without
 * it, a `nouso/…` request skips registry-driven endpoint selection and falls
 * back to the generic OpenAI configuration, so the saved OAuth access token can
 * be sent to the wrong endpoint or dropped entirely.
 *
 * `passthroughModels` is on for the same reason as the api-key `nous-research`
 * entry: Nous publishes its whole catalog on /v1/models and multiplexes vendors
 * behind one connection. The static list below is the fallback that also makes
 * the DeepSeek id routable before the first sync.
 */
export const nous_oauthProvider: RegistryEntry = {
  id: "nous-oauth",
  alias: "nouso",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference-api.nousresearch.com/v1/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  oauth: {
    clientIdEnv: "NOUS_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("nous_id"),
    tokenUrl: "https://portal.nousresearch.com/api/oauth/token",
  },
  models: [
    { id: "Hermes-4-405B", name: "Hermes 4 405B (Nous Research)" },
    { id: "Hermes-4-70B", name: "Hermes 4 70B (Nous Research)" },
    { id: "deepseek/deepseek-v4.1-flash-1017", name: "DeepSeek V4.1 Flash 1017" },
  ],
};
