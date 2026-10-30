import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const isolatedHome = mkdtempSync(join(tmpdir(), "sync-phase-18335-"));
process.env.HOME = isolatedHome;
process.env.DATA_DIR = join(isolatedHome, "data");
process.env.OMNIROUTE_AUTO_SYNC_CODEX_PROFILES = "false";
process.env.OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES = "false";
process.env.OMNIROUTE_INTERNAL_SCHEME = "http";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { buildModelSyncInternalHeaders } =
  await import("../../src/shared/services/modelSyncScheduler.ts");
const { POST } = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

const { cancelPendingPostSyncReconcile } =
  await import("../../src/lib/db/models/syncedAvailableModelPersistence.ts");
test.afterEach(() => cancelPendingPostSyncReconcile());

test.after(async () => {
  await closeCallLogSaves();
  core.resetDbInstance();
  rmSync(isolatedHome, { recursive: true, force: true });
});

type PhaseEvent = { requestId: string; phase: string; event: string; durationMs?: number };
function capture(t: test.TestContext) {
  const events: PhaseEvent[] = [];
  t.mock.method(console, "info", (prefix: string, payload: string) => {
    if (prefix === "[ModelSyncTiming]") events.push(JSON.parse(payload));
  });
  return events;
}
async function sync(connectionId: string) {
  return POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models?quiet=1`, {
      method: "POST",
      headers: buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
}
function fakeFetch(t: test.TestContext, body: string) {
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(new URL(String(input)).hostname, "127.0.0.1", "offline loopback only");
    return new Response(
      new ReadableStream({
        start(controller) {
          setTimeout(() => {
            controller.enqueue(new TextEncoder().encode(body));
            controller.close();
          }, 50);
        },
      }),
      { headers: { "content-type": "application/json" } }
    );
  });
}

test("real sync reports body, persistence, combo and completed call-log phases without payloads", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  const events = capture(t);
  const connection = await createProviderConnection({
    provider: "bai",
    authType: "apikey",
    name: "PRIVATE_NAME",
    isActive: true,
  });
  fakeFetch(t, JSON.stringify({ source: "api", models: [{ id: "PRIVATE_MODEL" }] }));
  const response = await sync(connection.id);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).syncedModels, 1);
  for (const phase of [
    "discovery",
    "discovery-body",
    "managed-import",
    "stale-combo",
    "call-log",
  ]) {
    assert.ok(
      events.some((event) => event.phase === phase && event.event === "start"),
      `${phase} start missing`
    );
    assert.ok(
      events.some((event) => event.phase === phase && event.event === "end"),
      `${phase} end missing`
    );
  }
  const body = events.find((event) => event.phase === "discovery-body" && event.event === "end");
  assert.ok(
    body && typeof body.durationMs === "number" && body.durationMs >= 35,
    "body timing must include stream consumption"
  );
  assert.equal(events.at(-1)?.phase, "request");
  assert.equal(new Set(events.map((event) => event.requestId)).size, 1);
  const serialized = JSON.stringify(events);
  events.length = 0;
  const unchanged = await sync(connection.id);
  assert.equal(unchanged.status, 200);
  assert.equal((await unchanged.json()).logged, false);
  assert.ok(
    !events.some((event) => event.phase === "call-log"),
    "unchanged sync does not create extra logs"
  );
  for (const secret of [connection.id, "PRIVATE_NAME", "PRIVATE_MODEL", "cookie", "authorization"])
    assert.ok(!serialized.includes(secret));
});

test("disabled instrumentation emits no events and preserves HTTP result", async (t) => {
  delete process.env.OMNIROUTE_MODEL_SYNC_TIMINGS;
  const events = capture(t);
  const connection = await createProviderConnection({
    provider: "bai",
    authType: "apikey",
    name: "disabled",
    isActive: true,
  });
  fakeFetch(t, JSON.stringify({ source: "api", models: [{ id: "disabled-model" }] }));
  assert.equal((await sync(connection.id)).status, 200);
  assert.deepEqual(events, []);
});

test("invalid discovery body preserves 502 and measures error call-log without importing", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  const events = capture(t);
  const connection = await createProviderConnection({
    provider: "bai",
    authType: "apikey",
    name: "invalid",
    isActive: true,
  });
  fakeFetch(t, "invalid JSON PRIVATE_SENTINEL");
  assert.equal((await sync(connection.id)).status, 502);
  assert.ok(events.some((event) => event.phase === "discovery-body" && event.event === "end"));
  assert.ok(events.some((event) => event.phase === "call-log" && event.event === "end"));
  assert.ok(!events.some((event) => event.phase === "managed-import"));
  assert.ok(!JSON.stringify(events).includes("PRIVATE_SENTINEL"));
});

test("phase start is observable while an operation is still pending", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  const events = capture(t);
  const { createModelSyncTimings } =
    await import("../../src/lib/providerModels/modelSyncTimings.ts");
  const timing = createModelSyncTimings();
  let release: (value: number) => void = () => {
    throw new Error("not initialized");
  };
  const pending = timing.measure(
    "managed-import",
    () =>
      new Promise<number>((resolve) => {
        release = resolve;
      })
  );
  assert.ok(events.some((event) => event.phase === "managed-import" && event.event === "start"));
  assert.ok(!events.some((event) => event.phase === "managed-import" && event.event === "end"));
  release(42);
  assert.equal(await pending, 42);
  timing.finish();
  assert.equal(events.at(-1)?.phase, "request");
});

test("phase failures preserve the original error without logging it", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  const events = capture(t);
  const { createModelSyncTimings } =
    await import("../../src/lib/providerModels/modelSyncTimings.ts");
  const timing = createModelSyncTimings();
  const failure = new Error("PRIVATE_TOKEN=https://private.invalid");
  await assert.rejects(
    timing.measure("call-log", () => {
      throw failure;
    }),
    (error) => error === failure
  );
  assert.ok(events.some((event) => event.phase === "call-log" && event.event === "end"));
  const serialized = JSON.stringify(events);
  assert.ok(serialized.includes('"outcome":"error"'));
  assert.ok(!serialized.includes("PRIVATE_TOKEN"));
});

test("overlapping requests have independent correlation identifiers", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  const events = capture(t);
  const { createModelSyncTimings } =
    await import("../../src/lib/providerModels/modelSyncTimings.ts");
  const first = createModelSyncTimings();
  const second = createModelSyncTimings();
  assert.deepEqual(
    await Promise.all([
      first.measure("discovery", async () => "first"),
      second.measure("discovery", async () => "second"),
    ]),
    ["first", "second"]
  );
  first.finish();
  second.finish();
  const ids = new Set(events.map((event) => event.requestId));
  assert.equal(ids.size, 2);
  for (const id of ids) assert.equal(events.filter((event) => event.requestId === id).length, 4);
});

test("a broken diagnostic sink cannot fail a successful sync operation", async (t) => {
  process.env.OMNIROUTE_MODEL_SYNC_TIMINGS = "1";
  t.mock.method(console, "info", () => {
    throw new Error("sink unavailable");
  });
  const { createModelSyncTimings } =
    await import("../../src/lib/providerModels/modelSyncTimings.ts");
  const timing = createModelSyncTimings();
  assert.equal(await timing.measure("managed-import", async () => 99), 99);
  assert.doesNotThrow(() => timing.finish());
});
