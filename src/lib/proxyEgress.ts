/**
 * Proxy Egress IP visibility.
 *
 * The proxy logs already capture the INBOUND client IP (x-forwarded-for), but
 * NOT the OUTBOUND/egress IP — the address the upstream actually sees. For
 * rotating providers (codex/openai) this is critical: when several accounts
 * egress through the SAME IP at high volume, the provider flags it as anomaly
 * and revokes the tokens ("Your authentication token has been invalidated").
 *
 * This module resolves the real egress IP (via an echo-IP service through the
 * resolved proxy/dispatcher) and detects same-rotation-group accounts sharing
 * an egress IP, so the operator can confirm exactly which IP each account is
 * entering and leaving by.
 *
 * The probe knows two modes: the sequential one stops at the first echo target
 * that answers (the operator routes keep it), and the dual one queries every
 * target at once so the address of each family is measured. A tunnel exposes
 * one address per family, so measuring one family leaves the other unknown.
 */
import { request as undiciRequest } from "undici";
import {
  createProxyDispatcher,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { rotationGroupFor } from "@omniroute/open-sse/services/refreshSerializer.ts";
import {
  probeEchoTargets,
  probeEchoTargetsInParallel,
  resolveEgressEchoUrls,
  splitEchoAttemptBudget,
} from "./proxyEchoTarget";
import {
  demapEgressAddress,
  egressAddressFamily,
  type EgressAddressFamily,
} from "@/shared/network/egressAddress";

const EGRESS_PROBE_TIMEOUT_MS = 6000;
const EGRESS_CACHE_TTL_MS = 5 * 60 * 1000;

export interface EgressProbeResult {
  ip: string | null;
  latencyMs: number;
  error?: string;
  /**
   * Address observed for the IPv4 family; absent = the probe did not report
   * that family. The merge then derives it from the measured address, whose
   * family is known.
   */
  ipv4?: string | null;
  /**
   * Address observed for the IPv6 family; absent = the probe did not report
   * that family. The merge then derives it from the measured address, whose
   * family is known.
   */
  ipv6?: string | null;
  /**
   * Every configured echo target was queried (a target that failed still
   * counts). Absent = a probe that does not report its coverage: the entry is
   * then written as complete, so the enrichment never restarts on every log
   * line.
   */
  complete?: boolean;
}

/**
 * `sequential` stops at the first echo target that answers (one request for a
 * healthy proxy); `dual` queries every target at once to measure the address
 * of each family. The mode never changes the reported address.
 */
export type EgressProbeMode = "sequential" | "dual";

export type EgressProbe = (
  proxyUrl: string | null,
  mode: EgressProbeMode
) => Promise<EgressProbeResult>;

/** The addresses one measurement observed, one per family. */
export interface EgressObservation {
  /** The reported address: the first target that answered, never synthesized. */
  ip: string | null;
  /** The address observed for the IPv4 family; null = family not observed. */
  ipv4: string | null;
  /** The address observed for the IPv6 family; null = family not observed. */
  ipv6: string | null;
}

interface EgressCacheEntry extends EgressObservation {
  complete: boolean;
  at: number;
}

const egressCache = new Map<string, EgressCacheEntry>();

/**
 * PURE: read the addresses out of the answers of the echo targets, in the order
 * of the targets. The reported address is the first answer that came back, even
 * when it carries no address at all; the family columns hold the address
 * observed for each family, demapped, and the first address seen for a family
 * wins.
 */
export function buildEgressObservation(answers: Array<{ body: string }>): EgressObservation {
  let ip: string | null = null;
  let ipv4: string | null = null;
  let ipv6: string | null = null;
  let primaryTaken = false;

  for (const answer of answers) {
    let parsed: string | null = null;
    try {
      parsed = (JSON.parse(answer.body) as { ip?: string }).ip ?? null;
    } catch {
      // non-JSON body — leave the address null
      parsed = null;
    }
    if (!primaryTaken) {
      ip = parsed;
      primaryTaken = true;
    }
    if (typeof parsed !== "string") continue;
    const family = egressAddressFamily(parsed);
    const demapped = demapEgressAddress(parsed);
    if (demapped === null) continue;
    if (family === "ipv4" && ipv4 === null) ipv4 = demapped;
    if (family === "ipv6" && ipv6 === null) ipv6 = demapped;
  }

  return { ip, ipv4, ipv6 };
}

async function defaultEgressProbe(
  proxyUrl: string | null,
  mode: EgressProbeMode = "sequential"
): Promise<EgressProbeResult> {
  const start = Date.now();
  const urls = resolveEgressEchoUrls();
  // The sequential probe splits the budget between the targets, so it may try
  // fewer targets than the configured ones — the coverage says which.
  const attempts = splitEchoAttemptBudget(EGRESS_PROBE_TIMEOUT_MS, urls.length).length;
  try {
    const dispatcher = proxyUrl ? createProxyDispatcher(proxyUrl) : undefined;
    const run = async (url: string, timeoutMs: number) => {
      // #9694: each echo target gets its own controller, so exhausting the budget
      // on an unreachable IPv6-first target does not abort the IPv4 attempt.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await undiciRequest(url, {
          method: "GET",
          dispatcher,
          signal: controller.signal,
          headersTimeout: timeoutMs,
          bodyTimeout: timeoutMs,
        });
        return await res.body.text();
      } finally {
        clearTimeout(timeout);
      }
    };

    if (mode === "dual") {
      const answers = await probeEchoTargetsInParallel(run, EGRESS_PROBE_TIMEOUT_MS);
      const observation = buildEgressObservation(
        answers.map((answer) => ({ body: answer.result }))
      );
      return { ...observation, latencyMs: Date.now() - start, complete: true };
    }

    const { result: text, url } = await probeEchoTargets(run, EGRESS_PROBE_TIMEOUT_MS);
    let ip: string | null = null;
    try {
      ip = (JSON.parse(text) as { ip?: string }).ip ?? null;
    } catch {
      // non-JSON body — leave ip null
    }
    // Every target was queried when the answer comes from the last one: the
    // targets before it were tried and failed.
    const complete = attempts >= urls.length && url === urls[urls.length - 1];
    return { ip, latencyMs: Date.now() - start, complete };
  } catch (error) {
    return {
      ip: null,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
      // Every target was tried before the probe gave up, or the dual probe
      // queried them all at once: the observation is complete either way.
      complete: mode === "dual" || attempts >= urls.length,
    };
  }
}

