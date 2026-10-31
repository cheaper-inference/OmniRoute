/**
 * Proxy subscription service (Karing-style, operator-supplied).
 *
 * A subscription is a URL the operator pastes. We fetch + parse it into a pool
 * of proxy nodes, sync those nodes into `proxy_registry` (source='subscription',
 * subscription_id set), and bind the pool through the EXISTING scope resolution
 * (account/provider/global) — so subscriptions inherit rotation, health checks,
 * and the fail-closed guard for free.
 *
 * Modes:
 *   - 'global': pool bound to the global scope (all provider traffic proxied).
 *   - 'rule':   pool bound only to the selected provider scopes (others direct).
 *
 * Protocol support:
 *   - http/https/socks5 nodes are used directly.
 *   - ss/vmess/vless/trojan/tuic/hysteria/wireguard nodes need a local proxy
 *     core (sing-box/clash) exposing a SOCKS5/HTTP endpoint; supply it via
 *     `localCoreEndpoint` and we bind that single endpoint (the core does the
 *     protocol translation + node selection). Without it, those nodes are
 *     reported but not routed.
 */
import { randomUUID } from "crypto";
import fs from "node:fs";
import { getDbInstance } from "../db/core";
import { backupDbFile } from "../db/backup";
import { encrypt } from "../db/encryption";
import { clearCoreReloadState, resolveRecordReloadMode } from "./coreConfig/reload";
import {
  generateCoreConfigIntention,
  generateCoreConfigIntentionMulti,
  mergeParsedSources,
} from "./coreConfig/sync";
import { reloadAfterReplace } from "./reloadSecret";
import { addProxiesToScopePool, bumpProxyRegistryGeneration } from "../db/proxies";
import { bumpProxyConfigGeneration } from "../db/settings";
import { isSubscriptionDue, isFeedlessSubscription, feedlessSyncResult } from "./due";
import { parseLocalCoreEndpoints } from "./coreEndpoint";
import { detachOrDeleteSubscriptionRow, removeStaleSubscriptionNodes } from "./staleNodes";
import { throwIfFeedlessUpdate, throwIfFeedlessWithoutControl } from "./schema";
import { resolveTargetScopes } from "./scopes";
import { clampSelectorGapSeconds, setAnyControlUrlConfigured } from "./selectorTrigger";
import { SELECTOR_TAG_RE, parseSelectorTag } from "./selectorEndpoint";
import { removeSubscriptionSideFiles } from "./coreConfig/apply";
import {
  isSubscriptionFetchUrlAllowed,
  isIpLiteral,
  isAnyResolvedAddressBlocked,
  type FetchGuardOptions,
} from "./fetchGuard";
import { areLocalProviderUrlsAllowed } from "@/shared/network/outboundUrlGuardPolicy";
import { withRetry } from "./fetchRetry";
import { redactedNodeSummary, type ParsedSubscription } from "./parse";
import { coerceMirrorUrls, parseMirrorUrls, restoreRedactedMirrors } from "./mirrorUrls";
import { insertSubscriptionRow, updateSubscriptionRow } from "./subscriptionRows";
import { fetchSubscriptionFeeds, type SubscriptionFeed } from "./multiSource";
import { subscriptionColumns } from "./subscriptionColumns";
import { upsertUnionPool } from "./unionPool";

export type ProxySubscriptionMode = "global" | "rule";
export type ProxySubscriptionStatus = "ok" | "error" | "empty";

export type { ProxySubscriptionErrorCode } from "./subscriptionErrorCode";
import { subscriptionErrorCode } from "./subscriptionErrorCode";
export { subscriptionErrorCode };

import type { CoreReloadMode as CoreReloadModeValue } from "./coreConfig/reload";
export type { CoreReloadModeValue };

export interface SelectorLastSwitchEntry {
  at: string;
  result: string;
  member: string | null;
  kind: string | null;
}

