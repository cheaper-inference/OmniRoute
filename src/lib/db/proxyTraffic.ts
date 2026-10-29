import { createHmac, randomBytes } from "node:crypto";
import { getDbInstance } from "./core";
import type { SqliteAdapter } from "./adapters/types";
import type { PayloadDelta } from "@omniroute/open-sse/utils/proxyPayloadMetering";

export type TrafficRoute = {
  key: string;
  proxyId: string | null;
  kind: "registry" | "legacy" | "direct" | "unattributed";
};

const COLUMNS = {
  uploadBytes: "upload_bytes",
  downloadBytes: "download_bytes",
  attempts: "attempts",
  knownUploadAttempts: "known_upload_attempts",
  completedDownloads: "completed_downloads",
  failedAttempts: "failed_attempts",
  cancelledDownloads: "cancelled_downloads",
  erroredDownloads: "errored_downloads",
} as const;

export type TrafficCounters = Required<PayloadDelta>;
export type TrafficItem = TrafficCounters &
  TrafficRoute & {
    name: string | null;
    startedAt: string;
    updatedAt: string;
  };

function identitySalt(db: SqliteAdapter): string {
  // Private per-database digest salt, not a proxy credential. Concurrent first sends converge.
  db.prepare(
    "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('proxyTraffic', 'identitySalt', ?)"
  ).run(randomBytes(32).toString("hex"));
  const row = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'proxyTraffic' AND key = 'identitySalt'"
    )
    .get() as { value: string };
  return row.value;
}

/** No credential, endpoint URL or request body survives into the metrics table. */
export function trafficRoute(proxy: unknown, db: SqliteAdapter = getDbInstance()): TrafficRoute {
  if (proxy === null) return { key: "direct", proxyId: null, kind: "direct" };
  if (proxy === undefined) return { key: "unattributed", proxyId: null, kind: "unattributed" };
  const value = proxy && typeof proxy === "object" ? (proxy as Record<string, unknown>) : {};
  const id = value.proxyId ?? value.id;
  if (typeof id === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(id)) {
    return { key: `registry:${id}`, proxyId: id, kind: "registry" };
  }
  const tuple = credentialTuple(proxy, value);
  if (!tuple) return { key: "unattributed", proxyId: null, kind: "unattributed" };
  const digest = createHmac("sha256", identitySalt(db))
    .update(JSON.stringify(tuple), "utf8")
    .digest("hex");
  return { key: `legacy:${digest}`, proxyId: null, kind: "legacy" };
}

function credentialTuple(proxy: unknown, value: Record<string, unknown>): unknown[] | null {
  if (typeof proxy === "string") {
    try {
      const url = new URL(proxy);
      return [
        url.protocol,
        url.hostname.toLowerCase(),
        url.port,
        url.username,
        url.password,
        url.search,
      ];
    } catch {
      return null;
    }
  } else if (typeof value.host === "string" && value.host) {
    return [
      value.type ?? "http",
      value.host.toLowerCase(),
      value.port ?? "",
      value.username ?? "",
      value.password ?? "",
      value.family ?? "auto",
      value.relayAuth ?? "",
    ];
  }
  return null;
}

const COUNTER_KEYS = Object.keys(COLUMNS) as Array<keyof TrafficCounters>;

function counterValues(delta: PayloadDelta): number[] {
  return COUNTER_KEYS.map((key) => {
    const value = delta[key] ?? 0;
    if (!Number.isSafeInteger(value) || value < 0)
      throw new TypeError("Invalid payload traffic increment");
    return value;
  });
}

