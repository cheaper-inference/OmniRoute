/**
 * Pool upsert for the merged union of healthy feeds.
 *
 * Iterates the deduplicated union (the same list the file generation
 * renders), so pool and beside-file never diverge. Directly-usable nodes
 * upsert one registry row each; `needsCore` nodes bind one row per
 * operator-supplied local core endpoint. Returns the kept registry ids
 * plus the local-core warning, if any.
 */
import { decodeUserinfo } from "@/shared/utils/decodeUserinfo";
import { upsertProxy, updateProxy } from "../db/proxies";
import { isProxyReachable } from "../proxyHealth";
import {
  isLocalCoreEndpointAllowed,
  parseLocalCoreEndpoints,
  redactCoreEntryForDetail,
} from "./coreEndpoint";
import type { NeedsCoreNode, SubscriptionNode } from "./parse";
import { stripSelectorSuffix } from "./selectorEndpoint";
import { subscriptionErrorCode } from "./subscriptionErrorCode";

/** A row the sync owns: subscription name for labels, endpoints for cores. */
export interface UnionPoolOwner {
  name: string;
  localCoreEndpoint: string | null;
}

/** Registry ids kept by the upsert, plus the local-core warning, if any. */
export interface UnionPoolOutcome {
  keptIds: string[];
  warning: string | null;
}

async function keepOwnedSyncedRow(
  upserted: Awaited<ReturnType<typeof upsertProxy>>,
  keptIds: string[]
): Promise<void> {
  if (upserted.action === "skipped" || !upserted.proxy?.id) return;
  keptIds.push(upserted.proxy.id);
  if (upserted.proxy.status === "error") {
    await updateProxy(upserted.proxy.id, { status: "active" });
  }
}

interface ValidCoreEntry {
  entry: string;
  probeUrl: string;
  coreUrl: URL;
  coreType: string;
  port: number;
  username?: string;
  password?: string;
}

interface CoreKeyParts {
  coreUrl: URL;
  coreType: string;
  port: number;
  username: string;
  password: string | undefined;
}

function coreKeyParts(bare: string): CoreKeyParts | null {
  let coreUrl: URL;
  try {
    coreUrl = new URL(bare);
  } catch {
    return null;
  }
  const coreType =
    coreUrl.protocol === "https:" ? "https" : coreUrl.protocol === "socks5:" ? "socks5" : "http";
  const port = Number(coreUrl.port) || (coreType === "https" ? 443 : 8080);
  let username = "";
  let password: string | undefined;
  try {
    username = coreUrl.username ? decodeUserinfo(coreUrl.username) : "";
    password = coreUrl.password ? decodeUserinfo(coreUrl.password) : undefined;
  } catch {
    return null;
  }
  return { coreUrl, coreType, port, username, password };
}

function probeUrlFor(parts: CoreKeyParts): string {
  const auth = parts.coreUrl.username
    ? `${parts.coreUrl.username}${parts.coreUrl.password ? `:${parts.coreUrl.password}` : ""}@`
    : "";
  return `${parts.coreType}://${auth}${parts.coreUrl.hostname.toLowerCase()}:${parts.port}`;
}

function collectValidCoreEntries(
  entries: string[],
  invalid: string[],
  collisions: string[]
): ValidCoreEntry[] {
  const seenKeys = new Set<string>();
  const valid: ValidCoreEntry[] = [];
  for (const entry of entries) {
    const bare = stripSelectorSuffix(entry);
    if (!isLocalCoreEndpointAllowed(bare)) {
      invalid.push(redactCoreEntryForDetail(bare));
      continue;
    }
    const parts = coreKeyParts(bare);
    if (!parts) {
      invalid.push(redactCoreEntryForDetail(bare));
      continue;
    }
    const { coreUrl, coreType, port, username, password } = parts;
    const key = `${coreType}://${coreUrl.hostname.toLowerCase()}:${port}:${username}`;
    if (seenKeys.has(key)) continue;
    const ownerKey = `://${coreUrl.hostname.toLowerCase()}:${port}:${username}`;
    let collided = false;
    for (const seen of seenKeys) {
      if (seen.endsWith(ownerKey)) {
        collided = true;
        break;
      }
    }
    if (collided) {
      collisions.push(redactCoreEntryForDetail(bare));
      continue;
    }
    seenKeys.add(key);
    valid.push({
      entry: bare,
      probeUrl: probeUrlFor(parts),
      coreUrl,
      coreType,
      port,
      username: username || undefined,
      password,
    });
  }
  return valid;
}