export interface ProxySubscriptionRecord {
  id: string;
  name: string;
  url: string;
  mirrorUrls: string[];
  enabled: boolean;
  mode: ProxySubscriptionMode;
  ruleProviders: string[] | null;
  localCoreEndpoint: string | null;
  updateIntervalMinutes: number;
  controlUrl: string | null;
  coreConfigPath: string | null;
  hasControlSecret: boolean;
  selectorMinGapSeconds: number;
  selectorLastSwitchAt: string | null;
  selectorLastSwitchResult: string | null;
  selectorLastSwitchMember: string | null;
  selectorLastSwitchKind: string | null;
  selectorLastSwitchBySelector: Record<string, SelectorLastSwitchEntry> | null;
  coreReloadMode: CoreReloadModeValue;
  lastFetchedAt: string | null;
  status: ProxySubscriptionStatus;
  error: string | null;
  lastNodes: unknown[] | null;
  lastErrorAt: string | null;
  consecutiveFailures: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProxySubscriptionPayload {
  name: string;
  url: string;
  mirrorUrls?: string[] | null;
  enabled?: boolean;
  mode?: ProxySubscriptionMode;
  ruleProviders?: string[] | null;
  localCoreEndpoint?: string | null;
  updateIntervalMinutes?: number;
  controlUrl?: string | null;
  coreConfigPath?: string | null;
  controlSecret?: string | null;
  selectorMinGapSeconds?: number;
}

export interface SyncResult {
  subscriptionId: string;
  nodes: number;
  needsCore: number;
  boundProxies: number;
  status: ProxySubscriptionStatus;
  error: string | null;
  applied: boolean;
}

const SUBSCRIPTION_FETCH_TIMEOUT_MS = 15_000;

// ───────────────────────────── Row mapping ─────────────────────────────

function readSelectorBase(r: Record<string, unknown>): {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
} {
  return {
    id: typeof r.id === "string" ? r.id : "",
    name: typeof r.name === "string" ? r.name : "",
    url: typeof r.url === "string" ? r.url : "",
    enabled: Number(r.enabled) !== 0,
  };
}

/** Narrow one raw trace entry to the stored shape. Never throws. */
function asSelectorLastSwitchEntry(tag: string, entry: unknown): SelectorLastSwitchEntry | null {
  if (!SELECTOR_TAG_RE.test(tag)) return null;
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const e = entry as Record<string, unknown>;
  if (typeof e.at !== "string" || typeof e.result !== "string") return null;
  return {
    at: e.at,
    result: e.result,
    member: typeof e.member === "string" ? e.member : null,
    kind: typeof e.kind === "string" ? e.kind : null,
  };
}

/** Parse the per-selector switch trace column. Invalid JSON or keys
 * outside the selector tag shape are dropped, never thrown. */
export function parseSelectorLastSwitchBySelector(
  value: unknown
): Record<string, SelectorLastSwitchEntry> | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const out: Record<string, SelectorLastSwitchEntry> = {};
    for (const [tag, entry] of Object.entries(parsed as Record<string, unknown>)) {
      const kept = asSelectorLastSwitchEntry(tag, entry);
      if (kept) out[tag] = kept;
    }
    return out;
  } catch {
    return null;
  }
}

/** Tags of the subscription's `localCoreEndpoint` lines (same parser as the
 * switch trigger, so the stored keys stay bounded to the declared lines). */
export function selectorTagsForEndpoint(field: string | null): string[] {
  const tags: string[] = [];
  for (const line of parseLocalCoreEndpoints(field ?? null)) {
    const tag = parseSelectorTag(line);
    if (tag && !tags.includes(tag)) tags.push(tag);
  }
  return tags;
}

function readControlMeta(r: Record<string, unknown>): {
  controlUrl: string | null;
  coreConfigPath: string | null;
  hasControlSecret: boolean;
  selectorMinGapSeconds: number;
  selectorLastSwitchAt: string | null;
  selectorLastSwitchResult: string | null;
  selectorLastSwitchMember: string | null;
  selectorLastSwitchKind: string | null;
  selectorLastSwitchBySelector: Record<string, SelectorLastSwitchEntry> | null;
} {
  // control_secret_enc is write-only: exposed only as a presence bit, never
  // in clear. Any future writer of control_url MUST update the selector
  // trigger cache (selectorTrigger.setAnyControlUrlConfigured).
  return {
    controlUrl: typeof r.control_url === "string" ? r.control_url : null,
    coreConfigPath: typeof r.core_config_path === "string" ? r.core_config_path : null,
    hasControlSecret: typeof r.control_secret_enc === "string" && r.control_secret_enc.length > 0,
    selectorMinGapSeconds: clampSelectorGapSeconds(r.selector_min_gap_seconds),
    selectorLastSwitchAt:
      typeof r.selector_last_switch_at === "string" ? r.selector_last_switch_at : null,
    selectorLastSwitchResult:
      typeof r.selector_last_switch_result === "string" ? r.selector_last_switch_result : null,
    selectorLastSwitchMember:
      typeof r.selector_last_switch_member === "string" ? r.selector_last_switch_member : null,
    selectorLastSwitchKind:
      typeof r.selector_last_switch_kind === "string" ? r.selector_last_switch_kind : null,
    selectorLastSwitchBySelector: parseSelectorLastSwitchBySelector(
      r.selector_last_switch_by_selector
    ),
  };
}

