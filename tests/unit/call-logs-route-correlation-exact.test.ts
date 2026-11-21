// The exact correlation filter of getCallLogs (index seek) only helps when the route reads
// `correlationIdExact` and the detail modal sends it instead of the substring `correlationId`.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { readSrc } from "../_helpers/readSrc";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cid-exact-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { GET, rowMatchesFilter } = await import("../../src/app/api/usage/call-logs/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seed(id: string, correlationId: string, minutesAgo: number) {
  core
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO call_logs (id, timestamp, method, path, status, model, provider, account, duration, tokens_in, tokens_out, correlation_id)
       VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'gpt-4', 'openai', 'acc', 10, 1, 1, ?)`
    )
    .run(id, new Date(Date.now() - minutesAgo * 60_000).toISOString(), correlationId);
}

async function listIds(query: string): Promise<string[]> {
  const res = await GET(new Request(`http://localhost/api/usage/call-logs?${query}`));
  assert.equal(res.status, 200);
  const rows = (await res.json()) as Array<{ id: string }>;
  return rows.map((row) => row.id).sort();
}

test("correlationIdExact keeps only rows with the identical correlation id", () => {
  const filter = { correlationIdExact: "req-42" };
  assert.equal(rowMatchesFilter({ correlationId: "req-42" }, filter), true);
  assert.equal(rowMatchesFilter({ correlationId: "req-42-retry" }, filter), false);
  assert.equal(rowMatchesFilter({ correlationId: "xreq-42" }, filter), false);
  assert.equal(rowMatchesFilter({ correlationId: null }, filter), false);
});

test("correlationId keeps the substring match", () => {
  assert.equal(
    rowMatchesFilter({ correlationId: "req-42-retry" }, { correlationId: "req-42" }),
    true
  );
});

test("GET reads correlationIdExact from the query and returns only the exact row", async () => {
  seed("exact-row", "req-42", 1);
  seed("longer-row", "req-42-retry", 2);
  seed("prefixed-row", "xreq-42", 3);

  assert.deepEqual(await listIds("correlationIdExact=req-42"), ["exact-row"]);
  assert.deepEqual(await listIds("correlationId=req-42"), [
    "exact-row",
    "longer-row",
    "prefixed-row",
  ]);
});

test("the detail modal polls related logs with the exact correlation filter", () => {
  const source = readSrc("src/shared/components/RequestLoggerV2.tsx");
  assert.match(
    source,
    /\/api\/usage\/call-logs\?correlationIdExact=\$\{encodeURIComponent\(cid\)\}/
  );
  assert.doesNotMatch(source, /\/api\/usage\/call-logs\?correlationId=/);
});
