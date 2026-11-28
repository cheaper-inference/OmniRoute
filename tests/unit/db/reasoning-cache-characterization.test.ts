/**
 * Characterization of the reasoning replay cache DB module (src/lib/db/reasoningCache.ts)
 * against a real SQLite database. Passes unchanged before and after the storage moved
 * behind ReasoningCacheStore: same rows written, same rows hidden, same counts returned.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "reasoning-cache-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const cache = await import("../../../src/lib/db/reasoningCache.ts");

const PLACEHOLDER = "(prior reasoning summary unavailable)";

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type RawRow = {
  tool_call_id: string;
  provider: string;
  model: string;
  reasoning: string;
  char_count: number;
  created_at: string;
  expires_at: number | string;
};

function raw(toolCallId: string): RawRow | undefined {
  return core
    .getDbInstance()
    .prepare("SELECT * FROM reasoning_cache WHERE tool_call_id = ?")
    .get(toolCallId) as RawRow | undefined;
}

function insertRaw(
  toolCallId: string,
  expiresAt: number | string,
  overrides: Partial<Omit<RawRow, "tool_call_id" | "expires_at">> = {}
): void {
  const row = {
    provider: "deepseek",
    model: "deepseek-chat",
    reasoning: `reasoning ${toolCallId}`,
    created_at: "2026-01-01 00:00:00",
    ...overrides,
  };
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO reasoning_cache
         (tool_call_id, provider, model, reasoning, char_count, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      toolCallId,
      row.provider,
      row.model,
      row.reasoning,
      row.char_count ?? row.reasoning.length,
      row.created_at,
      expiresAt
    );
}

const nowSeconds = () => Math.floor(Date.now() / 1000);

test("set writes integer epoch-second expiry, char_count and datetime('now') created_at", () => {
  const before = nowSeconds();
  cache.setReasoningCache("call_a", "deepseek", "deepseek-chat", "Thinking...", 60_000);
  const after = nowSeconds();
  const row = raw("call_a");
  assert.ok(row);
  assert.equal(typeof row.expires_at, "number");
  assert.ok((row.expires_at as number) >= before + 60 && (row.expires_at as number) <= after + 60);
  assert.equal(row.char_count, "Thinking...".length);
  assert.match(row.created_at, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  // SQLite datetime('now') is UTC.
  const createdMs = Date.parse(`${row.created_at.replace(" ", "T")}Z`);
  assert.ok(Math.abs(createdMs - Date.now()) < 5_000, row.created_at);
  assert.deepEqual(
    { provider: row.provider, model: row.model, reasoning: row.reasoning },
    { provider: "deepseek", model: "deepseek-chat", reasoning: "Thinking..." }
  );
});

test("set defaults to a two-hour TTL", () => {
  const before = nowSeconds();
  cache.setReasoningCache("call_default", "deepseek", "deepseek-chat", "x");
  const expires = raw("call_default")?.expires_at as number;
  assert.ok(expires >= before + 7200 && expires <= nowSeconds() + 7200);
});

test("set skips empty reasoning and the internal placeholder (trimmed)", () => {
  cache.setReasoningCache("call_empty", "deepseek", "deepseek-chat", "");
  cache.setReasoningCache("call_ph", "deepseek", "deepseek-chat", `  ${PLACEHOLDER}\n`);
  assert.equal(raw("call_empty"), undefined);
  assert.equal(raw("call_ph"), undefined);
});

test("set truncates to 10000 characters and counts the stored length", () => {
  cache.setReasoningCache("call_long", "deepseek", "deepseek-chat", "B" + "A".repeat(12_000));
  const row = raw("call_long");
  assert.equal(row?.reasoning.length, 10_000);
  assert.ok(row?.reasoning.startsWith("BA"));
  assert.equal(row?.char_count, 10_000);
});

test("set replaces an existing entry for the same tool_call_id", () => {
  cache.setReasoningCache("call_dup", "deepseek", "deepseek-chat", "first");
  cache.setReasoningCache("call_dup", "kimi", "kimi-k2", "second");
  const count = core.getDbInstance().prepare("SELECT COUNT(*) AS n FROM reasoning_cache").get() as {
    n: number;
  };
  assert.equal(count.n, 1);
  assert.deepEqual(cache.getReasoningCache("call_dup")?.provider, "kimi");
  assert.equal(cache.getReasoningCache("call_dup")?.reasoning, "second");
});

test("get returns live entries with an ISO expiry and hides missing, expired and placeholder rows", () => {
  const future = nowSeconds() + 600;
  insertRaw("call_live", future);
  insertRaw("call_expired", nowSeconds() - 5);
  insertRaw("call_ph", future, { reasoning: ` ${PLACEHOLDER} ` });

  assert.deepEqual(cache.getReasoningCache("call_live"), {
    reasoning: "reasoning call_live",
    provider: "deepseek",
    model: "deepseek-chat",
    expiresAt: new Date(future * 1000).toISOString(),
  });
  assert.equal(cache.getReasoningCache("call_expired"), null);
  assert.equal(cache.getReasoningCache("call_ph"), null);
  assert.equal(cache.getReasoningCache("call_missing"), null);
});

test("legacy expiry encodings: numeric text and ISO strings are honored; empty and garbage count as expired", () => {
  const futureSeconds = nowSeconds() + 600;
  const futureIso = new Date(Date.now() + 600_000).toISOString();
  insertRaw("call_numeric_text", String(futureSeconds));
  insertRaw("call_iso_live", futureIso);
  insertRaw("call_iso_expired", new Date(Date.now() - 600_000).toISOString());
  insertRaw("call_empty", "");
  insertRaw("call_garbage", "not-a-date");

  assert.equal(
    cache.getReasoningCache("call_numeric_text")?.expiresAt,
    new Date(futureSeconds * 1000).toISOString()
  );
  assert.equal(cache.getReasoningCache("call_iso_live")?.expiresAt, futureIso);
  for (const id of ["call_iso_expired", "call_empty", "call_garbage"]) {
    assert.equal(cache.getReasoningCache(id), null, id);
  }
  assert.equal(cache.cleanupExpiredReasoning(), 3);
  assert.equal(cache.getReasoningCacheStats().totalEntries, 2);
});

test("an entry expiring this very second is already expired for get, stats and cleanup", () => {
  // Time only moves forward, so expires_at <= now holds even if the second ticks mid-test.
  insertRaw("call_boundary", nowSeconds());
  assert.equal(cache.getReasoningCache("call_boundary"), null);
  assert.equal(cache.getReasoningCacheStats().totalEntries, 0);
  assert.equal(cache.cleanupExpiredReasoning(), 1);
});

test("get rejects a placeholder row before formatting its expiry; other unformattable expiries still throw", () => {
  // 8640000000001 s is live for SQLite but beyond the range of a JavaScript Date.
  const farFuture = 8_640_000_000_001;
  insertRaw("call_ph_far", farFuture, { reasoning: PLACEHOLDER });
  insertRaw("call_far", farFuture);
  assert.equal(cache.getReasoningCache("call_ph_far"), null);
  assert.throws(() => cache.getReasoningCache("call_far"), RangeError);
});

test("delete removes one entry, expired or not, and reports the row count", () => {
  insertRaw("call_live", nowSeconds() + 600);
  insertRaw("call_expired", nowSeconds() - 5);
  assert.equal(cache.deleteReasoningCache("call_expired"), 1);
  assert.equal(cache.deleteReasoningCache("call_live"), 1);
  assert.equal(cache.deleteReasoningCache("call_live"), 0);
});

test("cleanup removes only expired rows and returns how many", () => {
  insertRaw("call_live", nowSeconds() + 600);
  insertRaw("call_expired_a", nowSeconds() - 5);
  insertRaw("call_expired_b", nowSeconds() - 500);
  assert.equal(cache.cleanupExpiredReasoning(), 2);
  assert.ok(raw("call_live"));
  assert.equal(cache.cleanupExpiredReasoning(), 0);
});

test("clear removes everything, or one provider's rows including expired ones", () => {
  insertRaw("call_ds_live", nowSeconds() + 600);
  insertRaw("call_ds_expired", nowSeconds() - 5);
  insertRaw("call_kimi", nowSeconds() + 600, { provider: "kimi" });
  assert.equal(cache.clearAllReasoningCache("deepseek"), 2);
  assert.ok(raw("call_kimi"));
  assert.equal(cache.clearAllReasoningCache(""), 1);
  assert.equal(cache.clearAllReasoningCache(), 0);
});

test("stats aggregate live rows only, by provider and model, with oldest/newest created_at", () => {
  const future = nowSeconds() + 600;
  insertRaw("a", future, { reasoning: "aaaa", created_at: "2026-01-02 00:00:00" });
  insertRaw("b", future, { reasoning: "bb", created_at: "2026-01-01 00:00:00" });
  insertRaw("c", future, {
    provider: "kimi",
    model: "kimi-k2",
    reasoning: "ccc",
    created_at: "2026-01-03 00:00:00",
  });
  insertRaw("expired", nowSeconds() - 5, {
    reasoning: "zzzzzzzz",
    created_at: "2025-01-01 00:00:00",
  });

  const stats = cache.getReasoningCacheStats();
  // Groups keep the SQL order (most entries first), which is what the dashboard JSON lists.
  assert.deepEqual(Object.keys(stats.byProvider), ["deepseek", "kimi"]);
  assert.deepEqual(Object.keys(stats.byModel), ["deepseek-chat", "kimi-k2"]);
  assert.deepEqual(stats, {
    totalEntries: 3,
    totalChars: 9,
    byProvider: { deepseek: { entries: 2, chars: 6 }, kimi: { entries: 1, chars: 3 } },
    byModel: { "deepseek-chat": { entries: 2, chars: 6 }, "kimi-k2": { entries: 1, chars: 3 } },
    oldestEntry: "2026-01-01 00:00:00",
    newestEntry: "2026-01-03 00:00:00",
  });
});

test("stats on an empty table", () => {
  assert.deepEqual(cache.getReasoningCacheStats(), {
    totalEntries: 0,
    totalChars: 0,
    byProvider: {},
    byModel: {},
    oldestEntry: null,
    newestEntry: null,
  });
});

test("entries: live only, newest first, camelCase with ISO expiry, filters, default 50 and clamp 200", () => {
  const future = nowSeconds() + 600;
  for (let i = 0; i < 205; i++) {
    insertRaw(`call_${String(i).padStart(3, "0")}`, future, {
      created_at: `2026-01-01 00:${String(Math.floor(i / 60)).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`,
      ...(i % 2 ? { provider: "kimi", model: "kimi-k2" } : {}),
    });
  }
  insertRaw("call_expired", nowSeconds() - 5, { created_at: "2027-01-01 00:00:00" });

  const page = cache.getReasoningCacheEntries();
  assert.equal(page.length, 50);
  assert.equal(page[0].toolCallId, "call_204");
  assert.deepEqual(page[0], {
    toolCallId: "call_204",
    provider: "deepseek",
    model: "deepseek-chat",
    reasoning: "reasoning call_204",
    charCount: "reasoning call_204".length,
    createdAt: "2026-01-01 00:03:24",
    expiresAt: new Date(future * 1000).toISOString(),
  });
  assert.equal(cache.getReasoningCacheEntries({ limit: 1000 }).length, 200);
  assert.deepEqual(
    cache.getReasoningCacheEntries({ limit: 2, offset: 1 }).map((e) => e.toolCallId),
    ["call_203", "call_202"]
  );
  const kimi = cache.getReasoningCacheEntries({ provider: "kimi", limit: 200 });
  assert.equal(kimi.length, 102);
  assert.ok(kimi.every((e) => e.provider === "kimi"));
  assert.equal(cache.getReasoningCacheEntries({ model: "deepseek-chat", limit: 200 }).length, 103);
  assert.equal(
    cache.getReasoningCacheEntries({ provider: "kimi", model: "deepseek-chat" }).length,
    0
  );
});
