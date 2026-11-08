// A new connection's auto-test and opt-in model auto-sync run after POST /api/providers has
// answered. They are tracked follow-ups, not bare `void` promises, so graceful shutdown waits for
// them before closing the database and tests can wait for them before the next test starts.
import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { MockAgent, setGlobalDispatcher } from "undici";

import { settleConnectionFollowUpsAfterEachTest } from "../helpers/connectionFollowUps.ts";

settleConnectionFollowUpsAfterEachTest();

const network = new MockAgent();
network.disableNetConnect();
setGlobalDispatcher(network);
Object.assign(process.env, {
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  API_KEY_SECRET: "connection-follow-ups-fixture-secret",
  JWT_SECRET: "connection-follow-ups-fixture-session-secret",
});

const { runConnectionFollowUp, getPendingConnectionFollowUpCount, waitForConnectionFollowUps } =
  await import("../../src/lib/providers/connectionFollowUps.ts");
const core = await import("../../src/lib/db/core.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const connections = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/providers/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");

function deferred(): { promise: Promise<void>; resolve: () => void; reject: (e: Error) => void } {
  let resolve!: () => void;
  let reject!: (e: Error) => void;
  const promise = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const macrotask = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

test("a follow-up is tracked from the moment it starts until it settles", async () => {
  const gate = deferred();
  let started = false;
  runConnectionFollowUp("Auto-test failed for c1", async () => {
    started = true;
    await gate.promise;
  });
  assert.equal(started, true, "the task starts synchronously, as `void task()` did");
  assert.equal(getPendingConnectionFollowUpCount(), 1);
  gate.resolve();
  assert.equal(await waitForConnectionFollowUps(), true);
  assert.equal(getPendingConnectionFollowUpCount(), 0);
});

test("a rejection or a synchronous throw is logged under its label, never unhandled", async () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  const logged: unknown[][] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => void logged.push(args);
  try {
    runConnectionFollowUp("Auto-test failed for c2", async () => {
      throw new Error("upstream said no");
    });
    runConnectionFollowUp("Auto-sync error for c3", () => {
      throw new Error("could not even start");
    });
    assert.equal(await waitForConnectionFollowUps(), true);
    await macrotask();
  } finally {
    console.log = originalLog;
    process.off("unhandledRejection", onUnhandled);
  }
  assert.deepEqual(unhandled, []);
  assert.deepEqual(logged, [
    ["[providers] Auto-test failed for c2:", "upstream said no"],
    ["[providers] Auto-sync error for c3:", "could not even start"],
  ]);
  assert.equal(getPendingConnectionFollowUpCount(), 0);
});

test("waiting covers follow-ups that a follow-up starts", async () => {
  const order: string[] = [];
  runConnectionFollowUp("outer", async () => {
    await macrotask();
    runConnectionFollowUp("inner", async () => {
      await macrotask();
      order.push("inner");
    });
    order.push("outer");
  });
  assert.equal(await waitForConnectionFollowUps(), true);
  assert.deepEqual(order, ["outer", "inner"]);
});

test("a timeout reports false while work is still running", async () => {
  const gate = deferred();
  runConnectionFollowUp("slow", () => gate.promise);
  const startedAt = Date.now();
  assert.equal(await waitForConnectionFollowUps(30), false);
  assert.ok(Date.now() - startedAt < 2_000, "the timeout bounds the wait");
  assert.equal(getPendingConnectionFollowUpCount(), 1);
  gate.resolve();
  assert.equal(await waitForConnectionFollowUps(), true);
});

test("POST /api/providers answers before its auto-test, which it leaves tracked", async () => {
  core.resetDbInstance();
  const node = await nodes.createProviderNode({
    id: "openai-compatible-chat-followups",
    type: "openai-compatible-chat",
    name: "Follow-up fixture",
    prefix: "followup",
    apiType: "chat",
    baseUrl: "https://followups.invalid/v1",
    chatPath: "/chat/completions",
    modelsPath: "/models",
  });
  const response = await POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: { "X-Skip-Model-Sync": "true" },
      body: {
        provider: String(node.id),
        name: "Follow-up fixture",
        apiKey: "fixture-key-followups",
      },
    })
  );
  assert.equal(response.status, 201, await response.clone().text());
  assert.ok(getPendingConnectionFollowUpCount() >= 1, "the auto-test must be a tracked follow-up");
  assert.equal(await waitForConnectionFollowUps(10_000), true);
  const [row] = await connections.getProviderConnections();
  assert.ok(row.lastTested, "the awaited auto-test recorded its result");
});

const shutdownUrl = pathToFileURL(join(process.cwd(), "src/lib/gracefulShutdown.ts")).href;

async function freshShutdownModule(tag: string) {
  delete (globalThis as { __omnirouteShutdown?: unknown }).__omnirouteShutdown;
  return (await import(
    `${shutdownUrl}?followups=${tag}-${Date.now()}`
  )) as typeof import("../../src/lib/gracefulShutdown.ts");
}

test("graceful shutdown waits for pending follow-ups before cleanup", async () => {
  const shutdown = await freshShutdownModule("wait");
  const gate = deferred();
  const order: string[] = [];
  runConnectionFollowUp("Auto-test failed for pending", async () => {
    await gate.promise;
    order.push("follow-up settled");
  });
  const done = shutdown.requestGracefulShutdown("TEST").then(() => order.push("shutdown done"));
  try {
    for (let i = 0; i < 5; i += 1) await macrotask();
    assert.deepEqual(order, [], "shutdown must not finish while a follow-up is running");
  } finally {
    gate.resolve();
  }
  await done;
  assert.deepEqual(order, ["follow-up settled", "shutdown done"]);
});

test("graceful shutdown still finishes when a follow-up outlives the shutdown budget", async () => {
  const previousTimeout = process.env.SHUTDOWN_TIMEOUT_MS;
  process.env.SHUTDOWN_TIMEOUT_MS = "150";
  const gate = deferred();
  try {
    const shutdown = await freshShutdownModule("timeout");
    runConnectionFollowUp("Auto-test failed for stuck", () => gate.promise);
    const startedAt = Date.now();
    await shutdown.requestGracefulShutdown("TEST");
    assert.ok(Date.now() - startedAt < 5_000, "the follow-up wait is bounded by the budget");
    assert.equal(getPendingConnectionFollowUpCount(), 1, "the stuck follow-up was not awaited");
  } finally {
    gate.resolve();
    await waitForConnectionFollowUps();
    if (previousTimeout === undefined) delete process.env.SHUTDOWN_TIMEOUT_MS;
    else process.env.SHUTDOWN_TIMEOUT_MS = previousTimeout;
    await network.close();
  }
});
