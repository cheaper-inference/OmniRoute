import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Shared-egress pool ordering (opt-in via PROXY_POOL_SHARED_EGRESS_ORDER,
// default off; also needs PROXY_SKIP_RECENTLY_FAILED for the refusal signal):
// a pool member whose recently observed egress address matches a refused
// member's address ranks just below healthy members for providers whose quota
// is bucketed by egress address — without ever excluding anyone. A member
// whose observed addresses stay inside a single IPv4 range carries that
// range's key, so two members rotating inside one range are told apart like
// two members sharing one address; a member whose addresses cross two ranges
// stays unknown, and so does a member whose window was cut by the read
// ceiling. With either flag off (the default) or a provider outside that list
// the order stays exactly the plain rotation.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-shared-egress-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const operatorStore = await import("../../src/lib/db/proxyOperatorEgress.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  proxyLogger.clearProxyLogs();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  memory.__resetProxyRefusalMemoryForTesting();
  if (typeof rotation.__resetHotEgressCacheForTesting === "function") {
    rotation.__resetHotEgressCacheForTesting();
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Member = { type: string; host: string; port: number };
let seq = 0;

function member(): Member {
  seq++;
  return { type: "http", host: `10.9.0.${seq}`, port: 9200 + seq };
}

function keyOf(m: Member) {
  return memory.proxyEgressKey(m);
}

function refuse(m: Member) {
  memory.noteProxyRefusal(keyOf(m), "ip_quota_429");
}

function logEgress(m: Member, egressIp: string | null) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode-go",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host: m.host, port: m.port },
    egressIp,
  });
}

function logEgressOld(m: Member, egressIp: string | null, ageMs: number) {
  // Backdate by writing directly: the logger stamps Date.now(), so shift the
  // row afterwards. Bounded helper for the window test only.
  logEgress(m, egressIp);
  flush();
  const db = core.getDbInstance();
  const old = new Date(Date.now() - ageMs).toISOString();
  db.prepare(
    `UPDATE proxy_logs SET timestamp = ? WHERE proxy_host = ? AND proxy_port = ? AND egress_ip = ?`
  ).run(old, m.host, m.port, egressIp);
}

function flush() {
  proxyLogger.flushProxyLogsSync();
}

function hotFor(members: Member[], provider: string | null = "opencode-go") {
  return rotation.buildHotEgressPredicate(provider, members);
}

async function dbPool(size: number): Promise<Member[]> {
  const members: Member[] = [];
  for (let i = 0; i < size; i++) {
    const m = member();
    const proxy = await proxiesDb.createProxy({ name: `member ${seq}`, ...m });
    await proxiesDb.addProxyToScopePool("provider", "opencode-go", proxy.id);
    members.push(m);
  }
  return members;
}

async function pick() {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "opencode-go");
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("a member sharing the refused egress address is demoted below healthy members", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("same address on two members: the healthy one serves first, nobody is removed", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: hotFor([a, b]) });
  assert.equal(ranked.length, 2);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("a provider outside the per-address-quota list is untouched", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const pred = rotation.buildHotEgressPredicate("openai", [a, b]);
  assert.equal(pred(a), false);
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("a missing observation keeps the current order", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  const pred = hotFor([a, b, c]);
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, c.host, a.host]
  );
});

test("a fully shared pool keeps its order and size", () => {
  const a = member();
  const b = member();
  refuse(a);
  refuse(b);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: hotFor([a, b]) });
  assert.equal(ranked.length, 2);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [a.host, b.host]
  );
});

