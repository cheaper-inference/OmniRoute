import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Mirror feed URLs can carry credentials (`https://user:token@host/…`), like
// the primary URL: every management response redacts them, and a client
// that sends a redacted mirror back keeps the stored credentials.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mirror-redact-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "mirror-redact-test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required

const core = await import("../../src/lib/db/core.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");
const collectionRoute =
  await import("../../src/app/api/v1/management/proxy-subscriptions/route.ts");
const itemRoute = await import("../../src/app/api/v1/management/proxy-subscriptions/[id]/route.ts");

const BASE = "http://localhost/api/v1/management/proxy-subscriptions";
const SECRET_MIRROR = "https://mirror-user:mirror-token@mirror.example.com/feed";
const PLAIN_MIRROR = "https://plain.example.com/feed";

function jsonRequest(url: string, body: unknown, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("redactSubscriptionRecord redacts the primary and every mirror", () => {
  const view = sub.redactSubscriptionRecord({
    url: "https://u:p@primary.example.com/feed",
    mirrorUrls: [SECRET_MIRROR, PLAIN_MIRROR],
  });
  assert.equal(view.url, "https://primary.example.com/feed");
  assert.deepEqual(view.mirrorUrls, ["https://mirror.example.com/feed", PLAIN_MIRROR]);
});

test("management responses never return mirror credentials", async () => {
  const created = await collectionRoute.POST(
    jsonRequest(BASE, {
      name: "mirrored",
      url: "https://example.com/primary",
      mirrorUrls: [SECRET_MIRROR, PLAIN_MIRROR],
    })
  );
  assert.equal(created.status, 201);
  const createdText = await created.text();
  assert.ok(!createdText.includes("mirror-token"), createdText);
  const { id } = JSON.parse(createdText) as { id: string };

  const listText = await (await collectionRoute.GET(new Request(BASE))).text();
  assert.ok(!listText.includes("mirror-token"), listText);
  assert.ok(listText.includes("https://mirror.example.com/feed"));

  const ctx = { params: Promise.resolve({ id }) };
  const itemText = await (await itemRoute.GET(new Request(`${BASE}/${id}`), ctx)).text();
  assert.ok(!itemText.includes("mirror-token"), itemText);

  // The stored row keeps the credentials for the server-side fetch.
  const stored = await sub.getSubscriptionById(id);
  assert.deepEqual(stored?.mirrorUrls, [SECRET_MIRROR, PLAIN_MIRROR]);
});

test("PATCH with the redacted mirror list keeps the stored credentials", async () => {
  const created = await collectionRoute.POST(
    jsonRequest(BASE, {
      name: "round-trip",
      url: "https://example.com/primary-2",
      mirrorUrls: [SECRET_MIRROR],
    })
  );
  const view = (await created.json()) as { id: string; mirrorUrls: string[] };
  assert.deepEqual(view.mirrorUrls, ["https://mirror.example.com/feed"]);

  const ctx = { params: Promise.resolve({ id: view.id }) };
  const patched = await itemRoute.PATCH(
    jsonRequest(`${BASE}/${view.id}`, { mirrorUrls: [...view.mirrorUrls, PLAIN_MIRROR] }, "PATCH"),
    ctx
  );
  assert.equal(patched.status, 200);
  const patchedText = await patched.text();
  assert.ok(!patchedText.includes("mirror-token"), patchedText);
  const stored = await sub.getSubscriptionById(view.id);
  assert.deepEqual(stored?.mirrorUrls, [SECRET_MIRROR, PLAIN_MIRROR]);
});
