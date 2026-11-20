/**
 * Where a network decider's key comes from. Only two sources, never a key typed into the
 * combo config:
 *   1. a stored connection, by reference (`connectionId`), read through the normal credential
 *      selection and inside the caller's API-key allowlist (the jevAsk pattern, #15279);
 *   2. the `OMNIROUTE_DECISION_API_KEY` environment variable.
 * A referenced connection that the allowlist does not cover yields no key at all: it never
 * falls through to the environment.
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

/** Key of one referenced connection, only inside the allowlist; never an env fallback. */
async function keyFromReferencedConnection(
  connectionId: string,
  args: DecisionCredentialArgs,
  allowlist: string[] | null,
  deps: DecisionCredentialDeps
): Promise<string | null> {
  if (allowlist && !allowlist.includes(connectionId)) return null;
  const provider =
    args.provider ??
    (await (deps.getConnectionProvider ?? defaultGetConnectionProvider)(connectionId));
  if (!provider) return null;
  const getCredentials = deps.getCredentials ?? defaultGetCredentials;
  return readApiKey(await getCredentials(provider, [connectionId]));
}

export async function resolveDecisionApiKey(
  args: DecisionCredentialArgs,
  deps: DecisionCredentialDeps = {}
): Promise<string | null> {
  const allowlist = args.apiKeyAllowedConnections?.length ? args.apiKeyAllowedConnections : null;
  const connectionId = args.connectionId?.trim();
  if (connectionId) return keyFromReferencedConnection(connectionId, args, allowlist, deps);

  if (args.provider) {
    const getCredentials = deps.getCredentials ?? defaultGetCredentials;
    const stored = readApiKey(await getCredentials(args.provider, allowlist));
    if (stored) return stored;
  }
  const env = deps.env ?? process.env;
  return env[DECISION_API_KEY_ENV]?.trim() || null;
}
