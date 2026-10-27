import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

// Switch prefers a member no sibling selector serves: at equal refusal
// memory, a member served by another steered selector of the same core ranks
// last; fallback is the current order. Cause of every stub logged inline.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-unserved-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
process.env.PROXY_HEALTH_TCP_TIMEOUT_MS = "50";

const core = await import("../../src/lib/db/core.ts");
const proxyHealth = await import("../../src/lib/proxyHealth.ts");
// Probes dial TCP per core entry: stub to reachable (cause: functional focus
// is the sibling-aware switch, not TCP).
proxyHealth.__setProxyHealthTcpCheckForTesting(async () => true);
const trigger = await import("../../src/lib/proxySubscription/selectorTrigger.ts");
const mem = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

function reset() {
  core.resetDbInstance();
  mem.__resetProxyRefusalMemoryForTesting();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  trigger.__resetSelectorTriggerForTesting();
}

type GroupState = { current: string; puts: string[]; failGet: boolean };
type FakeCore = {
  base: string;
  groups: Record<string, GroupState>;
  getCount: () => number;
  close: () => Promise<void>;
};

function startFakeCore(
  groups: Record<string, { current: string; members: string[] }>
): Promise<FakeCore> {
  const state: Record<string, GroupState & { members: string[] }> = {};
  for (const [name, g] of Object.entries(groups)) {
    state[name] = { current: g.current, members: g.members, puts: [], failGet: false };
  }
  let gets = 0;
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url ?? "/", "http://x");
      if (req.method === "GET" && u.pathname === "/proxies") {
        gets += 1;
        const proxies: Record<string, { name: string; type: string; now: string; all: string[] }> =
          {};
        for (const [name, g] of Object.entries(state)) {
          if (g.failGet) continue;
          proxies[name] = { name, type: "Selector", now: g.current, all: g.members };
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ proxies }));
        return;
      }
      const putMatch = req.method === "PUT" && /^\/proxies\/(.+)$/.exec(u.pathname);
      if (putMatch) {
        const name = decodeURIComponent(putMatch[1]!);
        const g = state[name];
        if (!g) {
          res.writeHead(404);
          res.end("{}");
          return;
        }
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          const target = (JSON.parse(body) as { name: string }).name;
          g.puts.push(target);
          g.current = target;
          res.writeHead(204);
          res.end();
        });
        return;
      }
      res.writeHead(404);
      res.end("{}");
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") throw new Error("no addr");
      const groupsView: Record<string, GroupState> = {};
      for (const [name, g] of Object.entries(state)) groupsView[name] = g;
      resolve({
        base: `http://127.0.0.1:${addr.port}`,
        groups: groupsView,
        getCount: () => gets,
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

function startFeedServer(): Promise<{ url: string; close: () => Promise<void> }> {
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      // Cause of stub: needsCore protocol so the sync binds the operator
      // local-core entry into proxy_registry.
      res.end("ss://YWVzLTI1Ni1nY206cGFzcw@203.0.113.9:8388#ss-node");
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      if (!addr || typeof addr === "string") throw new Error("no addr");
      resolve({
        url: `http://127.0.0.1:${addr.port}/list`,
        close: () => new Promise((r) => srv.close(() => r())),
      });
    });
  });
}

const KEY_A = "socks5://@127.0.0.1:1081";

async function bindTwoSelectors(
  feedUrl: string,
  fakeBase: string,
  secret: string
): Promise<{ idA: string; idB: string }> {
  const createdA = await sub.createSubscription({
    name: "sel-unserved-a",
    url: feedUrl,
    enabled: true,
    localCoreEndpoint: "socks5://127.0.0.1:1081 selector=group-a",
    controlUrl: fakeBase,
    controlSecret: secret,
  });
  await sub.syncSubscription(createdA.id);
  const createdB = await sub.createSubscription({
    name: "sel-unserved-b",
    url: feedUrl,
    enabled: true,
    localCoreEndpoint: "socks5://127.0.0.1:1082 selector=group-b",
    controlUrl: fakeBase,
    controlSecret: secret,
  });
  await sub.syncSubscription(createdB.id);
  return { idA: createdA.id, idB: createdB.id };
}

test("sibling member choice ranks below free members at equal refusal state", () => {
  const now = Date.now();
  const key = "socks5://@127.0.0.1:1099";
  mem.__resetProxyRefusalMemoryForTesting();
  // No refusal memory: declared order alone would pick node-1; the sibling
  // serves node-1, so the pick steers to node-2.
  const steered = trigger.pickLiveMember(
    key,
    ["node-1", "node-2", "node-3"],
    new Set(),
    now,
    new Set(["node-1"])
  );
  assert.equal(steered, "node-2");
  // Without the sibling signal the declared order holds.
  const plain = trigger.pickLiveMember(key, ["node-1", "node-2", "node-3"], new Set(), now);
  assert.equal(plain, "node-1");
  // A sibling serving a name outside the member list changes nothing.
  const disjoint = trigger.pickLiveMember(
    key,
    ["node-1", "node-2"],
    new Set(),
    now,
    new Set(["node-9"])
  );
  assert.equal(disjoint, "node-1");
  mem.__resetProxyRefusalMemoryForTesting();
});

