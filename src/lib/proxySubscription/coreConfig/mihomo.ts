/**
 * Mihomo renderer: merges the generation model into owned sections only.
 *
 * Owned = any `proxies` / `proxy-groups` / `listeners` entry whose name
 * starts with the shared owned-tag prefix. Owned entries are removed then
 * replaced; everything else (dns, log, user proxies, user groups, unknown
 * keys) is kept, key order included. An adopted file without a
 * `proxies`, `proxy-groups` or `listeners` array is refused
 * (`no_ownable_section`), never rewritten.
 *
 * Every rendered node goes through the canonical form (`normalizeSource`,
 * same as the sing-box renderer): nodes that are neither sing-box-shaped
 * nor translatable are listed with a reason — `converter_unsupported` for a
 * supported scheme that cannot translate whole, `source_not_singbox_shape`
 * for anything else. Never guesses: a field outside the supported set
 * rejects the whole node. No verbatim passthrough of sing-box payloads: a
 * sing-box-shaped source renders only through its canonical projection.
 *
 * Each owned listener names its selector group in `proxy`, so its traffic
 * goes to that group directly instead of through the operator's `rules`.
 * The adopted file is re-serialized: keys and their order are kept, YAML
 * comments and anchors are not.
 */
import { OWNED_TAG_PREFIX, type CanonicalNode, type CoreListener, type CoreModel } from "./model";
import {
  collectEmptyGroups,
  collectSkips,
  logDroppedParams,
  normalizeAll,
  type RenderVerdicts,
} from "./renderShared";
import { createHash } from "node:crypto";
import * as yaml from "js-yaml";
import type { RenderRefused, RenderResult } from "./renderers";

/** Canonical type to Mihomo proxy type (`shadowsocks` is `ss` on the wire). */
const MIHOMO_TYPE_BY_CANONICAL: Record<string, string> = {
  vless: "vless",
  trojan: "trojan",
  shadowsocks: "ss",
  vmess: "vmess",
  hysteria2: "hysteria2",
};

function isOwnedName(name: unknown): boolean {
  return typeof name === "string" && name.startsWith(OWNED_TAG_PREFIX);
}

function withoutOwned<T>(items: T[], nameOf: (item: T) => unknown): T[] {
  return items.filter((item) => !isOwnedName(nameOf(item)));
}

function asArray(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];
}

function parseBase(existingText: string | null): Record<string, unknown> | RenderResult {
  if (existingText === null) return { proxies: [], "proxy-groups": [], listeners: [] };
  let parsed: unknown;
  try {
    parsed = yaml.load(existingText);
  } catch {
    return { ok: false, reason: "unparseable" };
  }
  // A bare scalar document (`not json`, `123`) is not a config object; an
  // empty document loads as undefined, same as a null root.
  if (typeof parsed === "string" || typeof parsed === "number" || typeof parsed === "boolean") {
    return { ok: false, reason: "unparseable" };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, reason: "not_an_object" };
  }
  const base = parsed as Record<string, unknown>;
  if (
    !Array.isArray(base.proxies) &&
    !Array.isArray(base["proxy-groups"]) &&
    !Array.isArray(base.listeners)
  ) {
    return { ok: false, reason: "no_ownable_section" };
  }
  return base;
}

/**
 * TLS fields per Mihomo proxy type: vless/vmess take `tls` + `servername`;
 * trojan and hysteria2 are always TLS and take `sni`. `client-fingerprint`
 * only when the source asks for one, or for Reality (which needs it); never
 * on hysteria2, which runs over QUIC.
 */
function securityFields(node: CanonicalNode): Record<string, unknown> {
  const security = node.security;
  if (security.kind === "none") return {};
  const serverName = security.serverName ?? node.server;
  const sniOnly = node.type === "trojan" || node.type === "hysteria2";
  const fields: Record<string, unknown> = sniOnly
    ? { sni: serverName }
    : { tls: true, servername: serverName };
  if (security.insecure) fields["skip-cert-verify"] = true;
  if (node.type !== "hysteria2" && (security.fingerprint || security.kind === "reality")) {
    fields["client-fingerprint"] = security.fingerprint ?? "chrome";
  }
  if (security.kind === "reality") {
    fields["reality-opts"] = {
      "public-key": security.publicKey ?? "",
      "short-id": security.shortId ?? "",
    };
  }
  return fields;
}

function transportFields(node: CanonicalNode): Record<string, unknown> {
  if (node.transport.kind === "ws") {
    return {
      network: "ws",
      "ws-opts": {
        path: node.transport.path ?? "/",
        ...(node.transport.host ? { headers: { Host: node.transport.host } } : {}),
      },
    };
  }
  if (node.transport.kind === "grpc") {
    return { network: "grpc", "grpc-opts": { "grpc-service-name": node.transport.service ?? "" } };
  }
  return {};
}

function credentialFields(node: CanonicalNode): Record<string, unknown> {
  // Mihomo requires both on vmess; the canonical form only keeps nodes with
  // the default values (`alterId` 0, cipher `auto`).
  if (node.type === "vmess") {
    return { uuid: node.credentials.secret, alterId: 0, cipher: "auto" };
  }
  if (node.credentials.kind === "uuid") return { uuid: node.credentials.secret };
  if (node.credentials.kind === "password") return { password: node.credentials.secret };
  return { cipher: node.credentials.method, password: node.credentials.secret };
}

