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

export type ConnectedProvider = { id: string; prefixes: string[] };
export type ConnectedProvidersBody = { providers: ConnectedProvider[]; prefixes: string[] };

/** The few connection fields this route reads (never a credential field). */
export type ConnectionLike = {
  provider?: string | null;
  isActive?: boolean | null;
  testStatus?: string | null;
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

export function buildConnectedProviders(
  connections: ConnectionLike[],
  providerNodes: Array<Record<string, unknown> | null | undefined>,
  blockedProviders: unknown
): ConnectedProvidersBody {
  const aliasMaps = buildAliasMaps();
  const blocked = normalizeBlockedProviderSet(blockedProviders);
  const nodePrefixById = new Map<string, string>();
  for (const node of providerNodes) {
    const id = typeof node?.id === "string" ? node.id : null;
    const prefix = resolveProviderNodePrefix(node);
    if (id && prefix) nodePrefixById.set(id, prefix);
  }

  const byId = new Map<string, Set<string>>();
  for (const connection of connections) {
    const raw = typeof connection.provider === "string" ? connection.provider : "";
    if (!raw || !isUsableConnection(connection)) continue;

    const nodePrefix = nodePrefixById.get(raw);
    if (nodePrefix) {
      // Compatible provider node: the catalog publishes its rows (and owned_by) under the prefix.
      if (blocked.has(raw) || blocked.has(nodePrefix)) continue;
      const set = byId.get(nodePrefix) ?? new Set<string>();
      set.add(nodePrefix);
      byId.set(nodePrefix, set);
      continue;
    }

    const canonical = resolveCanonicalProviderId(aliasMaps.aliasToProviderId, raw);
    const alias = aliasMaps.providerIdToAlias[canonical];
    if (isNoAuthProviderKey(canonical, raw, alias)) continue;
    if (
      blocked.has(raw) ||
      (alias !== undefined && blocked.has(alias)) ||
      isProviderBlockedByIdOrAlias(canonical, blocked)
    ) {
      continue;
    }
    const set = byId.get(canonical) ?? new Set<string>();
    set.add(canonical);
    for (const prefix of getProviderPrefixes(aliasMaps, canonical, raw)) set.add(prefix);
    byId.set(canonical, set);
  }

  const providers = sorted(byId.keys()).map((id) => ({ id, prefixes: sorted(byId.get(id)!) }));
  return { providers, prefixes: sorted(providers.flatMap((p) => p.prefixes)) };
}