function mapSubscriptionRow(row: unknown): ProxySubscriptionRecord {
  const r = (row && typeof row === "object" ? row : {}) as Record<string, unknown>;
  const parseList = (v: unknown): string[] | null => {
    if (typeof v !== "string" || !v.trim()) return null;
    try {
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : null;
    } catch {
      return null;
    }
  };
  const parseNodes = (v: unknown): unknown[] | null => {
    if (typeof v !== "string" || !v.trim()) return null;
    try {
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr : null;
    } catch {
      return null;
    }
  };
  return {
    ...readSelectorBase(r),
    ...readControlMeta(r),
    mirrorUrls: parseMirrorUrls((r as Record<string, unknown>).mirror_urls),
    coreReloadMode: resolveRecordReloadMode(r),
    mode: r.mode === "rule" ? "rule" : "global",
    ruleProviders: parseList(r.rule_providers),
    localCoreEndpoint: typeof r.local_core_endpoint === "string" ? r.local_core_endpoint : null,
    updateIntervalMinutes: Number(r.update_interval_minutes) || 60,
    lastFetchedAt: typeof r.last_fetched_at === "string" ? r.last_fetched_at : null,
    status: (r.status as ProxySubscriptionStatus) || "empty",
    error: typeof r.error === "string" ? r.error : null,
    lastNodes: parseNodes(r.last_nodes),
    lastErrorAt: typeof r.last_error_at === "string" ? r.last_error_at : null,
    consecutiveFailures: Number(r.consecutive_failures) || 0,
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

// ───────────────────────────── CRUD ─────────────────────────────

export async function listSubscriptions(): Promise<ProxySubscriptionRecord[]> {
  const db = getDbInstance();
  const columns = subscriptionColumns(db);
  const rows = db
    .prepare(
      `SELECT ${columns} FROM proxy_subscriptions ORDER BY datetime(updated_at) DESC, name ASC`
    )
    .all();
  return rows.map(mapSubscriptionRow);
}

export async function getSubscriptionById(id: string): Promise<ProxySubscriptionRecord | null> {
  const db = getDbInstance();
  const columns = subscriptionColumns(db);
  const row = db.prepare(`SELECT ${columns} FROM proxy_subscriptions WHERE id = ?`).get(id);
  return row ? mapSubscriptionRow(row) : null;
}

export async function createSubscription(
  payload: ProxySubscriptionPayload
): Promise<ProxySubscriptionRecord> {
  const id = randomUUID();
  const now = new Date().toISOString();
  const enabled = payload.enabled === true ? 1 : 0;
  const db = getDbInstance();
  const controlUrl = payload.controlUrl ?? null;
  throwIfFeedlessWithoutControl(payload.url, controlUrl);
  const coreConfigPath = payload.coreConfigPath ?? null;
  const controlSecretEnc = encryptSecretField(payload.controlSecret) ?? null;
  const gapSeconds = clampSelectorGapSeconds(payload.selectorMinGapSeconds ?? 60);
  insertSubscriptionRow(db, {
    id,
    name: payload.name,
    url: payload.url,
    mirrorUrls: coerceMirrorUrls(payload.mirrorUrls ?? null, payload.url),
    enabled,
    mode: payload.mode || "global",
    ruleProviders: payload.ruleProviders ?? null,
    localCoreEndpoint: payload.localCoreEndpoint || null,
    updateIntervalMinutes: payload.updateIntervalMinutes || 60,
    controlUrl,
    coreConfigPath,
    gapSeconds,
    now,
    controlSecretEnc,
  });
  if (controlUrl) setAnyControlUrlConfigured(true);
  const created = (await getSubscriptionById(id))!;
  if (created.enabled && !isFeedlessSubscription(created.url)) {
    await syncSubscription(id);
  }
  // Re-read so the returned record reflects the post-sync status/error/lastNodes.
  return (await getSubscriptionById(id))!;
}

function readControlFields(
  payload: Partial<ProxySubscriptionPayload>,
  existing: ProxySubscriptionRecord
): { controlUrl: string | null; gapSeconds: number } {
  return {
    controlUrl: payload.controlUrl !== undefined ? payload.controlUrl : existing.controlUrl,
    gapSeconds: clampSelectorGapSeconds(
      payload.selectorMinGapSeconds ?? existing.selectorMinGapSeconds
    ),
  };
}

function encryptSecretField(secret: string | null | undefined): string | null | undefined {
  if (secret === undefined) return undefined;
  return secret != null && secret.length > 0 ? ((encrypt(secret) ?? null) as string | null) : null;
}

function persistSubscriptionRow(
  db: Parameters<typeof updateSubscriptionRow>[0],
  args: {
    id: string;
    existing: ProxySubscriptionRecord;
    payload: Partial<ProxySubscriptionPayload>;
    controlUrl: string | null;
    gapSeconds: number;
    now: string;
  }
): void {
  const { existing, payload } = args;
  const enabled =
    payload.enabled !== undefined ? (payload.enabled ? 1 : 0) : existing.enabled ? 1 : 0;
  // The SET lists ONLY the columns this writer owns plus the three
  // selector-control columns, the opt-in core-config path and the opt-in
  // mirror feed list — every other column is untouched (byte-identical off
  // opt-in). Secret is write-only: payload.controlSecret replaces
  // control_secret_enc when present (encrypt at rest); absent leaves it.
  // Mirrors coerce against the effective primary URL; absent leaves them.
  const nextUrl = payload.url ?? existing.url;
  updateSubscriptionRow(db, {
    id: args.id,
    name: payload.name ?? existing.name,
    url: nextUrl,
    mirrorUrls:
      payload.mirrorUrls !== undefined
        ? coerceMirrorUrls(restoreRedactedMirrors(payload.mirrorUrls, existing.mirrorUrls), nextUrl)
        : existing.mirrorUrls,
    enabled,
    mode: payload.mode ?? existing.mode,
    ruleProviders:
      payload.ruleProviders !== undefined ? payload.ruleProviders : existing.ruleProviders,
    localCoreEndpoint:
      payload.localCoreEndpoint !== undefined
        ? payload.localCoreEndpoint
        : existing.localCoreEndpoint,
    updateIntervalMinutes: payload.updateIntervalMinutes ?? existing.updateIntervalMinutes,
    controlUrl: args.controlUrl,
    coreConfigPath:
      payload.coreConfigPath !== undefined ? payload.coreConfigPath : existing.coreConfigPath,
    controlSecretEnc: encryptSecretField(payload.controlSecret),
    gapSeconds: args.gapSeconds,
    now: args.now,
  });
}

async function refreshAfterUpdate(
  id: string,
  payload: Partial<ProxySubscriptionPayload>,
  enabledChanged: boolean
): Promise<ProxySubscriptionRecord | null> {
  const updated = (await getSubscriptionById(id))!;
  // Re-evaluate binding.
  if (updated.enabled) {
    if (payload.mode !== undefined || payload.ruleProviders !== undefined) {
      // Routing targets changed: detach from the old scopes first, then
      // re-fetch + bind to the new targets. applySubscription is idempotent per
      // scope, but a global→rule switch must drop the previous global binding.
      await unapplySubscription(id);
      await syncSubscription(id);
    } else if (
      enabledChanged ||
      payload.url !== undefined ||
      payload.mirrorUrls !== undefined ||
      payload.localCoreEndpoint !== undefined ||
      payload.coreConfigPath !== undefined
    ) {
      // Same scopes: just refresh nodes (re-applies idempotently to same scopes).
      await syncSubscription(id);
    }
  } else {
    // Disabled: detach everything.
    await unapplySubscription(id);
  }
  return getSubscriptionById(id);
}

export async function updateSubscription(
  id: string,
  payload: Partial<ProxySubscriptionPayload>
): Promise<ProxySubscriptionRecord | null> {
  const existing = await getSubscriptionById(id);
  if (!existing) return null;
  const db = getDbInstance();
  const { controlUrl, gapSeconds } = readControlFields(payload, existing);
  const now = new Date().toISOString();
  throwIfFeedlessUpdate(payload, existing);
  const enabledChanged = payload.enabled !== undefined && payload.enabled !== existing.enabled;
  persistSubscriptionRow(db, {
    id,
    existing,
    payload,
    controlUrl,
    gapSeconds,
    now,
  });
  // Cache maintenance: any control_url write refreshes the
  // process cache so the pre-DB guard stays correct.
  if (payload.controlUrl !== undefined) {
    setAnyControlUrlConfigured(controlUrl ? true : null);
  }
  return refreshAfterUpdate(id, payload, enabledChanged);
}

export async function setSubscriptionEnabled(
  id: string,
  enabled: boolean
): Promise<ProxySubscriptionRecord | null> {
  return updateSubscription(id, { enabled });
}

export async function deleteSubscription(id: string): Promise<boolean> {
  await unapplySubscription(id);
  // Remove subscription-sourced proxy rows (force-clears their assignments).
  const db = getDbInstance();
  const doomed = db
    .prepare("SELECT core_config_path FROM proxy_subscriptions WHERE id = ?")
    .get(id) as { core_config_path?: unknown } | undefined;
  const rows = db
    .prepare("SELECT id, source FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ id: string; source: string }>;
  for (const r of rows) {
    try {
      await detachOrDeleteSubscriptionRow(r);
    } catch {
      // ignore individual failures
    }
  }
  clearCoreReloadState(id);
  const res = db.prepare("DELETE FROM proxy_subscriptions WHERE id = ?").run(id);
  // Best-effort: remove the side files this subscription owned. A missing
  // or locked file must not fail the delete (row already gone).
  if (typeof doomed?.core_config_path === "string") {
    removeSubscriptionSideFiles(fs, doomed.core_config_path, id);
  }
  // Cache maintenance: a delete may have removed the last
  // control_url — reset to lazy so the next trigger re-reads (never stale-true).
  if (res.changes > 0) setAnyControlUrlConfigured(null);
  await recomputeProxyEnabled();
  return res.changes > 0;
}

// ───────────────────────────── Scope resolution ─────────────────────────────

// ───────────────────────────── Sync + apply ─────────────────────────────

/**
 * Refuse to fetch a subscription URL unless it is http/https to an allowed
 * host. IP literals are checked structurally; hostnames are resolved and the
 * resolved addresses are re-checked (fail closed on resolution errors).
 *
 * Local-first (#10158): loopback/private fetch targets are ALLOWED when
 * `areLocalProviderUrlsAllowed()` is on (default ON — same local-first policy
 * already used for provider validation, and consistent with
 * `coreEndpoint.ts` already permitting a loopback routing core). Cloud
 * metadata / link-local (169.254.0.0/16, incl. 169.254.169.254 IMDS) is
 * blocked UNCONDITIONALLY regardless of that flag.
 */
async function assertSafeFetchTarget(url: string): Promise<void> {
  const guardOpts: FetchGuardOptions = { allowLocal: areLocalProviderUrlsAllowed() };
  if (!isSubscriptionFetchUrlAllowed(url, guardOpts)) {
    throw new Error("Subscription URL is not allowed (scheme or host blocked)");
  }
  const host = new URL(url).hostname.toLowerCase();
  const bare = host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
  if (!isIpLiteral(bare)) {
    // Hostname: resolve ALL records and refuse if ANY address is internal
    // (fail closed). A hostname can resolve to multiple records; checking only
    // the first would let an internal IP slip through if a public record also
    // exists. `lookup(..., { all: true })` returns every A/AAAA record.
    try {
      const dns = await import("node:dns");
      const addrs = await dns.promises.lookup(bare, { all: true });
      if (isAnyResolvedAddressBlocked(addrs, guardOpts)) {
        throw new Error("Subscription host resolves to a blocked (internal) address");
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes("blocked")) throw e;
      throw new Error(`Subscription host resolution failed: ${e instanceof Error ? e.message : e}`);
    }
  }
}

/**
 * Single fetch attempt: SSRF-validate the target, fetch with manual redirect
 * handling, and re-validate any redirect target. Throws on non-2xx or a
 * blocked target. Each attempt owns its own timeout so a retry after a fast
 * failure isn't killed by the previous attempt's timer.
 */
async function doSafeFetch(url: string, headers: Record<string, string>): Promise<string> {
  await assertSafeFetchTarget(url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SUBSCRIPTION_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: "manual", signal: controller.signal, headers });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new Error("Subscription fetch redirected without Location");
      // Resolve relative redirects and re-validate the target (SSRF guard).
      const next = new URL(loc, url).toString();
      await assertSafeFetchTarget(next);
      const res2 = await fetch(next, { redirect: "manual", signal: controller.signal, headers });
      if (res2.status >= 300 && res2.status < 400) {
        throw new Error("Subscription fetch: too many redirects");
      }
      if (!res2.ok) {
        throw new Error(`Subscription fetch failed: HTTP ${res2.status}`);
      }
      return await res2.text();
    }
    if (!res.ok) {
      throw new Error(`Subscription fetch failed: HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Classify a fetch error as retryable. Transient (retry): network/timeout/DNS
 * failures, HTTP 5xx, and HTTP 429. Permanent (no retry): 4xx client errors
 * (except 429) and any SSRF-guard block — those will never succeed on retry.
 */
function isSubscriptionFetchRetryable(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg.includes("not allowed") || msg.includes("blocked (internal)")) return false;
  const m = msg.match(/HTTP (\d{3})/);
  if (m) {
    const code = Number(m[1]);
    if (code === 429) return true;
    if (code >= 500 && code < 600) return true;
    return false; // 4xx (except 429) — permanent client error
  }
  return true; // network error / timeout / DNS failure — transient
}

async function fetchSubscriptionContent(url: string): Promise<string> {
  const headers = { "User-Agent": "OmniRoute-ProxySubscription" };
  // Retry transient failures (timeouts, 5xx, 429) with bounded exponential
  // backoff; give up fast on permanent errors (4xx, SSRF block).
  return withRetry(() => doSafeFetch(url, headers), {
    maxAttempts: 3,
    baseDelayMs: 500,
    maxDelayMs: 5000,
    isRetryable: isSubscriptionFetchRetryable,
  });
}

// Total refusal: every feed unfetched or unrecognized. Zero writes, the
// persisted last-known-good nodes stay. Single-feed rows keep the exact
// historical error shape (`Fetch failed: …` vs NO_USABLE_NODES); multi-feed
// totals always report NO_USABLE_NODES. Returns null when at least one feed
// is healthy (no refusal).
async function refuseWhenAllFeedsFailed(
  id: string,
  sub: ProxySubscriptionRecord,
  feeds: SubscriptionFeed[],
  healthy: SubscriptionFeed[]
): Promise<SyncResult | null> {
  if (healthy.length > 0) return null;
  const singleFetchError = feeds.length === 1 && feeds[0].fetchFailed ? feeds[0].error : undefined;
  const refuseError = singleFetchError
    ? `Fetch failed: ${singleFetchError}`
    : subscriptionErrorCode("NO_USABLE_NODES");
  const invalidConsec = (sub.consecutiveFailures || 0) + 1;
  await updateSubscriptionStatus(
    id,
    "error",
    refuseError,
    sub.lastNodes,
    new Date().toISOString(),
    invalidConsec
  );
  return {
    subscriptionId: id,
    nodes: 0,
    needsCore: 0,
    boundProxies: 0,
    status: "error",
    error: refuseError,
    applied: false,
  };
}

interface UnionWrites {
  keptIds: string[];
  warning: string | null;
  failed: SyncResult | null;
}

// The upsert loop + stale-removal are the multi-write section. upsertProxy /
// deleteProxyById each run their own internal db.transaction, so each write
// is atomic, and a re-sync is idempotent (self-heals partial state). A single
// outer db.transaction around `await` calls would NOT be atomic under
// better-sqlite3, so instead we guard against an unexpected DB error so a
// half-completed sync can never be left flagged "ok".
async function syncUnionWrites(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  sub: ProxySubscriptionRecord,
  parsed: ParsedSubscription,
  partial: boolean
): Promise<UnionWrites> {
  try {
    const outcome = await upsertUnionPool(
      id,
      { name: sub.name, localCoreEndpoint: sub.localCoreEndpoint },
      parsed.nodes,
      parsed.needsCore
    );
    // Remove stale subscription nodes no longer present in the fetched set.
    // A disabled subscription keeps its rows: the refresh still upserts the
    // fetched nodes as a preview, but skips stale removal while disabled.
    // A partial fetch (some feeds unavailable) defers removal too: the
    // unavailable feeds keep their last nodes until every feed answers again,
    // so a mirror that drops out for one cycle doesn't churn its rows.
    if (sub.enabled && !partial) {
      await removeStaleSubscriptionNodes(db, id, outcome.keptIds);
    } else if (sub.enabled) {
      console.warn(`[ProxySubscription] stale removal deferred for ${id}: some feeds unavailable`);
    }
    return { keptIds: outcome.keptIds, warning: outcome.warning, failed: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const writeConsec = (sub.consecutiveFailures || 0) + 1;
    await updateSubscriptionStatus(
      id,
      "error",
      `Sync write failed: ${msg}`,
      sub.lastNodes,
      new Date().toISOString(),
      writeConsec
    );
    return {
      keptIds: [],
      warning: null,
      failed: {
        subscriptionId: id,
        nodes: 0,
        needsCore: 0,
        boundProxies: 0,
        status: "error",
        error: msg,
        applied: false,
      },
    };
  }
}

/** Fetch + parse + sync nodes into proxy_registry, then (if enabled) (re)bind. */
async function syncSubscriptionUnsafe(id: string): Promise<SyncResult> {
  const sub = await getSubscriptionById(id);
  if (!sub) {
    return {
      subscriptionId: id,
      nodes: 0,
      needsCore: 0,
      boundProxies: 0,
      status: "error",
      error: "not found",
      applied: false,
    };
  }
  const feedless = feedlessSyncResult(sub);
  if (feedless) return { subscriptionId: id, ...feedless };

  // One feed per URL, fetched concurrently: the primary plus every mirror.
  // A slow or failing feed never blocks the others; fetch failures arrive
  // as unusable content and the merge gate below isolates them per source.
  const feeds: SubscriptionFeed[] = await fetchSubscriptionFeeds(sub, fetchSubscriptionContent);
  const parsedList: ParsedSubscription[] = feeds.map((feed) => feed.parsed);

  // Refuse unrecognized content before any registry write: an invalid or
  // temporarily broken feed must never empty the pool. With mirrors, only a
  // total failure refuses (every feed unfetched or unrecognized); a partial
  // failure syncs the union of the healthy feeds and keeps the unavailable
  // feeds' last nodes (stale removal waits for a complete fetch). Serve the
  // persisted last-known-good nodes on total refusal and leave every
  // registry row untouched.
  const healthy = feeds.filter((feed) => feed.ok);
  const refused = await refuseWhenAllFeedsFailed(id, sub, feeds, healthy);
  if (refused) return refused;

  // Union of the healthy feeds, deduplicated first-arrival-wins (primary
  // first): the same list feeds the pool upserts below and the file
  // generation further down, so pool and beside-file never diverge.
  // lastNodes stores the union summary; per-source skips stay server-side.
  const merged = mergeParsedSources(healthy.map((feed) => feed.parsed));
  const parsed: ParsedSubscription = {
    nodes: merged.nodes,
    needsCore: merged.needsCore,
    format: healthy[0].parsed.format,
  };
  const outcome = await syncUnionWrites(
    getDbInstance(),
    id,
    sub,
    parsed,
    healthy.length < feeds.length
  );
  if (outcome.failed) return outcome.failed;
  let warning = outcome.warning;
  const keptIds = outcome.keptIds;

  const lastNodes = redactedNodeSummary(parsed);

  // Opt-in core-config generation. Without OMNIROUTE_PROXY_CORE_BINARY_PATH
  // the beside-file is written directly, never the adopted file. With it, the rendered
  // text is verified with the native check before replacing the adopted
  // file (miss → beside-file + warning). Skipped when an earlier warning
  // already owns the `error` column — the skip is logged server-side so a
  // stale beside-file never goes silent. Multi-feed rows render through the
  // multi gate (same union list, per-source isolation in the log); single
  // feeds keep the historical mono path byte-identical.
  warning = await resolveGenerationWarning(sub, id, parsed, parsedList, warning);

  // A failed control-call switch leaves a standing warning on the
  // subscription: the sync rewrites `error` from its own `warning` alone, so
  // without this merge the switch outcome would vanish on the next refresh.
  // A successful switch clears it. Status is never touched here — a warning
  // rides on `status = "ok"` with an `error` code. Rows with no bound pool
  // (`keptIds` empty) resolve to a sync error below; the switch columns still
  // feed the UI, and the standing warning is preserved through it.
  const switchWarning = readStaleSwitchWarning(id);
  if (!warning && switchWarning) warning = switchWarning;

  // Determine status. A standing switch warning never flips the status:
  // rows with a bound pool stay "ok" with the warning code, rows with no
  // bound pool keep their sync error (the switch outcome stays readable
  // through the dedicated columns either way).
  const { status, error } = resolveSyncStatus(parsed, keptIds, warning);

  // Reset the consecutive-failure counter on a successful (ok/empty) sync; bump
  // it on error. Record the error timestamp only when there is an error.
  const isErr = status === "error";
  const newConsec = isErr ? (sub.consecutiveFailures || 0) + 1 : 0;
  const errAt = isErr ? new Date().toISOString() : null;
  await updateSubscriptionStatus(id, status, error, lastNodes, errAt, newConsec);

  // Bind if enabled.
  let applied = false;
  let boundProxies = 0;
  if (sub.enabled && keptIds.length > 0) {
    await applySubscription(id);
    applied = true;
    boundProxies = keptIds.length;
  }

  // Ensure the background auto-refresh ticker is running once any subscription
  // has actually synced. startSubscriptionScheduler is idempotent and a no-op
  // in the browser and in NODE_ENV=test.
  startSubscriptionScheduler();

  return {
    subscriptionId: id,
    nodes: parsed.nodes.length,
    needsCore: parsed.needsCore.length,
    boundProxies,
    status,
    error,
    applied,
  };
}

// Opt-in core-config generation: beside-file directly, or native-checked
// replace when the host configures a core binary. Skipped when an earlier
// warning already owns the `error` column (logged server-side). Multi-feed
// rows render through the multi gate (same union list, per-source
// isolation in the log); single feeds keep the historical mono path.
async function resolveGenerationWarning(
  sub: ProxySubscriptionRecord,
  id: string,
  parsed: ParsedSubscription,
  parsedList: ParsedSubscription[],
  warning: string | null
): Promise<string | null> {
  if (!sub.coreConfigPath) return warning;
  if (warning) {
    console.warn(`[ProxySubscription] core config generation skipped for ${id}`);
    return warning;
  }
  const intention =
    parsedList.length > 1
      ? await generateCoreConfigIntentionMulti({ ...sub, id }, parsedList)
      : await generateCoreConfigIntention({ ...sub, id }, parsed);
  if (intention.warning) return intention.warning;
  if (intention.status === "replaced" && intention.digestChanged)
    return reloadAfterReplace(id, sub.controlUrl, intention.configPath);
  return warning;
}

// Determine status. A standing switch warning never flips the status:
// rows with a bound pool stay "ok" with the warning code, rows with no
// bound pool keep their sync error (the switch outcome stays readable
// through the dedicated columns either way).
function resolveSyncStatus(
  parsed: ParsedSubscription,
  keptIds: string[],
  warning: string | null
): { status: ProxySubscriptionStatus; error: string | null } {
  if (keptIds.length === 0) {
    return { status: "error", error: warning || subscriptionErrorCode("NO_USABLE_NODES") };
  }
  if (warning) return { status: "ok", error: warning };
  const empty = parsed.nodes.length === 0 && parsed.needsCore.length === 0;
  return { status: empty ? "empty" : "ok", error: warning };
}

// Deduplicate concurrent syncs for the same subscription. A manual refresh and
// the scheduled ticker can otherwise fire `syncSubscription` for the same id at
// the same time and race on the upsert / stale-removal writes.
const syncInFlight = new Map<string, Promise<SyncResult>>();

/** Public entry point: de-dupes concurrent syncs, then runs the unsafe body. */
export async function syncSubscription(id: string): Promise<SyncResult> {
  const existing = syncInFlight.get(id);
  if (existing) return existing;
  const run = syncSubscriptionUnsafe(id).finally(() => {
    syncInFlight.delete(id);
  });
  syncInFlight.set(id, run);
  return run;
}

/** Read the standing switch-failure warning for a subscription, if any.
 * Returns a `SELECTOR_SWITCH_FAILED` error code while the last recorded
 * switch result is a failure, null otherwise (no record, or last was "ok").
 * Never throws (missing columns on old DBs → null). */
export function readStaleSwitchWarning(subscriptionId: string): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT selector_last_switch_result FROM proxy_subscriptions WHERE id = ?")
      .get(subscriptionId) as { selector_last_switch_result?: unknown } | undefined;
    const result =
      typeof row?.selector_last_switch_result === "string" ? row.selector_last_switch_result : null;
    if (!result || result === "ok" || result === "throttled") return null;
    return subscriptionErrorCode("SELECTOR_SWITCH_FAILED", result);
  } catch {
    return null;
  }
}

/** Merge one selector entry into the stored trace map, keeping only the
 * subscription's current line tags plus the written selector. Never throws. */
function mergeSelectorSwitchEntry(
  stored: Record<string, SelectorLastSwitchEntry> | null,
  tags: Set<string>,
  selector: string,
  entry: SelectorLastSwitchEntry
): string | null {
  try {
    const next: Record<string, SelectorLastSwitchEntry> = {};
    if (stored) {
      for (const [tag, kept] of Object.entries(stored)) {
        if (tags.has(tag)) next[tag] = kept;
      }
    }
    next[selector] = entry;
    return JSON.stringify(next);
  } catch {
    return null;
  }
}

/** Record a switch outcome on the subscription row (columns from the
 * selector-control migration). On failure also sets `error` directly —
 * without touching `status` — so the warning shows before the next sync.
 * The kind (the refusal motive that fired the switch) is recorded on both
 * outcomes: a failed attempt still documents why it was tried. Never throws. */
export async function recordSelectorSwitchOutcome(args: {
  subscriptionId: string;
  selector: string;
  result: string;
  member?: string | null;
  kind?: string | null;
}): Promise<void> {
  try {
    const db = getDbInstance();
    const now = new Date().toISOString();
    // Merge the per-selector entry into the stored map, bounded to the
    // subscription's current line tags: a tag removed from the lines drops
    // out on the next write, so the map never grows past the declared lines.
    let merged: string | null = null;
    try {
      const current = db
        .prepare(
          "SELECT selector_last_switch_by_selector, local_core_endpoint FROM proxy_subscriptions WHERE id = ?"
        )
        .get(args.subscriptionId) as
        { selector_last_switch_by_selector?: unknown; local_core_endpoint?: unknown } | undefined;
      if (current) {
        const stored = parseSelectorLastSwitchBySelector(current.selector_last_switch_by_selector);
        const tags = new Set(
          selectorTagsForEndpoint(
            typeof current.local_core_endpoint === "string" ? current.local_core_endpoint : null
          )
        );
        tags.add(args.selector);
        merged = mergeSelectorSwitchEntry(stored, tags, args.selector, {
          at: now,
          result: args.result,
          member: args.member ?? null,
          kind: args.kind ?? null,
        });
      }
    } catch {
      merged = null;
    }
    db.prepare(
      `UPDATE proxy_subscriptions
          SET selector_last_switch_at = ?, selector_last_switch_result = ?,
              selector_last_switch_member = ?, selector_last_switch_kind = ?,
              selector_last_switch_by_selector = ?, updated_at = ?
        WHERE id = ?`
    ).run(
      now,
      args.result,
      args.member ?? null,
      args.kind ?? null,
      merged,
      now,
      args.subscriptionId
    );
    if (args.result !== "ok" && args.result !== "throttled") {
      db.prepare(
        `UPDATE proxy_subscriptions SET error = ?, updated_at = ? WHERE id = ? AND status = 'ok'`
      ).run(subscriptionErrorCode("SELECTOR_SWITCH_FAILED", args.result), now, args.subscriptionId);
    }
  } catch {
    // best-effort: the switch outcome must never break the request path
  }
}

async function updateSubscriptionStatus(
  id: string,
  status: ProxySubscriptionStatus,
  error: string | null,
  lastNodes: unknown[] | null,
  lastErrorAt: string | null,
  consecutiveFailures: number
): Promise<void> {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE proxy_subscriptions SET status = ?, error = ?, last_nodes = ?, last_fetched_at = ?, last_error_at = ?, consecutive_failures = ?, updated_at = ? WHERE id = ?`
  ).run(
    status,
    error,
    lastNodes ? JSON.stringify(lastNodes) : null,
    now,
    lastErrorAt,
    consecutiveFailures,
    now,
    id
  );
}

/** Bind the subscription's synced proxy pool into the target scope(s). */
export async function applySubscription(id: string): Promise<void> {
  const sub = await getSubscriptionById(id);
  if (!sub || !sub.enabled) return;

  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ? AND status != 'error'")
    .all(id) as Array<{ id: string }>;
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) return;

  const targets = resolveTargetScopes(sub);
  for (const t of targets) {
    // Add the whole subscription pool to this scope in one batched, idempotent
    // write (preserves any manual proxies already in the pool).
    await addProxiesToScopePool(t.scope, t.scopeId, ids);
  }

  await setProxyEnabledFlag(true);
}

/** Remove the subscription's proxies from their bound scope(s). */
export async function unapplySubscription(id: string): Promise<void> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT id FROM proxy_registry WHERE subscription_id = ? AND source = 'subscription'")
    .all(id) as Array<{ id: string }>;

  // Detach every subscription proxy from ALL scopes in one batched delete.
  // Replaces the previous per-proxy getProxyWhereUsed + removeProxyFromScopePool
  // loop (N+1 queries) — the subscription's proxies must leave every pool they
  // were added to, regardless of which scope resolved them.
  const ids = rows.map((r) => r.id);
  if (ids.length > 0) {
    const placeholders = ids.map(() => "?").join(",");
    const res = db
      .prepare(`DELETE FROM proxy_assignments WHERE proxy_id IN (${placeholders})`)
      .run(...ids);
    if (res.changes > 0) {
      backupDbFile("pre-write");
      bumpProxyRegistryGeneration();
    }
  }

  await recomputeProxyEnabled();
}

