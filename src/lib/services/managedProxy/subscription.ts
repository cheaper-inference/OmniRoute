import { createHash } from "node:crypto";
import { BlockList, isIP } from "node:net";
import { parseSubscription, type NodeSource } from "@/lib/proxySubscription/parse";
import {
  isSubscriptionFetchUrlAllowed,
  isAnyResolvedAddressBlocked,
  extractIpv4MappedAddress,
} from "@/lib/proxySubscription/fetchGuard";
import {
  createPinnedFetch,
  resolveHostnameAddresses,
  type DnsLookup,
} from "@/shared/network/dnsPinnedFetch";
import { sourceOutbound, type ManagedCore } from "./config";

const MAX_FEED = 2 * 1024 * 1024;
const MAX_SOURCE = 65536;

/** Reject aliases/cycles and bound traversal before serializing untrusted YAML objects. */
function boundedSourceObject(value: Record<string, unknown>): string {
  const seen = new Set<object>();
  let size = 0;
  let nodes = 0;
  function visit(item: unknown, depth: number) {
    if (depth > 20 || ++nodes > 10000) throw new Error("Managed subscription node is too complex");
    if (item && typeof item === "object") {
      if (seen.has(item)) throw new Error("Managed subscription node aliases are unsupported");
      seen.add(item);
      size += 2;
      for (const [key, child] of Object.entries(item)) {
        size += JSON.stringify(key).length + 2;
        if (size > MAX_SOURCE) throw new Error("Managed subscription node exceeds size limit");
        visit(child, depth + 1);
      }
    } else size += JSON.stringify(item)?.length || 4;
    if (size > MAX_SOURCE) throw new Error("Managed subscription node exceeds size limit");
  }
  visit(value, 0);
  const serialized = JSON.stringify(value);
  if (serialized.length > MAX_SOURCE)
    throw new Error("Managed subscription node exceeds size limit");
  return serialized;
}

function subscriptionCandidates(content: string): {
  candidates: Array<{ name: string; source?: NodeSource }>;
  format: string;
} {
  const text = content.trim();
  const decoded = /^[A-Za-z0-9+/]+={0,2}$/.test(text)
    ? Buffer.from(text, "base64").toString("utf8")
    : text;
  if (decoded.startsWith("{") || decoded.startsWith("[")) {
    try {
      const document = JSON.parse(decoded);
      const values = Array.isArray(document) ? document : document.outbounds;
      if (Array.isArray(values)) {
        if (values.length > 500) throw new Error("Managed subscription contains too many nodes");
        return {
          format: "v2ray-json",
          candidates: values.map((value) => ({
            name:
              typeof value?.tag === "string"
                ? value.tag
                : typeof value?.name === "string"
                  ? value.name
                  : "Imported node",
            source: typeof value === "string" ? { kind: "uri", value } : { kind: "object", value },
          })),
        };
      }
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
    }
  }
  const parsed = parseSubscription(content);
  return { candidates: [...parsed.nodes, ...parsed.needsCore], format: parsed.format };
}

export function managedSubscriptionNodes(core: ManagedCore, content: string) {
  if (Buffer.byteLength(content) > MAX_FEED)
    throw new Error("Managed subscription exceeds the size limit");
  const { candidates, format } = subscriptionCandidates(content);
  if (candidates.length > 500) throw new Error("Managed subscription contains too many nodes");
  const nodes: Array<{ id: string; name: string; sourceLink: string }> = [];
  const seen = new Set<string>();
  let skipped = 0;
  for (const node of candidates) {
    try {
      const sourceLink =
        node.source?.kind === "uri"
          ? node.source.value
          : node.source?.kind === "object"
            ? boundedSourceObject(node.source.value)
            : "";
      sourceOutbound(core, sourceLink);
      const id = createHash("sha256").update(sourceLink).digest("hex");
      if (seen.has(id)) continue;
      seen.add(id);
      nodes.push({ id, name: (node.name || "Imported node").slice(0, 120), sourceLink });
    } catch {
      skipped++;
    }
  }
  if (!nodes.length)
    throw new Error("Managed subscription has no supported nodes for the selected core");
  return { nodes, skipped, format };
}

const nonPublicV4 = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const)
  nonPublicV4.addSubnet(address, prefix, "ipv4");
const globalV6 = new BlockList();
globalV6.addSubnet("2000::", 3, "ipv6");
const nonPublicV6 = new BlockList();
nonPublicV6.addSubnet("2001::", 23, "ipv6");
nonPublicV6.addSubnet("2001:db8::", 32, "ipv6");
nonPublicV6.addSubnet("2002::", 16, "ipv6");
nonPublicV6.addSubnet("3fff::", 20, "ipv6");
function isPublicAddress(address: string): boolean {
  const mapped = extractIpv4MappedAddress(address);
  if (mapped) return isPublicAddress(mapped);
  if (isIP(address) === 4) return !nonPublicV4.check(address, "ipv4");
  return (
    isIP(address) === 6 && globalV6.check(address, "ipv6") && !nonPublicV6.check(address, "ipv6")
  );
}

/** Explicit preview only: URL and node credentials are never persisted or logged. */
export async function previewManagedSubscription(
  core: ManagedCore,
  input: string,
  dependencies: { lookup?: DnsLookup; pinnedFetch?: typeof createPinnedFetch } = {}
) {
  const url = new URL(input);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.hash ||
    !isSubscriptionFetchUrlAllowed(input, { allowLocal: false })
  )
    throw new Error("Managed subscription requires a public HTTPS URL without URL credentials");
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => reject(new Error("Managed subscription resolution timed out")), 10000);
  });
  let addresses: Awaited<ReturnType<typeof resolveHostnameAddresses>>;
  try {
    addresses = await Promise.race([
      resolveHostnameAddresses(url.hostname, dependencies.lookup),
      timeout,
    ]);
  } finally {
    clearTimeout(timer);
  }
  if (
    !addresses.length ||
    isAnyResolvedAddressBlocked(addresses, { allowLocal: false }) ||
    addresses.some(({ address }) => !isPublicAddress(address))
  )
    throw new Error("Managed subscription host is blocked");
  const response = await (dependencies.pinnedFetch || createPinnedFetch)(
    addresses[0].address,
    addresses[0].family
  )(url, {
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    headers: {
      Accept: "text/plain, application/json, application/yaml",
      "User-Agent": "OmniRoute-ManagedProxy",
    },
  });
  if (!response.ok || !response.body) throw new Error("Managed subscription download failed");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const item = await reader.read();
      if (item.done) break;
      bytes += item.value.length;
      if (bytes > MAX_FEED) throw new Error("Managed subscription exceeds the size limit");
      chunks.push(item.value);
    }
  } finally {
    await reader.cancel();
  }
  return managedSubscriptionNodes(core, Buffer.concat(chunks).toString("utf8"));
}