let probe: EgressProbe = defaultEgressProbe;

/** Test seam: override the network probe. */
export function _setEgressProbeForTests(fn: EgressProbe | null): void {
  probe = fn ?? defaultEgressProbe;
}

export function clearEgressCache(): void {
  egressCache.clear();
}

/**
 * Drop the entry of a proxy URL once it expired, so the next read starts
 * over. The entry count therefore follows the number of proxy URLs, not the
 * number of measurements.
 */
function dropExpiredEgressEntry(key: string, at: number): boolean {
  if (Date.now() - at < EGRESS_CACHE_TTL_MS) return false;
  egressCache.delete(key);
  return true;
}

/**
 * Synchronous read of the cached observation for a proxy URL (null = direct).
 * Non-blocking — used by the request hot path to log the egress addresses
 * without an echo-IP round-trip. Returns null if not yet probed.
 *
 * The completeness flag travels with the observation: it says whether every
 * echo target was queried, so the caller knows whether the other family still
 * has to be measured.
 */
export function getCachedEgressObservation(
  proxyUrl: string | null
): (EgressObservation & { complete: boolean }) | null {
  const key = proxyUrl ?? "__direct__";
  const cached = egressCache.get(key);
  if (!cached) return null;
  if (dropExpiredEgressEntry(key, cached.at)) return null;
  return { ip: cached.ip, ipv4: cached.ipv4, ipv6: cached.ipv6, complete: cached.complete };
}

const warmingInFlight = new Set<string>();

/**
 * Fire-and-forget: populate the egress cache for a proxy URL in the background
 * so subsequent proxy log lines carry the real egress addresses. Deduped per
 * URL.
 *
 * A live and COMPLETE observation is left alone — that includes a failed
 * measurement: every target was queried, so there is nothing left to measure
 * and the entry is honoured until it expires. An incomplete observation (a
 * sequential measurement stopped at the first target that answered) is
 * completed in the background, once per URL and per TTL.
 */
export function warmEgressIp(proxyUrl: string | null): void {
  const key = proxyUrl ?? "__direct__";
  if (warmingInFlight.has(key)) return;
  const observation = getCachedEgressObservation(proxyUrl);
  if (observation?.complete) return;
  warmingInFlight.add(key);
  void resolveEgressIp(proxyUrl, { mode: "dual", force: true })
    .catch(() => undefined)
    .finally(() => warmingInFlight.delete(key));
}