// ───────────────────────────── proxyEnabled flag ─────────────────────────────

async function hasNonSubscriptionGlobalProxy(): Promise<boolean> {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT 1 FROM proxy_assignments a JOIN proxy_registry p ON p.id = a.proxy_id WHERE a.scope = 'global' AND (p.subscription_id IS NULL OR p.subscription_id = '') LIMIT 1"
    )
    .get();
  return !!row;
}

async function recomputeProxyEnabled(): Promise<void> {
  const db = getDbInstance();
  // Must check for an ACTUALLY BOUND subscription proxy, not just an enabled
  // subscription row: unapplySubscription() detaches proxy_assignments without
  // touching `enabled`, so a bare `enabled = 1` check would leave the flag
  // permanently stuck on `true` after an unapply/disable cycle even though
  // nothing is bound anymore (resolveProxyForConnectionFromRegistry correctly
  // returns null, but the operator-facing proxyEnabled flag would lie).
  const enabledSubWithBoundProxy = db
    .prepare(
      `SELECT 1 FROM proxy_subscriptions s
       JOIN proxy_registry p ON p.subscription_id = s.id
       JOIN proxy_assignments a ON a.proxy_id = p.id
       WHERE s.enabled = 1
       LIMIT 1`
    )
    .get();
  const shouldEnable = !!enabledSubWithBoundProxy || (await hasNonSubscriptionGlobalProxy());
  await setProxyEnabledFlag(shouldEnable);
}

