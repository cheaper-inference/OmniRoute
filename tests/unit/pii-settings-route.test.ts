import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// GET/PUT /api/settings/pii and POST /api/settings/pii/test: Zod-validated,
// unsafe regex refused on save AND on test, sample capped at 8 KB, error
// bodies never carry a stack.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
delete process.env.INITIAL_PASSWORD; // auth not required in this test env
delete process.env.PII_REDACTION_ENABLED;
delete process.env.PII_RESPONSE_SANITIZATION;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/settings/pii/route.ts");
const testRoute = await import("../../src/app/api/settings/pii/test/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function json(url: string, method: string, body: unknown): Request {
  return new Request(`http://localhost${url}`, {
    method,
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function assertNoStack(body: { error?: { message?: string } }) {
  const text = JSON.stringify(body);
  assert.ok(!text.includes("at /"), "error body must not leak a stack trace");
}

test("GET returns defaults: masking off, all types, no custom patterns", async () => {
  const res = await route.GET(new Request("http://localhost/api/settings/pii"));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.requestMaskingEnabled, false);
  assert.equal(body.responseSanitizationEnabled, false);
  assert.equal(body.enabledTypes, null);
  assert.deepEqual(body.customPatterns, []);
  assert.ok(body.availableTypes.includes("cpf"));
  assert.equal(body.stats.total, 0);
});

test("PUT saves the selection and a safe custom pattern", async () => {
  const res = await route.PUT(
    json("/api/settings/pii", "PUT", {
      enabledTypes: ["email", "cpf"],
      customPatterns: [
        { id: "t1", name: "Token", type: "regex", pattern: "SK-[a-z0-9]{20}", enabled: true },
      ],
    })
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body.enabledTypes, ["email", "cpf"]);
  assert.equal(body.customPatterns.length, 1);

  const again = await (await route.GET(new Request("http://localhost/api/settings/pii"))).json();
  assert.deepEqual(again.enabledTypes, ["email", "cpf"]);

  const reset = await route.PUT(json("/api/settings/pii", "PUT", { enabledTypes: null }));
  assert.equal((await reset.json()).enabledTypes, null);
});

test("PUT refuses a catastrophic regex with a sanitized 400", async () => {
  const res = await route.PUT(
    json("/api/settings/pii", "PUT", {
      customPatterns: [{ id: "x", name: "x", type: "regex", pattern: "(a+)+$", enabled: true }],
    })
  );
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(JSON.stringify(body), /catastrophic backtracking/);
  assertNoStack(body);
});

test("PUT refuses invalid JSON and unknown keys", async () => {
  const bad = await route.PUT(json("/api/settings/pii", "PUT", "{not json"));
  assert.equal(bad.status, 400);
  assertNoStack(await bad.json());
  const unknown = await route.PUT(json("/api/settings/pii", "PUT", { enabled: true }));
  assert.equal(unknown.status, 400);
});

test("POST test previews a safe pattern", async () => {
  const res = await testRoute.POST(
    json("/api/settings/pii/test", "POST", {
      type: "wildcard",
      pattern: "*@corp.local",
      sampleText: "write to ana@corp.local or bob@example.com",
    })
  );
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.valid, true);
  assert.deepEqual(body.matches, ["ana@corp.local"]);
  assert.equal(body.preview, "write to [CUSTOM_REDACTED] or bob@example.com");
});

test("POST test refuses unsafe patterns and oversized samples", async () => {
  const unsafe = await testRoute.POST(
    json("/api/settings/pii/test", "POST", {
      type: "regex",
      pattern: "(a+)+$",
      sampleText: "aaaa",
    })
  );
  assert.equal(unsafe.status, 400);
  assertNoStack(await unsafe.json());

  const big = await testRoute.POST(
    json("/api/settings/pii/test", "POST", {
      type: "regex",
      pattern: "abc",
      sampleText: "x".repeat(8193),
    })
  );
  assert.equal(big.status, 400);

  // Multi-byte text: under 8192 characters but over 8192 bytes.
  const wide = await testRoute.POST(
    json("/api/settings/pii/test", "POST", {
      type: "regex",
      pattern: "abc",
      sampleText: "é".repeat(5000),
    })
  );
  assert.equal(wide.status, 400);

  const broken = await testRoute.POST(json("/api/settings/pii/test", "POST", "{"));
  assert.equal(broken.status, 400);
  const body = await broken.json();
  assertNoStack(body);
  assert.ok(!String(body.error?.message ?? "").includes("at /"));
});