/**
 * The value of one family column after a measurement. The family of the
 * measured address is derived from the address itself, so the column of that
 * family is refreshed with it: the reported address is always carried by the
 * column of its own family. A family the measurement did not observe keeps the
 * value it had.
 */
function mergeEgressColumn(
  family: EgressAddressFamily,
  measuredFamily: EgressAddressFamily | null,
  measuredAddress: string | null,
  reported: string | null | undefined,
  previous: string | null | undefined
): string | null {
  if (family === measuredFamily && measuredAddress !== null) return measuredAddress;
  return reported ?? previous ?? null;
}

/**
 * Merge a measurement into the cache entry it replaces. The write is monotone
 * in completeness: a family the measurement observed is refreshed, a family it
 * did not observe keeps the value it had, and a complete observation never
 * goes back to incomplete. An operator action can therefore never erase what
 * the journal already measured.
 *
 * The family of the measured address is derived from the address itself, not
 * from what the probe reported: a probe that stops at the first target that
 * answers reports no family at all, and the address it read still belongs to
 * one. The invariant therefore holds after the merge, not only inside one
 * measurement.
 */
function mergeEgressObservation(
  previous: EgressCacheEntry | undefined,
  result: EgressProbeResult
): EgressCacheEntry {
  const measuredFamily = egressAddressFamily(result.ip);
  const measuredAddress = measuredFamily === null ? null : demapEgressAddress(result.ip);
  return {
    ip: result.ip ?? null,
    ipv4: mergeEgressColumn("ipv4", measuredFamily, measuredAddress, result.ipv4, previous?.ipv4),
    ipv6: mergeEgressColumn("ipv6", measuredFamily, measuredAddress, result.ipv6, previous?.ipv6),
    // A measurement that does not report its coverage (an injected probe) is
    // written as complete: it answered, and there is nothing left to measure.
    complete: (previous?.complete ?? false) || (result.complete ?? true),
    at: Date.now(),
  };
}

/**
 * Resolve the egress IP for a given proxy URL (null = direct/host IP).
 * Cached per proxyUrl to avoid an echo-IP round-trip on every call.
 */
export async function resolveEgressIp(
  proxyUrl: string | null,
  opts: { cacheTtlMs?: number; force?: boolean; mode?: EgressProbeMode } = {}
): Promise<EgressProbeResult & { cached: boolean }> {
  const key = proxyUrl ?? "__direct__";
  const ttl = opts.cacheTtlMs ?? EGRESS_CACHE_TTL_MS;
  const cached = egressCache.get(key);
  if (!opts.force && cached && Date.now() - cached.at < ttl) {
    return {
      ip: cached.ip,
      latencyMs: 0,
      cached: true,
      ipv4: cached.ipv4,
      ipv6: cached.ipv6,
      complete: cached.complete,
    };
  }
  const result = await probe(proxyUrl, opts.mode ?? "sequential");
  const entry = mergeEgressObservation(egressCache.get(key), result);
  egressCache.set(key, entry);
  return {
    ...result,
    ip: entry.ip,
    ipv4: entry.ipv4,
    ipv6: entry.ipv6,
    complete: entry.complete,
    cached: false,
  };
}

export interface ConnectionEgress {
  connectionId: string;
  provider: string;
  account: string | null;
  proxyLevel: string;
  proxyHost: string | null;
  egressIp: string | null;
  error?: string;
}

export interface EgressSharingWarning {
  egressIp: string;
  rotationGroup: string;
  connections: string[]; // connectionId/account labels sharing this IP within one rotation group
}

export interface EgressDiagnostic {
  connections: ConnectionEgress[];
  byEgressIp: Record<string, string[]>;
  sharedWithinRotationGroup: EgressSharingWarning[];
}

/**
 * PURE: group egress results by IP and flag IPs shared by ≥2 accounts of the
 * SAME rotation group (codex+openai share one Auth0 family — the exact
 * condition that triggers anomaly revocation). Direct/unknown IPs are reported
 * but only same-group sharing is a warning.
 */
