import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "webhook-destination-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { webhookRepositories } =
  await import("../../../src/lib/db/repositories/webhookRepositories.ts");
const webhooksFacade = await import("../../../src/lib/db/webhooks.ts");
const deliveriesFacade = await import("../../../src/lib/db/webhookDeliveries.ts");
const destinationsFacade = await import("../../../src/lib/db/logExportDestinations.ts");

const { webhooks, deliveries, logExportDestinations } = webhookRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function newWebhook(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    url: `https://example.com/${id}`,
    events: ["*"],
    secret: `secret-${id}`,
    description: "",
    kind: "custom" as const,
    metadataEncrypted: null,
    ...overrides,
  };
}

function settings(overrides: Record<string, unknown> = {}) {
  return {
    name: "dest",
    enabled: true,
    config: { endpoint: "https://collector.example.com" },
    batchSize: 500,
    includeBodies: false,
    maxBodyBytes: 262_144,
    maxRowsPerRun: 10_000,
    ...overrides,
  };
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(webhooksFacade.getWebhookRepository(), webhooks);
  assert.equal(deliveriesFacade.getWebhookDeliveryRepository(), deliveries);
  assert.equal(destinationsFacade.getLogExportDestinationRepository(), logExportDestinations);
});

test("webhook repository: stores values as given and never fills defaults", async () => {
  await promised(
    webhooks.insert(
      newWebhook("w1", { events: [], secret: "", kind: "slack", metadataEncrypted: "enc" })
    )
  );
  const stored = await promised(webhooks.findById("w1"));
  assert.equal(stored!.secret, "");
  assert.deepEqual(stored!.events, []);
  assert.equal(stored!.kind, "slack");
  assert.equal(stored!.metadata_encrypted, "enc");
  assert.equal(stored!.enabled, true);
  assert.equal(await webhooks.findById("missing"), null);
});

test("webhook repository: list pages newest first with an unpaged total", async () => {
  for (const id of ["a", "b", "c"]) await webhooks.insert(newWebhook(id));
  const stamp = core.getDbInstance().prepare("UPDATE webhooks SET created_at = ? WHERE id = ?");
  stamp.run("2026-01-01 00:00:00", "a");
  stamp.run("2026-01-02 00:00:00", "b");
  stamp.run("2026-01-03 00:00:00", "c");

  const all = await promised(webhooks.list());
  assert.deepEqual(
    all.webhooks.map((w) => w.id),
    ["c", "b", "a"]
  );
  assert.equal(all.total, 3);
  const page = await webhooks.list({ limit: 1, offset: 1 });
  assert.deepEqual(
    page.webhooks.map((w) => w.id),
    ["b"]
  );
  assert.equal(page.total, 3);
});

test("webhook repository: update writes only defined fields", async () => {
  await webhooks.insert(newWebhook("w1", { description: "keep", metadataEncrypted: "enc" }));
  await promised(webhooks.update("w1", { enabled: false, metadataEncrypted: null }));
  let stored = await webhooks.findById("w1");
  assert.equal(stored!.enabled, false);
  assert.equal(stored!.metadata_encrypted, null);
  assert.equal(stored!.description, "keep");

  await webhooks.update("w1", {});
  await webhooks.update("w1", { events: ["test.ping"], kind: "discord" });
  stored = await webhooks.findById("w1");
  assert.deepEqual(stored!.events, ["test.ping"]);
  assert.equal(stored!.kind, "discord");
  assert.deepEqual(await promised(webhooks.listEnabled()), []);
});

test("webhook repository: failure streak, auto-disable and delete", async () => {
  await webhooks.insert(newWebhook("w1"));
  await webhooks.insert(newWebhook("w2"));
  await promised(webhooks.recordDeliveryResult("w1", 500, false));
  await webhooks.recordDeliveryResult("w1", 502, false);
  await webhooks.recordDeliveryResult("w2", 500, false);
  await webhooks.recordDeliveryResult("w2", 200, true);
  assert.equal((await webhooks.findById("w1"))!.failure_count, 2);
  assert.equal((await webhooks.findById("w2"))!.failure_count, 0);

  assert.equal(await promised(webhooks.disableFailing(2)), 1);
  assert.deepEqual(
    (await webhooks.listEnabled()).map((w) => w.id),
    ["w2"]
  );
  assert.equal(await promised(webhooks.deleteById("w1")), true);
  assert.equal(await webhooks.deleteById("w1"), false);
});

test("delivery repository: append stores values as given and rotates per webhook", async () => {
  await webhooks.insert(newWebhook("w1"));
  await webhooks.insert(newWebhook("w2"));
  const raw = "Error: boom at /srv/app.js:1:1";
  for (let i = 0; i < 4; i++) {
    await promised(
      deliveries.append(
        {
          webhookId: "w1",
          eventType: `e${i}`,
          status: "failed",
          httpStatus: null,
          latencyMs: i,
          error: raw,
          payloadSnapshot: "{}",
        },
        2
      )
    );
  }
  await deliveries.append(
    {
      webhookId: "w2",
      eventType: "other",
      status: "delivered",
      httpStatus: 200,
      latencyMs: null,
      error: null,
      payloadSnapshot: null,
    },
    2
  );

  const recent = await promised(deliveries.listRecent("w1", 10));
  assert.deepEqual(
    recent.map((d) => [d.event_type, d.error, d.latency_ms]),
    [
      ["e3", raw, 3],
      ["e2", raw, 2],
    ]
  );
  assert.equal("payload_snapshot" in recent[0], false);
  assert.equal((await deliveries.listRecent("w2", 10)).length, 1);
  assert.equal((await deliveries.listRecent("w1", 1)).length, 1);

  await webhooks.deleteById("w1");
  assert.deepEqual(await deliveries.listRecent("w1", 10), []);
});