test("an IPv6 member sharing the refused /64 is demoted, another /64 is not", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  logEgress(a, "2001:db8:1::1");
  logEgress(b, "2001:db8:1::2");
  logEgress(c, "2001:db8:2::1");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("normalizeEgressAddressForRanking: v4 whole, v6 /64, mapped, invalid", () => {
  const normalize = rotation.normalizeEgressAddressForRanking;
  assert.equal(normalize("203.0.113.7"), "203.0.113.7");
  assert.equal(normalize("2001:DB8:1::1"), "v6:2001:db8:1:0");
  assert.equal(normalize("2001:db8:1:0:0:0:0:2"), "v6:2001:db8:1:0");
  assert.equal(normalize("::ffff:203.0.113.7"), "203.0.113.7");
  assert.equal(normalize("fe80::1%eth0"), null);
  assert.equal(normalize("not-an-ip"), null);
  assert.equal(normalize(null), null);
  assert.equal(normalize(""), null);
});

test("functional: the second request avoids the refused egress address", async () => {
  const [a, b, c] = await dbPool(3);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(c, "203.0.113.44");
  flush();
  assert.equal(await pick(), a.host);
  noteProxyOutcome("opencode-go", {
    proxy: { type: "http", host: a.host, port: a.port },
    upstreamStatus: 429,
  });
  // The refusal memory now decides by (address, provider) at read time: the
  // member sharing the refused address is skipped too, so the healthy member
  // serves (before, this pick served b — the address-sharing member).
  assert.equal(await pick(), c.host);
});

test("functional: with the flag off the pool serves the head even when egress is shared", async () => {
  const [a, b] = await dbPool(2);
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  try {
    assert.equal(await pick(), a.host);
  } finally {
    process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
    process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  }
});

test("a member rotating inside one range is not demoted by an exact address", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  logEgress(b, "203.0.113.99");
  flush();
  const pred = hotFor([a, b]);
  // b rotates inside one range, so it carries the range key: a range key never
  // equals the exact address a was refused on, so b is not demoted. a is
  // refused (avoided), so it still ranks last by the refusal signal; b serves
  // first.
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("an observation older than 30 minutes is ignored: not demoted", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgressOld(a, "203.0.113.7", 31 * 60_000);
  logEgress(b, "203.0.113.7");
  flush();
  const pred = hotFor([a, b]);
  // a's observation is outside the window: no hot address seeded from it,
  // so b is not demoted. a still ranks last by the refusal signal itself.
  assert.equal(pred(b), false);
  const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
  assert.deepEqual(
    ranked.map((m) => m.host),
    [b.host, a.host]
  );
});

test("skip on plus new flag off never demotes for shared egress", () => {
  const a = member();
  const b = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(b, "203.0.113.7");
  flush();
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  try {
    // The new flag is off: no shared-egress demotion. a still ranks last by
    // the skip-recently-failed refusal signal itself; b serves first.
    const pred = hotFor([a, b]);
    assert.equal(pred(b), false);
    const ranked = rotation.rankPoolCandidates([a, b], { sharesHotEgress: pred });
    assert.deepEqual(
      ranked.map((m) => m.host),
      [b.host, a.host]
    );
  } finally {
    process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  }
});

test("a member whose two observed addresses sit in one range carries that range key", () => {
  const a = member();
  // Two /24s of the same /16: the member carries the range key, never the
  // exact addresses it was seen on.
  logEgress(a, "203.0.113.7");
  logEgress(a, "203.0.114.9");
  flush();
  const keys = rotation.readEgressKeysForMember(a).keys;
  assert.ok(keys.has("r16:203.0.0.0/16"));
  assert.equal(keys.has("203.0.113.7"), false);
  assert.equal(keys.has("203.0.114.9"), false);
  assert.equal(keys.size, 1);
});

test("two members of one range: the refused one ranks the other after a member of another range", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  // a and b rotate inside the same /16, on addresses they never share; c sits
  // on a single address of another range.
  logEgress(a, "203.0.113.7");
  logEgress(a, "203.0.114.9");
  logEgress(b, "203.0.120.3");
  logEgress(b, "203.0.121.4");
  logEgress(c, "198.51.100.9");
  flush();
  const ranked = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  // The range key is what a and b share: c, on another range, serves first,
  // b is demoted below it, and nobody is removed.
  assert.equal(ranked.length, 3);
  assert.deepEqual(
    ranked.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("a member whose addresses cross two ranges stays unknown", () => {
  const refused = member();
  const crossing = member();
  const oneRange = member();
  refuse(refused);
  logEgress(refused, "203.0.113.7");
  logEgress(refused, "203.0.114.9");
  logEgress(crossing, "203.0.113.7");
  logEgress(crossing, "198.51.100.9");
  logEgress(oneRange, "203.0.120.3");
  logEgress(oneRange, "203.0.121.4");
  flush();
  // Two ranges in the window: the member reads as unknown and carries no key.
  assert.equal(rotation.readEgressKeysForMember(crossing).keys.size, 0);
  const pred = hotFor([refused, crossing, oneRange]);
  assert.equal(pred(crossing), false);
  // Control: the same predicate demotes a member that stays inside one range.
  assert.equal(pred(oneRange), true);
});

test("with the flag off the order is the plain rotation order", () => {
  const a = member();
  const b = member();
  const c = member();
  refuse(a);
  logEgress(a, "203.0.113.7");
  logEgress(a, "203.0.114.9");
  logEgress(b, "203.0.120.3");
  logEgress(b, "203.0.121.4");
  logEgress(c, "198.51.100.9");
  flush();
  delete process.env.PROXY_POOL_SHARED_EGRESS_ORDER;
  try {
    // Flag off: the shared-egress signal is inert, so the order is the plain
    // rotation order — the refused member last, the other two in input order.
    const off = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
    assert.deepEqual(
      off.map((m) => m.host),
      [b.host, c.host, a.host]
    );
  } finally {
    process.env.PROXY_POOL_SHARED_EGRESS_ORDER = "true";
  }
  // Same data, flag on: the member sharing the refused member's range is
  // demoted below the member of another range.
  const on = rotation.rankPoolCandidates([a, b, c], { sharesHotEgress: hotFor([a, b, c]) });
  assert.deepEqual(
    on.map((m) => m.host),
    [c.host, b.host, a.host]
  );
});

test("an IPv6 member keeps its /64 key", () => {
  const a = member();
  const b = member();
  const c = member();
  logEgress(a, "2001:db8:1::1");
  logEgress(b, "2001:db8:1::2");
  logEgress(c, "2001:db8:2::1");
  logEgress(c, "2001:db8:3::1");
  flush();
  // One IPv6 address: the /64 key, unchanged.
  assert.deepEqual([...rotation.readEgressKeysForMember(a).keys], ["v6:2001:db8:1:0"]);
  // Two addresses of one /64 collapse to that same key.
  assert.deepEqual([...rotation.readEgressKeysForMember(b).keys], ["v6:2001:db8:1:0"]);
  // Two different /64s are two ranges: the member stays unknown.
  assert.equal(rotation.readEgressKeysForMember(c).keys.size, 0);
});

test("a member whose window holds more addresses than the read ceiling reads as unknown", () => {
  const a = member();
  for (let i = 1; i <= 11; i++) logEgress(a, `203.0.113.${i}`);
  flush();
  // The read is cut at the ceiling: the window is not shown to stay inside one
  // range, so the member reads as unknown.
  assert.equal(rotation.readEgressKeysForMember(a).keys.size, 0);
});

test("a window cut at the read ceiling with one IPv6 /64 still reads as unknown", () => {
  const a = member();
  for (let i = 1; i <= 11; i++) logEgress(a, `2001:db8:1::${i.toString(16)}`);
  flush();
  // One /64 key, but eleven rows were observed: the ceiling says the window
  // may hold more, so the member stays unknown.
  assert.equal(rotation.readEgressKeysForMember(a).keys.size, 0);
});

test("a member showing both address families reads as unknown", () => {
  const a = member();
  logEgress(a, "203.0.113.7");
  logEgress(a, "2001:db8:1::1");
  flush();
  // Another family is another range.
  assert.equal(rotation.readEgressKeysForMember(a).keys.size, 0);
});

test("an unusable address is refused", () => {
  const a = member();
  logEgress(a, "not-an-ip");
  logEgress(a, "203.0.113.7");
  flush();
  // The unusable address is dropped and the usable one stays the exact key:
  // no range key is invented out of an address nobody can read.
  assert.deepEqual([...rotation.readEgressKeysForMember(a).keys], ["203.0.113.7"]);
});

test("the hot egress cache never grows past 200 entries", () => {
  rotation.__resetHotEgressCacheForTesting();
  try {
    const first = member();
    logEgress(first, "203.0.113.7");
    flush();
    // 201 distinct members read: the cache keeps at most 200 entries, so the
    // first one is evicted.
    for (let i = 0; i < 200; i++) rotation.readEgressKeysForMember(member());
    logEgress(first, "203.0.114.9");
    flush();
    // The entry was evicted, so this read is fresh and sees the new address.
    assert.deepEqual([...rotation.readEgressKeysForMember(first).keys], ["r16:203.0.0.0/16"]);
  } finally {
    rotation.__resetHotEgressCacheForTesting();
  }
});

test("the operator source keeps exact keys", () => {
  const a = member();
  process.env.PROXY_OPERATOR_EGRESS_ENABLED = "true";
  try {
    operatorStore.upsertOperatorEgress([
      {
        host: a.host,
        port: a.port,
        addresses: ["203.0.113.7", "203.0.114.9"],
        observedAt: new Date().toISOString(),
      },
    ]);
    // The operator pushes exact addresses: two of them stay two keys, even
    // inside one range.
    assert.deepEqual([...rotation.readEgressKeysForMember(a).keys].sort(), [
      "203.0.113.7",
      "203.0.114.9",
    ]);
  } finally {
    delete process.env.PROXY_OPERATOR_EGRESS_ENABLED;
    rotation.__resetHotEgressCacheForTesting();
  }
});
