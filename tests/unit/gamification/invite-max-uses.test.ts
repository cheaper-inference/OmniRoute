import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gam-invite-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "gam-test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../../src/lib/db/core.ts");
const inviteRoute = await import("../../../src/app/api/gamification/invite/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const post = (body: unknown) =>
  new Request("http://localhost/api/gamification/invite", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("invite: a fractional maxUses answers 400", async () => {
  const res = await inviteRoute.POST(post({ apiKeyId: "k1", maxUses: 1.5 }) as never);
  assert.equal(res.status, 400);
});

test("invite: a whole maxUses is still accepted", async () => {
  const res = await inviteRoute.POST(post({ apiKeyId: "k1", maxUses: 2 }) as never);
  assert.equal(res.status, 201);
});
