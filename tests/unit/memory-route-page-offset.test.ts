import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-page-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/memory/store.ts");
const memoryRoute = await import("../../src/app/api/memory/route.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");

async function seedMemories(count: number) {
  for (let i = 0; i < count; i++) {
    await store.createMemory({
      apiKeyId: "key-a",
      sessionId: "session-a",
      type: MemoryType.FACTUAL,
      key: `note:${i}`,
      content: `Note number ${i}`,
      metadata: {},
      expiresAt: null,
    });
  }
}

async function getPage(query: string) {
  const response = await memoryRoute.GET(
    new Request(`http://localhost/api/memory?apiKeyId=key-a&${query}`)
  );
  assert.equal(response.status, 200);
  return (await response.json()) as { data: Array<{ id: string }>; page: number; total: number };
}

test.before(async () => {
  core.resetDbInstance();
  await seedMemories(5);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /api/memory page=N returns a different slice for each page", async () => {
  const seen = new Set<string>();
  for (const page of [1, 2, 3]) {
    const body = await getPage(`limit=2&page=${page}`);
    assert.equal(body.page, page);
    assert.equal(body.data.length, page === 3 ? 1 : 2);
    for (const memory of body.data) {
      assert.equal(seen.has(memory.id), false, `page ${page} repeated memory ${memory.id}`);
      seen.add(memory.id);
    }
  }
  assert.equal(seen.size, 5);
});

test("GET /api/memory explicit offset=0 wins over page", async () => {
  const first = await getPage("limit=2&page=1");
  const body = await getPage("limit=2&page=2&offset=0");
  assert.equal(body.page, 1);
  assert.deepEqual(
    body.data.map((memory) => memory.id),
    first.data.map((memory) => memory.id)
  );
});
