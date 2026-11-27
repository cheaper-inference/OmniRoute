import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A proxy marked as a rotating endpoint (a gateway that hands out a new exit address per
// connection) is never set aside for a per-IP quota refusal: the next request already leaves
// through another address. Every other refusal policy still applies to it, and the mark
// defaults to off, so an unmarked proxy keeps today's behavior.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rotating-egress-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const rotation = await import("../../src/lib/db/proxies/rotation.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");
const { syncRotatingEgressExemptions } = await import("../../src/lib/db/proxies/rotatingEgress.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

function resetStorage() {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  proxyLogger.clearProxyLogs();
  rotation.__resetHotEgressCacheForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  memory.__resetProxyRefusalMemoryForTesting();
  rotation.__resetHotEgressCacheForTesting();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type CreatePayload = Parameters<typeof proxiesDb.createProxy>[0];
type UpdateChanges = Parameters<typeof proxiesDb.updateProxy>[1];

async function create(payload: CreatePayload) {
  const proxy = await proxiesDb.createProxy(payload);
  assert.ok(proxy);
  return proxy;
}

async function update(id: string, changes: UpdateChanges) {
  const proxy = await proxiesDb.updateProxy(id, changes);
  assert.ok(proxy);
  return proxy;
}

test("rotatingEgress persiste, nasce false e sobrevive a uma atualização que não o envia", async () => {
  const plain = await create({
    name: "n",
    type: "http",
    host: "10.7.0.2",
    port: 9002,
  });
  assert.equal(plain.rotatingEgress, false);
  const rot = await create({
    name: "r",
    type: "http",
    host: "10.7.0.1",
    port: 9001,
    rotatingEgress: true,
  });
  assert.equal(rot.rotatingEgress, true);
  assert.equal((await update(rot.id, { name: "r2" })).rotatingEgress, true);
  assert.equal((await update(rot.id, { rotatingEgress: false })).rotatingEgress, false);
});

test("schema: aceita booleano, recusa outro tipo, e não inventa padrão na atualização", () => {
  const base = { name: "r", host: "h", port: 1 };
  assert.equal(
    schemas.createProxyRegistrySchema.safeParse({ ...base, rotatingEgress: true }).success,
    true
  );
  assert.equal(
    schemas.createProxyRegistrySchema.safeParse({ ...base, rotatingEgress: "yes" }).success,
    false
  );
  const upd = schemas.updateProxyRegistrySchema.safeParse({ id: "x" });
  assert.equal(upd.success, true);
  assert.equal(upd.data.rotatingEgress, undefined);
});

const R = { type: "http", host: "10.7.0.1", port: 9001 };
const N = { type: "http", host: "10.7.0.2", port: 9002 };

test("429 de cota por um membro rotativo não o põe de lado; pelo vizinho comum, sim", async () => {
  await create({ name: "r", ...R, rotatingEgress: true });
  await create({ name: "n", ...N });
  syncRotatingEgressExemptions();
  noteProxyOutcome("opencode-go", { proxy: R, upstreamStatus: 429 });
  assert.equal(memory.isProxyAvoided(memory.proxyEgressKey(R)), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
  noteProxyOutcome("opencode-go", { proxy: N, upstreamStatus: 429 });
  assert.equal(memory.isProxyAvoided(memory.proxyEgressKey(N)), true);
});

test("as outras políticas continuam valendo para o membro rotativo", async () => {
  await create({ name: "r", ...R, rotatingEgress: true });
  syncRotatingEgressExemptions();
  const key = memory.proxyEgressKey(R);
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429"), null);
  assert.equal(memory.noteProxyRefusal(key, "proxy_unreachable"), 60_000);
  assert.equal(memory.isProxyAvoided(key), true);
});

test("marcar como rotativo encerra o período de cota em vigor", async () => {
  const n = await create({ name: "n", ...N });
  const key = memory.proxyEgressKey(N);
  memory.noteProxyRefusal(key, "ip_quota_429");
  assert.equal(memory.isProxyAvoided(key), true);
  await update(n.id, { rotatingEgress: true });
  syncRotatingEgressExemptions();
  assert.equal(memory.isProxyAvoided(key), false);
});

test("desmarcar devolve o membro ao pôr de lado por cota", async () => {
  const r = await create({ name: "r", ...R, rotatingEgress: true });
  syncRotatingEgressExemptions();
  const key = memory.proxyEgressKey(R);
  assert.equal(memory.noteProxyRefusal(key, "ip_quota_429"), null);
  await update(r.id, { rotatingEgress: false });
  syncRotatingEgressExemptions();
  assert.equal(typeof memory.noteProxyRefusal(key, "ip_quota_429"), "number");
  assert.equal(memory.isProxyAvoided(key), true);
});

test("a resolução do pool sincroniza a isenção sem chamada explícita", async () => {
  const r = await create({ name: "r", ...R, rotatingEgress: true });
  const n = await create({ name: "n", ...N });
  await proxiesDb.addProxyToScopePool("provider", "opencode-go", r.id);
  await proxiesDb.addProxyToScopePool("provider", "opencode-go", n.id);
  await proxiesDb.resolveProxyForScopeFromRegistry("provider", "opencode-go");
  assert.equal(memory.noteProxyRefusal(memory.proxyEgressKey(R), "ip_quota_429"), null);
  assert.equal(memory.isQuotaRefusalExempt(null), false);
});

test("marca rotativa em relay não entra no conjunto isento", async () => {
  await create({
    name: "relay",
    type: "vercel",
    host: "relay.example.test",
    port: 443,
    rotatingEgress: true,
  });
  syncRotatingEgressExemptions();
  assert.notEqual(memory.getQuotaExemptStamp(), null);
  assert.equal(memory.isQuotaRefusalExempt(memory.proxyEgressKey(R)), false);
  assert.equal(memory.isQuotaRefusalExempt("vercel://@relay.example.test:443"), false);
  assert.equal(memory.__quotaExemptKeyCountForTesting(), 0);
});

function logEgress(row: { type: string; host: string; port: number }, egressIp: string) {
  proxyLogger.logProxyEvent({
    status: "success",
    provider: "opencode-go",
    targetUrl: "https://api.opencode.ai/chat",
    proxy: { type: "http", host: row.host, port: row.port },
    egressIp,
  });
}

function flush() {
  proxyLogger.flushProxyLogsSync();
}

async function pick() {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "opencode-go");
  return (resolved as { proxy: { host: string } }).proxy.host;
}

test("membro rotativo não é afastado por compartilhar o endereço de um vizinho recusado", async () => {
  const A = { type: "http", host: "10.7.0.3", port: 9003 };
  const a = await create({ name: "a", ...A });
  const r = await create({ name: "r", ...R, rotatingEgress: true });
  await proxiesDb.addProxyToScopePool("provider", "opencode-go", a.id);
  await proxiesDb.addProxyToScopePool("provider", "opencode-go", r.id);
  logEgress(A, "203.0.113.7");
  logEgress(R, "203.0.113.7");
  flush();
  memory.noteProxyRefusal(memory.proxyEgressKey(A), "ip_quota_429");
  for (let i = 0; i < 4; i++) assert.equal(await pick(), R.host, `pick ${i}`);
});