export function recordTrafficDelta(
  route: TrafficRoute,
  delta: PayloadDelta,
  db: SqliteAdapter = getDbInstance()
): void {
  const values = counterValues(delta);
  const columns = COUNTER_KEYS.map((key) => COLUMNS[key]);
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO proxy_payload_traffic
    (route_key, proxy_id, route_kind, ${columns.join(", ")}, started_at, updated_at)
    VALUES (?, ?, ?, ${columns.map(() => "?").join(", ")}, ?, ?)
    ON CONFLICT(route_key) DO UPDATE SET
    ${columns.map((c) => `${c} = ${c} + excluded.${c}`).join(", ")}, updated_at = excluded.updated_at`
  ).run(route.key, route.proxyId, route.kind, ...values, now, now);
}

const zeroCounters = (): TrafficCounters =>
  Object.fromEntries(COUNTER_KEYS.map((key) => [key, 0])) as TrafficCounters;

export function getProxyTraffic(db: SqliteAdapter = getDbInstance()) {
  flushPayloadTraffic();
  const rows = db
    .prepare(
      `SELECT t.*, p.name FROM proxy_payload_traffic t
    LEFT JOIN proxy_registry p ON p.id = t.proxy_id ORDER BY t.route_kind, p.name, t.route_key`
    )
    .all();
  const items: TrafficItem[] = rows.map((raw) => {
    const r = raw as Record<string, unknown>;
    const counts = Object.fromEntries(
      Object.entries(COLUMNS).map(([key, column]) => [key, Number(r[column])])
    ) as TrafficCounters;
    return {
      ...counts,
      key: String(r.route_key),
      proxyId: r.proxy_id as string | null,
      kind: r.route_kind as TrafficRoute["kind"],
      name: typeof r.name === "string" ? r.name : null,
      startedAt: String(r.started_at),
      updatedAt: String(r.updated_at),
    };
  });
  const sum = (selected: TrafficItem[]) =>
    selected.reduce((total, item) => {
      for (const key of Object.keys(COLUMNS) as Array<keyof TrafficCounters>)
        total[key] += item[key];
      return total;
    }, zeroCounters());
  return {
    items,
    total: sum(items),
    proxied: sum(items.filter((i) => i.kind === "registry" || i.kind === "legacy")),
    direct: sum(items.filter((i) => i.kind === "direct")),
    unattributed: sum(items.filter((i) => i.kind === "unattributed")),
    measurement: "payload" as const,
    persistenceIncomplete: warned,
  };
}

let warned = false;

// Chunk deltas accumulate in memory per database + route and reach SQLite in one upsert when a
// download settles, on a short timer, on a read, and at shutdown — never once per chunk.
const FLUSH_INTERVAL_MS = 1000;
type PendingRoute = { route: TrafficRoute; counters: TrafficCounters };
const pending = new Map<SqliteAdapter, Map<string, PendingRoute>>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let exitHookInstalled = false;

const SETTLING_KEYS = [
  "completedDownloads",
  "failedAttempts",
  "cancelledDownloads",
  "erroredDownloads",
] as const satisfies ReadonlyArray<keyof TrafficCounters>;

function accumulate(db: SqliteAdapter, route: TrafficRoute, delta: PayloadDelta): void {
  const values = counterValues(delta);
  let routes = pending.get(db);
  if (!routes) pending.set(db, (routes = new Map()));
  let entry = routes.get(route.key);
  if (!entry) routes.set(route.key, (entry = { route, counters: zeroCounters() }));
  COUNTER_KEYS.forEach((key, index) => (entry.counters[key] += values[index]));
}

function scheduleFlush(): void {
  if (!exitHookInstalled) {
    exitHookInstalled = true;
    // Last resort for exits that skip graceful shutdown; SQLite writes are synchronous here.
    process.once("exit", () => flushPayloadTraffic());
  }
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushPayloadTraffic();
  }, FLUSH_INTERVAL_MS);
  flushTimer.unref?.();
}

function flushDatabase(db: SqliteAdapter, routes: Map<string, PendingRoute>): void {
  const entries = [...routes.values()];
  const write = () => {
    for (const entry of entries) recordTrafficDelta(entry.route, entry.counters, db);
  };
  if (entries.length > 1 && typeof db.transaction === "function") db.transaction(write)();
  else write();
}

/** Persist every buffered delta now. Failures drop that batch and mark coverage incomplete. */
export function flushPayloadTraffic(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  const batches = [...pending.entries()];
  pending.clear();
  for (const [db, routes] of batches) {
    try {
      flushDatabase(db, routes);
    } catch {
      warn();
    }
  }
}

/** Snapshot once at raw-send entry, so later context changes cannot reassign stream chunks. */
export function payloadTrafficRecorder(
  proxy: unknown,
  dbOverride?: SqliteAdapter
): (delta: PayloadDelta) => void {
  let route: TrafficRoute;
  let db: SqliteAdapter;
  try {
    db = dbOverride ?? getDbInstance();
    route = trafficRoute(proxy, db);
  } catch {
    warn();
    return () => {};
  }
  return (delta) => {
    try {
      accumulate(db, route, delta);
    } catch {
      warn();
      return;
    }
    if (SETTLING_KEYS.some((key) => (delta[key] ?? 0) > 0)) flushPayloadTraffic();
    else scheduleFlush();
  };
}

function warn() {
  if (warned) return;
  warned = true;
  console.warn(
    "[ProxyTraffic] Payload metrics could not be persisted; traffic coverage is incomplete."
  );
}
