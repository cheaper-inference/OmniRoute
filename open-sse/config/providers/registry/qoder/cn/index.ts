import type { RegistryEntry } from "../../../shared.ts";
import { getQoderDefaultHeaders } from "../../../shared.ts";
import { qoderProvider } from "../index.ts";

/**
 * Qoder CN (`qoder.cn`) — the China deployment of Qoder, served as its own
 * provider so a CN account never races a global one for the same slot.
 *
 * Shares the executor and the model catalog with the global entry: Qoder ships
 * the same models on both sites, and keeping one source of truth means a model
 * added upstream lands on both. Only the host, the id and the OAuth endpoints
 * differ.
 */
export const qoderCnProvider: RegistryEntry = {
  id: "qoder-cn",
  alias: "qoder-cn",
  format: "openai",
  executor: "qoder",
  baseUrl: "https://api.qoder.cn/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  headers: getQoderDefaultHeaders(),
  oauth: {
    clientIdEnv: "QODER_CN_OAUTH_CLIENT_ID",
    clientSecretEnv: "QODER_CN_OAUTH_CLIENT_SECRET",
    tokenUrl: process.env.QODER_CN_OAUTH_TOKEN_URL || "",
    authUrl: process.env.QODER_CN_OAUTH_AUTHORIZE_URL || "",
  },
  models: qoderProvider.models,
};