/** Project one canonical node to a Mihomo proxy (name added by the caller). */
export function projectCanonicalMihomo(node: CanonicalNode): Record<string, unknown> {
  const proxy: Record<string, unknown> = {
    type: MIHOMO_TYPE_BY_CANONICAL[node.type] ?? node.type,
    server: node.server,
    port: node.serverPort,
    ...credentialFields(node),
  };
  if (node.flow) proxy.flow = node.flow;
  Object.assign(proxy, securityFields(node), transportFields(node));
  return proxy;
}

function listenerFor(listener: CoreListener): Record<string, unknown> {
  return {
    name: listener.tag,
    type: listener.scheme === "socks5" ? "socks" : "http",
    listen: listener.host,
    port: listener.port,
    proxy: listener.group,
  };
}

function proxyEntries(
  model: CoreModel,
  renderedTags: Set<string>,
  verdicts: RenderVerdicts,
  keptProxies: Array<Record<string, unknown>>
): string[] {
  const emittedGroups = model.groups.filter((g) => g.members.some((m) => renderedTags.has(m)));
  const emittedTags = new Set(emittedGroups.map((g) => g.tag));
  for (const node of model.nodes) {
    if (!renderedTags.has(node.tag)) continue;
    const normalized = verdicts.get(node.tag);
    if (!normalized?.ok) continue;
    keptProxies.push({
      ...projectCanonicalMihomo(normalized.node),
      name: `${OWNED_TAG_PREFIX}${node.tag}`,
    });
  }
  return [...emittedTags];
}

function isRefused(value: Record<string, unknown> | RenderResult): value is RenderRefused {
  return "ok" in value && value.ok === false;
}

export function renderMihomo(model: CoreModel, existingText: string | null): RenderResult {
  const baseOrRefused = parseBase(existingText);
  if (isRefused(baseOrRefused)) return baseOrRefused;
  const base: Record<string, unknown> = baseOrRefused;

  const { verdicts, rendered: renderedTags } = normalizeAll(model);
  logDroppedParams(verdicts);
  const out: Record<string, unknown> = { ...base };
  const proxies = asArray(base.proxies).slice();
  const groups = asArray(base["proxy-groups"]).slice();
  const listeners = asArray(base.listeners).slice();

  const keptProxies = withoutOwned(proxies, (p) => (p as Record<string, unknown>).name);
  const keptGroups = withoutOwned(groups, (g) => (g as Record<string, unknown>).name);
  const keptListeners = withoutOwned(listeners, (l) => (l as Record<string, unknown>).name);

  const skipped: Array<{ node: string; reason: string }> = collectSkips(model, verdicts);

  const operatorCount = keptProxies.length;
  const emittedTags = proxyEntries(model, renderedTags, verdicts, keptProxies);
  const emittedGroupTags = new Set(emittedTags);

  skipped.push(...collectEmptyGroups(model, renderedTags));
  // Owned-position table, aligned with the final `proxies` array: operator
  // entries (kept) are unowned; node entries carry the model tag. Positional,
  // never prefix-matched, so group names sharing the owned prefix can never
  // resolve to a node.
  const renderableTags = model.nodes.filter((n) => renderedTags.has(n.tag)).map((n) => n.tag);
  const ownedIndex: Array<string | null> = keptProxies.map((_, i) => {
    const nodePos = i - operatorCount;
    return nodePos >= 0 && nodePos < renderableTags.length
      ? (renderableTags[nodePos] as string)
      : null;
  });

  for (const group of model.groups) {
    if (!emittedGroupTags.has(group.tag)) continue;
    keptGroups.push({
      name: group.tag,
      type: "select",
      proxies: group.members
        .filter((m) => renderedTags.has(m))
        .map((m) => `${OWNED_TAG_PREFIX}${m}`),
    });
  }

  for (const listener of model.listeners) {
    if (!emittedGroupTags.has(listener.group)) continue;
    keptListeners.push(listenerFor(listener));
  }

  out.proxies = keptProxies;
  out["proxy-groups"] = keptGroups;
  out.listeners = keptListeners;

  const dumped = yaml.dump(out);
  const text = dumped.endsWith("\n") ? dumped : `${dumped}\n`;
  const membersDigest = createHash("sha256")
    .update([...renderedTags].sort().join("\n"), "utf8")
    .digest("hex");
  return { ok: true, text, unchanged: text === existingText, skipped, ownedIndex, membersDigest };
}

/**
 * Map a failed check's raw output to the owned node tag it names, via the
 * renderer's owned-position table. Mihomo reports a bad entry of `proxies`
 * as `proxy <index>: <error>` (0-based); the first match wins (a check names
 * one position per run). Group errors (`proxy group[<i>]`), unowned,
 * out-of-range or absent positions resolve to null and keep the previous
 * behaviour upstream.
 */
export function resolveMihomoTag(
  stderr: string,
  ownedIndex: Array<string | null>
): { tag: string; token: string } | null {
  const match = /\bproxy (\d{1,6}):/.exec(stderr);
  if (!match) return null;
  const index = Number(match[1]);
  const tag = Number.isSafeInteger(index) ? ownedIndex[index] : null;
  if (typeof tag !== "string" || !tag) return null;
  return { tag, token: `offending-pattern:proxy ${match[1]}` };
}
