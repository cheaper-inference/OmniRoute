/**
 * Characterization of the webhook, webhook-delivery and log-export-destination DB helpers.
 * Uses only the long-standing public exports so it runs unchanged before and after the
 * repository extraction: generated secrets and defaults, event filters, enabled state,
 * failure streaks and auto-disable, delivery sanitizing/retention/ordering, cascade on
 * delete, destination defaults, update merging, cursor bookkeeping and ordering.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "webhook-destinations-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const webhooks = await import("../../../src/lib/db/webhooks.ts");
const deliveries = await import("../../../src/lib/db/webhookDeliveries.ts");
const destinations = await import("../../../src/lib/db/logExportDestinations.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function db() {
  return core.getDbInstance();
}

function setWebhookCreatedAt(id: string, createdAt: string): void {
  db().prepare("UPDATE webhooks SET created_at = ? WHERE id = ?").run(createdAt, id);
}

// ── Webhooks ────────────────────────────────────────────────────────────────

test("createWebhook: generated id/secret and defaults", () => {
  const created = webhooks.createWebhook({ url: "https://example.com/a" });
  assert.match(created.id, /^[0-9a-f-]{36}$/);
  assert.match(created.secret!, /^whsec_[0-9a-f]{48}$/);
  assert.deepEqual(created.events, ["*"]);
  assert.equal(created.kind, "custom");
  assert.equal(created.description, "");
  assert.equal(created.enabled, true);
  assert.equal(created.failure_count, 0);
  assert.equal(created.last_status, null);
  assert.equal(created.last_triggered_at, null);
  assert.equal(created.metadata_encrypted, null);
  assert.equal(typeof created.created_at, "string");

  const raw = db().prepare("SELECT events, enabled FROM webhooks WHERE id = ?").get(created.id);
  assert.deepEqual({ ...(raw as object) }, { events: '["*"]', enabled: 1 });
});

test("createWebhook: explicit values are stored; an empty secret is replaced", () => {
  const created = webhooks.createWebhook({
    url: "123456",
    events: ["request.failed", "quota.exceeded"],
    secret: "s3cret",
    description: "ops",
    kind: "telegram",
    metadataEncrypted: "enc:v1:abc",
  });
  assert.equal(created.url, "123456");
  assert.deepEqual(created.events, ["request.failed", "quota.exceeded"]);
  assert.equal(created.secret, "s3cret");
  assert.equal(created.description, "ops");
  assert.equal(created.kind, "telegram");
  assert.equal(created.metadata_encrypted, "enc:v1:abc");

  const blank = webhooks.createWebhook({ url: "https://example.com/b", secret: "" });
  assert.match(blank.secret!, /^whsec_/);
  const twice = webhooks.createWebhook({ url: "https://example.com/c" });
  assert.notEqual(twice.secret, blank.secret);
});

test("rows: empty kind reads as custom, empty events read as wildcard, null secret stays null", () => {
  const created = webhooks.createWebhook({ url: "https://example.com/a" });
  db()
    .prepare("UPDATE webhooks SET kind = '', events = '', secret = NULL WHERE id = ?")
    .run(created.id);
  const read = webhooks.getWebhook(created.id)!;
  assert.equal(read.kind, "custom");
  assert.deepEqual(read.events, ["*"]);
  assert.equal(read.secret, null);
  assert.equal(webhooks.getWebhook("missing"), null);
});

test("getWebhooks: newest first, total ignores paging, offset needs a limit", () => {
  const ids = ["a", "b", "c", "d"].map((name, index) => {
    const created = webhooks.createWebhook({ url: `https://example.com/${name}` });
    setWebhookCreatedAt(created.id, `2026-01-0${index + 1} 00:00:00`);
    return created.id;
  });
  const newestFirst = [...ids].reverse();

  const all = webhooks.getWebhooks();
  assert.equal(all.total, 4);
  assert.deepEqual(
    all.webhooks.map((w) => w.id),
    newestFirst
  );

  const page = webhooks.getWebhooks({ limit: 2, offset: 1 });
  assert.equal(page.total, 4);
  assert.deepEqual(
    page.webhooks.map((w) => w.id),
    newestFirst.slice(1, 3)
  );

  const firstPage = webhooks.getWebhooks({ limit: 3 });
  assert.deepEqual(
    firstPage.webhooks.map((w) => w.id),
    newestFirst.slice(0, 3)
  );

  const offsetOnly = webhooks.getWebhooks({ offset: 2 });
  assert.equal(offsetOnly.webhooks.length, 4);
});

test("updateWebhook: partial writes, null metadata clears, no-op returns the stored row", () => {
  const created = webhooks.createWebhook({
    url: "https://example.com/a",
    metadataEncrypted: "enc",
    description: "keep",
  });
  const updated = webhooks.updateWebhook(created.id, {
    url: "https://example.com/b",
    events: [],
    enabled: false,
    kind: "discord",
    metadataEncrypted: null,
  })!;
  assert.equal(updated.url, "https://example.com/b");
  assert.deepEqual(updated.events, []);
  assert.equal(updated.enabled, false);
  assert.equal(updated.kind, "discord");
  assert.equal(updated.metadata_encrypted, null);
  assert.equal(updated.description, "keep");
  assert.equal(updated.secret, created.secret);

  const rowBefore = {
    ...(db().prepare("SELECT * FROM webhooks WHERE id = ?").get(created.id) as object),
  };
  const noop = webhooks.updateWebhook(created.id, {});
  assert.deepEqual(noop, webhooks.getWebhook(created.id));
  const undefinedOnly = webhooks.updateWebhook(created.id, { url: undefined });
  assert.deepEqual(undefinedOnly, noop);
  assert.deepEqual(
    { ...(db().prepare("SELECT * FROM webhooks WHERE id = ?").get(created.id) as object) },
    rowBefore
  );

  assert.equal(webhooks.updateWebhook("missing", { enabled: true }), null);
  assert.equal(webhooks.updateWebhook("missing", {}), null);
});

test("getEnabledWebhooks: only enabled rows, with their event filters", () => {
  const on = webhooks.createWebhook({ url: "https://example.com/on", events: ["test.ping"] });
  const off = webhooks.createWebhook({ url: "https://example.com/off" });
  webhooks.updateWebhook(off.id, { enabled: false });
  const enabled = webhooks.getEnabledWebhooks();
  assert.deepEqual(
    enabled.map((w) => [w.id, w.events]),
    [[on.id, ["test.ping"]]]
  );
});

test("recordWebhookDelivery: failures extend the streak, success resets it", () => {
  const created = webhooks.createWebhook({ url: "https://example.com/a" });
  webhooks.recordWebhookDelivery(created.id, 500, false);
  webhooks.recordWebhookDelivery(created.id, 0, false);
  let row = webhooks.getWebhook(created.id)!;
  assert.equal(row.failure_count, 2);
  assert.equal(row.last_status, 0);
  assert.match(row.last_triggered_at!, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

  webhooks.recordWebhookDelivery(created.id, 204, true);
  row = webhooks.getWebhook(created.id)!;
  assert.equal(row.failure_count, 0);
  assert.equal(row.last_status, 204);

  webhooks.recordWebhookDelivery("missing", 500, false);
});

test("disableWebhooksWithHighFailures: default threshold 10, only enabled rows count", () => {
  const nine = webhooks.createWebhook({ url: "https://example.com/9" });
  const ten = webhooks.createWebhook({ url: "https://example.com/10" });
  const alreadyOff = webhooks.createWebhook({ url: "https://example.com/off" });
  for (let i = 0; i < 9; i++) webhooks.recordWebhookDelivery(nine.id, 500, false);
  for (let i = 0; i < 10; i++) {
    webhooks.recordWebhookDelivery(ten.id, 500, false);
    webhooks.recordWebhookDelivery(alreadyOff.id, 500, false);
  }
  webhooks.updateWebhook(alreadyOff.id, { enabled: false });

  assert.equal(webhooks.disableWebhooksWithHighFailures(), 1);
  assert.equal(webhooks.getWebhook(ten.id)!.enabled, false);
  assert.equal(webhooks.getWebhook(nine.id)!.enabled, true);
  assert.equal(webhooks.disableWebhooksWithHighFailures(), 0);
  assert.equal(webhooks.disableWebhooksWithHighFailures(9), 1);
  assert.equal(webhooks.getWebhook(nine.id)!.enabled, false);
});

test("deleteWebhook: reports whether a row went and takes its deliveries with it", () => {
  const gone = webhooks.createWebhook({ url: "https://example.com/gone" });
  const kept = webhooks.createWebhook({ url: "https://example.com/kept" });
  deliveries.insertDelivery({ webhookId: gone.id, eventType: "test.ping", status: "delivered" });
  deliveries.insertDelivery({ webhookId: kept.id, eventType: "test.ping", status: "failed" });

  assert.equal(webhooks.deleteWebhook(gone.id), true);
  assert.equal(webhooks.deleteWebhook(gone.id), false);
  const remaining = db()
    .prepare("SELECT webhook_id FROM webhook_deliveries ORDER BY id")
    .all()
    .map((row) => (row as { webhook_id: string }).webhook_id);
  assert.deepEqual(remaining, [kept.id]);
  assert.deepEqual(deliveries.getDeliveries(gone.id, 10), []);
});

// ── Webhook deliveries ──────────────────────────────────────────────────────

test("insertDelivery: optional fields default to null; payload is stored but never listed", () => {
  const hook = webhooks.createWebhook({ url: "https://example.com/a" });
  deliveries.insertDelivery({
    webhookId: hook.id,
    eventType: "request.failed",
    status: "failed",
    payloadSnapshot: '{"secret":"x"}',
  });
  deliveries.insertDelivery({
    webhookId: hook.id,
    eventType: "request.completed",
    status: "delivered",
    httpStatus: 200,
    latencyMs: 12,
  });

  const stored = db()
    .prepare(
      "SELECT payload_snapshot, http_status, latency_ms, error FROM webhook_deliveries ORDER BY id"
    )
    .all()
    .map((row) => ({ ...(row as object) }));
  assert.deepEqual(stored, [
    { payload_snapshot: '{"secret":"x"}', http_status: null, latency_ms: null, error: null },
    { payload_snapshot: null, http_status: 200, latency_ms: 12, error: null },
  ]);

  const listed = deliveries.getDeliveries(hook.id, 10);
  assert.deepEqual(Object.keys(listed[0]).sort(), [
    "created_at",
    "error",
    "event_type",
    "http_status",
    "id",
    "latency_ms",
    "status",
    "webhook_id",
  ]);
});

test("insertDelivery: errors are sanitized before they are stored", async () => {
  const { sanitizeErrorMessage } = await import("../../../open-sse/utils/error.ts");
  const hook = webhooks.createWebhook({ url: "https://example.com/a" });
  const raw =
    "connect ECONNREFUSED 10.1.2.3:443\n    at TCPConnectWrap.afterConnect (node:net:1555:16) Bearer sk-abcdefghijklmnopqrstuvwxyz";
  deliveries.insertDelivery({ webhookId: hook.id, eventType: "e", status: "failed", error: raw });
  deliveries.insertDelivery({ webhookId: hook.id, eventType: "e", status: "failed", error: "" });

  const errors = db()
    .prepare("SELECT error FROM webhook_deliveries ORDER BY id")
    .all()
    .map((row) => (row as { error: string | null }).error);
  assert.equal(errors[0], sanitizeErrorMessage(raw) || null);
  assert.notEqual(errors[0], raw);
  assert.equal(errors[1], sanitizeErrorMessage("") || null);
});

test("deliveries: newest first by created_at then id; limit applies; 100 kept per webhook", () => {
  const hook = webhooks.createWebhook({ url: "https://example.com/a" });
  const other = webhooks.createWebhook({ url: "https://example.com/b" });
  deliveries.insertDelivery({ webhookId: other.id, eventType: "keep", status: "delivered" });

  for (let i = 0; i < 103; i++) {
    deliveries.insertDelivery({ webhookId: hook.id, eventType: `e${i}`, status: "delivered" });
  }
  const listed = deliveries.getDeliveries(hook.id, 500);
  assert.equal(listed.length, 100);
  assert.equal(listed[0].event_type, "e102");
  assert.equal(listed[99].event_type, "e3");
  assert.deepEqual(
    deliveries.getDeliveries(hook.id, 2).map((d) => d.event_type),
    ["e102", "e101"]
  );
  assert.equal(deliveries.getDeliveries(other.id, 10).length, 1);

  // An older created_at sorts after newer rows even with a higher id, and rotation keeps
  // the newest 100 by that same order.
  db()
    .prepare(
      "UPDATE webhook_deliveries SET created_at = '2000-01-01 00:00:00' WHERE event_type = 'e102'"
    )
    .run();
  deliveries.insertDelivery({ webhookId: hook.id, eventType: "late", status: "delivered" });
  const after = deliveries.getDeliveries(hook.id, 500).map((d) => d.event_type);
  assert.equal(after.length, 100);
  assert.equal(after[0], "late");
  assert.equal(after.includes("e102"), false);
  assert.equal(after.includes("e4"), true);
});

// ── Log-export destinations ─────────────────────────────────────────────────

test("createLogExportDestination: defaults, zeroed cursor, matching timestamps", () => {
  const created = destinations.createLogExportDestination({
    name: "Primary",
    type: "otlp-http",
    config: { endpoint: "https://collector.example.com", token: "enc:v1:xyz" },
  });
  assert.match(created.id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(
    {
      ...created,
      id: "<id>",
      createdAt: "<t>",
      updatedAt: "<t>",
    },
    {
      id: "<id>",
      name: "Primary",
      type: "otlp-http",
      enabled: false,
      config: { endpoint: "https://collector.example.com", token: "enc:v1:xyz" },
      batchSize: 500,
      includeBodies: false,
      maxBodyBytes: 262_144,
      maxRowsPerRun: 10_000,
      cursorRowId: 0,
      exportedTotal: 0,
      lastRunAt: null,
      lastStatus: null,
      lastError: null,
      createdAt: "<t>",
      updatedAt: "<t>",
    }
  );
  assert.equal(created.createdAt, created.updatedAt);
  assert.match(created.createdAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

  const raw = db()
    .prepare("SELECT config, enabled, include_bodies FROM log_export_destinations WHERE id = ?")
    .get(created.id);
  assert.deepEqual(
    { ...(raw as object) },
    {
      config: '{"endpoint":"https://collector.example.com","token":"enc:v1:xyz"}',
      enabled: 0,
      include_bodies: 0,
    }
  );
});

test("createLogExportDestination: explicit values and a missing config", () => {
  const created = destinations.createLogExportDestination({
    name: "Bodies",
    type: "custom",
    enabled: true,
    config: undefined as unknown as Record<string, unknown>,
    batchSize: 5,
    includeBodies: true,
    maxBodyBytes: 1024,
    maxRowsPerRun: 50,
  });
  assert.equal(created.enabled, true);
  assert.deepEqual(created.config, {});
  assert.equal(created.batchSize, 5);
  assert.equal(created.includeBodies, true);
  assert.equal(created.maxBodyBytes, 1024);
  assert.equal(created.maxRowsPerRun, 50);
});

test("destinations: oldest first, enabled filter, unreadable config reads as empty", () => {
  const a = destinations.createLogExportDestination({ name: "a", type: "t", config: {} });
  const b = destinations.createLogExportDestination({
    name: "b",
    type: "t",
    enabled: true,
    config: {},
  });
  const c = destinations.createLogExportDestination({
    name: "c",
    type: "t",
    enabled: true,
    config: {},
  });
  const stamp = db().prepare("UPDATE log_export_destinations SET created_at = ? WHERE id = ?");
  stamp.run("2026-01-03T00:00:00.000Z", a.id);
  stamp.run("2026-01-02T00:00:00.000Z", b.id);
  stamp.run("2026-01-01T00:00:00.000Z", c.id);

  assert.deepEqual(
    destinations.getLogExportDestinations().map((d) => d.name),
    ["c", "b", "a"]
  );
  assert.deepEqual(
    destinations.getEnabledLogExportDestinations().map((d) => d.name),
    ["c", "b"]
  );

  const setConfig = db().prepare("UPDATE log_export_destinations SET config = ? WHERE id = ?");
  setConfig.run("{not json", a.id);
  assert.deepEqual(destinations.getLogExportDestination(a.id)!.config, {});
  setConfig.run("42", a.id);
  assert.deepEqual(destinations.getLogExportDestination(a.id)!.config, {});
  setConfig.run("[1,2]", a.id);
  assert.deepEqual(destinations.getLogExportDestination(a.id)!.config, [1, 2]);
  setConfig.run("", a.id);
  assert.deepEqual(destinations.getLogExportDestination(a.id)!.config, {});

  assert.equal(destinations.getLogExportDestination("missing"), null);
});

test("updateLogExportDestination: merges over the stored row and keeps run bookkeeping", async () => {
  const created = destinations.createLogExportDestination({
    name: "Primary",
    type: "otlp-http",
    enabled: true,
    config: { endpoint: "https://a.example.com" },
    includeBodies: true,
  });
  destinations.advanceLogExportCursor(created.id, 40, 40);
  destinations.recordLogExportRun(created.id, "success", null);
  const before = destinations.getLogExportDestination(created.id)!;
  await new Promise((resolve) => setTimeout(resolve, 5));

  const updated = destinations.updateLogExportDestination(created.id, {
    enabled: false,
    config: { endpoint: "https://b.example.com" },
    batchSize: 10,
  })!;
  assert.equal(updated.name, "Primary");
  assert.equal(updated.type, "otlp-http");
  assert.equal(updated.enabled, false);
  assert.deepEqual(updated.config, { endpoint: "https://b.example.com" });
  assert.equal(updated.batchSize, 10);
  assert.equal(updated.includeBodies, true);
  assert.equal(updated.maxBodyBytes, 262_144);
  assert.equal(updated.maxRowsPerRun, 10_000);
  assert.equal(updated.cursorRowId, 40);
  assert.equal(updated.exportedTotal, 40);
  assert.equal(updated.lastStatus, "success");
  assert.equal(updated.lastRunAt, before.lastRunAt);
  assert.equal(updated.createdAt, before.createdAt);
  assert.ok(updated.updatedAt > before.updatedAt);

  const same = destinations.updateLogExportDestination(created.id, {})!;
  assert.deepEqual({ ...same, updatedAt: "" }, { ...updated, updatedAt: "" });

  assert.equal(destinations.updateLogExportDestination("missing", { name: "x" }), null);
});

test("cursor: advance adds to the total, reset keeps it, run records status and error", async () => {
  const created = destinations.createLogExportDestination({ name: "a", type: "t", config: {} });
  destinations.advanceLogExportCursor(created.id, 100, 100);
  destinations.advanceLogExportCursor(created.id, 150, 50);
  let row = destinations.getLogExportDestination(created.id)!;
  assert.equal(row.cursorRowId, 150);
  assert.equal(row.exportedTotal, 150);

  destinations.resetLogExportCursor(created.id, 20);
  row = destinations.getLogExportDestination(created.id)!;
  assert.equal(row.cursorRowId, 20);
  assert.equal(row.exportedTotal, 150);

  destinations.resetLogExportCursor(created.id);
  row = destinations.getLogExportDestination(created.id)!;
  assert.equal(row.cursorRowId, 0);
  assert.equal(row.lastRunAt, null);

  const beforeRun = row.updatedAt;
  await new Promise((resolve) => setTimeout(resolve, 5));
  destinations.recordLogExportRun(created.id, "failure", "collector said no");
  row = destinations.getLogExportDestination(created.id)!;
  assert.equal(row.lastStatus, "failure");
  assert.equal(row.lastError, "collector said no");
  assert.equal(row.lastRunAt, row.updatedAt);
  assert.ok(row.updatedAt > beforeRun);
  assert.equal(row.cursorRowId, 0);

  destinations.recordLogExportRun(created.id, "success", null);
  row = destinations.getLogExportDestination(created.id)!;
  assert.equal(row.lastStatus, "success");
  assert.equal(row.lastError, null);

  destinations.advanceLogExportCursor("missing", 1, 1);
  destinations.resetLogExportCursor("missing");
  destinations.recordLogExportRun("missing", "success", null);
});

test("deleteLogExportDestination: reports whether a row went", () => {
  const created = destinations.createLogExportDestination({ name: "a", type: "t", config: {} });
  assert.equal(destinations.deleteLogExportDestination(created.id), true);
  assert.equal(destinations.deleteLogExportDestination(created.id), false);
  assert.deepEqual(destinations.getLogExportDestinations(), []);
});

test("surface: facade exports keep their names and synchronous results", () => {
  const syncNames = {
    webhooks: [
      "createWebhook",
      "deleteWebhook",
      "disableWebhooksWithHighFailures",
      "getEnabledWebhooks",
      "getWebhook",
      "getWebhooks",
      "recordWebhookDelivery",
      "updateWebhook",
    ],
    deliveries: ["getDeliveries", "insertDelivery"],
    destinations: [
      "advanceLogExportCursor",
      "createLogExportDestination",
      "deleteLogExportDestination",
      "getEnabledLogExportDestinations",
      "getLogExportDestination",
      "getLogExportDestinations",
      "recordLogExportRun",
      "resetLogExportCursor",
      "updateLogExportDestination",
    ],
  };
  const modules: Record<string, Record<string, unknown>> = { webhooks, deliveries, destinations };
  for (const [name, names] of Object.entries(syncNames)) {
    for (const fn of names) {
      assert.equal(typeof modules[name][fn], "function", `${name}.${fn}`);
    }
  }
  const hook = webhooks.createWebhook({ url: "https://example.com/a" });
  assert.ok(!(webhooks.getWebhooks() instanceof Promise));
  assert.ok(!(webhooks.getWebhook(hook.id) instanceof Promise));
  assert.ok(!(deliveries.getDeliveries(hook.id, 1) instanceof Promise));
  assert.ok(!(destinations.getLogExportDestinations() instanceof Promise));
});
