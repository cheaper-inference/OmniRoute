import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Paths are computed from HOME at module load, so HOME must point at the sandbox first.
const FAKE_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "or-apply-plan-"));
process.env.HOME = FAKE_HOME;
process.env.USERPROFILE = FAKE_HOME;
process.env.DATA_DIR = path.join(FAKE_HOME, "data");
process.env.OMNIROUTE_CONTAINER = "0";

const { createManagementSessionToken } = await import("../helpers/managementSession.ts");
const { POST } = await import("../../src/app/api/cli-tools/apply/route.ts");

const SESSION_COOKIE = `auth_token=${await createManagementSessionToken()}`;
const CONFIG_PATH = path.join(FAKE_HOME, ".codex", "config.toml");
// Built at run time so the file holds no credential-shaped literal.
const API_KEY = ["fixture", "key", String(process.pid)].join("-");

function apply(extra: Record<string, unknown> = {}) {
  return POST(
    new Request("http://localhost:20128/api/cli-tools/apply", {
      method: "POST",
      headers: { "content-type": "application/json", cookie: SESSION_COOKIE },
      body: JSON.stringify({ toolId: "codex", apiKey: API_KEY, ...extra }),
    })
  );
}

async function plan(extra: Record<string, unknown> = {}) {
  const response = await apply({ dryRun: true, ...extra });
  assert.equal(response.status, 200);
  return (await response.json()) as { planFingerprint?: string; content: string };
}

test.beforeEach(() => {
  fs.rmSync(path.join(FAKE_HOME, ".codex"), { recursive: true, force: true });
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, 'model = "old-model"\n');
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  fs.rmSync(FAKE_HOME, { recursive: true, force: true });
});

test("dry run returns a plan fingerprint that is stable and holds no secret", async () => {
  const first = await plan();
  const second = await plan();
  assert.match(first.planFingerprint ?? "", /^p1:[0-9a-f]{32}$/);
  assert.equal(second.planFingerprint, first.planFingerprint);
  assert.ok(!JSON.stringify(first).includes(API_KEY));
});

test("the fingerprint changes with the file bytes and with the request", async () => {
  const before = (await plan()).planFingerprint;
  assert.notEqual((await plan({ model: "other-model" })).planFingerprint, before);
  fs.appendFileSync(CONFIG_PATH, "# edited\n");
  assert.notEqual((await plan()).planFingerprint, before);
});

test("apply with a current fingerprint writes the config", async () => {
  const { planFingerprint } = await plan();
  const response = await apply({ planFingerprint });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
  assert.match(fs.readFileSync(CONFIG_PATH, "utf8"), /\[model_providers\.omniroute\]/);
});

test("apply with a stale fingerprint is refused, writes nothing and returns the current plan", async () => {
  const { planFingerprint } = await plan();
  const moved = 'model = "changed-after-preview"\n';
  fs.writeFileSync(CONFIG_PATH, moved);

  const response = await apply({ planFingerprint });
  assert.equal(response.status, 409);
  const body = await response.json();
  assert.equal(fs.readFileSync(CONFIG_PATH, "utf8"), moved, "stale apply must not write");
  assert.equal(fs.existsSync(path.join(path.dirname(CONFIG_PATH), ".omniroute.bak")), false);
  assert.match(body.planFingerprint, /^p1:[0-9a-f]{32}$/);
  assert.notEqual(body.planFingerprint, planFingerprint);
  assert.ok(!JSON.stringify(body).includes(API_KEY));

  const retry = await apply({ planFingerprint: body.planFingerprint });
  assert.equal(retry.status, 200, "the fresh plan from the 409 is accepted");
});

test("apply without a fingerprint keeps working", async () => {
  const response = await apply();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).success, true);
});

test("a fingerprint that is not a plan token is a 400", async () => {
  assert.equal((await apply({ planFingerprint: "" })).status, 400);
  assert.equal((await apply({ planFingerprint: 7 })).status, 400);
});
