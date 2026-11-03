/**
 * Regression tests: management/v1 routes must answer 4xx (not an unhandled throw / 500)
 * for a well-formed JSON body that is not an object (`null`, a string, a number, `true`), and POST /api/logs/detail
 * for malformed JSON.
 * Harness mirrors tests/unit/api-malformed-json-400.test.ts (temp DATA_DIR, no password
 * => requireManagementAuth is a no-op).
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-non-object-mgmt-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "non-object-mgmt-test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const logsDetailRoute = await import("../../src/app/api/logs/detail/route.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

function jsonRequest(url: string, body: unknown, method: string): NextRequest {
  return new NextRequest(url, {
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

async function expect400(call: () => Promise<Response>, label: string) {
  let res: Response;
  try {
    res = await call();
  } catch (err) {
    assert.fail(`${label}: handler threw (=> 500): ${(err as Error).message}`);
  }
  assert.equal(res.status, 400, `${label}: expected 400, got ${res.status}`);
}

const NON_OBJECT_BODIES: Array<[string, unknown]> = [
  ["null", null],
  ["a string", "x"],
  ["a number", 5],
  ["true", true],
];

for (const [label, body] of NON_OBJECT_BODIES) {
  test(`POST /api/logs/detail — ${label} body returns 400`, async () => {
    await expect400(
      () => logsDetailRoute.POST(jsonRequest("http://localhost/api/logs/detail", body, "POST")),
      `logs/detail ${label}`
    );
  });

  test(`PATCH /api/settings — ${label} body returns 400`, async () => {
    await expect400(
      () => settingsRoute.PATCH(jsonRequest("http://localhost/api/settings", body, "PATCH")),
      `settings PATCH ${label}`
    );
  });

  test(`PUT /api/settings — ${label} body returns 400`, async () => {
    await expect400(
      () => settingsRoute.PUT(jsonRequest("http://localhost/api/settings", body, "PUT")),
      `settings PUT ${label}`
    );
  });

  test(`DELETE /api/providers — ${label} body returns 400`, async () => {
    await expect400(
      () => providersRoute.DELETE(jsonRequest("http://localhost/api/providers", body, "DELETE")),
      `providers DELETE ${label}`
    );
  });
}

test("POST /api/logs/detail — malformed JSON returns 400", async () => {
  await expect400(
    () =>
      logsDetailRoute.POST(
        new NextRequest("http://localhost/api/logs/detail", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{not json",
        })
      ),
    "logs/detail malformed"
  );
});

test("POST /api/logs/detail — an object body still switches the setting", async () => {
  const res = await logsDetailRoute.POST(
    jsonRequest("http://localhost/api/logs/detail", { enabled: true }, "POST")
  );
  assert.equal(res.status, 200);
});
