import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

// `params.skill` is caller-controlled. Looking it up as a plain object index let names such as
// "constructor" or "toString" resolve to Object.prototype members, pass the unknown-skill check
// and get invoked as a skill handler (CodeQL js/unvalidated-dynamic-method-call, alert #1224).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-skill-proto-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const a2aRoute = await import("../../src/app/a2a/route.ts");

function makeJsonRpcRequest(body: unknown): NextRequest {
  return new Request("http://localhost/a2a", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ a2aEnabled: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROTOTYPE_NAMES = ["constructor", "toString", "hasOwnProperty", "__proto__", "valueOf"];

for (const method of ["message/send", "message/stream"]) {
  for (const skill of PROTOTYPE_NAMES) {
    test(`${method} rejects the Object.prototype name "${skill}" as an unknown skill`, async () => {
      const res = await a2aRoute.POST(
        makeJsonRpcRequest({
          jsonrpc: "2.0",
          id: "1",
          method,
          params: { skill, messages: [{ role: "user", content: "hi" }] },
        })
      );
      const body = (await res.json()) as { error?: { code?: number; message?: string } };
      assert.equal(body.error?.code, -32601, JSON.stringify(body));
      assert.match(body.error?.message ?? "", /^Unknown skill: /);
    });
  }
}

test("a registered skill still dispatches through message/send", async () => {
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "message/send",
      params: {
        skill: "list-capabilities",
        messages: [{ role: "user", content: "what can you do?" }],
      },
    })
  );
  const body = (await res.json()) as {
    result?: { task?: { state?: string } };
    error?: unknown;
  };
  assert.equal(body.error, undefined, JSON.stringify(body));
  assert.equal(body.result?.task?.state, "completed");
});
