/**
 * CLIProxyAPI management-API compatibility layer.
 *
 * Clients built against a CLIProxyAPI hub (for example T3 Code's `cliproxy` usage-limit
 * source) read Claude/Codex subscription usage through three management endpoints:
 *
 *   GET  /v0/management/auth-files   → list the hub's OAuth accounts (never tokens)
 *   POST /v0/management/api-call     → the hub sends ONE request upstream with the
 *                                      account's OAuth token (the `$TOKEN$` placeholder)
 *   POST /v0/management/reset-quota  → lift the hub's local cooldown for one account
 *
 * OmniRoute answers the same contract from its own provider connections. `api-call` is
 * deliberately NOT a generic proxy: only the four (provider, method, URL) combinations those
 * clients use are allowed, every header is rebuilt from a per-provider allowlist, and the
 * access token is injected server-side. The caller never sees or supplies a token.
 */

import { z } from "zod";

import { getProviderConnectionById, getRawProviderConnections } from "@/lib/db/providers";
import { clearCodexAccountCooldown } from "@/lib/db/providers/codexAccountRecovery";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { clearConnectionCooldowns } from "@/lib/resilience/cooldownManager";
import { refreshAndUpdateCredentials } from "@/lib/usage/providerLimits";
import type { ProviderConnectionLike } from "@/lib/usage/providerLimits/credentialRefresh";
import { getClaudeCodeVersion } from "@omniroute/open-sse/executors/claudeIdentity.ts";
import { getCodexBackendIdentityHeaders } from "@omniroute/open-sse/config/codexClient.ts";
import { invalidateCodexQuotaCache } from "@omniroute/open-sse/services/codexQuotaFetcher.ts";
import { fetchWithConnectionProxy } from "@omniroute/open-sse/services/connectionProxyFetch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

type JsonRecord = Record<string, unknown>;

/** OmniRoute OAuth providers exposed through the compat layer (not the `anthropic` API-key provider). */
const CLIPROXY_COMPAT_PROVIDERS = ["claude", "codex"] as const;
type CliProxyCompatProvider = (typeof CLIPROXY_COMPAT_PROVIDERS)[number];

/** Same per-call budget the CLIProxyAPI clients apply on their side. */
const CLIPROXY_API_CALL_TIMEOUT_MS = 15_000;

const TOKEN_PLACEHOLDER = "$TOKEN$";
const AUTH_FILES_LIMIT = 1000;
const AUTH_FILE_COLUMNS = [
  "id",
  "provider",
  "auth_type",
  "email",
  "is_active",
  "provider_specific_data",
];

interface ApiCallRule {
  provider: CliProxyCompatProvider;
  method: "GET" | "POST";
  url: string;
}

/** The only upstream requests `api-call` will make. Matched on the normalized URL. */
const CLIPROXY_API_CALL_ALLOWLIST: ReadonlyArray<ApiCallRule> = [
  { provider: "claude", method: "GET", url: "https://api.anthropic.com/api/oauth/usage" },
  { provider: "codex", method: "GET", url: "https://chatgpt.com/backend-api/wham/usage" },
  {
    provider: "codex",
    method: "GET",
    url: "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits",
  },
  {
    provider: "codex",
    method: "POST",
    url: "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits/consume",
  },
];

/**
 * Caller headers forwarded upstream, per provider (lowercase). Anything else — notably
 * `Authorization`, `Cookie`, `Host` and hop-by-hop headers — is dropped.
 */
const FORWARDED_HEADERS: Record<CliProxyCompatProvider, ReadonlySet<string>> = {
  claude: new Set(["accept", "content-type", "anthropic-beta"]),
  codex: new Set(["accept", "content-type", "openai-beta", "originator", "chatgpt-account-id"]),
};

const headerValueSchema = z
  .string()
  .max(512)
  .refine((value) => !/[\r\n\0]/.test(value), { message: "Invalid header value" });

export const CliProxyApiCallSchema = z.object({
  auth_index: z.string().trim().min(1).max(256),
  method: z.enum(["GET", "POST"]),
  url: z.string().trim().min(1).max(2048),
  header: z
    .record(z.string().min(1).max(128), headerValueSchema)
    .refine((headers) => Object.keys(headers).length <= 32, { message: "Too many headers" })
    .optional(),
  data: z.string().max(16_384).optional(),
});
type CliProxyApiCallInput = z.infer<typeof CliProxyApiCallSchema>;

export const CliProxyResetQuotaSchema = z.object({
  auth_index: z.string().trim().min(1).max(256),
});

export class CliProxyCompatError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "CliProxyCompatError";
    this.status = status;
    this.code = code;
  }
}

interface CliProxyAuthFile {
  id: string;
  auth_index: string;
  provider: CliProxyCompatProvider;
  email?: string;
  disabled: boolean;
  id_token?: {
    chatgpt_account_id?: string;
    chatgpt_plan_type?: string;
    plan_type?: string;
  };
}