test("delivery repository: an append for an unknown webhook is refused and stores nothing", async () => {
  await webhooks.insert(newWebhook("w1"));
  await assert.rejects(
    deliveries.append(
      {
        webhookId: "missing-webhook",
        eventType: "e",
        status: "delivered",
        httpStatus: null,
        latencyMs: null,
        error: null,
        payloadSnapshot: null,
      },
      100
    ),
    /FOREIGN KEY/
  );
  const count = core
    .getDbInstance()
    .prepare("SELECT count(*) AS n FROM webhook_deliveries")
    .get() as { n: number };
  assert.equal(count.n, 0);
});

test("destination repository: insert stores resolved values; list orders oldest first", async () => {
  await promised(
    logExportDestinations.insert({
      id: "d2",
      type: "otlp-http",
      now: "2026-01-02T00:00:00.000Z",
      ...settings({ name: "second", enabled: false }),
    })
  );
  await logExportDestinations.insert({
    id: "d1",
    type: "otlp-http",
    now: "2026-01-01T00:00:00.000Z",
    ...settings({ name: "first", includeBodies: true, maxBodyBytes: 10 }),
  });

  assert.deepEqual(
    (await promised(logExportDestinations.list())).map((d) => d.id),
    ["d1", "d2"]
  );
  assert.deepEqual(
    (await promised(logExportDestinations.listEnabled())).map((d) => d.id),
    ["d1"]
  );
  const first = await promised(logExportDestinations.findById("d1"));
  assert.equal(first!.createdAt, "2026-01-01T00:00:00.000Z");
  assert.equal(first!.updatedAt, "2026-01-01T00:00:00.000Z");
  assert.equal(first!.includeBodies, true);
  assert.equal(first!.maxBodyBytes, 10);
  assert.equal(first!.cursorRowId, 0);
  assert.equal(first!.exportedTotal, 0);
  assert.equal(await logExportDestinations.findById("missing"), null);
});

test("destination repository: settings, cursor and run bookkeeping use the given clock", async () => {
  await logExportDestinations.insert({
    id: "d1",
    type: "t",
    now: "2026-01-01T00:00:00.000Z",
    ...settings(),
  });
  await promised(
    logExportDestinations.updateSettings(
      "d1",
      settings({ name: "renamed", enabled: false, batchSize: 7 }),
      "2026-01-02T00:00:00.000Z"
    )
  );
  let row = await logExportDestinations.findById("d1");
  assert.equal(row!.name, "renamed");
  assert.equal(row!.enabled, false);
  assert.equal(row!.batchSize, 7);
  assert.equal(row!.updatedAt, "2026-01-02T00:00:00.000Z");
  assert.equal(row!.createdAt, "2026-01-01T00:00:00.000Z");

  await promised(logExportDestinations.advanceCursor("d1", 30, 30, "2026-01-03T00:00:00.000Z"));
  await logExportDestinations.advanceCursor("d1", 45, 15, "2026-01-03T00:00:00.000Z");
  await promised(logExportDestinations.resetCursor("d1", 5, "2026-01-04T00:00:00.000Z"));
  await promised(
    logExportDestinations.recordRun("d1", "failure", "nope", "2026-01-05T00:00:00.000Z")
  );
  row = await logExportDestinations.findById("d1");
  assert.equal(row!.cursorRowId, 5);
  assert.equal(row!.exportedTotal, 45);
  assert.equal(row!.lastStatus, "failure");
  assert.equal(row!.lastError, "nope");
  assert.equal(row!.lastRunAt, "2026-01-05T00:00:00.000Z");
  assert.equal(row!.updatedAt, "2026-01-05T00:00:00.000Z");

  assert.equal(await promised(logExportDestinations.deleteById("d1")), true);
  assert.equal(await logExportDestinations.deleteById("d1"), false);
});

test("legacy sync bindings share the same storage as the async contract", async () => {
  const sync = webhookRepositories.legacySync;
  sync.webhooks.insert(newWebhook("w1"));
  assert.equal((await webhooks.findById("w1"))!.id, "w1");
  assert.equal(sync.webhooks.findById("w1")!.id, "w1");
  sync.logExportDestinations.insert({
    id: "d1",
    type: "t",
    now: "2026-01-01T00:00:00.000Z",
    ...settings(),
  });
  assert.equal((await logExportDestinations.findById("d1"))!.id, "d1");
  assert.ok(!(sync.deliveries.listRecent("w1", 1) instanceof Promise));
});
