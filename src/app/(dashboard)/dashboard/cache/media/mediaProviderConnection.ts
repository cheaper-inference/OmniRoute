// KEA-9390 — tells the Media page whether a provider can run before a request is sent.
//
// The media routes (`/v1/images/generations`, `/v1/videos/generations`, …) answer
// "No credentials for … provider" when the selected provider has no saved connection. The
// page used to find that out only by sending the request. These pure helpers answer the same
// question from the connection list the page already loads.
//
// The rule is deliberately one-sided: a provider is reported "not-connected" ONLY when the
// server would certainly refuse it. Whatever cannot be decided from static data is "unknown"
// and stays usable — blocking a provider that works is worse than letting a doomed request
// reach the server, which still answers with its own error.

import {
  NOAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  getProviderAlias,
  getProviderById,
  resolveProviderId,
} from "@/shared/constants/providers";

/**
 * Provider ids whose saved connections serve each other. Mirrors `PROVIDER_SEARCH_PAIRS` of
 * `open-sse/services/providerConnectionPool.ts`, which cannot be imported here (that module
 * reads the database). `tests/unit/media-provider-connection-kea9390.test.ts` runs the real
 * `getProviderSearchPool()` for every media provider and fails when this list falls behind.
 */
const CONNECTION_SHARING_GROUPS: readonly (readonly string[])[] = [
  ["nvidia", "nvidia_nim"],
  ["kimi-coding", "kimi-coding-apikey"],
  ["antigravity", "agy"],
  ["jina-ai", "jina-reader", "jina-search"],
];

export type MediaProviderConnectionState =
  /** A saved connection serves this provider. */
  | "connected"
  /** Runs without a saved connection (local server, or a keyless provider). */
  | "not-required"
  /** Needs a connection and has none: the server refuses the request. */
  | "not-connected"
  /** Cannot be decided here (connections not loaded, custom provider nodes, …). */
  | "unknown";

/** The fields of a media registry entry that decide where its credentials come from. */
export interface MediaProviderCredentialConfig {
  authType?: string;
  /** Provider id the connection is stored under, when it differs from the registry id. */
  credentialProviderId?: string;
  models?: ReadonlyArray<{ id: string }>;
}

export type MediaProviderRegistry = Readonly<Record<string, MediaProviderCredentialConfig>>;

type KeylessFlags = { noAuth?: boolean; anonymousFallback?: boolean } | undefined;

/**
 * Provider ids that hold at least one saved connection, read from the `/api/providers`
 * payload. `null` when the payload is not a connection list (the caller then knows nothing).
 */
export function collectConnectedProviderIds(payload: unknown): Set<string> | null {
  const record = payload as { connections?: unknown; providers?: unknown } | null | undefined;
  const rows = Array.isArray(payload) ? payload : (record?.connections ?? record?.providers);
  if (!Array.isArray(rows)) return null;
  const connected = new Set<string>();
  for (const row of rows) {
    const provider = (row as { provider?: unknown } | null)?.provider;
    if (typeof provider !== "string" || !provider) continue;
    connected.add(provider);
    connected.add(resolveProviderId(provider));
  }
  return connected;
}

/** True when the credential lookup hands back a synthetic credential with no saved connection. */
function runsWithoutConnection(providerId: string): boolean {
  const canonical = resolveProviderId(providerId);
  const noAuth = (NOAUTH_PROVIDERS as Record<string, KeylessFlags>)[canonical];
  const webCookie = (WEB_COOKIE_PROVIDERS as Record<string, KeylessFlags>)[canonical];
  const definition = getProviderById(canonical) as KeylessFlags;
  return (
    noAuth?.noAuth === true || webCookie?.noAuth === true || definition?.anonymousFallback === true
  );
}

/**
 * Every provider id the server searches connections under for `providerId` (mirrors
 * `getProviderSearchPool`). `null` for an id the static catalog does not know: its pool is
 * extended from the operator's custom provider nodes, which this module cannot see.
 */
function connectionSearchIds(providerId: string): string[] | null {
  const canonical = resolveProviderId(providerId);
  const group = CONNECTION_SHARING_GROUPS.find(
    (ids) => ids.includes(providerId) || ids.includes(canonical)
  );
  if (!group && !getProviderById(canonical)) return null;
  return [
    ...new Set([providerId, canonical, getProviderAlias(canonical), ...(group ?? [])]),
  ].filter(Boolean);
}

function resolveOwnState(
  providerId: string,
  config: MediaProviderCredentialConfig | undefined,
  connectedIds: ReadonlySet<string> | null
): MediaProviderConnectionState {
  if (!config) return "unknown";
  if (config.authType === "none") return "not-required";
  const credentialKey = config.credentialProviderId || providerId;
  if (runsWithoutConnection(credentialKey)) return "not-required";
  if (!connectedIds) return "unknown";
  const searchIds = connectionSearchIds(credentialKey);
  if (!searchIds) return "unknown";
  return searchIds.some((id) => connectedIds.has(id)) ? "connected" : "not-connected";
}

/**
 * Connection state of one provider of a media registry.
 *
 * `gatewayFallback` is for `/v1/audio/transcriptions`, the one route that retries another
 * provider listing the same model id when the selected one has no credentials: with it on, a
 * provider is "not-connected" only when no such gateway could serve it either.
 */
export function resolveMediaProviderConnectionState(
  providerId: string,
  registry: MediaProviderRegistry,
  connectedIds: ReadonlySet<string> | null,
  options: { gatewayFallback?: boolean } = {}
): MediaProviderConnectionState {
  const config = registry[providerId];
  const own = resolveOwnState(providerId, config, connectedIds);
  if (own !== "not-connected" || !options.gatewayFallback) return own;

  const candidates = new Set<string>();
  for (const model of config?.models ?? []) {
    candidates.add(model.id);
    candidates.add(`${providerId}/${model.id}`);
  }
  for (const [otherId, other] of Object.entries(registry)) {
    if (otherId === providerId) continue;
    if (!other.models?.some((model) => candidates.has(model.id))) continue;
    if (resolveOwnState(otherId, other, connectedIds) !== "not-connected") return "unknown";
  }
  return "not-connected";
}

/**
 * The provider a media tab should open on: the current one when it is connected, else the
 * first connected one, else the current one (or the first listed) unchanged — an unconnected
 * choice is then shown as such instead of being hidden behind a guess.
 */
export function pickPreferredMediaProvider(
  providers: ReadonlyArray<{ id: string }>,
  currentId: string | null | undefined,
  stateOf: (providerId: string) => MediaProviderConnectionState
): string {
  const current = providers.find((provider) => provider.id === currentId);
  if (current && stateOf(current.id) === "connected") return current.id;
  const connected = providers.find((provider) => stateOf(provider.id) === "connected");
  return (connected ?? current ?? providers[0])?.id ?? "";
}