type CompatConnection = ProviderConnectionLike & { email?: string };

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function isCompatProvider(provider: unknown): provider is CliProxyCompatProvider {
  return (CLIPROXY_COMPAT_PROVIDERS as ReadonlyArray<unknown>).includes(provider);
}

function isCompatConnection(connection: JsonRecord | null): boolean {
  return Boolean(
    connection && isCompatProvider(connection.provider) && connection.authType === "oauth"
  );
}

/** Codex plan, read from where the OAuth login (`workspacePlanType`) or import (`chatgptPlanType`) stores it. */
function codexPlanType(providerSpecificData: JsonRecord): string | undefined {
  return (
    nonEmptyString(providerSpecificData.chatgptPlanType) ||
    nonEmptyString(providerSpecificData.workspacePlanType)
  );
}

function toAuthFile(row: JsonRecord): CliProxyAuthFile {
  const id = String(row.id);
  const provider = row.provider as CliProxyCompatProvider;
  const email = nonEmptyString(row.email);
  const file: CliProxyAuthFile = {
    id,
    auth_index: id,
    provider,
    ...(email ? { email } : {}),
    disabled: row.isActive === false,
  };
  if (provider === "codex") {
    const data = toRecord(row.providerSpecificData);
    const accountId = nonEmptyString(data.workspaceId);
    const planType = codexPlanType(data);
    file.id_token = {
      ...(accountId ? { chatgpt_account_id: accountId } : {}),
      ...(planType ? { chatgpt_plan_type: planType, plan_type: planType } : {}),
    };
  }
  return file;
}

/** `GET /v0/management/auth-files`: Claude/Codex OAuth connections, metadata only. */
export async function listCliProxyAuthFiles(): Promise<{ files: CliProxyAuthFile[] }> {
  const files: CliProxyAuthFile[] = [];
  for (const provider of CLIPROXY_COMPAT_PROVIDERS) {
    // Column projection: credential columns are never read for this listing.
    const rows = await getRawProviderConnections(
      { provider, authType: "oauth" },
      AUTH_FILES_LIMIT,
      0,
      AUTH_FILE_COLUMNS
    );
    for (const row of rows as JsonRecord[]) {
      if (row && row.id) files.push(toAuthFile(row));
    }
  }
  return { files };
}

async function loadCompatConnection(authIndex: string): Promise<CompatConnection> {
  const connection = (await getProviderConnectionById(authIndex)) as JsonRecord | null;
  if (!isCompatConnection(connection)) {
    throw new CliProxyCompatError(404, "auth_not_found", "Auth entry not found.");
  }
  return connection as unknown as CompatConnection;
}

function normalizeUrl(raw: string): string | null {
  try {
    const parsed = new URL(raw);
    if (parsed.username || parsed.password || parsed.hash) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function findRule(method: string, url: string): ApiCallRule | null {
  const normalized = normalizeUrl(url);
  if (!normalized) return null;
  return (
    CLIPROXY_API_CALL_ALLOWLIST.find((r) => r.method === method && r.url === normalized) ?? null
  );
}

function forbiddenCall(): CliProxyCompatError {
  return new CliProxyCompatError(
    403,
    "api_call_not_allowed",
    "This upstream request is not allowed through the CLIProxyAPI compatibility endpoint."
  );
}

function defaultHeaders(provider: CliProxyCompatProvider): Headers {
  if (provider === "claude") {
    return new Headers({
      Accept: "application/json",
      "User-Agent": `claude-code/${getClaudeCodeVersion()}`,
      "anthropic-beta": "oauth-2025-04-20",
    });
  }
  return new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getCodexBackendIdentityHeaders(),
  });
}

/**
 * Rebuild the upstream headers: provider defaults, then the caller's allowlisted headers,
 * then the server-side token. A caller-supplied `Authorization` (with or without the
 * `$TOKEN$` placeholder) is never forwarded, and the placeholder is never expanded in any
 * other header, so the token cannot be reflected into a different field.
 */
function buildUpstreamHeaders(
  provider: CliProxyCompatProvider,
  callerHeaders: Record<string, string> | undefined,
  connection: CompatConnection
): Headers {
  const headers = defaultHeaders(provider);
  const allowed = FORWARDED_HEADERS[provider];
  for (const [name, value] of Object.entries(callerHeaders ?? {})) {
    const lower = name.trim().toLowerCase();
    if (!allowed.has(lower) || value.includes(TOKEN_PLACEHOLDER)) continue;
    headers.set(lower, value);
  }
  if (provider === "codex" && !headers.has("chatgpt-account-id")) {
    const workspaceId = nonEmptyString(toRecord(connection.providerSpecificData).workspaceId);
    if (workspaceId) headers.set("chatgpt-account-id", workspaceId);
  }
  headers.set("Authorization", `Bearer ${connection.accessToken}`);
  return headers;
}

function validateRequestBody(rule: ApiCallRule, data: string | undefined): string | undefined {
  if (rule.method !== "POST" || data === undefined || data === "") return undefined;
  try {
    JSON.parse(data);
  } catch {
    throw new CliProxyCompatError(400, "invalid_data", "`data` must be a JSON-encoded string.");
  }
  return data;
}

