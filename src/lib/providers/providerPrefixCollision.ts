import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getProviderConnectionsCount } from "@/lib/db/providers";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import type { PrefixShadowedDiagnostic } from "@/shared/utils/providerConnectionStatus";

interface ProviderPrefixCollision {
  nodeId: string;
  nodeName: string;
  prefix: string;
  builtinProvider: string;
  shadowed: boolean;
}

const compatibleTypes = new Set(["openai-compatible", "anthropic-compatible"]);
const warnedStates = new Map<string, string>();

function builtinForPrefix(prefix: string): string | undefined {
  return Object.values(REGISTRY).find((entry) => entry.id === prefix || entry.alias === prefix)?.id;
}

function warnCollision(collision: ProviderPrefixCollision): void {
  const state = `${collision.prefix}:${collision.builtinProvider}:${collision.shadowed}`;
  if (warnedStates.get(collision.nodeId) === state) return;
  warnedStates.set(collision.nodeId, state);
  // Only routing identifiers, never credentials or upstream URLs. JSON quoting
  // keeps user-supplied names from injecting new log lines.
  console.warn(
    "[PROVIDER_PREFIX]",
    JSON.stringify({
      ...collision,
      code: collision.shadowed ? "prefix_shadowed" : "prefix_grandfathered",
      message: collision.shadowed
        ? "Active built-in connection takes precedence; the custom node remains reachable by its internal id."
        : "Existing custom node keeps its prefix while the built-in has no active connections.",
    })
  );
}

/** Current routing policy: configured activation, never transient credential health. */
export async function canGrandfatherProviderPrefix(prefix: string): Promise<boolean> {
  const builtinProvider = builtinForPrefix(prefix);
  if (!builtinProvider) return false; // Non-registry reservations (retired tombstones) stay closed.
  const nodes = await getCachedProviderNodes();
  const matching = nodes.filter(
    (node) => compatibleTypes.has(String(node.type)) && node.prefix === prefix
  );
  if (matching.length === 0) return false;
  const shadowed = getProviderConnectionsCount({ provider: builtinProvider, isActive: true }) > 0;
  for (const node of matching) {
    warnCollision({
      nodeId: String(node.id),
      nodeName: String(node.name ?? node.id),
      prefix,
      builtinProvider,
      shadowed,
    });
  }
  return !shadowed;
}

export async function getProviderPrefixCollisions(): Promise<ProviderPrefixCollision[]> {
  const nodes = await getCachedProviderNodes();
  const active = new Map<string, boolean>();
  const collisions: ProviderPrefixCollision[] = [];
  for (const node of nodes) {
    if (!compatibleTypes.has(String(node.type)) || typeof node.prefix !== "string") continue;
    const builtinProvider = builtinForPrefix(node.prefix);
    if (!builtinProvider) continue;
    if (!active.has(builtinProvider)) {
      active.set(
        builtinProvider,
        getProviderConnectionsCount({ provider: builtinProvider, isActive: true }) > 0
      );
    }
    collisions.push({
      nodeId: String(node.id),
      nodeName: String(node.name ?? node.id),
      prefix: node.prefix,
      builtinProvider,
      shadowed: active.get(builtinProvider) === true,
    });
  }
  return collisions;
}

/** Derived dashboard state; never overwrite persisted credential health or activation. */
export async function projectProviderPrefixCollisions<T extends { provider?: unknown }>(
  connections: T[]
): Promise<Array<T & { prefixShadowed: PrefixShadowedDiagnostic | null }>> {
  const collisions = await getProviderPrefixCollisions();
  const byNode = new Map(
    collisions
      .filter((collision) => collision.shadowed)
      .map((collision) => [collision.nodeId, collision])
  );
  return connections.map((connection) => {
    const collision = byNode.get(String(connection.provider));
    return {
      ...connection,
      prefixShadowed: collision
        ? {
            code: "prefix_shadowed" as const,
            prefix: collision.prefix,
            builtinProvider: collision.builtinProvider,
            message: `Prefix "${collision.prefix}" routes to the active built-in "${collision.builtinProvider}". Rename this node's prefix or use its internal id "${collision.nodeId}". Credential health is unchanged.`,
          }
        : null,
    };
  });
}

/** Called after DB readiness on each boot/upgrade; warnings are bounded by node and state. */
export async function warnProviderPrefixCollisionsAtBoot(): Promise<void> {
  for (const collision of await getProviderPrefixCollisions()) warnCollision(collision);
}
