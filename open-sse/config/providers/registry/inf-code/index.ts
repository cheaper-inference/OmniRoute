import { resolvePublicCred, type RegistryEntry } from "../../shared.ts";

/**
 * InfCode — Token Infinity's enterprise AI coding platform
 * (https://www.tokensinfinity.com/infcode).
 *
 * Verified live contract (probed 2026-11-02 against the official
 * Tokfinity.infcode VS Code extension v2.8.0 and the deployed gateway):
 *
 *   - Auth base:  https://www.tokensinfinity.com
 *   - Client id:  "infcode"  (public, sent as client_id in the authorize URL)
 *   - Scope:      "profile"
 *   - Authorize:  GET {base}/infcode/login?loginType=&type=editor&redirect=...&scope=profile&state=...&client_id=infcode
 *   - Exchange:   POST {base}/acode/v1/login_by_authcode  body { code }
 *   - Refresh:    POST {base}/acode/v1/refresh_token      body { refresh_token, rotate_refresh: true }
 *   - Userinfo:   GET  {base}/acode/v1/userinfo
 *   - Inference:  POST {base}/acode/v1/chat/completions   (OpenAI-compatible; 401 without a bearer token)
 *
 * The endpoints are intentionally env-overridable (INF_CODE_OAUTH_* /
 * INF_CODE_API_BASE) so deployments pointing at a private instance
 * (infone-*.tokensinfinity.com) or a custom gateway keep working without
 * a code change. Defaults are the public Token Infinity SaaS.
 */

/** Default Token Infinity SaaS API/auth base. */
const DEFAULT_INF_CODE_BASE = "https://www.tokensinfinity.com";

/** Resolve the configured API/auth base (env override wins). */
export function resolveInfCodeBase(): string {
  const fromEnv = process.env.INF_CODE_API_BASE?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return DEFAULT_INF_CODE_BASE;
}

/**
 * OpenAI-compatible inference endpoint under the chosen base.
 * Kept as a function so the env override is read lazily (registry is
 * evaluated at module load, and the provider may be instantiated before
 * env is fully wired in tests).
 */
export function resolveInfCodeChatPath(base: string): string {
  return `${base.replace(/\/+$/, "")}/acode/v1/chat/completions`;
}

export const inf_codeProvider: RegistryEntry = {
  id: "inf-code",
  alias: "infc",
  format: "openai",
  executor: "default",
  baseUrl: resolveInfCodeChatPath(resolveInfCodeBase()),
  authType: "oauth",
  authHeader: "bearer",
  /** Live model discovery — OpenAI-compatible /acode/v1/models (auth-gated). */
  modelsUrl:
    process.env.INF_CODE_OAUTH_MODELS_URL?.trim() ||
    resolveInfCodeBase().replace(/\/+$/, "") + "/acode/v1/models",
  oauth: {
    clientIdEnv: "INF_CODE_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("infcode_id"),
    tokenUrl:
      process.env.INF_CODE_OAUTH_TOKEN_URL?.trim() ||
      resolveInfCodeBase() + "/acode/v1/refresh_token",
    authUrl:
      process.env.INF_CODE_OAUTH_AUTHORIZE_URL?.trim() || resolveInfCodeBase() + "/infcode/login",
    refreshUrl:
      process.env.INF_CODE_OAUTH_REFRESH_URL?.trim() ||
      resolveInfCodeBase() + "/acode/v1/refresh_token",
  },
  models: [
    // Static model catalog. The live gateway is auth-gated (401) so we seed
    // the models the platform documents for its coding agents. These are the
    // families the extension surfaces; individual SKUs may vary by plan.
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
      interleavedField: "reasoning_content",
      contextLength: 262_144,
      maxOutputTokens: 64_000,
    },
    {
      id: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
      interleavedField: "reasoning_content",
      contextLength: 262_144,
      maxOutputTokens: 64_000,
    },
    {
      id: "qwen3.8-max",
      name: "Qwen3.8 Max",
      supportsVision: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
      contextLength: 1_000_000,
      maxOutputTokens: 64_000,
    },
    {
      id: "qwen3.7-plus",
      name: "Qwen3.7 Plus",
      supportsVision: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
      contextLength: 1_000_000,
      maxOutputTokens: 64_000,
    },
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "medium", "high"],
      contextLength: 1_000_000,
      maxOutputTokens: 64_000,
    },
    {
      id: "kimi-k3",
      name: "Kimi K3",
      supportsVision: true,
      contextLength: 1_000_000,
      maxOutputTokens: 64_000,
    },
    {
      id: "minimax-m3",
      name: "MiniMax M3",
      supportsVision: true,
      contextLength: 1_000_000,
      maxOutputTokens: 64_000,
    },
  ],
};
