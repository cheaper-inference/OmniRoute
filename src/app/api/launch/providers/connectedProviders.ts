/**
 * Pure helper for `GET /api/launch/providers`: which providers have an active stored credential,
 * and every id prefix the `/v1/models` catalog can put on their rows. Mirrors the catalog's own
 * resolution (src/app/api/v1/models/catalog.ts): the alias maps and prefix probe come from
 * catalogProviderMaps.ts, a compatible node's public id is its resolved prefix (the catalog's
 * `resolvePublicOwnerId`), never the raw node id.
 */

import {
  buildAliasMaps,
  getProviderPrefixes,
  resolveCanonicalProviderId,
} from "@/app/api/v1/models/catalogProviderMaps";
import { resolveProviderNodePrefix } from "@/shared/utils/modelIdPrefix";
import {
  isNoAuthProviderKey,
  isProviderBlockedByIdOrAlias,
  normalizeBlockedProviderSet,
} from "@/shared/utils/noAuthProviders";

type ConnectedProvider = { id: string; prefixes: string[] };
type ConnectedProvidersBody = { providers: ConnectedProvider[]; prefixes: string[] };

/** The few connection fields this route reads (never a credential field). */
type ConnectionLike = {
  provider?: string | null;
  isActive?: boolean | null;
  testStatus?: string | null;
};

/** A provider node row, as the catalog's prefix resolver reads it. */
type ProviderNode = Parameters<typeof resolveProviderNodePrefix>[0];
/** The `blockedProviders` setting, in any shape the catalog's normalizer accepts. */
type BlockedProvidersSetting = Parameters<typeof normalizeBlockedProviderSet>[0];

type ResolveContext = {
  aliasMaps: ReturnType<typeof buildAliasMaps>;
  blocked: Set<string>;
  nodePrefixById: Map<string, string>;
};

/**
 * Terminal connection states, matching `isTerminalConnectionStatus` in src/sse/services/auth.ts:
 * getProviderCredentials never selects such a connection, so it cannot serve a launch. The one
 * exemption auth.ts makes (openrouter credits_exhausted still serves catalogued free models) is
 * kept, so a key that only has free access left still counts as connected.
 */
const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);

function isUsableConnection(connection: ConnectionLike): boolean {
  if (connection.isActive === false) return false;
  const status = (connection.testStatus || "").trim().toLowerCase();
  if (!TERMINAL_STATUSES.has(status)) return true;
  return connection.provider === "openrouter" && status === "credits_exhausted";
}

const sorted = (values: Iterable<string>) =>
  [...new Set(values)].filter((v) => v.length > 0).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

function buildNodePrefixMap(providerNodes: ProviderNode[]): Map<string, string> {
  const nodePrefixById = new Map<string, string>();
  for (const node of providerNodes) {
    const id = typeof node?.id === "string" ? node.id : null;
    const prefix = resolveProviderNodePrefix(node);
    if (id && prefix) nodePrefixById.set(id, prefix);
  }
  return nodePrefixById;
}

/** Compatible provider node: the catalog publishes its rows (and owned_by) under the prefix. */
function nodeProvider(raw: string, nodePrefix: string, blocked: Set<string>) {
  if (blocked.has(raw) || blocked.has(nodePrefix)) return null;
  return { id: nodePrefix, prefixes: [nodePrefix] };
}

function isCatalogProviderBlocked(
  raw: string,
  canonical: string,
  alias: string | undefined,
  blocked: Set<string>
): boolean {
  if (blocked.has(raw)) return true;
  if (alias !== undefined && blocked.has(alias)) return true;
  return isProviderBlockedByIdOrAlias(canonical, blocked);
}

/** Built-in provider: its canonical id plus every catalog prefix (aliases, raw spelling). */
function catalogProvider(raw: string, ctx: ResolveContext) {
  const canonical = resolveCanonicalProviderId(ctx.aliasMaps.aliasToProviderId, raw);
  const alias = ctx.aliasMaps.providerIdToAlias[canonical];
  if (isNoAuthProviderKey(canonical, raw, alias)) return null;
  if (isCatalogProviderBlocked(raw, canonical, alias, ctx.blocked)) return null;
  return {
    id: canonical,
    prefixes: [canonical, ...getProviderPrefixes(ctx.aliasMaps, canonical, raw)],
  };
}

function connectionProvider(connection: ConnectionLike, ctx: ResolveContext) {
  const raw = typeof connection.provider === "string" ? connection.provider : "";
  if (!raw || !isUsableConnection(connection)) return null;
  const nodePrefix = ctx.nodePrefixById.get(raw);
  return nodePrefix ? nodeProvider(raw, nodePrefix, ctx.blocked) : catalogProvider(raw, ctx);
}

export function buildConnectedProviders(
  connections: ConnectionLike[],
  providerNodes: ProviderNode[],
  blockedProviders: BlockedProvidersSetting
): ConnectedProvidersBody {
  const ctx: ResolveContext = {
    aliasMaps: buildAliasMaps(),
    blocked: normalizeBlockedProviderSet(blockedProviders),
    nodePrefixById: buildNodePrefixMap(providerNodes),
  };

  const byId = new Map<string, Set<string>>();
  for (const connection of connections) {
    const entry = connectionProvider(connection, ctx);
    if (!entry) continue;
    const set = byId.get(entry.id) ?? new Set<string>();
    for (const prefix of entry.prefixes) set.add(prefix);
    byId.set(entry.id, set);
  }

  const providers = sorted(byId.keys()).map((id) => ({ id, prefixes: sorted(byId.get(id)!) }));
  return { providers, prefixes: sorted(providers.flatMap((p) => p.prefixes)) };
}
