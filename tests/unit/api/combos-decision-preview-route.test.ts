/**
 * POST /api/combos/decision-preview — route-level contract: management auth gate (401, before
 * any preview work), JSON/schema validation (400) and a sanitized 500 when the preview throws.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any db module loads.
 * Run: node --import tsx/esm --test tests/unit/api/combos-decision-preview-route.test.ts
 */
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-decision-preview-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "decision-preview-route-secret";

const core = await import("../../../src/lib/db/core.ts");
const routeModule = await import("../../../src/app/api/combos/decision-preview/route.ts");
const strategyModule =
  await import("../../../open-sse/services/autoCombo/decisionModelStrategy.ts");

const SECRET_DETAIL = "boom at /srv/omniroute/secret-path.ts:42 sk-live-should-never-leak";
const ENV_KEYS = ["OMNIROUTE_DISABLE_AUTH", "INITIAL_PASSWORD", "REQUIRE_API_KEY"] as const;
const savedEnv = new Map<string, string | undefined>(ENV_KEYS.map((k) => [k, process.env[k]]));

const VALID_BODY = {
  strategy: "decision-openai",
  models: ["openai/gpt-4o-mini", "openai/gpt-4o"],
};

function post(body: unknown, rawBody?: string): Request {
  return new Request("http://localhost/api/combos/decision-preview", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: rawBody ?? JSON.stringify(body),
  });
}

function openAuth() {
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_DISABLE_AUTH = "1";
}

function lockedAuth() {
  delete process.env.OMNIROUTE_DISABLE_AUTH;
  delete process.env.REQUIRE_API_KEY;
  process.env.INITIAL_PASSWORD = "decision-preview-route-password";
}

before(() => {
  core.resetDbInstance();
  core.getDbInstance();
});

after(() => {
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("POST /api/combos/decision-preview", () => {
  test("returns the generated menu for a valid body when auth is open", async () => {
    openAuth();
    const res = await routeModule.POST(post(VALID_BODY));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body.menu, ["gpt-4o-mini", "gpt-4o"]);
    assert.equal(body.test, undefined, "no prompt means no live decision call");
  });

  test("rejects a request without credentials with 401 and does no preview work", async () => {
    lockedAuth();
    // The same body is a 200 with open auth (above), so a 401 here proves the gate ran first.
    const res = await routeModule.POST(post(VALID_BODY));
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.equal(body.menu, undefined, "a refused caller must not receive preview data");
    assert.ok(body.error, "401 must carry an error body");
  });

  test("rejects an unauthenticated malformed body with 401, not 400", async () => {
    lockedAuth();
    const res = await routeModule.POST(post(undefined, "{not json"));
    assert.equal(res.status, 401, "auth is checked before the body is parsed");
  });

  test("rejects malformed JSON with 400", async () => {
    openAuth();
    const res = await routeModule.POST(post(undefined, "{not json"));
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error.message, "Invalid request");
    assert.deepEqual(body.error.details, [{ field: "body", message: "Invalid JSON body" }]);
  });

  test("rejects schema-invalid bodies with 400", async () => {
    openAuth();
    const cases: Array<[string, unknown]> = [
      ["unknown strategy", { ...VALID_BODY, strategy: "round-robin" }],
      ["missing models", { strategy: "decision-openai" }],
      ["blank model string", { ...VALID_BODY, models: ["   "] }],
      ["empty prompt", { ...VALID_BODY, prompt: "   " }],
    ];
    for (const [label, body] of cases) {
      const res = await routeModule.POST(post(body));
      assert.equal(res.status, 400, `${label} must be a 400`);
      const parsed = await res.json();
      assert.ok(parsed.error, `${label} must carry an error body`);
      assert.equal(parsed.menu, undefined, `${label} must not reach the preview`);
    }
  });

  test("turns a throwing preview into a sanitized 500", async () => {
    openAuth();
    // buildDecisionPreview reads the format table first; a throwing getter is a real failure
    // inside the preview without stubbing the module.
    const formats = strategyModule.DECISION_STRATEGY_FORMATS as Record<string, unknown>;
    const original = Object.getOwnPropertyDescriptor(formats, "decision-openai");
    assert.ok(original, "decision-openai format entry must exist");
    Object.defineProperty(formats, "decision-openai", {
      configurable: true,
      get() {
        throw new Error(SECRET_DETAIL);
      },
    });
    try {
      const res = await routeModule.POST(post(VALID_BODY));
      assert.equal(res.status, 500);
      const text = await res.text();
      assert.ok(!text.includes("secret-path"), `500 body leaked a path: ${text}`);
      assert.ok(!text.includes("sk-live"), `500 body leaked a credential: ${text}`);
      assert.ok(!/\bat .*:\d+/.test(text), `500 body leaked a stack frame: ${text}`);
      assert.ok(JSON.parse(text).error, "500 must carry an error body");
    } finally {
      Object.defineProperty(formats, "decision-openai", original);
    }
  });
});