export function analyzeEgressSharing(connections: ConnectionEgress[]): {
  byEgressIp: Record<string, string[]>;
  sharedWithinRotationGroup: EgressSharingWarning[];
} {
  const byEgressIp: Record<string, string[]> = {};
  // ip -> rotationGroup -> labels
  const byIpGroup = new Map<string, Map<string, string[]>>();

  for (const c of connections) {
    if (!c.egressIp) continue;
    const label = c.account || c.connectionId;
    (byEgressIp[c.egressIp] ??= []).push(label);

    const group = rotationGroupFor(c.provider) || `provider:${c.provider}`;
    let groups = byIpGroup.get(c.egressIp);
    if (!groups) {
      groups = new Map();
      byIpGroup.set(c.egressIp, groups);
    }
    const list = groups.get(group) ?? [];
    list.push(label);
    groups.set(group, list);
  }

  const sharedWithinRotationGroup: EgressSharingWarning[] = [];
  for (const [egressIp, groups] of byIpGroup) {
    for (const [rotationGroup, labels] of groups) {
      if (labels.length >= 2) {
        sharedWithinRotationGroup.push({ egressIp, rotationGroup, connections: labels });
      }
    }
  }

  return { byEgressIp, sharedWithinRotationGroup };
}

export const EGRESS_SHARING_WINDOW_MS = 24 * 60 * 60 * 1000;

export interface EgressLogRow {
  provider: string | null;
  account: string | null;
  connectionId: string | null;
  egressIp: string | null;
}

export interface EgressSharingSummary {
  windowStart: string;
  windowEnd: string;
  distinctEgressIps: number;
  sharingByRotationGroup: Array<{
    rotationGroup: string;
    sharedIps: number;
    maxAccountsSharingOneIp: number;
  }>;
  maxAccountsSharingOneIp: number;
}

/**
 * PURE: anonymous egress-IP sharing summary over proxy_logs-shaped rows.
 * Dedupes per connection (proxy_logs holds one row per request, not per
 * connection) — "max accounts behind one IP" therefore counts connections,
 * not distinct accounts, when one account spans several connections. Reuses
 * analyzeEgressSharing's rotation-group semantics and returns counts only —
 * no IP literals, no account identities (#10348).
 */
export function summarizeEgressSharing(
  rows: EgressLogRow[],
  window: { start: string; end: string }
): { summary: EgressSharingSummary; warnings: EgressSharingWarning[] } {
  const byAccount = new Map<string, EgressLogRow>();
  for (const r of rows) {
    if (!r.egressIp) continue;
    const key = r.connectionId ?? r.account;
    if (!key) continue;
    if (!byAccount.has(key)) byAccount.set(key, r);
  }

  const connections = [...byAccount.values()].map((r) => ({
    connectionId: r.connectionId ?? r.account ?? "unknown",
    provider: r.provider ?? "",
    account: r.account ?? r.connectionId,
    proxyLevel: "log",
    proxyHost: null,
    egressIp: r.egressIp,
  }));

  const { byEgressIp, sharedWithinRotationGroup } = analyzeEgressSharing(connections);

  const byGroup = new Map<string, { sharedIps: number; maxAccountsSharingOneIp: number }>();
  let maxAccountsSharingOneIp = 0;
  for (const w of sharedWithinRotationGroup) {
    const g = byGroup.get(w.rotationGroup) ?? { sharedIps: 0, maxAccountsSharingOneIp: 0 };
    g.sharedIps++;
    g.maxAccountsSharingOneIp = Math.max(g.maxAccountsSharingOneIp, w.connections.length);
    byGroup.set(w.rotationGroup, g);
    maxAccountsSharingOneIp = Math.max(maxAccountsSharingOneIp, w.connections.length);
  }

  return {
    summary: {
      windowStart: window.start,
      windowEnd: window.end,
      distinctEgressIps: Object.keys(byEgressIp).length,
      sharingByRotationGroup: [...byGroup.entries()].map(([rotationGroup, v]) => ({
        rotationGroup,
        sharedIps: v.sharedIps,
        maxAccountsSharingOneIp: v.maxAccountsSharingOneIp,
      })),
      maxAccountsSharingOneIp,
    },
    // Raw warnings carry IPs and labels — only ever rendered behind the
    // PROXY_LOG_INCLUDE_IPS opt-in (#10348), never in the summary itself.
    warnings: sharedWithinRotationGroup,
  };
}

/**
 * DB-backed: anonymous egress-sharing summary over the last
 * EGRESS_SHARING_WINDOW_MS of persisted proxy_logs (egress_ip is always
 * persisted even when the process log line is redacted). No live probes.
 * Single place where proxy_logs rows are mapped to EgressLogRow — the sweep
 * and the route both consume this helper. Reads all rows in the window (the
 * existing SELECT * has no LIMIT); bounded by the 24h window.
 */
