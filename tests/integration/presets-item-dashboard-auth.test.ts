import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preset-item-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "true";
process.env.INITIAL_PASSWORD = "test-dashboard-password";
process.env.JWT_SECRET = "test-presets-item-auth-secret";
process.env.API_KEY_SECRET = "test-presets-item-api-key-secret-32-bytes";

const core = await import("../../src/lib/db/core.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { createPlaygroundPreset } = await import("../../src/lib/db/playgroundPresets.ts");
const { GET, PUT, DELETE } = await import("../../src/app/api/playground/presets/[id]/route.ts");
const { GET: listPresets } = await import("../../src/app/api/playground/presets/route.ts");

async function dashboardCookie(): Promise<string> {
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
  return `auth_token=${token}`;
}

function request(id: string, method: string, cookie?: string, apiKey?: string): Request {
  return new Request(`http://localhost/api/playground/presets/${id}`, {
    method,
    headers: {
      ...(cookie ? { cookie } : {}),
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
      ...(method === "PUT" ? { "Content-Type": "application/json" } : {}),
    },
    ...(method === "PUT" ? { body: JSON.stringify({ name: "Edited" }) } : {}),
  });
}

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

const input = {
  name: "Original",
  endpoint: "chat.completions",
  model: "gpt-4o",
  system: null,
  params: {},
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("dashboard session can GET, PUT, and DELETE a preset without an API key", async () => {
  const preset = createPlaygroundPreset(input);
  const cookie = await dashboardCookie();

  const read = await GET(request(preset.id, "GET", cookie), params(preset.id));
  assert.equal(read.status, 200);
  assert.equal(((await read.json()) as { id: string }).id, preset.id);

  const update = await PUT(request(preset.id, "PUT", cookie), params(preset.id));
  assert.equal(update.status, 200);
  assert.equal(((await update.json()) as { name: string }).name, "Edited");

  const remove = await DELETE(request(preset.id, "DELETE", cookie), params(preset.id));
  assert.equal(remove.status, 204);
});

test("item routes accept a valid API key without a dashboard session", async () => {
  const preset = createPlaygroundPreset(input);
  const key = await createApiKey("preset-item-auth", "machine-preset-item");
  assert.ok(key?.key);

  const read = await GET(request(preset.id, "GET", undefined, key.key), params(preset.id));
  assert.equal(read.status, 200);
  const update = await PUT(request(preset.id, "PUT", undefined, key.key), params(preset.id));
  assert.equal(update.status, 200);
  const remove = await DELETE(request(preset.id, "DELETE", undefined, key.key), params(preset.id));
  assert.equal(remove.status, 204);
});

test("item routes reject missing credentials and invalid API keys even with a dashboard session", async () => {
  const preset = createPlaygroundPreset(input);
  const cookie = await dashboardCookie();
  for (const [method, handler] of [
    ["GET", GET],
    ["PUT", PUT],
    ["DELETE", DELETE],
  ] as const) {
    assert.equal((await handler(request(preset.id, method), params(preset.id))).status, 401);
    assert.equal(
      (await handler(request(preset.id, method, cookie, "invalid-key"), params(preset.id))).status,
      401
    );
  }
});

test("API-key enforcement remains active when dashboard login is disabled", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const preset = createPlaygroundPreset(input);
    const cookie = await dashboardCookie();
    const key = await createApiKey("preset-item-auth-open-login", "machine-preset-item");
    assert.ok(key?.key);

    for (const [method, handler] of [
      ["GET", GET],
      ["PUT", PUT],
      ["DELETE", DELETE],
    ] as const) {
      assert.equal((await handler(request(preset.id, method), params(preset.id))).status, 401);
      assert.equal(
        (await handler(request(preset.id, method, cookie, "invalid-key"), params(preset.id)))
          .status,
        401
      );
    }
    const listUrl = "http://localhost/api/playground/presets";
    assert.equal((await listPresets(new Request(listUrl))).status, 401);
    assert.equal((await listPresets(new Request(listUrl, { headers: { cookie } }))).status, 200);
    assert.equal((await GET(request(preset.id, "GET", cookie), params(preset.id))).status, 200);
    assert.equal(
      (await GET(request(preset.id, "GET", undefined, key.key), params(preset.id))).status,
      200
    );
  } finally {
    await updateSettings({ requireLogin: true });
  }
});
