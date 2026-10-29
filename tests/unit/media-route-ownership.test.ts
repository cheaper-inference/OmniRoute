/**
 * #16372 — GET /api/v1/media/{id} ownership. Stored media follows the files API rule
 * (`canAccessOwnedRecord`): the generating key reads it; another key, an anonymous caller or a
 * malformed id get 404; anonymous media (REQUIRE_API_KEY=false) is shared by anonymous callers
 * only and is NOT readable by an arbitrary authenticated key.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "media-route-test-api-key-secret";
delete process.env.REQUIRE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const mediaStore = await import("../../src/lib/media/mediaStore.ts");
const { ANONYMOUS_OWNER_ID } = await import("../../src/shared/constants/anonymousOwner.ts");
const mediaRoute = await import("../../src/app/api/v1/media/[id]/route.ts");

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const keyA = await apiKeysDb.createApiKey("media owner", "machine-media-a");
const keyB = await apiKeysDb.createApiKey("other tenant", "machine-media-b");

function store(ownerId: string | null): string {
  const id = mediaStore.writeMediaFile(
    Buffer.from(`clip-${ownerId}`),
    "mp4",
    mediaStore.mediaOwnerTagFor(ownerId)
  );
  assert.ok(id, "media should be stored");
  return id!;
}

async function get(id: string, apiKey?: string) {
  return mediaRoute.GET(
    new Request(`http://localhost/api/v1/media/${id}`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    }),
    { params: Promise.resolve({ id }) }
  );
}

test("the generating key reads its media; another key gets 404", async () => {
  const id = store(keyA.id);
  const own = await get(id, keyA.key);
  assert.equal(own.status, 200);
  assert.equal(own.headers.get("content-type"), "video/mp4");
  assert.equal(Buffer.from(await own.arrayBuffer()).toString(), `clip-${keyA.id}`);

  const other = await get(id, keyB.key);
  assert.equal(other.status, 404);
  const body = (await other.json()) as { error?: { message?: string } };
  assert.equal(body.error?.message, "Media not found");
});

test("anonymous media is not readable by an arbitrary authenticated key", async () => {
  const id = store(ANONYMOUS_OWNER_ID);
  assert.equal((await get(id, keyB.key)).status, 404);
  // ...but the anonymous caller that produced it (REQUIRE_API_KEY=false) can read it.
  assert.equal((await get(id)).status, 200);
});

test("an anonymous caller cannot read keyed or unowned (session) media", async () => {
  assert.equal((await get(store(keyA.id))).status, 404);
  assert.equal((await get(store(null))).status, 404);
});

test("an invalid presented key is rejected with 401", async () => {
  const response = await get(store(keyA.id), "sk-not-a-real-key");
  assert.equal(response.status, 401);
});

test("malformed ids answer 404 without touching the filesystem", async () => {
  for (const bad of ["../storage.sqlite", "anon__" + "a".repeat(32) + ".mp4", "x.mp4"]) {
    const response = await get(bad, keyA.key);
    assert.equal(response.status, 404, bad);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.ok(!JSON.stringify(body).includes("at /"), "no stack trace in the error body");
  }
});