export async function getRecentEgressSharingSummary(): Promise<{
  summary: EgressSharingSummary;
  warnings: EgressSharingWarning[];
}> {
  const { exportProxyLogsSince } = await import("./db/proxyLogs");
  const end = new Date();
  const start = new Date(end.getTime() - EGRESS_SHARING_WINDOW_MS);
  const rows: EgressLogRow[] = exportProxyLogsSince(start.toISOString()).map((r) => ({
    provider: (r.provider as string | null) ?? null,
    account: (r.account as string | null) ?? null,
    connectionId: (r.connection_id as string | null) ?? null,
    egressIp: (r.egress_ip as string | null) ?? null,
  }));
  return summarizeEgressSharing(rows, { start: start.toISOString(), end: end.toISOString() });
}

/**
 * Diagnose egress IPs for every OAuth connection: resolve each connection's
 * proxy, probe the real egress IP, and flag same-rotation-group IP sharing.
 */
export async function diagnoseAllEgressIps(deps?: {
  getConnections?: () => Promise<
    Array<{ id: string; provider: string; name?: string; email?: string; authType?: string }>
  >;
  resolveProxy?: (connectionId: string) => Promise<{ proxy?: unknown; level?: string } | null>;
}): Promise<EgressDiagnostic> {
  const getConnections =
    deps?.getConnections ??
    (async () => {
      const { getProviderConnections } = await import("@/lib/db/providers");
      return (await getProviderConnections({ authType: "oauth" })) as Array<{
        id: string;
        provider: string;
        name?: string;
        email?: string;
      }>;
    });
  const resolveProxy =
    deps?.resolveProxy ??
    (async (connectionId: string) => {
      const { resolveProxyForConnection } = await import("./db/settings");
      return resolveProxyForConnection(connectionId);
    });

  const conns = await getConnections();
  const results: ConnectionEgress[] = [];

  for (const c of conns) {
    const resolved = await resolveProxy(c.id);
    const proxyObj = (resolved?.proxy ?? null) as {
      type?: string;
      host?: string;
      port?: number | string;
    } | null;
    const proxyUrl = proxyObj ? proxyConfigToUrl(proxyObj) : null;
    const egress = await resolveEgressIp(proxyUrl);
    results.push({
      connectionId: c.id,
      provider: c.provider,
      account: c.email || c.name || c.id.slice(0, 8),
      proxyLevel: resolved?.level || "direct",
      proxyHost: proxyObj?.host ?? null,
      egressIp: egress.ip,
      ...(egress.error ? { error: egress.error } : {}),
    });
  }

  const { byEgressIp, sharedWithinRotationGroup } = analyzeEgressSharing(results);
  return { connections: results, byEgressIp, sharedWithinRotationGroup };
}

export interface ProxyValidationResult {
  proxyId: string;
  host: string;
  port: number | string;
  alive: boolean;
  egressIp: string | null;
  latencyMs: number;
  previousStatus: string | null;
  newStatus: string;
  preserved: boolean;
}

/**
 * Validate every proxy in the registry by probing its real egress IP, and
 * persist the result to `proxy_registry.status` (active/error). Combined with
 * PROXY_ALIVE_PREDICATE in resolution, a dead proxy is automatically taken out
 * of rotation — fixing the "all proxies marked active but actually dead" state
 * that left codex accounts falling back to the shared host /64 IP.
 *
 * Deps are injectable for tests.
 */