async function refreshConnection(
  connection: CompatConnection,
  force: boolean
): Promise<CompatConnection> {
  try {
    // Same on-demand path the reset-credit and quota routes use: serialized per rotation
    // group, persisted through updateProviderConnection.
    const result = await refreshAndUpdateCredentials(connection, {
      allowRotatingRefresh: true,
      force,
    });
    return result.connection as CompatConnection;
  } catch (error) {
    const status = Number((error as { status?: unknown })?.status);
    console.warn(
      `[CliProxyCompat] Credential refresh failed for ${connection.id}: ${sanitizeErrorMessage(error)}`
    );
    if (status === 401) {
      throw new CliProxyCompatError(
        401,
        "reauth_required",
        "The account's OAuth credentials need to be re-authorized."
      );
    }
    throw new CliProxyCompatError(502, "refresh_failed", "Failed to refresh OAuth credentials.");
  }
}

async function sendUpstream(
  rule: ApiCallRule,
  connection: CompatConnection,
  callerHeaders: Record<string, string> | undefined,
  body: string | undefined
): Promise<Response> {
  if (!connection.accessToken) {
    throw new CliProxyCompatError(401, "token_missing", "The account has no OAuth access token.");
  }
  let response: Response | null;
  try {
    response = await fetchWithConnectionProxy(connection.id, rule.url, {
      method: rule.method,
      headers: buildUpstreamHeaders(rule.provider, callerHeaders, connection),
      ...(body !== undefined ? { body } : {}),
      signal: AbortSignal.timeout(CLIPROXY_API_CALL_TIMEOUT_MS),
    });
  } catch (error) {
    const name = (error as { name?: unknown })?.name;
    console.warn(
      `[CliProxyCompat] Upstream call failed for ${connection.id}: ${sanitizeErrorMessage(error)}`
    );
    if (name === "TimeoutError" || name === "AbortError") {
      throw new CliProxyCompatError(504, "upstream_timeout", "Upstream request timed out.");
    }
    throw new CliProxyCompatError(502, "upstream_failed", "Upstream request failed.");
  }
  if (!response) {
    throw new CliProxyCompatError(502, "upstream_failed", "Upstream request failed.");
  }
  return response;
}

/**
 * `POST /v0/management/api-call`: run one allowlisted upstream request with the account's
 * token and hand back the raw status and body text, as a CLIProxyAPI hub does.
 */
export async function executeCliProxyApiCall(
  input: CliProxyApiCallInput
): Promise<{ status_code: number; body: string }> {
  // Allowlist first: an unknown URL/method is refused before any DB read or upstream call.
  const rule = findRule(input.method, input.url);
  if (!rule) throw forbiddenCall();

  let connection = await loadCompatConnection(input.auth_index);
  if (connection.provider !== rule.provider) throw forbiddenCall();

  if (await isConnectionUnavailableToAuxiliaryActivity(connection.id)) {
    throw new CliProxyCompatError(
      409,
      "exclusive_lease_active",
      "This account is reserved by an exclusive lease."
    );
  }

  const body = validateRequestBody(rule, input.data);
  connection = await refreshConnection(connection, false);
  let response = await sendUpstream(rule, connection, input.header, body);

  if (response.status === 401) {
    // A token rejected before its recorded expiry: refresh once and retry, like the
    // reset-credit path. The upstream did not act on a 401, so the retry is safe.
    const previousToken = connection.accessToken;
    connection = await refreshConnection(connection, true);
    if (connection.accessToken && connection.accessToken !== previousToken) {
      response = await sendUpstream(rule, connection, input.header, body);
    }
  }

  return { status_code: response.status, body: await response.text() };
}

/**
 * `POST /v0/management/reset-quota`: lift OmniRoute's local cooldown for one account so
 * routing resumes (e.g. right after a Codex reset credit was redeemed). Uses the same
 * operator-driven release as the Cooldown Manager and the Codex cooldown route; terminal
 * states (banned / expired / credits_exhausted) are left alone.
 */
export async function resetCliProxyQuota(authIndex: string): Promise<{
  ok: true;
  auth_index: string;
  cleared: number;
  lockouts_cleared: number;
  skipped_terminal: number;
}> {
  const connection = await loadCompatConnection(authIndex);
  const result = await clearConnectionCooldowns({
    connectionIds: [connection.id],
    provider: connection.provider,
  });
  if (connection.provider === "codex" && result.skippedTerminal === 0) {
    await clearCodexAccountCooldown(connection.id, "codex");
    await clearCodexAccountCooldown(connection.id, "spark");
    invalidateCodexQuotaCache(connection.id);
  }
  return {
    ok: true,
    auth_index: connection.id,
    cleared: result.cleared,
    lockouts_cleared: result.lockoutsCleared,
    skipped_terminal: result.skippedTerminal,
  };
}
