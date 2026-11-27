/**
 * Where a network decider's key comes from. Only two sources, never a key typed into the
 * combo config:
 *   1. a stored connection, by reference (`connectionId`), read through the normal credential
 *      selection and inside the caller's API-key allowlist (the jevAsk pattern, #15279);
 *   2. the `OMNIROUTE_DECISION_API_KEY` environment variable.
 * A referenced connection that the allowlist does not cover yields no key at all: it never
 * falls through to the environment.
 *
 * `resolveDecisionConnectionCredentials` is the same lookup without the environment step: it
 * returns the whole stored credential record (connection id, provider data) for the native
 * decision routes (#18838), which act for a client key and must never spend the operator's
 * environment key.
 */
import { getRegisteredConnectionStore } from "../../utils/registeredConnectionStore.ts";

export const DECISION_API_KEY_ENV = "OMNIROUTE_DECISION_API_KEY";

type EnvLike = Record<string, string | undefined>;

export interface DecisionCredentialArgs {
  /** Provider of the credential (`typesafe` for the System One decider); `null` = look it up. */
  provider?: string | null;
  connectionId?: string;
  apiKeyAllowedConnections?: string[] | null;
}

export interface DecisionCredentialDeps {
  getCredentials?: (provider: string, allowlist: string[] | null) => Promise<unknown>;
  getConnectionProvider?: (connectionId: string) => Promise<string | null>;
  env?: EnvLike;
}

async function defaultGetCredentials(
  provider: string,
  allowlist: string[] | null
): Promise<unknown> {
  // Lazy: the credential selector pulls the DB layer; it loads only for a live decision.
  const { getProviderCredentials } = await import("../combo/autoStrategy.ts");
  return getProviderCredentials(provider, null, allowlist);
}

async function defaultGetConnectionProvider(connectionId: string): Promise<string | null> {
  const connection = (await getRegisteredConnectionStore()?.getProviderConnectionById(
    connectionId
  )) as { provider?: unknown } | null | undefined;
  return typeof connection?.provider === "string" ? connection.provider : null;
}

function readApiKey(credentials: unknown): string | null {
  const apiKey = (credentials as { apiKey?: unknown } | null)?.apiKey;
  return typeof apiKey === "string" && apiKey.trim() ? apiKey.trim() : null;
}

/** Record of one referenced connection, only inside the allowlist; never an env fallback. */
async function recordFromReferencedConnection(
  connectionId: string,
  args: DecisionCredentialArgs,
  allowlist: string[] | null,
  deps: DecisionCredentialDeps
): Promise<unknown> {
  if (allowlist && !allowlist.includes(connectionId)) return null;
  const provider =
    args.provider ??
    (await (deps.getConnectionProvider ?? defaultGetConnectionProvider)(connectionId));
  if (!provider) return null;
  const getCredentials = deps.getCredentials ?? defaultGetCredentials;
  return getCredentials(provider, [connectionId]);
}

function allowlistOf(args: DecisionCredentialArgs): string[] | null {
  return args.apiKeyAllowedConnections?.length ? args.apiKeyAllowedConnections : null;
}

/**
 * The stored credential record for a decision call: the referenced connection (inside the
 * allowlist) or the provider's scoped selection. Never the environment key. The record is
 * returned as the selector gave it, so a caller can still tell its sentinels apart.
 */
export async function resolveDecisionConnectionCredentials(
  args: DecisionCredentialArgs,
  deps: DecisionCredentialDeps = {}
): Promise<unknown> {
  const allowlist = allowlistOf(args);
  const connectionId = args.connectionId?.trim();
  if (connectionId) return recordFromReferencedConnection(connectionId, args, allowlist, deps);
  if (!args.provider) return null;
  const getCredentials = deps.getCredentials ?? defaultGetCredentials;
  return getCredentials(args.provider, allowlist);
}

export async function resolveDecisionApiKey(
  args: DecisionCredentialArgs,
  deps: DecisionCredentialDeps = {}
): Promise<string | null> {
  const stored = readApiKey(await resolveDecisionConnectionCredentials(args, deps));
  // A referenced connection never falls through to the environment.
  if (stored || args.connectionId?.trim()) return stored;
  const env = deps.env ?? process.env;
  return env[DECISION_API_KEY_ENV]?.trim() || null;
}
