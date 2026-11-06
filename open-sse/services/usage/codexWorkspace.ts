/**
 * Codex (ChatGPT) workspace metadata for the provider dashboard.
 *
 * The OAuth id_token only carries the plan type and the user's API-platform
 * organizations, not the ChatGPT workspace a connection is bound to. A user
 * with a personal Pro plan and a seat in a Business workspace therefore sees
 * several Codex connections that differ only by a masked email. The ChatGPT
 * accounts endpoint returns, for every account the token can reach, its
 * display name, structure ("personal" or "workspace") and the user's role.
 * The usage sync stores the entry matching the connection's `workspaceId`.
 */
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { getCodexBackendIdentityHeaders } from "../../config/codexClient.ts";

export const CODEX_ACCOUNTS_CHECK_URL =
  "https://chatgpt.com/backend-api/accounts/check/v4-2023-04-27";

// Display-only metadata: a slow upstream must not hold the usage refresh.
const CODEX_ACCOUNTS_CHECK_TIMEOUT_MS = 15_000;

export interface CodexWorkspaceInfo {
  workspaceName: string | null;
  workspaceStructure: string | null;
  workspaceRole: string | null;
}

type CodexWorkspaceFetch = (input: string, init: RequestInit) => Promise<Response>;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Picks the account bound to `workspaceId` from an accounts/check payload.
 * Connections imported without a workspace binding fall back to the
 * endpoint's `default` entry, which is the account the token resolves to.
 * A binding that is missing from the payload returns null instead of
 * guessing another account.
 */
export function parseCodexWorkspaceInfo(
  payload: unknown,
  workspaceId: string | null
): CodexWorkspaceInfo | null {
  const accounts = asRecord(asRecord(payload)?.accounts);
  if (!accounts) return null;
  const entry = workspaceId ? asRecord(accounts[workspaceId]) : asRecord(accounts.default);
  const account = asRecord(entry?.account);
  if (!account) return null;
  return {
    workspaceName: text(account.name),
    workspaceStructure: text(account.structure),
    workspaceRole: text(account.account_user_role),
  };
}

/** Fetches workspace metadata; any failure resolves to null (never throws). */
export async function fetchCodexWorkspaceInfo(
  accessToken: string,
  workspaceId: string | null,
  options: { connectionId?: string; fetchImpl?: CodexWorkspaceFetch } = {}
): Promise<CodexWorkspaceInfo | null> {
  const fetchImpl: CodexWorkspaceFetch = options.fetchImpl ?? ((input, init) => fetch(input, init));
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    ...getCodexBackendIdentityHeaders(),
  };
  if (workspaceId) headers["chatgpt-account-id"] = workspaceId;
  const init: RequestInit = {
    method: "GET",
    headers,
    signal: AbortSignal.timeout(CODEX_ACCOUNTS_CHECK_TIMEOUT_MS),
  };
  try {
    const response = options.connectionId
      ? await fetchWithConnectionProxy(options.connectionId, CODEX_ACCOUNTS_CHECK_URL, init, {
          fetchFn: fetchImpl,
        })
      : await fetchImpl(CODEX_ACCOUNTS_CHECK_URL, init);
    if (!response?.ok) return null;
    return parseCodexWorkspaceInfo(await response.json(), workspaceId);
  } catch {
    // Timeouts, network and JSON errors only cost the dashboard label.
    return null;
  }
}