async function setProxyEnabledFlag(value: boolean): Promise<void> {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'proxyEnabled', ?)"
  ).run(JSON.stringify(value));
  bumpProxyConfigGeneration();
}

// ───────────────────────────── Auto-refresh scheduler ─────────────────────────────

let schedulerStarted = false;
let schedulerTimer: ReturnType<typeof setInterval> | null = null;

/** Start a background ticker that refreshes enabled subscriptions on their interval. */
export function startSubscriptionScheduler(): void {
  if (schedulerStarted) return;
  if (typeof window !== "undefined") return; // never in the browser
  if (process.env.NODE_ENV === "test") return; // no timers during tests
  schedulerStarted = true;

  const tick = async () => {
    try {
      const subs = await listSubscriptions();
      const now = Date.now();
      for (const s of subs) {
        if (!isSubscriptionDue(s, now)) continue;
        try {
          await syncSubscription(s.id);
        } catch (e) {
          console.warn(
            `[ProxySubscription] refresh failed for ${s.id}: ${e instanceof Error ? e.message : e}`
          );
        }
      }
    } catch (e) {
      console.warn(
        `[ProxySubscription] scheduler tick error: ${e instanceof Error ? e.message : e}`
      );
    }
  };

  // Check every minute; each subscription self-throttles by its interval.
  schedulerTimer = setInterval(tick, 60_000);
  if (typeof schedulerTimer.unref === "function") schedulerTimer.unref();
}

export function stopSubscriptionScheduler(): void {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
    schedulerTimer = null;
  }
  schedulerStarted = false;
}
