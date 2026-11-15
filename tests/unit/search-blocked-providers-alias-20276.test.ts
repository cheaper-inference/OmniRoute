import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-search-blocked-alias-20276-test-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "search-blocked-alias-test-secret";

const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { POST } = await import("../../src/app/api/v1/search/route.ts");

test("POST /v1/search rejects blocked search provider requested via alias (kimi-search via moonshot) with 403 (#20276)", async () => {
  await updateSettings({ blockedProviders: ["kimi-search"] });

  const req = new Request("http://localhost:20128/v1/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "test query", provider: "moonshot" }),
  });

  const response = await POST(req);
  assert.equal(response.status, 403);
  const data = await response.json();
  assert.match(data.error.message, /blocked by security policy/i);
});

test("POST /v1/search rejects blocked search provider requested via shorthand alias (x-search via x) with 403 (#20276)", async () => {
  await updateSettings({ blockedProviders: ["x-search"] });

  const req = new Request("http://localhost:20128/v1/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "test query", provider: "x" }),
  });

  const response = await POST(req);
  assert.equal(response.status, 403);
  const data = await response.json();
  assert.match(data.error.message, /blocked by security policy/i);
});
