import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lockout-episode-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");

const MODEL = "gemini-2.5-pro";
const BODY = '{"error":{"code":429,"message":"Too many requests","status":"RESOURCE_EXHAUSTED"}}';

test.beforeEach(() => fallback.clearAllModelLockouts());

test.after(() => {
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seed(name: string) {
  const created = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name,
    apiKey: `sk-synthetic-${name}`,
    isActive: true,
    testStatus: "active",
  });
  assert.ok(created?.id);
  return created.id as string;
}

const mark = (id: string, body = BODY, headers?: Record<string, string>) =>
  auth.markAccountUnavailable(id, 429, body, "gemini", MODEL, null, { headers });

test("parallel requests that hit one 429 count as one backoff step", async () => {
  const id = await seed("episode-parallel");
  const results = await Promise.all([mark(id), mark(id), mark(id)]);

  const lock = fallback.getModelLockoutInfo("gemini", id, MODEL);
  assert.ok(lock, "the model is locked");
  assert.equal(lock.failureCount, 1, "three parallel hits are one episode");
  for (const result of results) assert.equal(result.shouldFallback, true);
  const cooldowns = results.map((r) => r.cooldownMs);
  assert.ok(
    Math.max(...cooldowns) - Math.min(...cooldowns) < 500,
    "every caller sees one cooldown"
  );
});

test("a failure after the lockout ended is a new episode and climbs the ladder", async (t) => {
  const id = await seed("episode-next");
  const realNow = Date.now.bind(Date);
  let offsetMs = 0;
  t.mock.method(Date, "now", () => realNow() + offsetMs);

  await mark(id);
  const first = fallback.getModelLockoutInfo("gemini", id, MODEL)!;
  assert.equal(first.failureCount, 1);

  offsetMs = first.remainingMs + 1_000; // the lock ended, the failure window is still open
  assert.equal(fallback.getModelLockoutInfo("gemini", id, MODEL), null);
  await mark(id);
  assert.equal(fallback.getModelLockoutInfo("gemini", id, MODEL)!.failureCount, 2);
});

test("parallel requests that carry the same Retry-After count as one step", async () => {
  const id = await seed("episode-same-hint");
  const hint = { "retry-after": "30" };
  await Promise.all([mark(id, BODY, hint), mark(id, BODY, hint), mark(id, BODY, hint)]);
  const lock = fallback.getModelLockoutInfo("gemini", id, MODEL)!;
  assert.equal(lock.failureCount, 1);
  assert.ok(lock.remainingMs > 25_000 && lock.remainingMs <= 30_000);
});

test("a longer upstream retry hint inside an active lock still extends the lock", async () => {
  const id = await seed("episode-longer-hint");
  await mark(id);
  const before = fallback.getModelLockoutInfo("gemini", id, MODEL)!.remainingMs;
  await mark(id, BODY, { "retry-after": "600" });
  const after = fallback.getModelLockoutInfo("gemini", id, MODEL)!.remainingMs;
  assert.ok(after > before + 60_000, `lock extended from ${before} to ${after}`);
});

test("repeated capped model-unavailable 400s count as one step and keep the capped lock", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "episode-capped-400",
    apiKey: `synthetic-${"episode-capped-400"}`,
    isActive: true,
    testStatus: "active",
  });
  const id = created.id as string;
  const body =
    '{"type":"server_error","message":"Error from provider (Console): Upstream request failed: Model is unavailable."}';
  const hit = () => auth.markAccountUnavailable(id, 400, body, "opencode-zen", MODEL, null);
  await hit();
  const first = fallback.getModelLockoutInfo("opencode-zen", id, MODEL)!;
  assert.ok(first, "the first 400 locks the model");
  await Promise.all([hit(), hit(), hit()]);
  const after = fallback.getModelLockoutInfo("opencode-zen", id, MODEL)!;
  assert.equal(after.failureCount, 1, "repeat hits of the capped 400 are one episode");
  assert.equal(after.lockedAt, first.lockedAt, "a repeat hit must not restart the lock");
});