test("sibling serving the first candidate steers the switch to the second", async () => {
  reset();
  const fake = await startFakeCore({
    "group-a": { current: "node-1", members: ["node-1", "node-2", "node-3"] },
    "group-b": { current: "node-1", members: ["node-1", "node-2", "node-3"] },
  });
  const feedSrv = await startFeedServer();
  try {
    const { idA, idB } = await bindTwoSelectors(feedSrv.url, fake.base, "shared-secret");
    const t0 = Date.now();
    const res = await trigger.maybeSwitchOnSetAside(KEY_A, { nowMs: t0 });
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.deepEqual(fake.groups["group-a"]!.puts, ["node-2"]);
    await sub.deleteSubscription(idA);
    await sub.deleteSubscription(idB);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test("all free members set aside falls back to the least recently set aside", async () => {
  reset();
  const fake = await startFakeCore({
    "group-a": { current: "node-1", members: ["node-1", "node-2"] },
    "group-b": { current: "node-1", members: ["node-1", "node-2"] },
  });
  const feedSrv = await startFeedServer();
  try {
    const { idA, idB } = await bindTwoSelectors(feedSrv.url, fake.base, "shared-secret");
    const now = Date.now();
    mem.noteProxyMemberRefusal(KEY_A, "node-2", "ip_quota_429", now + 10);
    mem.noteProxyMemberRefusal(KEY_A, "node-1", "ip_quota_429", now);
    const res = await trigger.maybeSwitchOnSetAside(KEY_A, { nowMs: now + 20 });
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.deepEqual(fake.groups["group-a"]!.puts, ["node-2"]);
    await sub.deleteSubscription(idA);
    await sub.deleteSubscription(idB);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test("unreadable sibling keeps the current order and still switches", async () => {
  reset();
  const fake = await startFakeCore({
    "group-a": { current: "node-2", members: ["node-1", "node-2", "node-3"] },
    "group-b": { current: "node-1", members: ["node-1", "node-2", "node-3"] },
  });
  fake.groups["group-b"]!.failGet = true;
  const feedSrv = await startFeedServer();
  try {
    const { idA, idB } = await bindTwoSelectors(feedSrv.url, fake.base, "shared-secret");
    const t0 = Date.now();
    const res = await trigger.maybeSwitchOnSetAside(KEY_A, { nowMs: t0 });
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.deepEqual(fake.groups["group-a"]!.puts, ["node-1"]);
    await sub.deleteSubscription(idA);
    await sub.deleteSubscription(idB);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test("single selector keeps the current order with no extra read", async () => {
  reset();
  const fake = await startFakeCore({
    "group-a": { current: "node-3", members: ["node-1", "node-2", "node-3"] },
  });
  const feedSrv = await startFeedServer();
  try {
    const created = await sub.createSubscription({
      name: "sel-unserved-single",
      url: feedSrv.url,
      enabled: true,
      localCoreEndpoint: "socks5://127.0.0.1:1081 selector=group-a",
      controlUrl: fake.base,
      controlSecret: "shared-secret",
    });
    await sub.syncSubscription(created.id);
    const t0 = Date.now();
    const before = fake.getCount();
    const res = await trigger.maybeSwitchOnSetAside(KEY_A, { nowMs: t0 });
    const after = fake.getCount();
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.deepEqual(fake.groups["group-a"]!.puts, ["node-1"]);
    assert.equal(after - before, 2);
    await sub.deleteSubscription(created.id);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test("disjoint members keep the current order", async () => {
  reset();
  const fake = await startFakeCore({
    "group-a": { current: "node-2", members: ["node-1", "node-2"] },
    "group-b": { current: "node-9", members: ["node-9", "node-8"] },
  });
  const feedSrv = await startFeedServer();
  try {
    const { idA, idB } = await bindTwoSelectors(feedSrv.url, fake.base, "shared-secret");
    const t0 = Date.now();
    const res = await trigger.maybeSwitchOnSetAside(KEY_A, { nowMs: t0 });
    assert.equal(res.switched, true, JSON.stringify(res));
    assert.deepEqual(fake.groups["group-a"]!.puts, ["node-1"]);
    await sub.deleteSubscription(idA);
    await sub.deleteSubscription(idB);
  } finally {
    await feedSrv.close();
    await fake.close();
  }
});

test.after(() => {
  proxyHealth.__setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