/**
 * Upsert the merged union into `proxy_registry`. Directly-usable nodes map
 * one-to-one to rows; core-dependent nodes bind the operator's local core
 * endpoints. Never revives operator-disabled rows (no status sent).
 */
export async function upsertUnionPool(
  subscriptionId: string,
  owner: UnionPoolOwner,
  nodes: SubscriptionNode[],
  needsCore: NeedsCoreNode[]
): Promise<UnionPoolOutcome> {
  const keptIds: string[] = [];
  for (const node of nodes) {
    const upserted = await upsertProxy(
      {
        name: node.name || `${owner.name} (${node.host}:${node.port})`,
        type: node.type,
        host: node.host,
        port: node.port,
        username: node.username,
        password: node.password,
        source: "subscription",
        subscriptionId,
      },
      { claimOwnership: false }
    );
    await keepOwnedSyncedRow(upserted, keptIds);
  }
  const warning = await upsertCoreEntries(subscriptionId, owner, needsCore, keptIds);
  return { keptIds, warning };
}

async function upsertCoreEntries(
  subscriptionId: string,
  owner: UnionPoolOwner,
  needsCore: NeedsCoreNode[],
  keptIds: string[]
): Promise<string | null> {
  if (needsCore.length === 0) return null;
  const entries = parseLocalCoreEndpoints(owner.localCoreEndpoint);
  if (entries.length === 0) {
    const names = needsCore
      .map((n) => `${n.rawProtocol}://${n.host ?? ""}${n.port ? `:${n.port}` : ""}`)
      .join(", ");
    return subscriptionErrorCode("NEEDS_CORE_NOT_CONFIGURED", names);
  }
  const invalid: string[] = [];
  const unreachable: string[] = [];
  const collisions: string[] = [];
  const validEntries = collectValidCoreEntries(entries, invalid, collisions);
  await markUnreachable(validEntries, unreachable);
  await insertValidEntries(subscriptionId, owner, validEntries, keptIds, invalid);
  return buildCoreWarning(invalid, unreachable, collisions);
}

async function markUnreachable(
  validEntries: ValidCoreEntry[],
  unreachable: string[]
): Promise<void> {
  const verdicts = await Promise.all(
    validEntries.map(async (valid) => {
      try {
        return await isProxyReachable(valid.probeUrl, undefined, 0);
      } catch {
        return false;
      }
    })
  );
  verdicts.forEach((reachable, i) => {
    if (!reachable) unreachable.push(redactCoreEntryForDetail(validEntries[i].entry));
  });
}

async function insertValidEntries(
  subscriptionId: string,
  owner: UnionPoolOwner,
  validEntries: ValidCoreEntry[],
  keptIds: string[],
  invalid: string[]
): Promise<void> {
  for (const valid of validEntries) {
    try {
      const upserted = await upsertProxy(
        {
          name:
            validEntries.length > 1
              ? `${owner.name} (local core :${valid.port}/${valid.coreType})`
              : `${owner.name} (local core)`,
          type: valid.coreType,
          host: valid.coreUrl.hostname,
          port: valid.port,
          username: valid.username,
          password: valid.password,
          source: "subscription",
          subscriptionId,
        },
        { claimOwnership: false }
      );
      await keepOwnedSyncedRow(upserted, keptIds);
    } catch {
      invalid.push(redactCoreEntryForDetail(valid.entry));
    }
  }
}

function buildCoreWarning(
  invalid: string[],
  unreachable: string[],
  collisions: string[]
): string | null {
  const parts: string[] = [];
  if (invalid.length > 0) parts.push(`invalid: ${invalid.join("; ")}`);
  if (unreachable.length > 0) parts.push(`unreachable: ${unreachable.join("; ")}`);
  if (collisions.length > 0) parts.push(`key-collision: ${collisions.join("; ")}`);
  if (parts.length === 0) return null;
  return subscriptionErrorCode("LOCAL_CORE_ENDPOINT_INVALID", parts.join(" | "));
}