export async function validateProxyPool(deps?: {
  listProxies?: () => Promise<
    Array<{
      id: string;
      type: string;
      host: string;
      port: number | string;
      username?: string | null;
      password?: string | null;
      status?: string | null;
    }>
  >;
  markStatus?: (
    id: string,
    status: string,
    meta: { latencyMs: number; egressIp: string | null }
  ) => Promise<void>;
}): Promise<ProxyValidationResult[]> {
  const listProxies =
    deps?.listProxies ??
    (async () => {
      const { listProxies: real } = await import("./db/proxies");
      const result = await real({ includeSecrets: true });
      return result.items as Array<{
        id: string;
        type: string;
        host: string;
        port: number | string;
        username?: string | null;
        password?: string | null;
        status?: string | null;
      }>;
    });
  const markStatus =
    deps?.markStatus ??
    (async (id: string, status: string) => {
      const { updateProxy } = await import("./db/proxies");
      await updateProxy(id, { status });
    });

  const proxies = await listProxies();
  const report: ProxyValidationResult[] = [];

  for (const p of proxies) {
    const url = proxyConfigToUrl({
      type: p.type,
      host: p.host,
      port: p.port,
      username: p.username ?? undefined,
      password: p.password ?? undefined,
    });
    const probe = await resolveEgressIp(url, { force: true });
    const alive = !!probe.ip && !probe.error;
    // Operator/health statuses stay untouched by validation: the probe still
    // ran above, so the report keeps its alive/egressIp signal. The two-value
    // literal mirrors PROXY_ALIVE_PREDICATE in db/proxies/guards.ts; revisit if
    // the status registry is ever derived from a single shared source (part 2).
    const previous = (p.status ?? "").toLowerCase();
    if (previous === "inactive" || previous === "dead") {
      report.push({
        proxyId: p.id,
        host: p.host,
        port: p.port,
        alive,
        egressIp: probe.ip,
        latencyMs: probe.latencyMs,
        previousStatus: p.status ?? null,
        newStatus: p.status as string,
        preserved: true,
      });
      continue;
    }
    const newStatus: "active" | "error" = alive ? "active" : "error";
    await markStatus(p.id, newStatus, { latencyMs: probe.latencyMs, egressIp: probe.ip });
    report.push({
      proxyId: p.id,
      host: p.host,
      port: p.port,
      alive,
      egressIp: probe.ip,
      latencyMs: probe.latencyMs,
      previousStatus: p.status ?? null,
      newStatus,
      preserved: false,
    });
  }

  return report;
}

export interface DistributionPlan {
  assignments: Array<{ connectionId: string; account: string; proxyId: string }>;
  unassigned: Array<{ connectionId: string; account: string }>;
  sharingRisk: boolean;
  note: string;
}

/**
 * PURE: plan a 1-proxy-per-connection assignment so no two accounts of the same
 * rotation group share an egress IP (the codex anomaly trigger). Default is
 * strict 1:1 — extras are left UNASSIGNED (better unrouted than sharing an IP).
 * allowSharing=true round-robins instead, flagging sharingRisk.
 */
export function planProxyDistribution(
  connections: Array<{ id: string; account?: string }>,
  liveProxyIds: string[],
  opts: { allowSharing?: boolean } = {}
): DistributionPlan {
  const assignments: DistributionPlan["assignments"] = [];
  const unassigned: DistributionPlan["unassigned"] = [];
  let sharingRisk = false;

  connections.forEach((c, i) => {
    const account = c.account || c.id.slice(0, 8);
    if (liveProxyIds.length === 0) {
      unassigned.push({ connectionId: c.id, account });
      return;
    }
    if (opts.allowSharing) {
      assignments.push({
        connectionId: c.id,
        account,
        proxyId: liveProxyIds[i % liveProxyIds.length],
      });
    } else if (i < liveProxyIds.length) {
      assignments.push({ connectionId: c.id, account, proxyId: liveProxyIds[i] });
    } else {
      unassigned.push({ connectionId: c.id, account });
    }
  });

  if (opts.allowSharing && liveProxyIds.length < connections.length) sharingRisk = true;

  const note =
    liveProxyIds.length === 0
      ? "No live proxies available — add working proxies before distributing."
      : liveProxyIds.length < connections.length && !opts.allowSharing
        ? `Only ${liveProxyIds.length} live proxies for ${connections.length} accounts — ${unassigned.length} left unassigned (avoid shared-IP anomaly).`
        : "1 distinct proxy per account.";

  return { assignments, unassigned, sharingRisk, note };
}

/**
 * Apply a distribution plan: assign each proxy to its connection (account scope).
 */
export async function applyProxyDistribution(
  plan: DistributionPlan,
  deps?: { assign?: (connectionId: string, proxyId: string) => Promise<void> }
): Promise<{ applied: number }> {
  const assign =
    deps?.assign ??
    (async (connectionId: string, proxyId: string) => {
      const { assignProxyToScope } = await import("./db/proxies");
      await assignProxyToScope("account", connectionId, proxyId);
    });
  let applied = 0;
  for (const a of plan.assignments) {
    await assign(a.connectionId, a.proxyId);
    applied++;
  }
  return { applied };
}
